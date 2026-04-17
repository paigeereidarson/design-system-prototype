import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { PageHeader } from "@/components/custom/PageHeader"
import {
  products,
  statusToBadgeVariant,
  type Insight,
  type Product,
} from "@/data/mock-products"

// --- Types ---
type ProductFilter = "all" | "cuda" | "nemo-llm" | "dgx-cloud" | "bionemo"

interface ActionMetric {
  label: string
  value: string
  tone?: "destructive" | "default"
  trend?: "down" | "up"
  badge?: string
}

interface ActionItem {
  id: string
  productId: Exclude<ProductFilter, "all">
  insightId: string
  title: string
  description: string
  metrics: ActionMetric[]
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
]

// --- Helpers ---
function findInsightAndProduct(action: ActionItem): { insight: Insight; product: Product } | null {
  const product = products.find(p => p.id === action.productId)
  if (!product) return null
  const insight = product.insights.find(i => i.id === action.insightId)
  if (!insight) return null
  return { insight, product }
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

// --- Insight Detail Drawer ---
function InsightDrawer({ insight, product, open, onClose }: {
  insight: Insight | null; product: Product | null; open: boolean; onClose: () => void
}) {
  if (!insight || !product) return null
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:!max-w-lg overflow-y-auto">
        <SheetHeader>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Assessment</p>
          <SheetTitle className="text-heading-sm font-semibold">{insight.summary}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 pb-6">
          <div className="flex gap-2">
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
      </SheetContent>
    </Sheet>
  )
}

// --- Action Card ---
function ActionCard({ action, onDetails }: { action: ActionItem; onDetails: () => void }) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h3 className="text-heading-sm font-semibold text-foreground">{action.title}</h3>
          <p className="text-sm text-muted-foreground">{action.description}</p>
        </div>

        <div className="flex items-end justify-between gap-4 mt-6">
          <div className="flex items-start gap-8">
            {action.metrics.map((m, i) => (
              <Metric key={i} metric={m} />
            ))}
          </div>
          <Button variant="secondary" onClick={onDetails}>Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Page ---
const filterLabels: { value: ProductFilter; label: string }[] = [
  { value: "all", label: "All My Products" },
  { value: "cuda", label: "CUDA" },
  { value: "nemo-llm", label: "NeMo LLM" },
  { value: "dgx-cloud", label: "DGX Cloud" },
  { value: "bionemo", label: "BioNeMo" },
]

export function MyProducts() {
  const [filter, setFilter] = useState<ProductFilter>("all")
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null)

  const filtered = filter === "all"
    ? actions
    : actions.filter(a => a.productId === filter)

  const drawerData = selectedAction ? findInsightAndProduct(selectedAction) : null

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="My Products"
        title="Top 5 Things"
        description="The 5 things you can do this week to create the most impact."
      />

      <section className="flex flex-col gap-3">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as ProductFilter)}>
          <TabsList variant="pill">
            {filterLabels.map(f => (
              <TabsTrigger key={f.value} value={f.value}>{f.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-3 mt-2">
          {filtered.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              onDetails={() => setSelectedAction(action)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">No actions for this product right now.</p>
          )}
        </div>
      </section>

      <InsightDrawer
        insight={drawerData?.insight ?? null}
        product={drawerData?.product ?? null}
        open={selectedAction !== null}
        onClose={() => setSelectedAction(null)}
      />
    </div>
  )
}
