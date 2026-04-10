# Page anatomy

Rules for how every page is structured. Claude must follow these
when generating or modifying any screen.

---

## Shared shell

Every page renders inside an `<AppShell>` layout component
(located at `src/components/custom/app-shell.tsx`).

The shell provides three regions:

  1. **Sidebar** — fixed left, full height, 224px (w-56).
     Contents TBD — will be defined as the product evolves.
  2. **Top bar** — sticky, spans the content area (not the sidebar).
     Contents TBD.
  3. **Content area** — scrollable `<main>`, fills remaining space.
     Pages render here via `children`.

Pages must NOT define their own sidebar, top bar, or outer chrome.
They receive the content area and nothing else.

When the shell doesn't exist yet, stub it with the three empty
regions so pages can start rendering inside it immediately.

---

## Content area rules

- Max content width: 1280px (max-w-7xl), centered with auto margins
- Horizontal padding: 24px (px-6) on desktop, 16px (px-4) on mobile
- Vertical padding: 24px (py-6) at the top of the content area
- Use `<section>` elements to group logical blocks within a page

---

## Responsive breakpoints

Three breakpoints, mobile-first:

  - **Mobile** (<768px): sidebar collapses to hamburger/sheet,
    single-column content, reduced padding
  - **Tablet** (768px–1279px): sidebar visible but narrow or
    overlay, content reflows to fewer columns
  - **Desktop** (≥1280px): full sidebar + content side by side

Pages must work at all three. Use Tailwind responsive prefixes
(sm:, md:, lg:) — never hardcode pixel widths for content.

---

## Semantic structure

Every page must use this HTML hierarchy:

  <main>           ← provided by AppShell
    <section>      ← one per logical content block
      <h2>         ← section heading (h1 is the page title in top bar)
      ...content
    </section>
  </main>

No <div> soup. Use <nav>, <section>, <header>, <footer>
where semantically appropriate.
