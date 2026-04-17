import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/custom/PageHeader"
import { InlineDrawer } from "@/components/custom/InlineDrawer"
import { useSubscribedProductIds } from "@/hooks/use-subscribed-products"
import {
  products,
  statusToBadgeVariant,
  type Insight,
  type Product,
} from "@/data/mock-products"

// --- Types ---
interface ActionMetric {
  label: string
  value: string
  tone?: "destructive" | "default"
  trend?: "down" | "up"
  badge?: string
}

interface ActionItem {
  id: string
  productId: string
  insightId: string
  title: string
  description: string
  metrics: ActionMetric[]
}

interface WatchedItem {
  id: string
  title: string
  description: string
  productLabel: string
}

// --- Data ---
const actions: ActionItem[] = [
  {
    id: "cuda-broken-links",
    productId: "cuda",
    insightId: "cuda-broken-links",
    title: "Fix broken links on CUDA install guide",
    description:
      "Three links in the install guide point to deprecated API endpoints. Users hitting these links get 404 errors during setup, which likely contributes to the page's high exit rate.",
    metrics: [
      { label: "Traffic", value: "284.3k", badge: "top 1%" },
      { label: "Broken Link Count", value: "3", tone: "destructive" },
    ],
  },
  {
    id: "cuda-negative-feedback",
    productId: "cuda",
    insightId: "cuda-copy-paste",
    title: "Investigate uptick in negative feedback on CUDA troubleshooting guide",
    description:
      "Negative sentiment dropped 46% over the past two weeks. The timing correlates with the v12.4 toolkit release — the guide may not reflect recent API changes.",
    metrics: [
      { label: "Sentiment", value: "46%", tone: "destructive", trend: "down" },
    ],
  },
  {
    id: "dgx-survey-decline",
    productId: "dgx-cloud",
    insightId: "dgx-setup-feedback",
    title: "Address declining helpfulness on DGX Cloud Setup Guide",
    description:
      "The 'Was this helpful?' ratio on the Setup Guide dropped from 78% to 61% over the past 60 days. Free-text feedback mentions missing steps for multi-node configuration.",
    metrics: [
      { label: "Helpfulness", value: "61%", tone: "destructive", trend: "down" },
      { label: "Prior Period", value: "78%" },
    ],
  },
  {
    id: "dgx-forum",
    productId: "dgx-cloud",
    insightId: "dgx-setup-feedback",
    title: "Review unanswered forum threads for DGX Cloud setup",
    description:
      "12 developer forum threads referencing DGX Cloud setup have gone unanswered for more than 30 days. Traffic to the setup guide has declined 18% since.",
    metrics: [
      { label: "Unanswered Threads", value: "12", tone: "destructive" },
      { label: "Traffic trend", value: "18%", trend: "down" },
    ],
  },
  {
    id: "bionemo-stale",
    productId: "bionemo",
    insightId: "bionemo-stale",
    title: "Fix stale content on BioNeMo quickstart guide",
    description:
      "The quickstart guide has not been updated in 11 months. Visitor sessions are low and declining. No critical issues but discoverability is suffering.",
    metrics: [
      { label: "Last Update", value: "11 months ago" },
      { label: "Weekly Visitors", value: "800" },
    ],
  },
  // --- Backfill items (beyond top 5) ---
  {
    id: "nemo-update",
    productId: "nemo-llm",
    insightId: "nemo-critical",
    title: "Update NeMo LLM Get Started guide",
    description:
      "The installation steps reference NeMo 1.8, but the latest stable release is 2.1. Users following this guide will configure an outdated version, which may cause compatibility issues.",
    metrics: [
      { label: "Last Update", value: "14 months ago" },
      { label: "Sentiment", value: "28%", tone: "destructive", trend: "down" },
    ],
  },
  {
    id: "cuda-forum-backlog",
    productId: "cuda",
    insightId: "cuda-forum-backlog",
    title: "Clear backlog of 8 unanswered CUDA installation forum threads",
    description:
      "Average time-to-first-response on CUDA installation topics has gone from 4 hours to 3 days. Eight threads have zero replies, oldest is 12 days old.",
    metrics: [
      { label: "Unanswered", value: "8", tone: "destructive" },
      { label: "Oldest", value: "12 days" },
    ],
  },
  {
    id: "cuda-search-exits",
    productId: "cuda",
    insightId: "cuda-search-exits",
    title: "Investigate 42% search exit rate for 'cuda install linux'",
    description:
      "1,204 searches this month for 'cuda install linux' exit without clicking any result. Install pages may not be matching user intent.",
    metrics: [
      { label: "Exit Rate", value: "42%", tone: "destructive" },
      { label: "Searches", value: "1,204" },
    ],
  },
  {
    id: "bionemo-hard-to-find",
    productId: "bionemo",
    insightId: "bionemo-hard-to-find",
    title: "Monitor BioNeMo Models page search traffic",
    description:
      "Organic search visits to the Models page dropped 15% this month. Correlates with recent site migration — may recover within 2-3 weeks.",
    metrics: [
      { label: "Search Visits", value: "↓ 15%", trend: "down" },
    ],
  },
]

