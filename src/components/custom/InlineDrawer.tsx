import { useEffect, useRef } from "react"

interface InlineDrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function InlineDrawer({ open, onClose, children }: InlineDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && drawerRef.current) {
      drawerRef.current.scrollTop = 0
    }
  }, [open, children])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  // Close on click outside the drawer
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Use timeout so the opening click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handler)
    }, 0)
    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handler)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={drawerRef}
      className="fixed top-[49px] right-[9px] bottom-[9px] w-[480px] bg-card border border-border rounded-lg shadow-lg overflow-y-auto z-20"
    >
      <div className="flex items-center justify-end px-4 pt-3 sticky top-0 bg-card z-10">
        <button
          onClick={onClose}
          className="flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Close panel"
        >
          <i className="ri-close-line" style={{ fontSize: "18px" }} />
        </button>
      </div>
      <div className="px-4 pt-2 pb-6">
        {children}
      </div>
    </div>
  )
}
