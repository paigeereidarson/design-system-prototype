# Design tokens

Reference this file before writing any className or style prop. Every color,
type size, and radius in this project must trace back to a token listed here.

---

## Two rules that override everything else

1. **Only use semantic tokens in components and pages.** Primitives (raw color
   scales like `--nvidia-green-500`, `--neutral-200`) exist only to define
   semantics in `src/index.css`. Never reference them in `src/pages/` or
   `src/components/`.

2. **Never hardcode values.** No hex codes, no `bg-gray-*`, no `text-slate-*`,
   no `dark:` variants, no arbitrary values like `bg-[#f5f5f5]`. If a token
   doesn't exist for what you need, ask before inventing one.

---

## Backgrounds

| Tailwind class       | When to use |
|----------------------|-------------|
| `bg-background`      | Page and app background only. Never for cards. |
| `bg-card`            | Card surfaces, panels, any elevated container |
| `bg-popover`         | Dropdowns, floating menus, command palettes |
| `bg-primary`         | NVIDIA green. CTAs, active states, selected items |
| `bg-secondary`       | Subtle action areas, secondary buttons, pill backgrounds |
| `bg-muted`           | Disabled states, de-emphasized surfaces, input fill |
| `bg-accent`          | Same green as primary. Use for hover highlights on non-button elements |
| `bg-destructive`     | Error backgrounds — soft red, not harsh |
| `bg-success`         | Success backgrounds — soft NVIDIA green |
| `bg-warn`            | Warning backgrounds — soft yellow |
| `bg-sidebar`         | Sidebar surface only |
| `bg-sidebar-accent`  | Sidebar item hover and active background |
| `bg-sidebar-primary` | Active sidebar nav item — near black |

---

## Text

| Tailwind class                    | When to use |
|-----------------------------------|-------------|
| `text-foreground`                 | Default body text everywhere |
| `text-muted-foreground`           | Labels, captions, placeholders, secondary info |
| `text-card-foreground`            | Text directly on card surfaces |
| `text-popover-foreground`         | Text inside popovers and dropdowns |
| `text-primary-foreground`         | Text on NVIDIA green backgrounds |
| `text-secondary-foreground`       | Text on secondary backgrounds |
| `text-destructive-foreground`     | Error text — always pair with `bg-destructive` |
| `text-success-foreground`         | Success text — always pair with `bg-success` |
| `text-warn-foreground`            | Warning text — always pair with `bg-warn` |
| `text-sidebar-foreground`         | Default text in sidebar |
| `text-sidebar-primary-foreground` | Text on active sidebar nav item |
| `text-sidebar-accent-foreground`  | Text on sidebar hover state |

---

## Borders and inputs

| Tailwind class        | When to use |
|-----------------------|-------------|
| `border-border`       | All dividers, card edges, container outlines |
| `border-input`        | Input field borders specifically |
| `border-sidebar-border` | Sidebar section dividers |
| `ring-ring`           | Focus rings — NVIDIA green, applied automatically by SHADCN |

---

## State pairs — always use together

These tokens are designed as background/foreground pairs. Using a background
without its matching foreground will break contrast and accessibility.

```tsx
// Error
<Badge className="bg-destructive text-destructive-foreground">Failed</Badge>

// Success  
<Badge className="bg-success text-success-foreground">Active</Badge>

// Warning
<Badge className="bg-warn text-warn-foreground">Degraded</Badge>
```

---

## Typography scale

Font is Inter Variable. Body weight is 500 (medium) globally — set on `body`
in `index.css`, do not override it.

**Never use Tailwind's default scale** (`text-base`, `text-lg`, `text-xl`,
`text-2xl`, `text-3xl`). These classes exist in Tailwind but are not part of
the NVIDIA system. Use only the scale below.

| Tailwind class     | Size  | Line height | Use for |
|--------------------|-------|-------------|---------|
| `text-decorative`  | 36px  | 40px        | Hero numbers, large display metrics only |
| `text-title`       | 24px  | 30px        | Page titles, modal titles |
| `text-heading`     | 20px  | 25px        | Section headers |
| `text-heading-sm`  | 18px  | 24px        | Card titles, subsection headers |
| `text-sm`          | 14px  | 20px        | Body text — default for most content |
| `text-xs`          | 12px  | 14px        | Labels, captions, badges, eyebrows |

