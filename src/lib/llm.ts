import OpenAI from "openai";
import semver from "semver";
import type { GitHubCommit } from "./github";
import { getCommitDiff } from "./github";
import { parseRepoFullName, simpleHash } from "./utils";
import { getCachedChangelog, setCachedChangelog } from "./cache";
import { LLM_LANGUAGE_INSTRUCTIONS, Locale } from "./i18n";

let openaiClient: OpenAI | null = null;

function getLLMClient(apiKey?: string, baseURL?: string) {
    return new OpenAI({
        baseURL: baseURL || "https://openrouter.ai/api/v1",
        apiKey: apiKey || process.env.OPENROUTER_API_KEY || "dummy_key_for_build",
    });
}

/**
 * Default internal client for background tasks
 */
function getInternalLLM() {
    if (!openaiClient) {
        openaiClient = getLLMClient();
    }
    return openaiClient;
}

const MODEL_FAST = "tngtech/deepseek-r1t2-chimera:free";
const MODEL_SMART = "arcee-ai/trinity-large-preview:free";

export type ChangelogFormat = "keepachangelog" | "github_release" | "simple";

interface ParsedCommit {
    type: string | null;
    scope: string | null;
    subject: string | null;
    body: string | null;
    isBreaking: boolean;
    original: string;
}

export interface GenerateOptions {
    commits: GitHubCommit[];
    format: ChangelogFormat;
    repoName: string;
    version?: string;
    includeAuthors?: boolean;
    accessToken?: string;
    customApiKey?: string;
    customBaseURL?: string;
    outputLanguage?: string;
}

const CC_REGEX = /^(\w+)(?:\(([\w\$\.\-\* ]*)\))?(!?): (.+)$/;

export function parseConventionalCommits(commits: GitHubCommit[]): ParsedCommit[] {
    return commits.map((commit) => {
        const message = commit.commit.message;
        const lines = message.split("\n");
        const header = lines[0];
        const body = lines.slice(1).join("\n").trim();
        const isBreakingInBody = body.includes("BREAKING CHANGE") || body.includes("BREAKING-CHANGE");
        const match = header.match(CC_REGEX);

        if (match) {
            const isBreakingInHeader = match[3] === "!";
            return {
                type: match[1],
                scope: match[2] || null,
                subject: match[4],
                body: body || null,
                isBreaking: isBreakingInHeader || isBreakingInBody,
                original: message,
            };
        }

        return {
            type: null,
            scope: null,
            subject: header,
            body: body || null,
            isBreaking: isBreakingInBody,
            original: message,
        };
    });
}

export function categorizeCommits(parsed: ParsedCommit[]): Record<string, ParsedCommit[]> {
    const categories: Record<string, ParsedCommit[]> = {
        breaking: [], feat: [], fix: [], docs: [], style: [],
        refactor: [], perf: [], test: [], chore: [], other: [],
    };

    for (const commit of parsed) {
        if (commit.isBreaking) categories.breaking.push(commit);
        else if (commit.type && categories[commit.type]) categories[commit.type].push(commit);
        else categories.other.push(commit);
    }
    return categories;
}

export function suggestNextVersion(
    currentVersion: string | undefined,
    commits: GitHubCommit[]
): { version: string; reason: string } {
    const current = semver.valid(currentVersion) || "0.0.0";
    const parsed = parseConventionalCommits(commits);
    const hasBreaking = parsed.some((c) => c.isBreaking);
    const hasFeatures = parsed.some((c) => c.type === "feat");
    const hasFixes = parsed.some((c) => c.type === "fix");

    let bump: "major" | "minor" | "patch" = "patch";
    let reason = "Bug fixes and minor changes";

    if (hasBreaking) { bump = "major"; reason = "Breaking changes detected"; }
    else if (hasFeatures) { bump = "minor"; reason = "New features added"; }
    else if (hasFixes) { bump = "patch"; reason = "Bug fixes"; }

    const newVersion = semver.inc(current, bump) || "1.0.0";
    return { version: newVersion, reason };
}

