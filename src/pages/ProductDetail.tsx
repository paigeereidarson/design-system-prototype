import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageHeader } from "@/components/custom/PageHeader"
import { buttonVariants } from "@/components/ui/button"
import { RawDataCard } from "@/components/custom/RawDataCard"
import {
  products,
  statusToBadgeVariant,
  statusToDotVariant,
  priorityToBadgeVariant,
  healthScoreTextClass,
  healthScoreBgClass,
  type Insight,
  type Product,
  type DimensionScore,
} from "@/data/mock-products"

// --- Health Metric Types ---
interface HealthMetric {
  label: string
  value: string
  change: string
  tone: "positive" | "negative" | "neutral"
  trend: "up" | "down" | "flat"
}

// Hardcoded CUDA metrics per wireframe; other products fall back to a sensible default pattern
const cudaHealthMetrics: HealthMetric[] = [
  { label: "Usefulness", value: "34", change: "18% from prior period", tone: "negative", trend: "down" },
  { label: "Findability", value: "52", change: "6% from prior period", tone: "negative", trend: "down" },
  { label: "Attractiveness", value: "67", change: "Stable", tone: "neutral", trend: "flat" },
  { label: "Popularity", value: "74", change: "11% (driver release)", tone: "positive", trend: "up" },
  { label: "Errors", value: "9", change: "2 from prior period", tone: "negative", trend: "up" },
]

// Overall Health score per product (matches wireframe for CUDA = 38)
const productHealthScore: Record<string, { score: number; history: number[] }> = {
  cuda: { score: 38, history: [52, 49, 46, 43, 40, 39, 38] },
  "nemo-llm": { score: 41, history: [58, 55, 52, 49, 46, 43, 41] },
  "dgx-cloud": { score: 61, history: [70, 68, 66, 64, 63, 62, 61] },
  bionemo: { score: 74, history: [72, 73, 71, 74, 73, 75, 74] },
}

function getHealthScoreFor(productId: string) {
  return productHealthScore[productId] ?? { score: 50, history: [55, 54, 52, 51, 50, 50, 50] }
}

// --- Trend Icon ---
function TrendIcon({ trend }: { trend: string }) {
  if (trend === "declining") return <i className="ri-arrow-down-line text-destructive-foreground" style={{ fontSize: "14px" }} />
  if (trend === "improving") return <i className="ri-arrow-up-line text-success-foreground" style={{ fontSize: "14px" }} />
  return <i className="ri-subtract-line text-muted-foreground" style={{ fontSize: "14px" }} />
}

