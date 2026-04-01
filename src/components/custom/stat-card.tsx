import type { RemixiconComponentType } from "@remixicon/react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: RemixiconComponentType
}

export function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card size="sm">
      <CardContent className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{title}</span>
          <span className="text-2xl font-semibold tracking-tight">{value}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}
