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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageHeader } from "@/components/custom/PageHeader"
import { buttonVariants } from "@/components/ui/button"
import { RawDataCard } from "@/components/custom/RawDataCard"
import {
  products,
  statusToBadgeVariant,
  priorityToBadgeVariant,
  type Insight,
  type Product,
} from "@/data/mock-products"

// --- Health Metric Types ---
interface MetricCardData {
  label: string
  value: string
  score: number // 0-100, drives progress bar width
  change: string
  barColor: "destructive" | "success"
  target?: number
  tooltipLine1?: string
  tooltipLine2?: string
}

// CUDA product metrics per Figma wireframe
const cudaOverallHealth = {
  score: 38,
  history: [52, 49, 46, 43, 40, 39, 38],
  change: "↓ 18% from prior period",
  target: 74,
  tooltipLine1: "Target: 74.",
  tooltipLine2: "This benchmark reflects the documentation quality standard set for top-tier NVIDIA products.",
}

const cudaMetrics: MetricCardData[] = [
  { label: "Usefulness", value: "34", score: 34, change: "↓ 18% from prior period", barColor: "destructive", target: 80, tooltipLine1: "Target: 80.", tooltipLine2: "The minimum threshold for documentation that supports self-serve developer onboarding." },
  { label: "Findability", value: "52", score: 52, change: "↓ 6% from prior period", barColor: "destructive", target: 90, tooltipLine1: "Target: 90.", tooltipLine2: "Users should be able to locate CUDA documentation within two search interactions." },
  { label: "Attractiveness", value: "75", score: 75, change: "Stable", barColor: "success", target: 74, tooltipLine1: "Target: 74.", tooltipLine2: "Reflects visual clarity, formatting consistency, and code block readability across pages." },
  { label: "Popularity", value: "74", score: 74, change: "↑ 11% from last release", barColor: "success", target: 74, tooltipLine1: "Target: 74.", tooltipLine2: "Indicates healthy traffic distribution across core CUDA documentation pages." },
  { label: "Errors", value: "9", score: 9, change: "↑ 2 from prior period", barColor: "destructive" },
  { label: "Traffic", value: "908 visits", score: 30, change: "↑ Up 7% last 6 weeks", barColor: "destructive" },
]

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

// --- Target icon + tooltip ---
function TargetIndicator({ target, tooltipLine1, tooltipLine2 }: {
  target: number; tooltipLine1: string; tooltipLine2: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center gap-0.5 text-foreground">
        <i className="ri-focus-2-line" style={{ fontSize: "14px" }} />
        <span className="text-xs font-medium">{target}</span>
      </TooltipTrigger>
      <TooltipContent className="flex flex-col gap-1 max-w-[260px]">
        <p className="text-xs">{tooltipLine1}</p>
        <p className="text-xs">{tooltipLine2}</p>
      </TooltipContent>
    </Tooltip>
  )
}

// --- Progress bar (bullet chart) ---
function BulletBar({ score, barColor }: { score: number; barColor: "destructive" | "success" }) {
  const fillClass = barColor === "destructive"
    ? "bg-destructive-foreground"
    : "bg-primary"
  return (
    <div className="h-2 w-full rounded-full overflow-hidden bg-secondary">
      <div
        className={`h-full rounded-full ${fillClass}`}
        style={{ width: `${Math.max(score, 2)}%` }}
      />
    </div>
  )
}

// --- Overall Health Card (wider, decorative font, sparkline) ---
function OverallHealthCard({ score, history, change, target, tooltipLine1, tooltipLine2 }: {
  score: number; history: number[]; change: string; target: number; tooltipLine1: string; tooltipLine2: string
}) {
  const scoreColor = score < 70 ? "text-destructive-foreground" : "text-success-foreground"
  const barColor: "destructive" | "success" = score < 70 ? "destructive" : "success"

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Overall Health
          </p>
          <TargetIndicator target={target} tooltipLine1={tooltipLine1} tooltipLine2={tooltipLine2} />
        </div>
        <div className="flex items-center gap-2">
          <p className={`text-decorative font-bold leading-none ${scoreColor}`}>{score}</p>
          <LineSparkline data={history} />
        </div>
        <p className="text-sm text-muted-foreground mt-1">{change}</p>
        <div className="mt-auto pt-3">
          <BulletBar score={score} barColor={barColor} />
        </div>
      </CardContent>
    </Card>
  )
}

// --- Health Metric Card ---
function HealthMetricCard({ metric }: { metric: MetricCardData }) {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {metric.label}
          </p>
          {metric.target !== undefined && metric.tooltipLine1 && metric.tooltipLine2 && (
            <TargetIndicator target={metric.target} tooltipLine1={metric.tooltipLine1} tooltipLine2={metric.tooltipLine2} />
          )}
        </div>
        <p className="text-heading font-bold text-foreground leading-tight">{metric.value}</p>
        <p className="text-sm text-muted-foreground mt-1">{metric.change}</p>
        <div className="mt-auto pt-3">
          <BulletBar score={metric.score} barColor={metric.barColor} />
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

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={product.name} description={product.aiAssessment}>
        <div className="flex items-center gap-2">
          <Button variant="secondary"><i className="ri-share-line" style={{ fontSize: "14px" }} /> Share</Button>
          <Button variant="default"><i className="ri-links-line" style={{ fontSize: "14px" }} /> Go to docs</Button>
        </div>
      </PageHeader>

      {/* Health Metrics — Overall Health (wide) + 6 metric cards */}
      <section>
        <h2 className="text-heading-sm font-semibold text-foreground mb-4">Health Metrics</h2>
        <div className="grid grid-cols-7 gap-3">
          <OverallHealthCard
            score={cudaOverallHealth.score}
            history={cudaOverallHealth.history}
            change={cudaOverallHealth.change}
            target={cudaOverallHealth.target}
            tooltipLine1={cudaOverallHealth.tooltipLine1}
            tooltipLine2={cudaOverallHealth.tooltipLine2}
          />
          {cudaMetrics.map((m) => (
            <HealthMetricCard key={m.label} metric={m} />
          ))}
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
