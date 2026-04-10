import { useRef, useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import nvidiaLogo from "@/assets/nvidia-logo-horz.png"

const navItems = [
  { label: "Overview", icon: "ri-dashboard-line", href: "/" },
  { label: "Feedback", icon: "ri-chat-3-line", href: null },
  { label: "Doc Triage", icon: "ri-file-list-line", href: "/doc-feedback" },
  { label: "Analytics", icon: "ri-bar-chart-line", href: null },
  { label: "Settings", icon: "ri-settings-line", href: null },
  { label: "Playground", icon: "ri-swatch-line", href: "/playground" },
]

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <SidebarProvider>
      <Sidebar>
        {/* Logo */}
        <SidebarHeader className="border-b border-sidebar-border px-4 py-1 !block">
          <img src={nvidiaLogo} alt="NVIDIA" style={{ height: '48px', width: 'auto' }} />
        </SidebarHeader>

        {/* Navigation */}
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = item.href
                ? item.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.href)
                : false
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => item.href && navigate(item.href)}
                  >
                    <i
                      className={`${item.icon} text-sidebar-foreground`}
                      style={{ fontSize: "16px" }}
                    />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>

        {/* User */}
        <SidebarFooter className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-sidebar-foreground">
              Paige Reidarson
            </span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Top bar */}
        <header className="flex items-center border-b border-border px-4 py-1 md:px-6 shrink-0" style={{ height: '57px' }}>
          <h1 className="text-sm font-semibold text-foreground">
            Documentation Insights
          </h1>
        </header>

        {/* Page content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-7xl px-4 py-6 md:px-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
