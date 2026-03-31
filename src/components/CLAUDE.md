# Components Directory Rules

## Directory Structure

```
components/
  ui/       # shadcn/ui primitives — DO NOT manually edit
  custom/   # Composite components built from ui/ primitives
```

## Rules for `ui/`

- This directory is managed by shadcn/ui
- To add a new component: `npx shadcn@latest add <name>`
- To update an existing component: `npx shadcn@latest add <name> --overwrite`
- Never create, rename, or delete files here manually
- If a shadcn/ui component needs customization, create a wrapper in `custom/` instead

## Rules for `custom/`

### File Naming

Each custom component gets its own file using kebab-case:
```
custom/
  nav-header.tsx
  hero-section.tsx
  feature-card.tsx
```

### Component Structure

Every custom component must follow this pattern:

```tsx
import { cn } from "@/lib/utils"
// Import shadcn/ui primitives
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ComponentNameProps {
  // All props typed explicitly — no `any`
}

export function ComponentName({ ...props }: ComponentNameProps) {
  return (
    // Semantic HTML + shadcn/ui primitives + Tailwind classes
  )
}
```

### Component Rules

1. **Compose from primitives** — Always use shadcn/ui components from `ui/` as building blocks. Don't recreate buttons, inputs, cards, etc.
2. **No hardcoded colors** — Use Tailwind theme classes (`bg-primary`, `text-muted-foreground`) or CSS variables. Never write `#hex` or `rgb()` values directly.
3. **No hardcoded spacing beyond Tailwind** — Use Tailwind spacing utilities (`p-4`, `gap-6`, `mt-8`). If a specific pixel value is needed from Figma, ask the user first.
4. **Responsive by default** — Every component should work at mobile (375px), tablet (768px), and desktop (1280px). Use Tailwind responsive prefixes (`md:`, `lg:`).
5. **Accessible by default** — Proper semantic HTML, aria labels where needed, keyboard navigable, sufficient contrast.
6. **Props over internal state** — Components should be controlled by props when possible. Keep internal state minimal.

### When Figma Is Referenced

If building from a Figma design:
1. Ask the user whether to pull Figma context via MCP
2. If yes, use Figma Console MCP to read the component's properties, tokens, and layout
3. Map Figma properties to shadcn/ui props and Tailwind classes
4. After implementation, run the design-verification agent to confirm alignment
5. Present any assumptions to the user before marking complete
