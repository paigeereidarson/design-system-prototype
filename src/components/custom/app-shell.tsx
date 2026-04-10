import type { ReactNode } from "react"
import { SidebarNav } from "@/components/custom/sidebar-nav"
import { MobileNav } from "@/components/custom/mobile-nav"

interface AppShellProps {
  /** Content rendered inside the sticky top bar, to the right of the mobile nav trigger. */
  topBar?: ReactNode
  /** The page content — rendered inside the scrollable <main> region. */
  children: ReactNode
  /**
   * When true, children fill the entire content area edge-to-edge
   * (no max-width or padding wrapper). Useful for kanban boards,
   * full-bleed layouts, etc.
   */
  fullBleed?: boolean
}

/**
 * Shared application shell.
 *
 * Provides three regions per page-anatomy.md:
 *   1. Sidebar  — fixed left, full height, w-56 (hidden below md)
 *   2. Top bar  — sticky, spans the content area only
 *   3. Content  — scrollable <main>, fills remaining space
 *
 * Pages render as `children` inside the content area.
 */
export function AppShell({ topBar, children, fullBleed = false }: AppShellProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="hidden w-56 shrink-0 border-r border-sidebar-border md:block">
        <SidebarNav className="h-full" />
      </aside>

      {/* ── Content column ──────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 border-b border-border px-4 py-3 md:px-6 shrink-0">
          <MobileNav />
          {topBar}
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto">
          {fullBleed ? (
            children
          ) : (
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