// --- Initial watched items (placeholder state) ---
const initialWatchedItems: WatchedItem[] = [
  {
    id: "w-tensorrt-migration",
    productLabel: "TensorRT",
    title: "TensorRT 10 migration breaking example code",
    description: "Python examples reference deprecated APIs from version 8.",
  },
  {
    id: "w-triton-config",
    productLabel: "Triton",
    title: "Triton model repository structure confusion",
    description: "Users asking where config.pbtxt should live in their project.",
  },
  {
    id: "w-rapids-memory",
    productLabel: "RAPIDS",
    title: "cuDF GPU out-of-memory errors on large dataframes",
    description: "Memory management guidance may need better signposting.",
  },
  {
    id: "w-cuda-windows",
    productLabel: "CUDA",
    title: "CUDA runtime version mismatch warnings on Windows",
    description: "Two user reports this week about version conflicts.",
  },
  {
    id: "w-bionemo-smiles",
    productLabel: "BioNeMo",
    title: "SMILES input format preprocessing confusion",
    description: "Forum threads about input preprocessing are accumulating.",
  },
  {
    id: "w-dgx-billing",
    productLabel: "DGX Cloud",
    title: "DGX Cloud billing documentation gaps",
    description: "Users asking about per-node pricing in the quickstart.",
  },
]

// --- Helpers ---
function findInsightAndProduct(action: ActionItem): { insight: Insight; product: Product } | null {
  const product = products.find(p => p.id === action.productId)
  if (!product) return null
  const insight = product.insights.find(i => i.id === action.insightId)
  if (!insight) return null
  return { insight, product }
}

const availableProductsFallback = [
  { id: "cuda-x", name: "CUDA-X" }, { id: "hpc-sdk", name: "HPC SDK" },
  { id: "base-command", name: "Base Command" }, { id: "fleet-command", name: "Fleet Command" },
  { id: "clara", name: "Clara" }, { id: "monai", name: "MONAI" },
  { id: "megatron", name: "Megatron" }, { id: "tensorrt-llm", name: "TensorRT-LLM" },
  { id: "metropolis", name: "Metropolis" }, { id: "jetpack", name: "JetPack SDK" },
  { id: "dali", name: "DALI" }, { id: "cudf", name: "cuDF" },
  { id: "drive-sim", name: "DRIVE Sim" }, { id: "drive-os", name: "DRIVE OS" },
  { id: "driveworks", name: "DriveWorks SDK" },
  { id: "tensorrt", name: "TensorRT" }, { id: "deepstream", name: "DeepStream SDK" },
  { id: "triton", name: "Triton Inference Server" }, { id: "rapids", name: "RAPIDS" },
  { id: "omniverse", name: "Omniverse" }, { id: "isaac-sim", name: "Isaac Sim" },
  { id: "nemo-framework", name: "NeMo Framework" }, { id: "cuquantum", name: "cuQuantum" },
  { id: "drive-agx", name: "DRIVE AGX" }, { id: "nemo-llm", name: "NeMo LLM" },
]

const productNameMap: Record<string, string> = Object.fromEntries(
  [...products, ...availableProductsFallback].map(p => [p.id, p.name])
)

function getProductName(id: string): string {
  return productNameMap[id] ?? id
}

