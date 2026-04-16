import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PageHeader } from "@/components/custom/PageHeader"
import {
  allProductsCards,
  healthScoreTextClass,
  healthScoreBgClass,
  type AllProductCard,
} from "@/data/mock-products"

// --- Inline SVG Sparkline (muted) ---
function Sparkline({ data }: { data: number[] }) {
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

// --- Product Card ---
function ProductCard({ product }: { product: AllProductCard }) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer transition-colors hover:border-primary/30"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardContent>
        {/* Title row — no badge */}
        <h3 className="text-heading-sm font-semibold text-foreground mb-4">{product.name}</h3>

        <div className="grid grid-cols-[1fr_1fr_2fr] gap-4">
          {/* Zone 1: Overall Health */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Overall Health
            </p>
            <div className="flex items-center gap-2">
              <p className={`text-decorative font-bold leading-none ${healthScoreTextClass(product.healthScore)}`}>
                {product.healthScore}
              </p>
              <Sparkline data={product.healthHistory} />
            </div>
            <div className="h-1 w-full rounded-full bg-muted overflow-hidden mt-1">
              <div
                className={`h-full rounded-full ${healthScoreBgClass(product.healthScore)}`}
                style={{ width: `${product.healthScore}%` }}
              />
            </div>
          </div>

          {/* Zone 2: Improvements identified */}
          <div className="flex flex-col gap-2 border-l border-border pl-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Improvements identified
            </p>
            <p className="text-decorative font-bold text-foreground leading-none">
              {product.improvementsIdentified}
            </p>
          </div>

          {/* Zone 3: Summary with left border accent */}
          <div className="border-l border-muted-foreground pl-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Summary
            </p>
            <p className="text-sm font-medium text-muted-foreground">{product.summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type SortOption = "actionable" | "improvements" | "alphabetical"

export function Home() {
  const [sort, setSort] = useState<SortOption>("actionable")
  const [search, setSearch] = useState("")

  const filtered = allProductsCards.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "actionable") return a.healthScore - b.healthScore
    if (sort === "improvements") return b.improvementsIdentified - a.improvementsIdentified
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="All Products"
        description="Documentation health across your saved products. Last updated April 16, 2026."
      />

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="h-8 w-auto gap-1 border-0 bg-transparent px-2 text-sm font-medium text-foreground shadow-none hover:bg-secondary focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actionable">Most actionable</SelectItem>
                <SelectItem value="improvements">Most improvements</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full max-w-xs">
            <i
              className="ri-search-line pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              style={{ fontSize: "16px" }}
            />
            <Input
              placeholder="Search product..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {sorted.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">No products match that search.</p>
          )}
        </div>
      </section>
    </div>
  )
}
