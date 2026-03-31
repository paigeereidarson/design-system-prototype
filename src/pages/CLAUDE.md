# Pages Directory Rules

## Purpose

This directory contains full page prototypes composed of components from `ui/` and `custom/`.

## File Naming

```
pages/
  landing-page.tsx
  dashboard.tsx
  settings-page.tsx
```

One file per page. Use kebab-case. Export a PascalCase component.

## Page Structure

Every page should follow this layout hierarchy:

```tsx
export function PageName() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header>...</header>

      {/* Main Content */}
      <main>
        <section>...</section>
        <section>...</section>
      </main>

      {/* Footer */}
      <footer>...</footer>
    </div>
  )
}
```

## Rules

1. **Compose from components** — Pages combine components from `ui/` and `custom/`. Pages should NOT contain complex component logic — extract it into `custom/` if it's reusable.
2. **Responsive breakpoints** — Every page must work at:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1280px
3. **Semantic structure** — Use `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` appropriately.
4. **No hardcoded values** — Same rules as components: use theme classes and CSS variables only.
5. **Page-specific layout** — Page-level layout (grid, max-width, padding) is defined in the page file. Component-level layout is defined inside the component.

## When Building from Wireframes or Figma

1. Ask user whether to pull Figma context via MCP
2. Break down the wireframe into sections
3. Identify which existing components can be reused
4. Identify which new custom components need to be created
5. Build the custom components first (in `custom/`)
6. Assemble the page
7. Verify responsiveness at all three breakpoints
8. Run design-verification agent
9. Run compliance-checker agent
10. Present assumptions and results to the user
