# CLAUDE.md — design-system-prototype

This file is the single source of truth for how Claude Code behaves in this repo.
Read it fully at the start of every session before doing anything else.

---

## Project Overview

**Repo:** `~/Projects/nvidia/prototypes/design-system-prototype`
**Live URL:** `https://design-system-prototype-jade.vercel.app`
**Stack:** React + TypeScript + SHADCN/UI + Tailwind + Vite
**Deploy:** Vercel via GitHub — auto-deploys on push to main

**Purpose:** Rapid UI prototyping for NVIDIA user research. Screens are built to
be testable with users and potentially shippable to production once validated.

**Pipeline:**
```
Research insight → UX flow options → pick one → code generation → push → Vercel
```

---

## UX Context

This block is read by the UX Flow Architect process before generating any flow.
Update this block whenever the project scope or user definition changes.

```
WHO:   
WHAT:  
WHERE: 
WHEN:  
WHY:   
EDGE:  
```

---

## UX Flow Architect

When asked to generate a user flow, design a flow, map out screens, or prototype
a journey — ALWAYS follow this process before writing any code.

### Step 1: Read UX Context

Read the UX Context block above. Do not ask intake questions that are already
answered there. If anything critical is missing for the specific flow requested,
ask one focused question — not a list.

### Step 2: Generate 2–3 Flow Options

Each option must be structurally and conceptually different — not aesthetic
variations of the same flow.

For each option output:

**Written reasoning block:**
- **Mental model** — What conceptual frame does this put the user in?
- **Entry** — Where does the flow begin and what context does the user arrive with?
- **Key decision points** — Where does the user make choices? How many?
- **Progressive disclosure** — What's hidden until needed? What's always visible?
- **Error/alt paths** — What happens when things go wrong or the user deviates?
- **Exit** — What does the user know/have/feel at the end?
- **Best for** — Type of user or scenario where this approach wins
- **Tradeoff** — What this option sacrifices
- **Screen count** — Approximate number of screens

**Mermaid flowchart** (immediately after the reasoning block):
- `flowchart TD` for linear flows, `flowchart LR` for branching-heavy flows
- Screens as `[ ]` rectangles, decision points as `{ }` diamonds
- Happy path as solid arrows `-->`, error/alt paths as dashed `-.->` 
- Label every arrow with the action that triggers the transition
- Include terminal nodes for success and exit/cancel states

**Reasoning standards — think through each of these:**
- Cognitive load — how many decisions per screen? Is each necessary?
- Progressive disclosure — does complexity reveal only when the user is ready?
- Error prevention over error recovery
- Recognition over recall
- Momentum — where might users stall or bail?
- Trust signals — especially for first-use or permission flows
- State clarity — is it always obvious what's happening?

**Be opinionated.** If one option is clearly stronger for the stated context, say
so. Don't hedge. "Option 2 is strongest here because X" is better than "all
options have merit."

### Step 3: Wait for confirmation

Do not write any files until Paige confirms which option to build. A "looks good"
or "go with option 2" is enough — don't over-ask.

### Step 4: Build in flow order

Once confirmed, build screens in the order they appear in the Mermaid chart so
navigation wiring makes sense as you go. Use the alt paths and error states from
the reasoning block to inform empty states, error states, and loading states —
never leave these as TODOs.

---

## Before Writing Any Code

Do both of these first — every time, no exceptions:

**1. Check installed components**
```bash
ls src/components/ui
```
Only use components that exist in that list. If you need one that isn't there,
tell Paige and offer to install it:
```bash
npx shadcn@latest add <component-name>
```

**2. Check the token source**
CSS variables live in `src/index.css`. Scan it to confirm available token names
before writing any color, radius, or shadow values.

---

## Token Rules

Every color, radius, and shadow must use a CSS variable from `src/index.css`.
No hardcoded values. Ever.

```tsx
// CORRECT
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
style={{ borderColor: 'hsl(var(--border))' }}

// WRONG
className="bg-white text-gray-900"
className="bg-blue-500"
style={{ color: '#6366f1' }}
```

Use semantic Tailwind class names (`bg-background`, `text-muted-foreground`,
`border-border`) rather than raw CSS variable syntax wherever possible.

Never use `dark:` Tailwind variants — dark mode is handled automatically through
token pairs.

---

## Component Rules

Always use an installed SHADCN component before building anything custom.

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
```

---

## File Conventions

New screens go in `src/pages/` as `PascalCase.tsx`:
```
src/pages/
  OnboardingFlow.tsx
  Dashboard.tsx
  SettingsScreen.tsx
```

Shared pieces used across multiple screens go in `src/components/custom/`.
Never edit files in `src/components/ui/` — those are owned by SHADCN.

Add new routes to `src/App.tsx`:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
<Route path="/onboarding" element={<OnboardingFlow />} />
```

---

## Code Standards

Write code that could go to production. These prototypes may be validated and
built into real features — treat every screen as potentially shippable.

- Proper TypeScript types — no `any`
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Accessible by default — proper labels, keyboard navigation, contrast
- Clean component structure — one responsibility per component
- No unused imports or variables

---

## Finishing a Screen

After generating any screen:

1. Run `npm run build` to catch TypeScript or import errors
2. Tell Paige the route path (e.g. "accessible at `/onboarding`")
3. Remind her to push: `git add . && git commit -m "feat: add onboarding screen" && git push`
4. Vercel auto-deploys — live URL updates in ~30 seconds

---

## Turning Research Insights into UI

When Paige shares interview notes, Miro content, or research findings:

1. Identify the core user action or decision the screen needs to support
2. Pick the simplest layout that exposes that action
3. Use real-ish placeholder content (not "Lorem ipsum") — it makes feedback more useful
4. Generate the screen, not a wireframe — users give better feedback on something that looks designed
