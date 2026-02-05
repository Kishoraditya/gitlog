import { Octokit } from "@octokit/rest";

export function createOctokit(accessToken: string) {
    return new Octokit({ auth: accessToken });
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    default_branch: string;
    description: string | null;
    updated_at: string;
}

export interface GitHubCommit {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string | null;
            email: string | null;
            date: string;
        } | null;
    };
    author: {
        login: string;
        avatar_url: string;
    } | null;
    html_url?: string;
}

export interface GitHubTag {
    name: string;
    commit: {
        sha: string;
    };
}

export async function getRepositories(accessToken: string): Promise<GitHubRepo[]> {
    const octokit = createOctokit(accessToken);
    const { data } = await octokit.repos.listForAuthenticatedUser({
        sort: "updated",
        per_page: 100,
        type: "all",
    });
    return data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        private: repo.private,
        default_branch: repo.default_branch,
        description: repo.description,
        updated_at: repo.updated_at || "",
    }));
}

export async function getCommits(
    accessToken: string,
    owner: string,
    repo: string,
    options: {
        since?: string;
        until?: string;
        sha?: string;
        perPage?: number;
    } = {}
): Promise<GitHubCommit[]> {
    const octokit = createOctokit(accessToken);
    const { data } = await octokit.repos.listCommits({
        owner,
        repo,
        since: options.since,
        until: options.until,
        sha: options.sha,
        per_page: options.perPage || 100,
    });
    return data.map((item) => ({
        sha: item.sha,
        commit: {
            message: item.commit.message,
            author: item.commit.author ? {
                name: item.commit.author.name || null,
                email: item.commit.author.email || null,
                date: item.commit.author.date || "",
            } : null,
        },
        author: item.author ? {
            login: item.author.login,
            avatar_url: item.author.avatar_url,
        } : null,
    }));
}

export async function getCommitsBetweenRefs(
    accessToken: string,
    owner: string,
    repo: string,
    base: string,
    head: string
): Promise<GitHubCommit[]> {
    const octokit = createOctokit(accessToken);
    try {
        const { data } = await octokit.repos.compareCommits({
            owner,
            repo,
            base,
            head,
        });
        return data.commits.map((item) => ({
            sha: item.sha,
            commit: {
                message: item.commit.message,
                author: item.commit.author ? {
                    name: item.commit.author.name || null,
                    email: item.commit.author.email || null,
                    date: item.commit.author.date || "",
                } : null,
            },
            author: item.author ? {
                login: item.author.login,
                avatar_url: item.author.avatar_url,
            } : null,
            html_url: item.html_url,
        }));
    } catch (error: any) {
        console.warn(`Compare failed for ${base}...${head}. Falling back to recent commits.`, error.message);
        return getCommits(accessToken, owner, repo, { perPage: 50 });
    }
}

export async function updateOrCreateFile(
    accessToken: string,
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch?: string
) {
    const octokit = createOctokit(accessToken);
    let sha: string | undefined;
    try {
        const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path,
            ref: branch,
        });
        if (!Array.isArray(data)) sha = data.sha;
    } catch (error) { }

    return octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: Buffer.from(content).toString("base64"),
        sha,
        branch,
    });
}

export async function getTags(
    accessToken: string,
    owner: string,
    repo: string
): Promise<GitHubTag[]> {
    const octokit = createOctokit(accessToken);
    const { data } = await octokit.repos.listTags({
        owner,
        repo,
        per_page: 30,
    });
    return data;
}

export async function getBranches(
    accessToken: string,
    owner: string,
    repo: string
): Promise<string[]> {
    const octokit = createOctokit(accessToken);
    const { data } = await octokit.repos.listBranches({
        owner,
        repo,
        per_page: 30,
    });
    return data.map((branch) => branch.name);
}

export async function getCommitDiff(
    accessToken: string,
    owner: string,
    repo: string,
    sha: string
): Promise<string> {
    const octokit = createOctokit(accessToken);
    const { data } = await octokit.repos.getCommit({
        owner,
        repo,
        ref: sha,
    });

    // Aggregate patches from all files
    return data.files
        ?.map((file) => `File: ${file.filename}\n${file.patch || "Binary file or no patch available"}`)
        .join("\n\n") || "";
}
