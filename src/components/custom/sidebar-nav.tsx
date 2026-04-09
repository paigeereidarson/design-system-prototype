import { useNavigate, useLocation } from "react-router-dom"
import {
  RiDashboardLine,
  RiMessage2Line,
  RiFileTextLine,
  RiBarChartLine,
  RiSettings3Line,
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import nvidiaLogoHorz from "@/assets/nvidia-logo-horz.png"

const navItems = [
  { label: "Overview",       icon: RiDashboardLine, href: "/"             },
  { label: "Feedback",       icon: RiMessage2Line,  href: null            },
  { label: "Doc Triage",     icon: RiFileTextLine,  href: "/doc-feedback" },
  { label: "Analytics",      icon: RiBarChartLine,  href: null            },
  { label: "Settings",       icon: RiSettings3Line, href: null            },
]

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <div className="flex items-center border-b border-sidebar-border px-4 py-1">
        <img src={nvidiaLogoHorz} alt="NVIDIA" className="h-16 w-auto" />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map((item) => {
          const isActive = item.href
            ? item.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.href)
            : false
          return (
            <Button
              key={item.label}
              variant="ghost"
              disabled={!item.href}
              onClick={() => item.href && navigate(item.href)}
              className={cn(
                "justify-start gap-2 text-sidebar-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                !item.href && "opacity-40 cursor-not-allowed"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Button>
          )
        })}
      </div>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium">Paige Reidarson</span>
            <span className="text-xs text-muted-foreground">Product Design</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
