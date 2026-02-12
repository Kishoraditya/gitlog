# Contributing to GitLog AI

Thank you for your interest in contributing to GitLog AI! We welcome contributions from the community to help make this the best changelog generator for developers.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git

### Installation

1. **Fork the repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/Kishoraditya/gitlog.git
   cd gitlog
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   Copy `.env.example` to `.env` and fill in the required keys.
   ```bash
   cp .env.example .env
   ```
   > See `LOCAL_SETUP.md` for detailed instructions on configuring services like Supabase and OpenAI.

5. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🛠️ Development Workflow

1. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. **Make your changes**.
3. **Run linting** to ensure code quality:
   ```bash
   npm run lint
   ```
4. **Commit your changes** using Conventional Commits:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

## 📮 Pull Request Process

1. Open a Pull Request (PR) against the `main` branch.
2. Provide a clear title and description of your changes.
3. Link to any relevant issues (e.g., `Fixes #123`).
4. Wait for code review. We aim to review PRs within 48 hours.

## 🎨 Code Style

- We use **TypeScript** for type safety.
- We use **Tailwind CSS** for styling.
- We use **ESLint** and **Prettier** for formatting.

## 🐛 Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear title.
- Steps to reproduce.
- Expected vs. actual behavior.
- Screenshots if applicable.

## 📧 Contact

For security issues or private inquiries, please drop a mail to `kishoradityasc@gmail.com`.

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
