# Styles Directory Rules

## Purpose

This directory holds design token override files when the Figma design system defines tokens that differ from shadcn/ui defaults.

## Current State

Design tokens are currently defined in `src/index.css` by shadcn/ui's initialization. The CSS variables in `:root` and `.dark` blocks are the active theme.

When Figma tokens are connected, additional token files may be created here:
```
styles/
  primitives.css    # Raw values (colors, font sizes, spacing scale)
  semantic.css      # Meaningful aliases (--button-bg, --text-primary)
```

## Rules

1. **Figma is the source of truth** — If Figma defines a token value, it overrides the shadcn/ui default
2. **No orphan tokens** — Every CSS variable defined must be used somewhere or mapped to a Figma variable
3. **Naming convention** — CSS variables follow the pattern `--category-name` (e.g., `--primary`, `--muted-foreground`). If extending beyond shadcn defaults, use `--ds-category-name` prefix to distinguish custom tokens
4. **Document the mapping** — When adding tokens, comment which Figma variable they correspond to:
   ```css
   /* Figma: color/primary/500 */
   --primary: oklch(0.205 0 0);
   ```
5. **Dark mode** — Every color token must have a `.dark` variant
