# Design System Prototype

## Project Overview

This is a reusable AI-driven design-to-code pipeline. It uses shadcn/ui as the component library, Tailwind CSS v4 for styling, and Figma as the design source of truth. The goal is to turn wireframes and Figma designs into production-ready React prototypes using AI agents.

This project doubles as a learning sandbox and a repeatable template that can be adapted to different companies, design systems, and frameworks.

## Tech Stack

- React 19 + TypeScript
- Vite 8 (build tool + dev server)
- Tailwind CSS v4
- shadcn/ui (component library)
- Figma Console MCP (design-to-code bridge)
- Playwright MCP (visual verification)

## File Structure

```
src/
  components/
    ui/           # shadcn/ui primitives (button, card, input, etc.)
    custom/       # Composite components built from ui/ primitives
  pages/          # Full page prototypes
  lib/
    utils.ts      # Utility functions (cn helper)
  styles/         # Design token overrides (future)
  index.css       # Tailwind + shadcn/ui theme variables
```

## Naming Conventions

- **Files**: kebab-case (e.g., `user-profile.tsx`, `nav-header.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`, `NavHeader`)
- **CSS variables**: Follow shadcn/ui convention `--variable-name`
- **Directories**: lowercase kebab-case

## Installed shadcn/ui Components

button, card, input, label, select, dialog, sheet, tabs, badge, avatar

When more shadcn/ui components are needed, install them with:
```bash
npx shadcn@latest add <component-name>
```

Never manually create files in `src/components/ui/`. That directory is managed by shadcn/ui.

## Design Tokens

The design token source of truth is the Figma file. CSS variables are defined in `src/index.css` by shadcn/ui and should be overridden there when the Figma file specifies different values.

<!-- TODO: Add Figma file link once connected -->
<!-- TODO: Document color palette, typography scale, spacing -->

## Rules for Claude

### Before Starting Any Task

1. Read the relevant CLAUDE.md file for the directory you are working in
2. If the task involves building a page or component from a Figma design, **ask the user** whether to check the Figma file via MCP before starting
3. If unsure about any design decision (spacing, color, component variant, layout), **stop and ask the user** rather than guessing

### When Building Components

1. Always use existing shadcn/ui primitives from `src/components/ui/` as building blocks
2. Custom composite components go in `src/components/custom/`
3. Never hardcode color values — always use CSS variables or Tailwind classes that reference the theme
4. Every component must be typed with TypeScript (no `any` types)
5. Follow the component rules in `src/components/CLAUDE.md`

### When Building Pages

1. Pages go in `src/pages/`
2. Pages are composed of components from `ui/` and `custom/`
3. Pages must be responsive — test at mobile (375px), tablet (768px), and desktop (1280px)
4. Follow the structure: page-level layout first, then sections, then components

### Code Quality Standards

- No unused imports or variables
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<footer>`, etc.)
- Accessible by default (proper aria labels, keyboard navigation, contrast)
- Clean, readable code that a developer could ship to production

### Git Workflow

Claude can stage and commit changes locally. Use descriptive commit messages:
- `feat: add hero section to landing page`
- `fix: correct button variant in nav header`
- `refactor: extract card grid into reusable component`

Claude can push to GitHub when explicitly asked by the user.

### Verification Workflow

After building or modifying a component/page:

1. Run `npm run build` to verify no TypeScript or build errors
2. If the change is visual, start the dev server and verify with Playwright MCP or preview tools
3. Run the design-verification agent if the task was based on a Figma design
4. Run the compliance-checker agent as the final step of every task

### Quality Gates

A task is NOT complete until:
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors
- [ ] Design verification passes (when applicable)
- [ ] Compliance checker passes
- [ ] All assumptions are listed and presented to the user

If any gate fails, fix the issues and re-run before marking the task as done.

## Available Agents

1. **design-verification**: Verifies that a component or page matches its Figma design. Checks token usage, visual properties, spacing, and component structure.
2. **compliance-checker**: Final step for every task. Verifies that the CLAUDE.md rules were followed, naming conventions are correct, and quality gates passed.
3. **figma-token-auditor**: Analyzes component token usage and flags hardcoded values, missing tokens, or inconsistencies with the Figma source.

See `.claude/agents/` for agent definitions.

## Development

```bash
npm run dev     # Start dev server (http://localhost:5173)
npm run build   # Production build + type check
npm run lint    # ESLint check
```
