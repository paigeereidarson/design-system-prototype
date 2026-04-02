# Design System Prototype

## Purpose
Rapid UI prototyping for user research. Generate screens quickly from
research insights, deploy to Vercel, share with users for feedback.
This is not a production codebase.

## Stack
- React 19 + TypeScript
- Vite (dev + build)
- Tailwind CSS v4
- shadcn/ui components

## Rules for Claude
- Use shadcn/ui components from src/components/ui/ — never build from scratch
- Never hardcode colors — always use CSS variables from src/index.css
- New screens go in src/pages/
- Keep components simple — this is prototype code, not production code
- One component per file, PascalCase filenames
- When done, run: npm run build to verify no errors

## Installed shadcn/ui components
button, card, input, label, select, dialog, sheet, tabs, badge, avatar

## To add a new component
npx shadcn@latest add <component-name>

## Dev
npm run dev      # localhost:5173
npm run build    # verify build before pushing