// --- Metric Block ---
function Metric({ metric }: { metric: ActionMetric }) {
  const valueColor = metric.tone === "destructive" ? "text-destructive-foreground" : "text-foreground"

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {metric.label}
      </p>
      <div className={`flex items-center gap-1 text-heading font-bold leading-tight ${valueColor}`}>
        {metric.trend === "down" && (
          <i className="ri-arrow-down-line" style={{ fontSize: "20px" }} />
        )}
        {metric.trend === "up" && (
          <i className="ri-arrow-up-line" style={{ fontSize: "20px" }} />
        )}
        <span>{metric.value}</span>
      </div>
      {metric.badge && (
        <div>
          <Badge variant="success" className="text-xs">{metric.badge}</Badge>
        </div>
      )}
    </div>
  )
}

// --- Insight Panel (Details drawer) ---
function InsightPanel({
  action, insight, product, onWatch,
}: {
  action: ActionItem
  insight: Insight
  product: Product
  onWatch?: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Assessment</p>
        <h3 className="text-heading-sm font-semibold text-foreground">{action.title}</h3>
        <p className="text-sm text-muted-foreground">{action.description}</p>
      </div>
      {action.metrics.length > 0 && (
        <div className="flex items-start gap-8 pt-1">
          {action.metrics.map((m, i) => (
            <Metric key={i} metric={m} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {onWatch && (
          <Button variant="default" onClick={onWatch}>
            <i className="ri-eye-line" style={{ fontSize: "14px" }} /> Watch
          </Button>
        )}
        <Button variant="default">
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
          <Link key={page.id} to={`/products/${product.id}/pages/${page.id}`} className="text-sm text-primary hover:underline block">{page.title}</Link>
        ))}
      </section>
    </div>
  )
}

// --- Actions Menu (three-dot) ---
function ActionsMenu({ onDismiss }: { onDismiss: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="More actions"
        onClick={(e) => e.stopPropagation()}
      >
        <i className="ri-more-2-line" style={{ fontSize: "18px" }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onDismiss}>I resolved this issue</DropdownMenuItem>
        <DropdownMenuItem onClick={onDismiss}>This is irrelevant</DropdownMenuItem>
        <DropdownMenuItem onClick={onDismiss}>This isn't a problem anymore</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// --- Action Card (Top 5) ---
function ActionCard({
  action, exiting, onDetails, onWatch, onDismiss,
}: {
  action: ActionItem
  exiting: boolean
  onDetails: () => void
  onWatch: () => void
  onDismiss: () => void
}) {
  return (
    <div
      className={`transition-all duration-300 ${
        exiting ? "opacity-0 scale-95 -translate-x-2 max-h-0 overflow-hidden" : "opacity-100 scale-100 max-h-[400px]"
      }`}
    >
      <Card>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-heading-sm font-semibold text-foreground">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
            <ActionsMenu onDismiss={onDismiss} />
          </div>

          <div className="flex items-end justify-between gap-4 mt-6">
            <div className="flex items-start gap-8">
              {action.metrics.map((m, i) => (
                <Metric key={i} metric={m} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={onDetails}>Details</Button>
              <Button variant="secondary" onClick={onWatch}>
                <i className="ri-eye-line" style={{ fontSize: "14px" }} />
                Watch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Compact Watched Card (inside Watching drawer) ---
function WatchedCard({
  item, onUnwatch,
}: {
  item: WatchedItem
  onUnwatch: () => void
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.productLabel}</p>
            <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </div>
          <ActionsMenu onDismiss={onUnwatch} />
        </div>
        <div className="flex items-center justify-end gap-2 mt-3">
          <Button variant="secondary" size="default">Details</Button>
          <Button variant="secondary" size="default" onClick={onUnwatch}>
            <i className="ri-eye-fill" style={{ fontSize: "14px" }} />
            Watching
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Watching Panel (inside drawer) ---
function WatchingPanel({ items, onUnwatch }: { items: WatchedItem[]; onUnwatch: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Watching</p>
        <h3 className="text-heading-sm font-semibold text-foreground mt-1">
          {items.length} issue{items.length === 1 ? "" : "s"} you're tracking
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Things you want to monitor but haven't prioritized as a top action yet.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <WatchedCard key={item.id} item={item} onUnwatch={() => onUnwatch(item.id)} />
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">Nothing being watched right now.</p>
        )}
      </div>
    </div>
  )
}

// --- Page ---
export function MyProducts() {
  const [subscribedIds] = useSubscribedProductIds()
  const [filter, setFilter] = useState<string>("all")
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null)
  const [watchingOpen, setWatchingOpen] = useState(false)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [watchedActionIds, setWatchedActionIds] = useState<string[]>([])
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set())
  const [badgePulsing, setBadgePulsing] = useState(false)

  const filterLabels = [
    { value: "all", label: "All My Products" },
    ...subscribedIds.map(id => ({ value: id, label: getProductName(id) })),
  ]

  const pool = actions.filter(a =>
    subscribedIds.includes(a.productId) &&
    !dismissedIds.has(a.id) &&
    !watchedActionIds.includes(a.id)
  )
  const filteredPool = filter === "all" ? pool : pool.filter(a => a.productId === filter)
  const visibleActions = filteredPool.slice(0, 5)

  const watchedActionItems: WatchedItem[] = watchedActionIds.map(id => {
    const action = actions.find(a => a.id === id)
    return action
      ? {
          id: action.id,
          productLabel: getProductName(action.productId),
          title: action.title,
          description: action.description,
        }
      : null
  }).filter((x): x is WatchedItem => x !== null)

  const watchingItems = [...watchedActionItems, ...initialWatchedItems]
  const watchingCount = watchingItems.length

  const drawerData = selectedAction ? findInsightAndProduct(selectedAction) : null

  function openDetails(action: ActionItem) {
    setWatchingOpen(false)
    setSelectedAction(action)
  }

  function closeDetails() {
    setSelectedAction(null)
  }

  function openWatching() {
    setSelectedAction(null)
    setWatchingOpen(true)
  }

  function closeWatching() {
    setWatchingOpen(false)
  }

  function handleWatch(action: ActionItem) {
    setExitingIds(prev => new Set(prev).add(action.id))
    setTimeout(() => {
      setWatchedActionIds(prev => [action.id, ...prev])
      setExitingIds(prev => {
        const next = new Set(prev)
        next.delete(action.id)
        return next
      })
      setBadgePulsing(true)
      setTimeout(() => setBadgePulsing(false), 450)
    }, 300)
  }

  function handleDismiss(action: ActionItem) {
    setExitingIds(prev => new Set(prev).add(action.id))
    setTimeout(() => {
      setDismissedIds(prev => new Set(prev).add(action.id))
      setExitingIds(prev => {
        const next = new Set(prev)
        next.delete(action.id)
        return next
      })
    }, 300)
  }

  function handleUnwatch(itemId: string) {
    if (watchedActionIds.includes(itemId)) {
      setWatchedActionIds(prev => prev.filter(id => id !== itemId))
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-6">
        <PageHeader
          eyebrow="My Products"
          title="Top 5 Things"
          description="The 5 things you can do this week to create the most impact."
        />

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <Tabs value={filter} onValueChange={(v) => setFilter(v)}>
              <TabsList variant="pill">
                {filterLabels.map(f => (
                  <TabsTrigger key={f.value} value={f.value}>{f.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button
              variant="secondary"
              onClick={watchingOpen ? closeWatching : openWatching}
              aria-expanded={watchingOpen}
            >
              <i className="ri-eye-line" style={{ fontSize: "14px" }} />
              Watching
              <Badge
                variant="default"
                className={`ml-1 transition-colors duration-300 ${
                  badgePulsing ? "!bg-primary !text-primary-foreground" : ""
                }`}
              >
                {watchingCount}
              </Badge>
            </Button>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {visibleActions.map(action => (
              <ActionCard
                key={action.id}
                action={action}
                exiting={exitingIds.has(action.id)}
                onDetails={() => openDetails(action)}
                onWatch={() => handleWatch(action)}
                onDismiss={() => handleDismiss(action)}
              />
            ))}
            {visibleActions.length === 0 && (
              <p className="text-sm text-muted-foreground">No actions for this product right now.</p>
            )}
          </div>
        </section>
      </div>

      <InlineDrawer open={selectedAction !== null} onClose={closeDetails}>
        {drawerData && selectedAction && (
          <InsightPanel
            action={selectedAction}
            insight={drawerData.insight}
            product={drawerData.product}
            onWatch={() => {
              const a = selectedAction
              closeDetails()
              handleWatch(a)
            }}
          />
        )}
      </InlineDrawer>

      <InlineDrawer open={watchingOpen} onClose={closeWatching}>
        <WatchingPanel items={watchingItems} onUnwatch={handleUnwatch} />
      </InlineDrawer>
    </div>
  )
}
