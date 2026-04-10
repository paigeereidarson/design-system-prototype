import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Clock, RefreshCw, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { InsightRow, type InsightData } from "@/components/custom/insight-row"
import { AppShell } from "@/components/custom/app-shell"

interface MetricData {
  label: string
  value: string | number
  unit?: string
  trend?: {
    direction: "up" | "down" | "stable"
    value: number
    isPositive?: boolean
  }
  sparkline?: number[]
}

const productData = {
  name: "Platform API",
  description: "Core REST API documentation and reference guides",
  status: "critical" as const,
  healthScore: 42,
  lastUpdated: "2025-04-07T14:32:00Z",
}

const metrics: MetricData[] = [
  {
    label: "Total Pages",
    value: 156,
    sparkline: [142, 145, 148, 150, 152, 154, 155, 156],
    trend: { direction: "up", value: 3, isPositive: true },
  },
  {
    label: "Negative Feedback Rate",
    value: "18.4",
    unit: "%",
    sparkline: [12, 13, 14, 15, 16, 17, 18, 18.4],
    trend: { direction: "up", value: 40, isPositive: false },
  },
  {
    label: "Findability Score",
    value: 64,
    unit: "/ 100",
    sparkline: [72, 70, 68, 67, 66, 65, 64, 64],
    trend: { direction: "down", value: 11, isPositive: false },
  },
  {
    label: "Avg. Session Duration",
    value: "2:34",
    unit: "min",
    sparkline: [3.2, 3.1, 2.9, 2.8, 2.7, 2.6, 2.5, 2.57],
    trend: { direction: "down", value: 8, isPositive: false },
  },
  {
    label: "Survey Engagement",
    value: "12.1",
    unit: "%",
    sparkline: [14, 13.5, 13, 12.8, 12.5, 12.3, 12.2, 12.1],
    trend: { direction: "down", value: 5, isPositive: false },
  },
]

const insights: InsightData[] = [
  {
    id: "1",
    title: "Critical drop in negative feedback detected across Getting Started guides — 40% increase in the last 7 days",
    severity: "critical",
    dataSource: "feedback",
    affectedPages: 8,
    isUrgent: true,
    confidence: 94,
  },
  {
    id: "2",
    title: "23 pages have broken external links returning 404 errors",
    severity: "critical",
    dataSource: "crawler",
    affectedPages: 23,
    confidence: 100,
  },
  {
    id: "3",
    title: "Authentication endpoints have low findability scores (<50) from organic search",
    severity: "warning",
    dataSource: "analytics",
    affectedPages: 12,
    confidence: 87,
  },
  {
    id: "4",
    title: "Session duration declining on rate limiting documentation",
    severity: "warning",
    dataSource: "analytics",
    affectedPages: 4,
    confidence: 78,
  },
  {
    id: "5",
    title: "Missing CONTRIBUTING.md references in SDK integration guides",
    severity: "info",
    dataSource: "validation",
    affectedPages: 6,
    confidence: 100,
  },
  {
    id: "6",
    title: "Survey responses indicate confusion around webhook payload formats",
    severity: "warning",
    dataSource: "survey",
    affectedPages: 3,
    confidence: 82,
  },
]

const statusConfig = {
  healthy: { label: "Healthy", ringClass: "ring-success-foreground/30" },
  warning: { label: "Needs Attention", ringClass: "ring-warn-foreground/30" },
  critical: { label: "Critical", ringClass: "ring-destructive-foreground/30" },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 20
  const width = 48
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={width} height={height} className="overflow-visible opacity-50">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MetricCard({ metric }: { metric: MetricData }) {
  const { label, value, unit, trend, sparkline } = metric

  const isTrendPositive = trend
    ? trend.isPositive !== undefined
      ? trend.direction === "up"
        ? trend.isPositive
        : !trend.isPositive
      : trend.direction === "up"
    : null

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="flex items-end justify-between gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-mono font-semibold text-foreground tabular-nums">
            {value}
          </span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
        {sparkline && (
          <div className="text-muted-foreground">
            <MiniSparkline data={sparkline} />
          </div>
        )}
      </div>
      {trend && (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-mono",
            isTrendPositive === true && "text-success-foreground",
            isTrendPositive === false && "text-destructive-foreground",
            isTrendPositive === null && "text-muted-foreground"
          )}
        >
          <span>
            {trend.direction === "stable" ? "0" : trend.direction === "up" ? "+" : "-"}
            {trend.value}%
          </span>
          <span className="text-muted-foreground">vs last 7d</span>
        </div>
      )}
    </div>
  )
}

export function ProductDetail() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const config = statusConfig[productData.status]
  const criticalCount = insights.filter((i) => i.severity === "critical").length
  const warningCount = insights.filter((i) => i.severity === "warning").length

  return (
    <AppShell
      topBar={
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Products</span>
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-sm font-medium text-foreground">{productData.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {formatDate(productData.lastUpdated)}</span>
            <button className="ml-2 p-1.5 hover:bg-secondary rounded transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      }
    >
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl font-semibold text-foreground">{productData.name}</h1>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded",
                  productData.status === "critical"
                    ? "bg-destructive text-destructive-foreground"
                    : productData.status === "warning"
                    ? "bg-warn text-warn-foreground"
                    : "bg-success text-success-foreground"
                )}
              >
                {config.label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{productData.description}</p>
          </div>

          <div
            className={cn(
              "flex flex-col items-center justify-center w-24 h-24 rounded-full ring-4",
              config.ringClass,
              "bg-card border border-border"
            )}
          >
            <div
              className={cn(
                "text-3xl font-mono font-bold tabular-nums",
                productData.status === "critical"
                  ? "text-destructive-foreground"
                  : productData.status === "warning"
                  ? "text-warn-foreground"
                  : "text-success-foreground"
              )}
            >
              {productData.healthScore}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Score</div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Health Overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Insights Backlog
            </h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-destructive-foreground" />
                <span className="text-muted-foreground">{criticalCount} critical</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warn-foreground" />
                <span className="text-muted-foreground">{warningCount} warning</span>
              </span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2 bg-secondary/50 border-b border-border text-[10px] text-muted-foreground uppercase tracking-wide">
              <span className="w-2" />
              <span className="flex-1">Insight</span>
              <span className="w-16 text-center">Severity</span>
              <span className="w-20 text-center">Source</span>
              <span className="w-20 text-right">Affected</span>
              <span className="w-4" />
            </div>

            {insights.map((insight) => (
              <InsightRow
                key={insight.id}
                insight={insight}
                onClick={() => navigate(`/product/${slug}/insight/${insight.id}`)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <span>View all insights</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </section>
    </AppShell>
  )
}