// --- Inline Line Sparkline (muted) ---
function LineSparkline({ data }: { data: number[] }) {
  const width = 56
  const height = 20
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((d - min) / range) * (height - 2) - 1
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg width={width} height={height} className="shrink-0" viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// --- Overall Health Card (mirrors the All Products treatment) ---
function OverallHealthCard({ score, history }: { score: number; history: number[] }) {
  return (
    <Card className="col-span-2">
      <CardContent>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Overall Health
        </p>
        <div className="flex items-center gap-2 mb-2">
          <p className={`text-decorative font-bold leading-none ${healthScoreTextClass(score)}`}>{score}</p>
          <LineSparkline data={history} />
        </div>
        <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full ${healthScoreBgClass(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// --- Health Metric Card (Usefulness / Findability / etc.) ---
function HealthMetricCard({ metric }: { metric: HealthMetric }) {
  const toneClass =
    metric.tone === "positive" ? "text-success-foreground" :
    metric.tone === "negative" ? "text-destructive-foreground" :
    "text-muted-foreground"

  const arrowIcon =
    metric.trend === "up" ? "ri-arrow-up-line" :
    metric.trend === "down" ? "ri-arrow-down-line" :
    null

  return (
    <Card>
      <CardContent>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          {metric.label}
        </p>
        <p className="text-heading font-bold text-foreground leading-tight">{metric.value}</p>
        <div className={`flex items-start gap-1 mt-1 ${toneClass}`}>
          {arrowIcon && (
            <i className={arrowIcon} style={{ fontSize: "14px", lineHeight: "16px" }} />
          )}
          <p className="text-xs leading-tight">{metric.change}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Mini Sparkline (7 bars for a week) ---
function WeeklySparkline({ trend }: { trend: string }) {
  // Generate 7 bars with slight variation based on trend
  const heights = trend === "declining"
    ? [85, 70, 75, 60, 50, 40, 30]
    : trend === "improving"
    ? [30, 40, 45, 55, 60, 70, 85]
    : [50, 55, 45, 60, 50, 55, 50]

  return (
    <div className="flex items-end gap-0.5 h-6">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm bg-muted-foreground"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

// --- Assign Avatar Popover ---
const recentPeople = [
  { name: "Sarah Chen", initials: "SC" },
  { name: "Marcus Li", initials: "ML" },
  { name: "James Park", initials: "JP" },
  { name: "Priya Sharma", initials: "PS" },
]

function AssignAvatar({ onAssign }: { onAssign: (name: string) => void }) {
  const [assigned, setAssigned] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const filtered = recentPeople.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleAssign(person: typeof recentPeople[0]) {
    setAssigned(person.name)
    onAssign(person.name)
  }

  if (assigned) {
    const person = recentPeople.find(p => p.name === assigned)
    return (
      <Popover>
        <PopoverTrigger className={buttonVariants({ variant: "secondary", size: "icon-xs" })}>
          <Avatar size="sm">
            <AvatarFallback className="text-[9px] bg-success text-success-foreground">
              {person?.initials ?? "?"}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <p className="text-xs text-muted-foreground mb-1">Assigned to</p>
          <p className="text-sm font-medium text-foreground">{assigned}</p>
          <button
            className="text-xs text-primary hover:underline mt-2"
            onClick={() => setAssigned(null)}
          >
            Reassign
          </button>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "secondary", size: "icon-xs" })}>
        <i className="ri-user-add-line text-muted-foreground" style={{ fontSize: "18px" }} />
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Assign to</p>
        <Input
          placeholder="Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />
        <p className="text-xs text-muted-foreground mb-1">Recent</p>
        <div className="flex flex-col">
          {filtered.map(person => (
            <button
              key={person.name}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-foreground hover:bg-secondary transition-colors text-left"
              onClick={() => handleAssign(person)}
            >
              <Avatar size="sm">
                <AvatarFallback className="text-[9px]">{person.initials}</AvatarFallback>
              </Avatar>
              {person.name}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground px-2 py-1.5">No results</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// --- Watch Icon with Count ---
function WatchIcon() {
  const [watchers, setWatchers] = useState(0)
  const [watching, setWatching] = useState(false)

  function toggle(e: React.MouseEvent) {
    e.stopPropagation()
    if (watching) {
      setWatchers(prev => Math.max(0, prev - 1))
    } else {
      setWatchers(prev => prev + 1)
    }
    setWatching(!watching)
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1 px-1 py-1 rounded transition-colors ${watching ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
    >
      <i className={watching ? "ri-eye-fill" : "ri-eye-line"} style={{ fontSize: "18px" }} />
      {watchers > 0 && <span className="text-sm">{watchers}</span>}
    </button>
  )
}

// --- Jira Modal ---
function JiraModal({ open, onClose, insight }: { open: boolean; onClose: () => void; insight: Insight | null }) {
  const [assignee, setAssignee] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setAssignee(""); onClose() }, 2500)
  }

  if (!insight) return null

  return (
    <Dialog open={open} onOpenChange={() => { setSubmitted(false); setAssignee(""); onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Jira Ticket</DialogTitle>
        </DialogHeader>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <i className="ri-check-double-line text-success-foreground" style={{ fontSize: "32px" }} />
            <p className="text-heading-sm font-semibold text-foreground">Ticket created</p>
            <p className="text-sm text-muted-foreground">Assigned to {assignee || "—"}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jira-title">Title</Label>
              <Input id="jira-title" defaultValue={insight.summary} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jira-assignee">Assignee</Label>
              <Input id="jira-assignee" placeholder="Start typing a name..." value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jira-desc">Description</Label>
              <textarea id="jira-desc" className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none" defaultValue={`${insight.solution}\n\nEvidence:\n${insight.evidence}`} onChange={() => {}} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Priority:</span>
              <Badge variant={priorityToBadgeVariant(insight.priority)}>{insight.diagnosticLabel}</Badge>
            </div>
            <Separator />
            <Button variant="critical" onClick={handleSubmit} disabled={!assignee}>
              <i className="ri-send-plane-line" style={{ fontSize: "14px" }} />
              Send to Jira
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// --- Assessment Detail Drawer ---
function AssessmentDrawer({ insight, product, open, onClose, onCreateJira }: {
  insight: Insight | null; product: Product; open: boolean; onClose: () => void; onCreateJira: (insight: Insight) => void
}) {
  if (!insight) return null
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:!max-w-lg overflow-y-auto">
        <SheetHeader>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Assessment</p>
          <SheetTitle className="text-heading-sm font-semibold">{insight.summary}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 pb-6">
          <div className="flex gap-2">
            <Button variant="critical" onClick={() => onCreateJira(insight)}>
              <i className="ri-share-line" style={{ fontSize: "14px" }} /> Share
            </Button>
            <Button variant="default">
              <i className="ri-links-line" style={{ fontSize: "14px" }} /> Go to Docs
            </Button>
          </div>
          <Separator />
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Evidence</p>
            <div className="flex flex-col gap-2">
              {insight.evidenceItems.map((item, i) => (
                <Card key={i}><CardContent>
                  <p className="text-sm text-foreground whitespace-pre-line">{item.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Source: {item.source}</p>
                </CardContent></Card>
              ))}
            </div>
          </section>
          <Separator />
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">This is contributing to</p>
            <div className="flex flex-wrap gap-2">
              {insight.contributingTo.map(dim => (
                <Badge key={dim.key} variant={statusToBadgeVariant(
                  product.dimensions[dim.key as keyof typeof product.dimensions]?.status ?? "needs-improvement"
                )}>{dim.name}</Badge>
              ))}
            </div>
          </section>
          <Separator />
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Affected Documentation</p>
            {insight.affectedPages.map(page => (
              <Link key={page.id} to={`/products/${product.id}/pages/${page.id}`} className="text-sm text-primary hover:underline">{page.title}</Link>
            ))}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// --- Health Dimension Card (redesigned) ---
function DimensionCard({ label, dimension, onClick }: { label: string; dimension: DimensionScore; onClick?: () => void }) {
  return (
    <Card className={onClick ? "cursor-pointer transition-colors hover:border-primary/30" : ""} onClick={onClick}>
      <CardContent>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Badge variant={statusToDotVariant(dimension.status)} />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
          </div>
          <TrendIcon trend={dimension.trend} />
        </div>
        <p className="text-heading font-bold text-foreground leading-tight mt-1">
          {dimension.dataPoint.split("\n")[0]}
        </p>
        {dimension.dataPoint.split("\n")[1] && (
          <p className="text-xs text-muted-foreground mt-1">{dimension.dataPoint.split("\n")[1]}</p>
        )}
      </CardContent>
    </Card>
  )
}

// --- Issue Card (redesigned - horizontal row) ---
function IssueRow({ insight, onClick }: {
  insight: Insight; onClick: () => void
}) {
  const visitorsAffected = insight.priority === "must-fix" ? "2,053" : insight.priority === "should-improve" ? "566" : "168"

  return (
    <Card className="cursor-pointer transition-colors hover:border-primary/30" onClick={onClick}>
      <CardContent>
        <div className="flex items-center gap-3">
          {/* Badge */}
          <Badge
            variant={priorityToBadgeVariant(insight.priority)}
            className="shrink-0 min-w-[72px] justify-center"
          >
            {insight.diagnosticLabel}
          </Badge>

          {/* Summary */}
          <p className="text-sm text-foreground flex-1 min-w-0">{insight.summary}</p>

          {/* Right cluster */}
          <div className="flex items-center gap-5 shrink-0">
            <p className="text-sm font-medium text-foreground whitespace-nowrap">{visitorsAffected} Visitors affected</p>
            <WeeklySparkline trend={insight.priority === "must-fix" ? "declining" : insight.priority === "watching" ? "stable" : "declining"} />
            <div onClick={(e) => e.stopPropagation()}>
              <AssignAvatar onAssign={() => {}} />
            </div>
            <WatchIcon />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Raw Data Section ---
// --- Main Page ---
export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [jiraOpen, setJiraOpen] = useState(false)
  const [jiraInsight, setJiraInsight] = useState<Insight | null>(null)

  const product = products.find(p => p.id === id)
  if (!product) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Product not found.</p>
        <button onClick={() => navigate("/")} className="text-sm text-primary hover:underline">Back to overview</button>
      </div>
    )
  }

  function openJira(insight: Insight) { setJiraInsight(insight); setJiraOpen(true) }

  const dimensionLabels: Record<string, string> = {
    sentiment: "Sentiment", repoHealth: "Repo Health", devForum: "Dev Forum",
    surveyFeedback: "Survey Feedback", traffic: "Traffic",
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader eyebrow="Version 0.1.5 / Product details" title={product.name} description={product.aiAssessment}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="default"><i className="ri-share-line" style={{ fontSize: "14px" }} /> Share</Button>
            <Button variant="default"><i className="ri-links-line" style={{ fontSize: "14px" }} /> Go to Docs</Button>
          </div>
          <div className="flex items-center gap-1.5 pl-4 border-l border-border">
            <i className="ri-eye-line text-foreground" style={{ fontSize: "16px" }} />
            <div className="flex flex-col">
              <p className="text-heading-sm font-bold text-foreground leading-tight">{product.weeklyVisitorsDisplay}</p>
              <p className="text-xs text-muted-foreground">{product.visitorsPast}</p>
            </div>
          </div>
        </div>
      </PageHeader>

      {/* Health Metrics — Overall Health + 5 metrics + existing Traffic card */}
      <section>
        <h2 className="text-heading-sm font-semibold text-foreground mb-4">Health Metrics</h2>
        <div className="grid grid-cols-8 gap-3">
          <OverallHealthCard
            score={getHealthScoreFor(product.id).score}
            history={getHealthScoreFor(product.id).history}
          />
          {cudaHealthMetrics.map((m) => (
            <HealthMetricCard key={m.label} metric={m} />
          ))}
          <DimensionCard
            label={dimensionLabels.traffic}
            dimension={product.dimensions.traffic}
          />
        </div>
      </section>

      {/* Signals — moved above Top Issues */}
      <RawDataCard />

      {/* Top 5 Issues — horizontal rows, sorted must-fix → should-improve → watching */}
      <section>
        <h2 className="text-heading-sm font-semibold text-foreground mb-4">Top 5 Issues</h2>
        <div className="flex flex-col gap-2">
          {[...product.insights]
            .sort((a, b) => {
              const order: Record<string, number> = { "must-fix": 0, "should-improve": 1, "watching": 2 }
              return order[a.priority] - order[b.priority]
            })
            .map(insight => (
              <IssueRow key={insight.id} insight={insight}
                onClick={() => setSelectedInsight(insight)} />
            ))}
        </div>
        <div className="flex justify-center mt-3">
          <Button variant="secondary">Show 9 More</Button>
        </div>
      </section>

      <AssessmentDrawer insight={selectedInsight} product={product} open={selectedInsight !== null} onClose={() => setSelectedInsight(null)} onCreateJira={openJira} />
      <JiraModal open={jiraOpen} onClose={() => setJiraOpen(false)} insight={jiraInsight} />
    </div>
  )
}
