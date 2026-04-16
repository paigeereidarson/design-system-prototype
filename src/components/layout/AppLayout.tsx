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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { products } from "@/data/mock-products"
import logoLight from "@/assets/docs-health-lm.png"
import logoDark from "@/assets/docs-health-dm.png"

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
        <SidebarHeader className="px-3 py-3 !block">
          <img
            src={theme === "nvidia-light" ? logoLight : logoDark}
            alt="NVIDIA"
            style={{ height: "28px", width: "auto" }}
          />
        </SidebarHeader>

        <SidebarContent className="p-2 flex flex-col justify-between">
          <SidebarMenu>
            {/* My Products — clickable landing page with product sub-items */}
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={location.pathname === "/my-products"}
                onClick={() => navigate("/my-products")}
                className={location.pathname === "/my-products" ? "text-sm" : "text-sm text-muted-foreground"}
              >
                <i className="ri-stack-line" style={{ fontSize: "14px" }} />
                <span>My Products</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {products.map(product => {
                  const isActive = location.pathname.startsWith(`/products/${product.id}`)
                  return (
                    <SidebarMenuSubItem key={product.id}>
                      <SidebarMenuSubButton
                        isActive={isActive}
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="cursor-pointer"
                      >
                        <span>{product.name}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            </SidebarMenuItem>

            {/* All Products (was Overview) */}
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={location.pathname === "/"}
                onClick={() => navigate("/")}
                className={location.pathname === "/" ? "text-sm" : "text-sm text-muted-foreground"}
              >
                <i className="ri-dashboard-line" style={{ fontSize: "14px" }} />
                <span>All Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Bottom nav */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={location.pathname === "/playground"}
                onClick={() => navigate("/playground")}
                className={location.pathname === "/playground" ? "text-sm" : "text-sm text-muted-foreground"}
              >
                <i className="ri-gamepad-line" style={{ fontSize: "14px" }} />
                <span>Playground</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="h-screen overflow-hidden">
        <header className="flex items-center justify-end gap-3 px-4 shrink-0 bg-muted" style={{ paddingTop: 15, paddingBottom: 13 }}>
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

        <div className="flex-1 flex flex-col bg-muted pr-2 pb-2 pl-3 overflow-hidden">
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
