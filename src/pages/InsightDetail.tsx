import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  AlertTriangle,
  BarChart3,
  FileQuestion,
  Search,
  Ticket,
  AlertOctagon,
  CheckCircle2,
  Circle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppShell } from "@/components/custom/app-shell"

const insightData = {
  id: "1",
  title: "Critical drop in negative feedback detected across Getting Started guides",
  severity: "critical" as const,
  isUrgent: true,
  detectedAt: "2025-04-07T08:15:00Z",
  summary: {
    what: "Negative feedback on Getting Started documentation has increased by 40% over the past 7 days. Users are reporting confusion, missing steps, and outdated code examples through the inline feedback widget.",
    why: "Getting Started guides are the first touchpoint for new developers. High friction here correlates strongly with reduced API adoption and increased support ticket volume. Historical data shows a 2.3x increase in support requests when Getting Started feedback scores drop below 80%.",
    confidence: 94,
  },
  affectedPages: [
    { id: "p1", title: "Quick Start Guide", path: "/docs/getting-started/quick-start", healthScore: 38, traffic: "high" as const, feedbackCount: 47 },
    { id: "p2", title: "Authentication Setup", path: "/docs/getting-started/auth", healthScore: 42, traffic: "high" as const, feedbackCount: 31 },
    { id: "p3", title: "Making Your First Request", path: "/docs/getting-started/first-request", healthScore: 45, traffic: "medium" as const, feedbackCount: 28 },
    { id: "p4", title: "SDK Installation", path: "/docs/getting-started/sdk-install", healthScore: 51, traffic: "medium" as const, feedbackCount: 19 },
    { id: "p5", title: "Environment Configuration", path: "/docs/getting-started/env-config", healthScore: 55, traffic: "low" as const, feedbackCount: 14 },
    { id: "p6", title: "Error Handling Basics", path: "/docs/getting-started/errors", healthScore: 58, traffic: "low" as const, feedbackCount: 12 },
    { id: "p7", title: "Rate Limiting Overview", path: "/docs/getting-started/rate-limits", healthScore: 62, traffic: "low" as const, feedbackCount: 8 },
    { id: "p8", title: "Testing Your Integration", path: "/docs/getting-started/testing", healthScore: 64, traffic: "low" as const, feedbackCount: 6 },
  ],
  dataSources: [
    { id: "ds1", name: "Feedback Widget", type: "Direct user feedback", signalCount: 165, confidence: 96, status: "contributing" as const },
    { id: "ds2", name: "Session Analytics", type: "Behavioral signals", signalCount: 2340, confidence: 88, status: "contributing" as const },
    { id: "ds3", name: "Support Tickets", type: "Correlated mentions", signalCount: 23, confidence: 72, status: "contributing" as const },
    { id: "ds4", name: "NPS Survey", type: "Quarterly feedback", signalCount: 0, confidence: 0, status: "no-data" as const },
  ],
}

const trafficConfig = {
  high: { label: "High", class: "text-foreground" },
  medium: { label: "Med", class: "text-muted-foreground" },
  low: { label: "Low", class: "text-muted-foreground/60" },
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

function ConfidenceBar({ confidence }: { confidence: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            confidence >= 90
              ? "bg-success-foreground"
              : confidence >= 70
              ? "bg-warn-foreground"
              : "bg-muted-foreground"
          )}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums text-muted-foreground w-8">{confidence}%</span>
    </div>
  )
}

function DataSourceIcon({ name }: { name: string }) {
  switch (name) {
    case "Feedback Widget":
      return <AlertTriangle className="h-4 w-4" />
    case "Session Analytics":
      return <BarChart3 className="h-4 w-4" />
    case "Support Tickets":
      return <Ticket className="h-4 w-4" />
    case "NPS Survey":
      return <FileQuestion className="h-4 w-4" />
    default:
      return <Search className="h-4 w-4" />
  }
}

