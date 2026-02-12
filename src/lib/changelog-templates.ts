export const CHANGELOG_TEMPLATES = {
    CUSTOM_COMPREHENSIVE: `# 🚀 Release {{version}} - "{{codename}}"
> **Released on:** {{date}}  
> **Target Branch:** \`{{branch}}\`

## 📝 Summary
{{summary}}

---

## 🏗️ Major Changes
{{major_changes}}

---

## ⚡ Features & Enhancements
{{features}}

---

## 🐛 Bug Fixes
{{fixes}}

---

## 🛠️ Technical Debt & Maintenance
{{technical}}

---

## 💬 Commit Log & Comments
*Detailed history of all changes included in this version.*

| Hash | Author | Message | Developer Notes / Comments |
| :--- | :--- | :--- | :--- |
{{commit_table}}

---

## ⚠️ Breaking Changes
> [!CAUTION]
> {{breaking_changes}}

---

## 🤝 Contributors
{{contributors}}

---

**Full Changelog**: {{compare_url}}
`,

    KEEP_A_CHANGELOG: `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [{{version}}] - {{date}}

### Added
{{added}}

### Changed
{{changed}}

### Deprecated
{{deprecated}}

### Removed
{{removed}}

### Fixed
{{fixed}}

### Security
{{security}}
`,

    GITHUB_RELEASE: `## What's Changed

{{summary}}

### New Features ✨
{{features}}

### Bug Fixes 🐛
{{fixes}}

### Other Changes
{{other}}

**Full Changelog**: {{compare_url}}
`,

    SIMPLE: `## {{version}} - {{date}}

{{changes}}
`
};

export type TemplateType = keyof typeof CHANGELOG_TEMPLATES;

export function getTemplate(type: TemplateType): string {
    return CHANGELOG_TEMPLATES[type];
}

export function renderTemplate(
    type: TemplateType,
    variables: Record<string, string>
): string {
    let template = getTemplate(type);

    Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, value || '');
    });

    return template;
}
