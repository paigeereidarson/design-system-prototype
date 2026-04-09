import { AlertTriangle, Link2, Search, Clock, FileQuestion, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type InsightSeverity = "critical" | "warning" | "info"
export type DataSource = "feedback" | "analytics" | "crawler" | "survey" | "validation"

export interface InsightData {
  id: string
  title: string
  severity: InsightSeverity
  dataSource: DataSource
  affectedPages: number
  isUrgent?: boolean
  confidence?: number
}

const severityConfig = {
  critical: {
    dotClass: "bg-destructive-foreground",
    label: "Critical",
  },
  warning: {
    dotClass: "bg-warn-foreground",
    label: "Warning",
  },
  info: {
    dotClass: "bg-muted-foreground",
    label: "Info",
  },
}

const dataSourceConfig: Record<DataSource, { icon: typeof AlertTriangle; label: string }> = {
  feedback: { icon: AlertTriangle, label: "Feedback" },
  analytics: { icon: Clock, label: "Analytics" },
  crawler: { icon: Link2, label: "Crawler" },
  survey: { icon: FileQuestion, label: "Survey" },
  validation: { icon: Search, label: "Validation" },
}

interface InsightRowProps {
  insight: InsightData
  onClick?: () => void
}

export function InsightRow({ insight, onClick }: InsightRowProps) {
  const severity = severityConfig[insight.severity]
  const source = dataSourceConfig[insight.dataSource]
  const SourceIcon = source.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-center gap-3 px-4 py-3 border-b border-border transition-colors",
        "hover:bg-accent/10 focus:outline-none focus:bg-accent/10",
        insight.isUrgent && "bg-destructive/50 border-l-2 border-l-destructive-foreground"
      )}
    >
      <Badge variant="dot" className={severity.dotClass} />

      {insight.isUrgent && (
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-destructive-foreground text-background">
          Urgent
        </span>
      )}

      <span
        className={cn(
          "flex-1 text-sm truncate",
          insight.isUrgent ? "font-medium text-foreground" : "text-foreground/90"
        )}
      >
        {insight.title}
      </span>

      <Badge
        variant={
          insight.severity === "critical"
            ? "critical"
            : insight.severity === "warning"
            ? "warning"
            : "secondary"
        }
        className="uppercase tracking-wide text-[10px]"
      >
        {severity.label}
      </Badge>

      <span className="shrink-0 flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded">
        <SourceIcon className="h-3 w-3" />
        <span>{source.label}</span>
      </span>

      <span className="shrink-0 text-xs text-muted-foreground font-mono tabular-nums w-20 text-right">
        {insight.affectedPages} page{insight.affectedPages !== 1 ? "s" : ""}
      </span>

      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </button>
  )
}
