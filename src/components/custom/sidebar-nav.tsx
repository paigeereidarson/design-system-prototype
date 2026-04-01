import {
  SquaresFour,
  ChatText,
  ChartBar,
  GearSix,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import nvidiaMark from "@/assets/nvidia-mar.png"

const navItems = [
  { label: "Overview", icon: SquaresFour, active: false },
  { label: "Feedback", icon: ChatText, active: true },
  { label: "Analytics", icon: ChartBar, active: false },
  { label: "Settings", icon: GearSix, active: false },
]

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
        <img src={nvidiaMark} alt="NVIDIA" className="h-7 w-auto" />
        <span className="text-xs font-semibold tracking-widest text-sidebar-foreground">PROTOTYPE</span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              "justify-start gap-2 text-sidebar-foreground",
              item.active &&
                "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Button>
        ))}
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