export function InsightDetail() {
  const { slug } = useParams<{ slug: string; insightId: string }>()
  const totalSignals = insightData.dataSources.reduce((sum, ds) => sum + ds.signalCount, 0)
  const contributingSources = insightData.dataSources.filter((ds) => ds.status === "contributing").length

  return (
    <AppShell
      topBar={
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to={`/product/${slug}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Platform API</span>
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-sm text-muted-foreground">Insight</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Detected {formatDate(insightData.detectedAt)}</span>
          </div>
        </div>
      }
    >
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            {insightData.isUrgent && (
              <span className="shrink-0 mt-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded bg-destructive-foreground text-background">
                Urgent
              </span>
            )}
            <h1 className="text-xl font-semibold text-foreground leading-tight">
              {insightData.title}
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-destructive-foreground" />
              <span>Critical severity</span>
            </span>
            <span className="text-muted-foreground/30">|</span>
            <span>{insightData.affectedPages.length} pages affected</span>
            <span className="text-muted-foreground/30">|</span>
            <span>{totalSignals.toLocaleString()} signals analyzed</span>
          </div>
        </div>

        {/* Actions — pinned under title */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Assign to IC
          </Button>
          <Button variant="secondary" className="gap-2">
            <Ticket className="h-4 w-4" />
            Create Jira Ticket
          </Button>
          <Button variant="secondary" className="gap-2 text-destructive-foreground hover:text-destructive-foreground">
            <AlertOctagon className="h-4 w-4" />
            Escalate
          </Button>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Summary
          </h2>
          <div className="bg-card border border-border rounded-lg p-5 space-y-5">
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                What is happening
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed">{insightData.summary.what}</p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Why it matters
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed">{insightData.summary.why}</p>
            </div>
            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Confidence Level
                </h3>
                <span className="text-xs text-muted-foreground">
                  {contributingSources} of {insightData.dataSources.length} sources contributing
                </span>
              </div>
              <div className="max-w-md">
                <ConfidenceBar confidence={insightData.summary.confidence} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                High confidence based on consistent signals across multiple data sources
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Affected Pages
          </h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_70px_100px] gap-4 px-4 py-2 bg-secondary/50 border-b border-border text-[10px] text-muted-foreground uppercase tracking-wide">
              <span>Page</span>
              <span className="text-center">Health</span>
              <span className="text-center">Traffic</span>
              <span className="text-right">Feedback</span>
            </div>
            {insightData.affectedPages.map((page, index) => (
              <div
                key={page.id}
                className={cn(
                  "grid grid-cols-[1fr_80px_70px_100px] gap-4 px-4 py-3 items-center",
                  "hover:bg-accent/10 transition-colors",
                  index !== insightData.affectedPages.length - 1 && "border-b border-border"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm text-foreground truncate">{page.title}</span>
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex justify-center">
                  <span
                    className={cn(
                      "text-xs font-mono tabular-nums px-2 py-0.5 rounded",
                      page.healthScore < 50
                        ? "bg-destructive text-destructive-foreground"
                        : page.healthScore < 70
                        ? "bg-warn text-warn-foreground"
                        : "bg-success text-success-foreground"
                    )}
                  >
                    {page.healthScore}
                  </span>
                </div>
                <div className="text-center">
                  <span className={cn("text-xs", trafficConfig[page.traffic].class)}>
                    {trafficConfig[page.traffic].label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono tabular-nums text-muted-foreground">
                    {page.feedbackCount} responses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Data Sources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {insightData.dataSources.map((source) => (
              <div
                key={source.id}
                className={cn(
                  "bg-card border border-border rounded-lg p-4",
                  source.status === "no-data" && "opacity-50"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-secondary text-foreground">
                      <DataSourceIcon name={source.name} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{source.name}</div>
                      <div className="text-xs text-muted-foreground">{source.type}</div>
                    </div>
                  </div>
                  {source.status === "contributing" ? (
                    <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/30" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Signals</span>
                    <span className="font-mono tabular-nums text-foreground">
                      {source.signalCount > 0 ? source.signalCount.toLocaleString() : "—"}
                    </span>
                  </div>
                  {source.confidence > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Confidence</span>
                      </div>
                      <ConfidenceBar confidence={source.confidence} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
    </AppShell>
  )
}
