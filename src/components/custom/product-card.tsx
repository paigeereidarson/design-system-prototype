import { AlertTriangle, TrendingUp, TrendingDown, Minus, FileText, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type HealthStatus = "healthy" | "warning" | "critical"

export interface ProductData {
  id: string
  name: string
  description: string
  status: HealthStatus
  healthScore: number
  pageCount: number
  lastUpdated: string
  trend: {
    direction: "up" | "down" | "stable"
    value: number
    period: string
  }
  sparklineData: number[]
  alert?: {
    severity: "warning" | "critical"
    title: string
    affectedPages: number
  }
}

const statusConfig = {
  healthy: { label: "Healthy", dotClass: "bg-success-foreground", bgClass: "bg-success" },
  warning: { label: "Needs Attention", dotClass: "bg-warn-foreground", bgClass: "bg-warn" },
  critical: { label: "Critical", dotClass: "bg-destructive-foreground", bgClass: "bg-destructive" },
}

function Sparkline({ data, status }: { data: number[]; status: HealthStatus }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 24
  const width = 64
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const strokeColor =
    status === "healthy"
      ? "var(--color-success-foreground)"
      : status === "warning"
      ? "var(--color-warn-foreground)"
      : "var(--color-destructive-foreground)"

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TrendIndicator({ direction, value, period }: ProductData["trend"]) {
  const Icon = direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus
  const colorClass =
    direction === "up"
      ? "text-success-foreground"
      : direction === "down"
      ? "text-destructive-foreground"
      : "text-muted-foreground"

  return (
    <div className={cn("flex items-center gap-1 text-xs font-mono", colorClass)}>
      <Icon className="h-3 w-3" />
      <span>
        {direction === "stable" ? "0" : direction === "up" ? "+" : "-"}
        {value}%
      </span>
      <span className="text-muted-foreground">/ {period}</span>
    </div>
  )
}

interface ProductCardProps {
  product: ProductData
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const config = statusConfig[product.status]

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left bg-card border border-border rounded-lg p-4 transition-colors",
        "hover:bg-accent/10 hover:border-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-ring"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="dot" className={config.dotClass} />
            <h3 className="text-sm font-medium text-foreground truncate">{product.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground truncate">{product.description}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-mono font-semibold text-foreground tabular-nums">
            {product.healthScore}
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Score</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between gap-4 mb-3 py-2 border-y border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileText className="h-3 w-3" />
            <span className="font-mono">{product.pageCount}</span>
            <span>pages</span>
          </div>
          <TrendIndicator {...product.trend} />
        </div>
        <Sparkline data={product.sparklineData} status={product.status} />
      </div>

      {/* Alert */}
      {product.alert && (
        <div
          className={cn(
            "flex items-start gap-2 rounded px-2.5 py-2 text-xs",
            product.alert.severity === "critical"
              ? "bg-destructive text-destructive-foreground"
              : "bg-warn text-warn-foreground"
          )}
        >
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{product.alert.title}</p>
            <p className="text-[10px] opacity-80 mt-0.5">
              {product.alert.affectedPages} page{product.alert.affectedPages !== 1 ? "s" : ""} affected
            </p>
          </div>
          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5 opacity-60" />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2">
        <Badge
          variant={product.status === "healthy" ? "success" : product.status === "warning" ? "warning" : "critical"}
          className="uppercase tracking-wide text-[10px]"
        >
          {config.label}
        </Badge>
        <span className="text-[10px] text-muted-foreground">Updated {product.lastUpdated}</span>
      </div>
    </button>
  )
}
