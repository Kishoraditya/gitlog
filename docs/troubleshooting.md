# GitLog AI - Troubleshooting Guide

## Common Issues

### 1. "Failed to generate changelog" Error

**Symptoms**: API returns 500 or generic error message.

**Causes & Solutions**:
- **Invalid API Key**: Check `OPENROUTER_API_KEY` in `.env`. Test with `curl`.
- **Rate Limited**: OpenRouter has per-minute limits. Wait and retry.
- **Empty Commits**: Ensure the selected range has commits.

### 2. "No repositories found"

**Symptoms**: Dashboard shows empty repo list after login.

**Causes & Solutions**:
- **Scope Issue**: GitHub OAuth token may lack `repo` scope. Re-authenticate.
- **Private Repos**: Public-only access by default. Check OAuth permissions.

### 3. "TypeError: Cannot read properties of undefined"

**Symptoms**: Session or token errors in console.

**Causes & Solutions**:
- **JWT Strategy**: Ensure `NEXTAUTH_SECRET` is set.
- **Callback Error**: Check `src/lib/auth.ts` for proper token handling.

### 4. "404 Not Found" on Commit Comparison

**Symptoms**: GitHub API returns 404 for `compareCommits`.

**Causes & Solutions**:
- **Invalid Refs**: "HEAD~50" may not exist on small repos. Use fallback logic.
- **Private Repo**: Token may not have access.

### 5. Build Fails on Vercel/Railway

**Symptoms**: `prisma generate` errors.

**Causes & Solutions**:
- Add `prisma generate` to build script: `"build": "prisma generate && next build"`
- Ensure `DATABASE_URL` is set as env var in deployment.

---

## Debugging Tips

1. **Check Server Logs**: Use Vercel/Railway logs panel.
2. **API Testing**: Use Postman or `curl` to test `/api/generate` directly.
3. **Local Dev**: Run `npm run dev` and check browser console + terminal.
4. **Prisma Studio**: `npx prisma studio` to inspect database.

---

## Contact

If issues persist, open an issue on GitHub.
