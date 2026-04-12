import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-neutral-200 text-neutral-950",
        outline:
          "bg-white border-neutral-200 text-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Status text badges — uses Figma semantic tokens
        critical:
          "bg-destructive text-destructive-foreground",
        success:
          "bg-success text-success-foreground",
        warning:
          "bg-warn text-warn-foreground",
        // Solid fill variants — high-emphasis, full-strength color
        "success-solid":
          "bg-success-solid text-success-solid-foreground",
        "warning-solid":
          "bg-warn-solid text-warn-solid-foreground",
        "critical-solid":
          "bg-destructive-solid text-destructive-solid-foreground",
        // Dot badges — pure color circles, no text
        dot: "h-3 w-3 rounded-full border-0 px-0 py-0 bg-muted-foreground",
        "dot-success":  "h-3 w-3 rounded-full border-0 px-0 py-0 bg-success-solid",
        "dot-warning":  "h-3 w-3 rounded-full border-0 px-0 py-0 bg-warn-solid",
        "dot-critical": "h-3 w-3 rounded-full border-0 px-0 py-0 bg-destructive-solid",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