const FORMAT_PROMPTS: Record<ChangelogFormat, string> = {
    keepachangelog: `Generate a changelog strictly following the Keep a Changelog (keepachangelog.com) format.
Rules:
1. Start with a YAML metadata block:
---
version: X.Y.Z
date: YYYY-MM-DD
type: (major|minor|patch)
breaking: (true|false)
stability: (stable|experimental|beta)
components: (list based on changes: e.g. api, ui, cli, db)
tags: (list based on impact: e.g. performance, security, dx, ux)
migration_required: (true|false)
---
2. Follow with the mandatory header: "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)."
3. Use standard categories: Added, Changed, Deprecated, Removed, Fixed, Security.
4. Place the latest version first.
5. Every entry MUST be a bullet point. Use provided commit links.
6. Types of changes are for humans, not machines.`,
    github_release: `Generate GitHub Release notes.
Include a summary, ✨ Highlights (grouped by type), and Emojis.
Use commit links if available for each bullet point.`,
    simple: `Generate a simple bullet-point changelog with commit links if available.`,
};

async function assessCommitQuality(commits: GitHubCommit[]): Promise<Record<string, "clear" | "vague">> {
    if (commits.length === 0) return {};
    const sample = commits.slice(0, 50);
    const subjects = sample.map(c => `- ${c.sha.substring(0, 7)}: ${c.commit.message.split('\n')[0]}`).join("\n");

    const systemPrompt = `Classify each commit as "clear" or "vague"(e.g. "fix", "wip").
Respond in JSON: {"lines": [{"sha": "short_sha", "status": "clear" | "vague"}]}`;

    try {
        const response = await getInternalLLM().chat.completions.create({
            model: MODEL_FAST,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: subjects },
            ],
            response_format: { type: "json_object" },
            temperature: 0,
        });

        const result = JSON.parse(response.choices[0]?.message?.content || "{}");
        const map: Record<string, "clear" | "vague"> = {};
        sample.forEach((c) => {
            const short = c.sha.substring(0, 7);
            const found = result.lines?.find((l: any) => l.sha === short);
            map[c.sha] = found?.status || "clear";
        });
        commits.slice(50).forEach(c => map[c.sha] = "clear");
        return map;
    } catch (e) {
        console.error("Quality assessment failed", e);
        const map: Record<string, "clear" | "vague"> = {};
        commits.forEach(c => {
            const msg = c.commit.message.toLowerCase();
            map[c.sha] = (msg.length < 10 || ["fix", "update", "wip", "stuff"].includes(msg)) ? "vague" : "clear";
        });
        return map;
    }
}

async function analyzeDiffs(
    accessToken: string,
    repoName: string,
    vagueCommits: GitHubCommit[]
): Promise<Record<string, string>> {
    const { owner, repo } = parseRepoFullName(repoName);
    const results: Record<string, string> = {};
    const CHUNK_SIZE = 3;

    for (let i = 0; i < vagueCommits.length; i += CHUNK_SIZE) {
        const chunk = vagueCommits.slice(i, i + CHUNK_SIZE);
        await Promise.all(chunk.map(async (commit) => {
            try {
                const diff = await getCommitDiff(accessToken, owner, repo, commit.sha);
                if (!diff || diff.length > 6000) {
                    results[commit.sha] = commit.commit.message;
                    return;
                }
                const response = await getInternalLLM().chat.completions.create({
                    model: MODEL_FAST,
                    messages: [
                        { role: "system", content: "Summarize this git diff into a single concise conventional commit message. Output ONLY the message." },
                        { role: "user", content: `Message: ${commit.commit.message}\n\nDiff:\n${diff.substring(0, 3000)}` },
                    ],
                    temperature: 0.1,
                });
                results[commit.sha] = response.choices[0]?.message?.content?.trim() || commit.commit.message;
            } catch (e) {
                console.error(`Diff analysis failed for ${commit.sha}`, e);
                results[commit.sha] = commit.commit.message;
            }
        }));
    }
    return results;
}

