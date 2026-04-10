import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutGrid, List, RefreshCw, Clock, AlertTriangle, AlertOctagon, type LucideIcon } from "lucide-react"
import { ProductCard, type ProductData } from "@/components/custom/product-card"
import { AppShell } from "@/components/custom/app-shell"
import { cn } from "@/lib/utils"

const mockProducts: ProductData[] = [
  {
    id: "1",
    name: "Platform API",
    description: "Core REST API documentation and reference guides",
    status: "critical",
    healthScore: 42,
    pageCount: 156,
    lastUpdated: "2h ago",
    trend: { direction: "down", value: 12, period: "7d" },
    sparklineData: [78, 75, 72, 68, 62, 55, 48, 42],
    alert: { severity: "critical", title: "23 pages have stale content (>90 days)", affectedPages: 23 },
  },
  {
    id: "2",
    name: "SDK Reference",
    description: "Client libraries for JavaScript, Python, and Go",
    status: "warning",
    healthScore: 67,
    pageCount: 89,
    lastUpdated: "4h ago",
    trend: { direction: "down", value: 5, period: "7d" },
    sparklineData: [72, 74, 73, 71, 70, 68, 67, 67],
    alert: { severity: "warning", title: "Python SDK examples failing validation", affectedPages: 8 },
  },
  {
    id: "3",
    name: "Getting Started",
    description: "Onboarding guides and quick start tutorials",
    status: "healthy",
    healthScore: 94,
    pageCount: 34,
    lastUpdated: "1d ago",
    trend: { direction: "up", value: 3, period: "7d" },
    sparklineData: [88, 89, 90, 91, 92, 93, 94, 94],
  },
  {
    id: "4",
    name: "Admin Console",
    description: "Administration and configuration documentation",
    status: "warning",
    healthScore: 71,
    pageCount: 67,
    lastUpdated: "6h ago",
    trend: { direction: "stable", value: 0, period: "7d" },
    sparklineData: [71, 70, 72, 71, 70, 71, 72, 71],
    alert: { severity: "warning", title: "Low traffic on 12 pages (<10 views/week)", affectedPages: 12 },
  },
  {
    id: "5",
    name: "Security & Compliance",
    description: "Authentication, authorization, and audit documentation",
    status: "healthy",
    healthScore: 88,
    pageCount: 45,
    lastUpdated: "3h ago",
    trend: { direction: "up", value: 2, period: "7d" },
    sparklineData: [84, 85, 85, 86, 86, 87, 87, 88],
  },
  {
    id: "6",
    name: "Integrations",
    description: "Third-party integrations and webhook documentation",
    status: "critical",
    healthScore: 38,
    pageCount: 112,
    lastUpdated: "12h ago",
    trend: { direction: "down", value: 18, period: "7d" },
    sparklineData: [72, 65, 58, 52, 48, 44, 40, 38],
    alert: { severity: "critical", title: "API response examples returning 404 errors", affectedPages: 31 },
  },
  {
    id: "7",
    name: "Mobile SDK",
    description: "iOS and Android native SDK documentation",
    status: "healthy",
    healthScore: 91,
    pageCount: 78,
    lastUpdated: "5h ago",
    trend: { direction: "up", value: 4, period: "7d" },
    sparklineData: [85, 86, 87, 88, 89, 90, 90, 91],
  },
  {
    id: "8",
    name: "Data Pipeline",
    description: "ETL, streaming, and data warehouse connectors",
    status: "warning",
    healthScore: 63,
    pageCount: 54,
    lastUpdated: "8h ago",
    trend: { direction: "down", value: 7, period: "7d" },
    sparklineData: [74, 73, 71, 69, 67, 65, 64, 63],
    alert: { severity: "warning", title: "Negative feedback spike on Kafka connector guide", affectedPages: 3 },
  },
]

interface SummaryCardProps {
  label: string
  value: string | number
  subtext?: string
  status?: "healthy" | "warning" | "critical"
  icon?: LucideIcon
}

function SummaryCard({ label, value, subtext, status, icon: Icon }: SummaryCardProps) {
  return (
    <div className={cn(
      "bg-card border rounded-lg p-4",
      status === "critical" ? "border-destructive-foreground/30" :
      status === "warning" ? "border-warn-foreground/30" :
      "border-border"
    )}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
        {Icon && status && (
          <Icon className={cn(
            "h-3.5 w-3.5",
            status === "critical" ? "text-destructive-foreground" :
            status === "warning" ? "text-warn-foreground" :
            "text-success-foreground"
          )} />
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "text-2xl font-mono font-semibold tabular-nums",
            status === "healthy" ? "text-success-foreground" :
            status === "critical" ? "text-destructive-foreground" :
            status === "warning" ? "text-warn-foreground" :
            "text-foreground"
          )}
        >
          {value}
        </span>
        {subtext && <span className="text-xs text-muted-foreground">{subtext}</span>}
      </div>
    </div>
  )
}

export function DocsHealthDashboard() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const criticalCount = mockProducts.filter((p) => p.status === "critical").length
  const warningCount = mockProducts.filter((p) => p.status === "warning").length
  const totalPages = mockProducts.reduce((sum, p) => sum + p.pageCount, 0)
  const avgScore = Math.round(
    mockProducts.reduce((sum, p) => sum + p.healthScore, 0) / mockProducts.length
  )

  const displayed = [...mockProducts].sort((a, b) => {
    const order = { critical: 0, warning: 1, healthy: 2 }
    return order[a.status] - order[b.status]
  })

  return (
    <AppShell
      topBar={
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-foreground">Documentation Health</h1>
            <span className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded">
              v2.4.1
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Last sync: 2 min ago</span>
            <button className="ml-2 p-1.5 hover:bg-secondary rounded transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
          {/* Summary stats */}
          <section aria-label="Summary statistics">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              <SummaryCard label="Products" value={mockProducts.length} subtext="monitored" />
              <SummaryCard label="Total Pages" value={totalPages} />
              <SummaryCard
                label="Avg. Score"
                value={avgScore}
                status={avgScore >= 80 ? "healthy" : avgScore >= 60 ? "warning" : "critical"}
              />
              <SummaryCard
                label="Critical"
                value={criticalCount}
                status={criticalCount > 0 ? "critical" : undefined}
                icon={criticalCount > 0 ? AlertOctagon : undefined}
              />
              <SummaryCard
                label="Warnings"
                value={warningCount}
                status={warningCount > 0 ? "warning" : undefined}
                icon={warningCount > 0 ? AlertTriangle : undefined}
              />
            </div>
          </section>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">
              {displayed.length} products
            </p>
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 transition-colors ${
                  viewMode === "list"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Product grid */}
          <section aria-label="Product list">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {displayed.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() =>
                    navigate(`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                />
              ))}
            </div>
          </section>
      </div>
    </AppShell>
  )
}
