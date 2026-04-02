import { RiArrowUpLine, RiArrowDownLine } from "@remixicon/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MetricCardData } from "@/data/mock-feedback"

export type { MetricCardData }

interface MetricCardProps {
  data: MetricCardData
}

export function MetricCard({ data }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-card-foreground leading-5">
              {data.company}
            </span>
            <span className="text-xs font-medium text-muted-foreground leading-[14px]">
              {data.category}
            </span>
          </div>
          <Badge variant="outline" className="rounded-full shrink-0">
            {data.category}
          </Badge>
        </div>

        {/* Score area */}
        <div className="flex flex-col gap-1">
          <span className="text-decorative font-bold leading-10 text-card-foreground">
            {data.score}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <span
                className={
                  data.deltaPositive
                    ? "text-xs font-medium text-success-foreground leading-[14px]"
                    : "text-xs font-medium text-destructive-foreground leading-[14px]"
                }
              >
                {data.delta}
              </span>
              {data.deltaPositive ? (
                <RiArrowUpLine className="size-4 text-success-foreground" />
              ) : (
                <RiArrowDownLine className="size-4 text-destructive-foreground" />
              )}
            </div>
            <span className="text-xs font-medium text-muted-foreground leading-[14px]">
              {data.metricLabel}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-medium text-card-foreground leading-5">
          {data.description}
        </p>

        {/* Separator */}
        <div className="border-t border-border" />

        {/* Footer */}
        <div className="flex items-center gap-2">
          {data.footer.map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-muted-foreground text-xs select-none">·</span>
              )}
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-card-foreground leading-[14px]">
                  {item.value}
                </span>
                <span className="text-xs font-medium text-muted-foreground leading-[14px]">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
