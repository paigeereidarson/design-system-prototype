import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RiSearchLine, RiAddLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AppShell } from "@/components/custom/app-shell"
import { MetricCard } from "@/components/custom/metric-card"
import { FeedbackCard } from "@/components/custom/feedback-card"
import { feedbackData, metricCards } from "@/data/mock-feedback"
import type { Sentiment } from "@/data/mock-feedback"

function filterFeedback(tab: string) {
  if (tab === "all") return feedbackData
  return feedbackData.filter((f) => f.sentiment === (tab as Sentiment))
}

export function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("all")
  const filtered = filterFeedback(activeTab)

  return (
    <AppShell
      topBar={
        <div className="flex flex-1 items-center justify-between gap-4">
          <h1 className="text-lg font-semibold">Customer Feedback</h1>
          <div className="flex items-center gap-3">
            <div className="relative w-full max-w-xs">
              <RiSearchLine className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8"
              />
            </div>
            <Button onClick={() => navigate("/create-issue")}>
              <RiAddLine className="mr-1 size-4" />
              Create Issue
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Metric cards row */}
        <section aria-label="Key metrics">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((card) => (
              <MetricCard key={card.company} data={card} />
            ))}
          </div>
        </section>

        {/* Feedback section with tabs */}
        <section aria-label="Feedback entries">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => setActiveTab(value as string)}
          >
            <TabsList variant="line">
              <TabsTrigger value="all">
                All ({feedbackData.length})
              </TabsTrigger>
              <TabsTrigger value="positive">
                Positive ({feedbackData.filter((f) => f.sentiment === "positive").length})
              </TabsTrigger>
              <TabsTrigger value="neutral">
                Neutral ({feedbackData.filter((f) => f.sentiment === "neutral").length})
              </TabsTrigger>
              <TabsTrigger value="negative">
                Negative ({feedbackData.filter((f) => f.sentiment === "negative").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </AppShell>
  )
}
