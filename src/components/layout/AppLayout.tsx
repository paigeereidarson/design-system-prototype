import { useRef, useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import logoLight from "@/assets/docs-health-lm.png"
import logoDark from "@/assets/docs-health-dm.png"

const navItems = [
  { label: "Overview", icon: "ri-dashboard-line", href: "/" },
  { label: "Playground", icon: "ri-gamepad-line", href: "/playground" },
]

function formatTimestamp() {
  const now = new Date()
  const date = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
  return `${date}, ${time}`
}

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()
  const [lastRefreshed, setLastRefreshed] = useState(formatTimestamp)

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo(0, 0)
      window.scrollTo(0, 0)
    })
  }, [location.pathname])

  return (
    <SidebarProvider>
      <Sidebar>
        {/* Logomark */}
        <SidebarHeader className="px-3 py-3 !block">
          <img
            src={theme === "nvidia-light" ? logoLight : logoDark}
            alt="NVIDIA"
            style={{ height: "28px", width: "auto" }}
          />
        </SidebarHeader>

        {/* Navigation */}
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href)
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => navigate(item.href)}
                    className={isActive ? "text-sm" : "text-sm text-muted-foreground"}
                  >
                    <i
                      className={item.icon}
                      style={{ fontSize: "14px" }}
                    />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="h-screen overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-end gap-3 px-4 shrink-0 bg-muted" style={{ paddingTop: 14, paddingBottom: 14 }}>
          <Button
            variant="secondary"
            size="icon-xs"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i
              className={theme === "nvidia-light" ? "ri-moon-line" : "ri-sun-line"}
              style={{ fontSize: "12px" }}
            />
          </Button>

          <button
            onClick={() => setLastRefreshed(formatTimestamp())}
            className="flex items-center gap-1 text-xs text-foreground hover:text-muted-foreground transition-colors"
          >
            <i className="ri-refresh-line" style={{ fontSize: "12px" }} />
            <span>{lastRefreshed}</span>
          </button>

          <Badge variant="outline">v0.0.0</Badge>

          <Avatar size="sm">
            <AvatarFallback className="text-[10px]">PR</AvatarFallback>
          </Avatar>
        </header>

        {/* Level 0 — gray canvas (fixed) */}
        <div className="flex-1 flex flex-col bg-muted pt-2 pr-2 pb-2 pl-3 overflow-hidden">
          {/* Level 1 — white content card (fixed frame, content scrolls inside) */}
          <div className="flex-1 flex flex-col bg-background border border-border rounded-xl overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