export async function generateChangelog(options: GenerateOptions): Promise<string> {
    const { commits, format, repoName, version, accessToken, outputLanguage } = options;

    // Check cache first
    const cacheHash = simpleHash(JSON.stringify({
        shas: commits.map(c => c.sha),
        format,
        version,
        outputLanguage
    }));

    const cached = getCachedChangelog(cacheHash);
    if (cached) return cached;

    const parsed = parseConventionalCommits(commits);
    const candidatesForInspection = commits.filter((c, i) => parsed[i].type === null);

    let enhancedDescriptions: Record<string, string> = {};

    if (accessToken && candidatesForInspection.length > 0) {
        const qualityMap = await assessCommitQuality(candidatesForInspection);
        const vagueCommits = candidatesForInspection.filter(c => qualityMap[c.sha] === "vague");
        if (vagueCommits.length > 0) {
            enhancedDescriptions = await analyzeDiffs(accessToken, repoName, vagueCommits);
        }
    }

    const categories = categorizeCommits(parsed);
    const structuredSummary = Object.entries(categories)
        .filter(([, items]) => items.length > 0)
        .map(([category, items]) => {
            const list = items.map((c) => {
                const originalCommit = commits.find(orig => orig.commit.message === c.original);
                const desc = originalCommit && enhancedDescriptions[originalCommit.sha]
                    ? `(AI Refined) ${enhancedDescriptions[originalCommit.sha]}`
                    : c.subject;
                const link = originalCommit?.html_url ? ` ([commit](${originalCommit.html_url}))` : "";
                return `  - ${desc}${link}`;
            }).join("\n");
            return `${category.toUpperCase()} (${items.length}):\n${list}`;
        })
        .join("\n\n");

    const langInstruction = outputLanguage
        ? LLM_LANGUAGE_INSTRUCTIONS[outputLanguage as Locale] || ""
        : "";

    const systemPrompt = `You are an expert technical writer. Transform git commits into proper changelogs.
Rules: Clear language, combine related, highlight breaking (⚠️), Markdown only. ${langInstruction}`;

    const userPrompt = `Repository: ${repoName}
${version ? `Version: ${version}` : ""}
Date: ${new Date().toISOString().split("T")[0]}

Format Instructions: ${FORMAT_PROMPTS[format]}

Commits:
${structuredSummary}

Generate the changelog now:`;

    const llm = getLLMClient(options.customApiKey, options.customBaseURL);

    // Better model selection for custom keys
    let model = MODEL_SMART;
    if (options.customApiKey) {
        if (options.customApiKey.startsWith("sk-ant")) model = "claude-3-5-sonnet-20241022";
        else if (options.customApiKey.startsWith("sk-")) model = "gpt-4o";
        // If it's a generic OpenRouter key, it will use the default MODEL_SMART via OpenRouter baseURL
    }

    const response = await llm.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 2500,
    });

    let contributorsSection = "";
    if (options.includeAuthors !== false) {
        const authors = new Map<string, string>();
        commits.forEach(c => {
            if (c.author?.login) authors.set(c.author.login, c.author.avatar_url);
        });

        if (authors.size > 0) {
            const heading = outputLanguage === "hi" ? "❤️ योगदानकर्ता" :
                outputLanguage === "es" ? "❤️ Colaboradores" :
                    outputLanguage === "de" ? "❤️ Mitwirkende" : "❤️ Contributors";
            contributorsSection = `\n\n## ${heading}\n${Array.from(authors.entries()).map(([login]) => `  - [@${login}](https://github.com/${login})`).join("\n")}`;
        }
    }

    const result = (response.choices[0]?.message?.content || "") + contributorsSection;

    // Save to cache
    setCachedChangelog(cacheHash, result);

    return result;
}

export async function suggestVersionWithLLM(
    commits: GitHubCommit[],
    currentVersion?: string
): Promise<{ suggested: string; reason: string }> {
    const deterministic = suggestNextVersion(currentVersion, commits);
    const parsed = parseConventionalCommits(commits);
    if (parsed.some((c) => c.type !== null)) {
        return { suggested: deterministic.version, reason: deterministic.reason };
    }

    const commitMessages = commits.map((c) => c.commit.message.split("\n")[0]).join("\n");
    const response = await getInternalLLM().chat.completions.create({
        model: MODEL_FAST,
        messages: [
            {
                role: "system",
                content: `You are a semantic versioning expert.
Respond JSON: {"suggested": "x.y.z", "reason": "brief explanation"}`,
            },
            {
                role: "user",
                content: `Current: ${currentVersion || "0.0.0"}\nCommits:\n${commitMessages}`,
            },
        ],
        temperature: 0,
        max_tokens: 200,
    });

    try {
        const content = response.choices[0]?.message?.content || "{}";
        return JSON.parse(content);
    } catch {
        return { suggested: deterministic.version, reason: deterministic.reason };
    }
}
