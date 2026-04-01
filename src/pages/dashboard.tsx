import { useState } from "react"
import {
  MessageSquareText,
  Star,
  TrendingUp,
  Users,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SidebarNav } from "@/components/custom/sidebar-nav"
import { MobileNav } from "@/components/custom/mobile-nav"
import { StatCard } from "@/components/custom/stat-card"
import { FeedbackCard } from "@/components/custom/feedback-card"
import { feedbackData, stats } from "@/data/mock-feedback"
import type { Sentiment } from "@/data/mock-feedback"

function filterFeedback(tab: string) {
  if (tab === "all") return feedbackData
  return feedbackData.filter((f) => f.sentiment === (tab as Sentiment))
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const filtered = filterFeedback(activeTab)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar — hidden on mobile */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border md:block">
        <SidebarNav className="h-full" />
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-border px-4 py-3 md:px-6">
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-4">
            <h1 className="text-lg font-semibold">Customer Feedback</h1>
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8"
              />
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex flex-col gap-6 p-4 md:p-6">
          {/* Stats row */}
          <section aria-label="Summary statistics">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Feedback"
                value={stats.totalFeedback}
                description="All time responses"
                icon={MessageSquareText}
              />
              <StatCard
                title="Average Rating"
                value={`${stats.averageRating}/5`}
                description="Across all feedback"
                icon={Star}
              />
              <StatCard
                title="Positive Rate"
                value={`${stats.positiveRate}%`}
                description="Positive sentiment"
                icon={TrendingUp}
              />
              <StatCard
                title="Response Rate"
                value={`${stats.responseRate}%`}
                description="Replies sent"
                icon={Users}
              />
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
      </main>
    </div>
  )
}
