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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import nvidiaLogo from "@/assets/nvidia-logo-horz.png"

const navItems = [
  { label: "Overview", icon: "ri-dashboard-line", href: "/" },
  { label: "Feedback", icon: "ri-chat-3-line", href: null },
  { label: "Doc Triage", icon: "ri-file-list-line", href: "/doc-feedback" },
  { label: "Analytics", icon: "ri-bar-chart-line", href: null },
  { label: "Settings", icon: "ri-settings-line", href: null },
]

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <SidebarProvider>
      <Sidebar>
        {/* Logo */}
        <SidebarHeader className="border-b border-sidebar-border px-4 py-1">
          <img src={nvidiaLogo} alt="NVIDIA" className="h-16 w-auto" />
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
              const isDisabled = !item.href

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => item.href && navigate(item.href)}
                    className={isDisabled ? "opacity-40 cursor-not-allowed" : ""}
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
            <div className="flex flex-col">
              <span className="text-xs font-medium text-sidebar-foreground">
                Paige Reidarson
              </span>
              <span className="text-xs text-muted-foreground">
                Product Design
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Top bar */}
        <header className="flex items-center gap-3 border-b border-border px-4 py-3 md:px-6 shrink-0">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-sm font-semibold text-foreground">
              Documentation Insights
            </h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <i
                className="ri-time-line"
                style={{ fontSize: "12px" }}
              />
              <span>Last sync: 2 min ago</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
