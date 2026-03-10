# AGENTS.md

Project Implementation documentation is in the project.md file.

## Project Agent Configuration

BEFORE YOU DO ANYTHING ELSE CHECK THE AVAILABLE MCPs.

This project uses a modern SvelteKit stack with Svelte 5, TypeScript, Tailwind CSS v4, pnpm for package management, and integrates with the `macula-mcp` Model Context Protocol endpoint as defined in `opencode.json`.

---

## MCP Discovery

When asked about any MCP integration, FIRST call the MCP's about/info tool (e.g., `macula-mcp_about`) to understand what it provides before searching elsewhere. Then you will use `macula-mcp_get_user` with the value `woss` to get the user information and understand the structure of the data you will be working with.

---

## 🛠️ Stack Overview

- **Framework:** [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Package Manager:** pnpm
- **MCP Integration:** macula-mcp (remote, http://localhost:3007/mcp)

---

## 🧑‍💻 Agent Roles & Skills

### 1. SvelteKit & Svelte 5

- Use SvelteKit best practices for routing, SSR, and runes.
- Prefer Svelte 5 runes and stores for state management.
- Use SvelteKit load functions and form actions for data loading and mutations.

### 2. TypeScript

- All source code should be written in TypeScript.
- Enable strict type checking in `tsconfig.json`.

### 3. Tailwind CSS v4

- Use Tailwind utility classes for all styling.
- Configure Tailwind v4 in `tailwind.config.js`.
- Prefer semantic, accessible HTML structure.

### 4. pnpm

- Use `pnpm` for all dependency management and scripts.
- Do not use npm or yarn.
- Use workspace features if the project is monorepo.

### 5. unilink-mcp

- Integrate with the `unilink-mcp` endpoint as defined in `opencode.json`.
- Use the MCP for model context, data, or agent orchestration as required.

---

## 🚦 Agent Workflow

1. **Setup:**
   - Install dependencies: `pnpm install`
   - Configure Tailwind and SvelteKit as per documentation.
2. **Development:**
   - Use SvelteKit conventions for pages, layouts, and endpoints.
   - Write all logic in TypeScript.
   - Use Tailwind for all styling.
3. **MCP Integration:**
   - Use the `unilink-mcp` endpoint for all MCP-related features.
   - Reference the `opencode.json` for endpoint details.
4. **Testing & Linting:**
   - Add and run tests as needed (recommend Playwright or Vitest).
   - Use ESLint and Prettier for code quality.
5. **Build & Deploy:**
   - Build with `pnpm build`.
   - Deploy as per SvelteKit and project requirements.

---

## 📄 References

First load the agents. Then refer to these docs for any questions about the stack or MCP integration:

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte 5 Docs](https://svelte.dev/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/installation)
- [pnpm Docs](https://pnpm.io/)
- [Model Context Protocol (MCP)](https://opencode.ai/docs/mcp)

---

## 📝 Notes

- Keep this file updated as agent roles or project requirements evolve.
- For MCP endpoint changes, update both `opencode.json` and this file.
