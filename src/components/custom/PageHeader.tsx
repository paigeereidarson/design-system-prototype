import { Separator } from "@/components/ui/separator"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                {eyebrow}
              </p>
            )}
            <h1 className="text-title font-semibold text-foreground">{title}</h1>
          </div>
          {children && (
            <div className="shrink-0">{children}</div>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
    </section>
  )
}