```tsx
// Correct usage
<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
  Eyebrow label
</p>
<h1 className="text-title font-semibold text-foreground">Page title</h1>
<h2 className="text-heading font-semibold text-foreground">Section header</h2>
<h3 className="text-heading-sm font-medium text-foreground">Card title</h3>
<p className="text-sm text-foreground">Body copy</p>
<p className="text-xs text-muted-foreground">Caption or label</p>
```

---

## Radius scale

Base radius is 4px. Always use the scale — never hardcode `rounded-[6px]` or
`border-radius` in style props.

| Tailwind class  | Use for |
|-----------------|---------|
| `rounded-sm`    | Badges, chips, tight inline elements |
| `rounded-md`    | Inputs, buttons |
| `rounded-lg`    | Standard cards and panels — use this as the default |
| `rounded-xl`    | Large cards, modals, dialogs |
| `rounded-2xl`   | Overlapping or featured containers |

---

## Chart tokens

Use in series order for sequential data visualization. Do not skip steps or
reorder them — the scale is designed to read as a progression.

| Token      | Resolved color | Use |
|------------|----------------|-----|
| `chart-1`  | blue-600       | First / primary series (darkest) |
| `chart-2`  | blue-500       | Second series |
| `chart-3`  | blue-400       | Third series |
| `chart-4`  | blue-300       | Fourth series |
| `chart-5`  | blue-100       | Fifth / background series (lightest) |

```tsx
// In recharts or d3 configs
style={{ fill: 'hsl(var(--chart-1))', stroke: 'hsl(var(--chart-1))' }}
```

---

## Standard page shell

Every new page uses this structure. Do not deviate from it.

```tsx
export default function PageName() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-8 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          Section context
        </p>
        <h1 className="text-title font-semibold text-foreground">Page title</h1>
      </header>
      <main className="mx-auto max-w-5xl px-8 py-10">
        {/* content */}
      </main>
    </div>
  )
}
```

---

## What to never write

```tsx
// Hardcoded colors
style={{ color: '#76B900' }}
className="text-[#76B900]"

// Primitive tokens in components (only allowed in index.css)
className="bg-nvidia-green-500"
className="text-neutral-500"

// Tailwind default color scale
className="bg-gray-100"
className="bg-white"
className="text-slate-500"

// Tailwind default type scale
className="text-base"
className="text-lg"
className="text-2xl"

// Dark mode manual overrides — not used, theme handles it
className="dark:bg-gray-800"

// Arbitrary values
className="bg-[#f5f5f5]"
className="rounded-[6px]"
className="text-[13px]"
```

---

## When a token doesn't exist for what you need

Work through these steps in order before inventing anything.

**Step 1 — Check the SHADCN base token list**

These are SHADCN's built-in semantic tokens. If what you need maps to one of
these, it is already wired into the theme even if it isn't listed above:

```
background          foreground
card                card-foreground
popover             popover-foreground
primary             primary-foreground
secondary           secondary-foreground
muted               muted-foreground
accent              accent-foreground
destructive         (no destructive-foreground in base — project adds it)
border              input               ring
sidebar             sidebar-foreground
sidebar-primary     sidebar-primary-foreground
sidebar-accent      sidebar-accent-foreground
sidebar-border      sidebar-ring
chart-1 → chart-5
```

Use `bg-<token>` and `text-<token>` Tailwind classes as normal. If the token
is in this list, it exists in the theme — you do not need to define it.

**Step 2 — Check `src/index.css`**

Run a quick search for the concept you need. The project has already extended
SHADCN with `success`, `success-foreground`, `warn`, and `warn-foreground`.
One of the existing tokens may already cover what you need with a different name.

**Step 3 — Stop and flag it**

If steps 1 and 2 don't cover it, do not hardcode a value or reach for a
primitive. Tell Paige what you are trying to express visually — a new semantic
token may need to be designed and added to `src/index.css`, then this file
updated to match.
