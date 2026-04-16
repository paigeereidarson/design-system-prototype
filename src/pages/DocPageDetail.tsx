import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/custom/PageHeader"
import {
  products,
  statusToLabel,
  trendToLabel,
  priorityToLabel,
} from "@/data/mock-products"

export function DocPageDetail() {
  const { id, pageId } = useParams<{ id: string; pageId: string }>()
  const navigate = useNavigate()

  const product = products.find(p => p.id === id)
  const page = product?.pages.find(p => p.id === pageId)

  if (!product || !page) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Page not found.</p>
        <button onClick={() => navigate("/")} className="text-sm text-primary hover:underline">Back to overview</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back to product */}
      <button
        onClick={() => navigate(`/products/${product.id}`)}
        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
      >
        <i className="ri-arrow-left-line" style={{ fontSize: "14px" }} />
        Back to {product.name}
      </button>

      {/* Page header */}
      <PageHeader
        eyebrow={product.name}
        title={page.title}
        description={page.url}
      >
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{statusToLabel(page.status)}</p>
          <p className="text-xs text-muted-foreground">{trendToLabel(page.trend)}</p>
        </div>
      </PageHeader>

      {/* Actionable Insights */}
      {page.insights.length > 0 && (
        <section>
          <h2 className="text-heading font-semibold text-foreground mb-1">Actionable Insights</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Issues with a known solution based on current data.
          </p>
          <div className="flex flex-col gap-3">
            {page.insights.map(insight => (
              <Card key={insight.id}>
                <CardContent className="py-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {priorityToLabel(insight.priority)}
                  </p>
                  <p className="text-sm font-medium text-foreground mb-3">{insight.summary}</p>

                  <Separator className="my-3" />

                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Solution</p>
                  <p className="text-sm text-foreground mb-3">{insight.solution}</p>

                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Evidence</p>
                  <p className="text-sm text-muted-foreground">{insight.evidence}</p>

                  <Separator className="my-3" />

                  <p className="text-xs text-muted-foreground">Assign to Jira</p>
                  <p className="text-xs text-muted-foreground mt-1">Watch this issue</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Change History */}
      <section>
        <h2 className="text-heading font-semibold text-foreground mb-4">Change History</h2>
        <Card>
          <CardContent className="py-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Last Updated</p>
              <p className="text-sm text-foreground">{page.lastUpdated}</p>
            </div>
            <Separator className="mb-3" />
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Updated By</p>
              <p className="text-sm text-foreground">{page.lastUpdatedBy}</p>
            </div>
            <Separator className="mb-3" />
            <div className="flex justify-between items-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Status</p>
              <p className="text-sm text-foreground">{statusToLabel(page.status)}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Visits */}
      <section>
        <h2 className="text-heading font-semibold text-foreground mb-4">Visits</h2>
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground text-center">
              Visit-level data will be available when page analytics are connected.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
