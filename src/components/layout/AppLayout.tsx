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
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo(0, 0)
      window.scrollTo(0, 0)
    })
  }, [location.pathname])

  return (
    <SidebarProvider>
      <Sidebar>
        {/* Logo */}
        <SidebarHeader className="px-4 py-1 !block">
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
        <SidebarFooter className="p-3">
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

      <SidebarInset className="h-screen overflow-hidden">
        {/* Level 0 — gray canvas (fixed) */}
        <div className="flex-1 flex flex-col bg-muted p-2 overflow-hidden">
          {/* Level 1 — white content card (fixed frame, content scrolls inside) */}
          <div className="flex-1 flex flex-col bg-background border border-border rounded-xl overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
