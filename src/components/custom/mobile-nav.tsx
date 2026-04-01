import { RiMenuLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { SidebarNav } from "@/components/custom/sidebar-nav"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" />}
      >
        <RiMenuLine className="size-5" />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={true} className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  )
}
