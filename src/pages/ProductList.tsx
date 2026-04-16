import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  productCategories,
  statusToLabel,
  trendToLabel,
  priorityToLabel,
  type Product,
} from "@/data/mock-products"

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate()
  const topInsight = product.insights.find(i => i.priority === "must-fix") ?? product.insights[0]

  return (
    <Card
      className="cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardContent>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-heading-sm font-semibold text-foreground">{product.name}</h3>
          <div className="text-right shrink-0">
            <p className="text-sm font-medium text-foreground">{statusToLabel(product.overallStatus)}</p>
            <p className="text-xs text-muted-foreground">{trendToLabel(product.trend)}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{product.assessment}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Sentiment</p>
            <p className="text-sm text-foreground">{statusToLabel(product.dimensions.sentiment.status)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Repo Health</p>
            <p className="text-sm text-foreground">{statusToLabel(product.dimensions.repoHealth.status)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dev Forum</p>
            <p className="text-sm text-foreground">{statusToLabel(product.dimensions.devForum.status)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Survey Feedback</p>
            <p className="text-sm text-foreground">{statusToLabel(product.dimensions.surveyFeedback.status)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Traffic</p>
            <p className="text-sm text-foreground">{statusToLabel(product.dimensions.traffic.status)}</p>
          </div>
        </div>

        {topInsight && (
          <>
            <Separator className="mb-3" />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {priorityToLabel(topInsight.priority)}
            </p>
            <p className="text-sm text-foreground">{topInsight.summary}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export function ProductList() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          Documentation Health
        </p>
        <h1 className="text-title font-semibold text-foreground">My Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Showing health across your saved products. Last updated April 13, 2026.
        </p>
      </section>

      <section className="flex items-center gap-3">
        <div className="relative w-full max-w-xs">
          <i className="ri-search-line pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: "16px" }} />
          <Input placeholder="Search products..." className="pl-8" />
        </div>
        <span className="text-xs text-muted-foreground">Time range: Last 30 days</span>
      </section>

      {productCategories.map(category => (
        <section key={category.name} className="flex flex-col gap-4">
          <h2 className="text-heading font-semibold text-foreground">{category.name}</h2>
          <div className="flex flex-col gap-3">
            {category.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
