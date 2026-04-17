import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from "recharts"

// --- Types ---
interface KpiTile {
  label: string
  value: string
  change: string
  trendType: "positive" | "negative" | "neutral"
}

type DataTab = "usefulness" | "findability" | "attractiveness" | "popularity" | "errors"
type TimeRange = "all" | "7d" | "30d"

// --- KPI Data per tab × time range ---
const kpiData: Record<DataTab, Record<TimeRange, KpiTile[]>> = {
  usefulness: {
    all: [
      { label: "Total Pages", value: "4,832", change: "+203 new (4.2%)", trendType: "neutral" },
      { label: "Avg Session Duration", value: "2m 14s", change: "−0:18 vs last period", trendType: "neutral" },
      { label: "Avg Pages Per Session", value: "3.1 pages", change: "+0.4 vs last period", trendType: "positive" },
      { label: "Survey Engagement Rate", value: "1.8%", change: "−0.3% vs last period", trendType: "neutral" },
    ],
    "30d": [
      { label: "Total Pages", value: "4,832", change: "+41 new this month", trendType: "neutral" },
      { label: "Avg Session Duration", value: "2m 08s", change: "−0:24 vs prior 30d", trendType: "neutral" },
      { label: "Avg Pages Per Session", value: "3.3 pages", change: "+0.6 vs prior 30d", trendType: "positive" },
      { label: "Survey Engagement Rate", value: "2.1%", change: "+0.3% vs prior 30d", trendType: "positive" },
    ],
    "7d": [
      { label: "Total Pages", value: "4,832", change: "+8 new this week", trendType: "neutral" },
      { label: "Avg Session Duration", value: "1m 52s", change: "−0:36 vs prior 7d", trendType: "neutral" },
      { label: "Avg Pages Per Session", value: "3.5 pages", change: "+0.8 vs prior 7d", trendType: "positive" },
      { label: "Survey Engagement Rate", value: "2.4%", change: "+0.6% vs prior 7d", trendType: "positive" },
    ],
  },
  findability: {
    all: [
      { label: "Hard to Find Pages", value: "312", change: "+47 vs last period", trendType: "negative" },
      { label: "Unappealing Pages", value: "189", change: "−22 vs last period", trendType: "negative" },
      { label: "Popular Pages", value: "634", change: "+81 vs last period", trendType: "positive" },
      { label: "Unuseful Pages", value: "271", change: "+33 vs last period", trendType: "negative" },
    ],
    "30d": [
      { label: "Hard to Find Pages", value: "87", change: "+12 vs prior 30d", trendType: "negative" },
      { label: "Unappealing Pages", value: "34", change: "−8 vs prior 30d", trendType: "negative" },
      { label: "Popular Pages", value: "148", change: "+19 vs prior 30d", trendType: "positive" },
      { label: "Unuseful Pages", value: "62", change: "+5 vs prior 30d", trendType: "negative" },
    ],
    "7d": [
      { label: "Hard to Find Pages", value: "23", change: "+4 vs prior 7d", trendType: "negative" },
      { label: "Unappealing Pages", value: "9", change: "−3 vs prior 7d", trendType: "negative" },
      { label: "Popular Pages", value: "38", change: "+6 vs prior 7d", trendType: "positive" },
      { label: "Unuseful Pages", value: "14", change: "+1 vs prior 7d", trendType: "negative" },
    ],
  },
  attractiveness: {
    all: [
      { label: "Negative Feedback", value: "2,847", change: "+634 vs last period", trendType: "negative" },
      { label: "Site Satisfaction", value: "3.2 / 5", change: "−0.4 vs last period", trendType: "neutral" },
      { label: "Logged Issues", value: "143", change: "+31 vs last period", trendType: "neutral" },
      { label: "Unuseful Pages", value: "271", change: "+33 vs last period", trendType: "negative" },
    ],
    "30d": [
      { label: "Negative Feedback", value: "482", change: "+98 vs prior 30d", trendType: "negative" },
      { label: "Site Satisfaction", value: "3.0 / 5", change: "−0.2 vs prior 30d", trendType: "neutral" },
      { label: "Logged Issues", value: "24", change: "+8 vs prior 30d", trendType: "neutral" },
      { label: "Unuseful Pages", value: "62", change: "+5 vs prior 30d", trendType: "negative" },
    ],
    "7d": [
      { label: "Negative Feedback", value: "127", change: "+34 vs prior 7d", trendType: "negative" },
      { label: "Site Satisfaction", value: "2.8 / 5", change: "−0.4 vs prior 7d", trendType: "neutral" },
      { label: "Logged Issues", value: "6", change: "+2 vs prior 7d", trendType: "neutral" },
      { label: "Unuseful Pages", value: "14", change: "+1 vs prior 7d", trendType: "negative" },
    ],
  },
  popularity: {
    all: [
      { label: "North America", value: "61%", change: "+2% vs last period", trendType: "neutral" },
      { label: "APAC", value: "22%", change: "−1% vs last period", trendType: "neutral" },
      { label: "EMEA", value: "14%", change: "flat", trendType: "neutral" },
      { label: "Other", value: "3%", change: "−1% vs last period", trendType: "neutral" },
    ],
    "30d": [
      { label: "North America", value: "63%", change: "+3% vs prior 30d", trendType: "neutral" },
      { label: "APAC", value: "20%", change: "−2% vs prior 30d", trendType: "neutral" },
      { label: "EMEA", value: "14%", change: "flat", trendType: "neutral" },
      { label: "Other", value: "3%", change: "flat", trendType: "neutral" },
    ],
    "7d": [
      { label: "North America", value: "59%", change: "−2% vs prior 7d", trendType: "neutral" },
      { label: "APAC", value: "24%", change: "+3% vs prior 7d", trendType: "neutral" },
      { label: "EMEA", value: "14%", change: "+1% vs prior 7d", trendType: "neutral" },
      { label: "Other", value: "3%", change: "flat", trendType: "neutral" },
    ],
  },
  errors: {
    all: [
      { label: "Broken Links", value: "3", change: "+3 vs last period", trendType: "negative" },
      { label: "404 Exits", value: "218", change: "+54 vs last period", trendType: "negative" },
      { label: "Avg Time to 404", value: "12s", change: "+2s vs last period", trendType: "negative" },
      { label: "Error-Flagged Pages", value: "9", change: "+2 from prior period", trendType: "negative" },
    ],
    "30d": [
      { label: "Broken Links", value: "3", change: "+3 this month", trendType: "negative" },
      { label: "404 Exits", value: "72", change: "+18 vs prior 30d", trendType: "negative" },
      { label: "Avg Time to 404", value: "14s", change: "+4s vs prior 30d", trendType: "negative" },
      { label: "Error-Flagged Pages", value: "4", change: "+1 from prior 30d", trendType: "negative" },
    ],
    "7d": [
      { label: "Broken Links", value: "3", change: "no change this week", trendType: "neutral" },
      { label: "404 Exits", value: "24", change: "+6 vs prior 7d", trendType: "negative" },
      { label: "Avg Time to 404", value: "11s", change: "−1s vs prior 7d", trendType: "neutral" },
      { label: "Error-Flagged Pages", value: "2", change: "flat", trendType: "neutral" },
    ],
  },
}

// --- Trend Arrow ---
function TrendArrow({ change, trendType }: { change: string; trendType: string }) {
  const isUp = change.startsWith("+")
  const isDown = change.startsWith("−") || change.startsWith("-")
  if (!isUp && !isDown) return <i className="ri-subtract-line text-muted-foreground" style={{ fontSize: "18px" }} />

  if (trendType === "neutral") {
    const icon = isUp ? "ri-arrow-up-line" : "ri-arrow-down-line"
    return <i className={`${icon} text-muted-foreground`} style={{ fontSize: "18px" }} />
  }

  const isGood = trendType === "negative" ? isDown : isUp
  const color = isGood ? "text-success-foreground" : "text-destructive-foreground"
  const icon = isUp ? "ri-arrow-up-line" : "ri-arrow-down-line"
  return <i className={`${icon} ${color}`} style={{ fontSize: "18px" }} />
}

// --- KPI Tile ---
function KpiTileCard({ tile }: { tile: KpiTile }) {
  return (
    <Card className="flex-1">
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{tile.label}</p>
          <TrendArrow change={tile.change} trendType={tile.trendType} />
        </div>
        <p className="text-heading font-bold text-foreground leading-tight">{tile.value}</p>
        <p className="text-xs text-muted-foreground mt-1">{tile.change}</p>
      </CardContent>
    </Card>
  )
}

// --- Usefulness Chart (Line) ---
const trafficData = [
  { month: "Jan", visits: 380000, newPages: 42 },
  { month: "Feb", visits: 290000, newPages: 38 },
  { month: "Mar", visits: 420000, newPages: 61 },
  { month: "Apr", visits: 395000, newPages: 45 },
  { month: "May", visits: 410000, newPages: 52 },
  { month: "Jun", visits: 430000, newPages: 48 },
]

const trafficConfig = {
  visits: { label: "Total Visits", color: "#76B900" },
  newPages: { label: "New Pages Published", color: "#76B900" },
}

function TrafficChart() {
  return (
    <div className="flex flex-col gap-3">
      <ChartContainer config={trafficConfig} className="h-[240px] w-full">
        <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} style={{ stroke: "hsl(var(--border))", strokeOpacity: 0.8 }} />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis yAxisId="left" className="text-xs" tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
          <YAxis yAxisId="right" orientation="right" className="text-xs" />
          <ChartTooltip content={<ChartTooltipContent className="min-w-[220px] text-left" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line yAxisId="left" type="monotone" dataKey="visits" stroke="var(--color-visits)" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="newPages" stroke="var(--color-newPages)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
        </LineChart>
      </ChartContainer>
      <p className="text-xs text-muted-foreground italic">Note: Shorter sessions can indicate documentation success — users found what they needed quickly.</p>
    </div>
  )
}

// --- Findability Chart (left-aligned horizontal bars) ---
const findabilityData = [
  { category: "Healthy", count: 3426, pct: 70.9, fill: "#76B900" },
  { category: "Popular", count: 634, pct: 13.1, fill: "#76B900" },
  { category: "Hard to Find", count: 312, pct: 6.5, fill: "#76B900" },
  { category: "Unuseful", count: 271, pct: 5.6, fill: "#76B900" },
  { category: "Unappealing", count: 189, pct: 3.9, fill: "#76B900" },
]

const findabilityConfig = {
  count: { label: "Pages" },
}

function FindabilityChart() {
  return (
    <ChartContainer config={findabilityConfig} className="h-[240px] w-full">
      <BarChart data={findabilityData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} style={{ stroke: "hsl(var(--border))", strokeOpacity: 0.8 }} />
        <XAxis type="number" className="text-xs" />
        <YAxis type="category" dataKey="category" className="text-xs" width={90} />
        <ChartTooltip content={<ChartTooltipContent formatter={(value, _name, item) => `${value} pages (${item.payload.pct}%)`} />} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {findabilityData.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

// --- Attractiveness Funnel ---
const funnelData = [
  { step: "Negative Feedback", value: 2847, pct: "100%", fill: "#76B900" },
  { step: "Logged in JIRA", value: 143, pct: "5.0%", fill: "#76B900" },
  { step: "Resolved", value: 67, pct: "2.4%", fill: "#76B900" },
]

const funnelConfig = {
  value: { label: "Count" },
}

function FeedbackFunnel() {
  return (
    <div className="flex flex-col gap-3">
      <ChartContainer config={funnelConfig} className="h-[240px] w-full">
        <BarChart data={funnelData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} style={{ stroke: "hsl(var(--border))", strokeOpacity: 0.8 }} />
          <XAxis dataKey="step" className="text-xs" />
          <YAxis className="text-xs" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {funnelData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
            <LabelList dataKey="pct" position="top" className="text-xs fill-muted-foreground" />
          </Bar>
        </BarChart>
      </ChartContainer>
      <Button variant="default" className="w-fit">
        Open in JIRA
        <i className="ri-arrow-right-up-line" style={{ fontSize: "14px" }} />
      </Button>
    </div>
  )
}

// --- Popularity Panel ---
const searchData = [
  { query: "cuda install windows", url: "/cuda/install/windows", volume: 8421 },
  { query: "tensorrt getting started", url: "/tensorrt/quickstart", volume: 6103 },
  { query: "nemo framework setup", url: null, volume: 4872 },
  { query: "triton inference server", url: "/triton/overview", volume: 3914 },
  { query: "cuda version compatibility", url: "/cuda/release-notes", volume: 3201 },
  { query: "deepstream pipeline", url: null, volume: 2788 },
  { query: "tensorrt python api", url: "/tensorrt/api/python", volume: 2340 },
  { query: "cuda out of memory error", url: "/cuda/troubleshoot", volume: 1987 },
]

const regionData = [
  { region: "North America", pct: 61 },
  { region: "APAC", pct: 22 },
  { region: "EMEA", pct: 14 },
  { region: "Other", pct: 3 },
]

const regionConfig = {
  pct: { label: "% of visitors", color: "#76B900" },
}

function DiscoveryPanel() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Top Search Queries</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Query</TableHead>
              <TableHead className="text-xs">Chosen URL</TableHead>
              <TableHead className="text-xs text-right">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchData.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs font-medium">{row.query}</TableCell>
                <TableCell className="text-xs">
                  {row.url ? (
                    <span className="text-muted-foreground">{row.url}</span>
                  ) : (
                    <Badge variant="critical" className="text-xs">No result — exited</Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-right">{row.volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Visitors by Region</p>
        <ChartContainer config={regionConfig} className="h-[240px] w-full">
          <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 40, left: 0, bottom: 5 }}>
            <XAxis type="number" className="text-xs" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="region" className="text-xs" width={90} />
            <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
            <Bar dataKey="pct" fill="var(--color-pct)" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="pct" position="right" className="text-xs fill-foreground" formatter={(v) => `${v}%`} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

// --- Errors Chart (bar) ---
const errorsData = [
  { category: "Broken Links", count: 3, fill: "#76B900" },
  { category: "404 Exits", count: 218, fill: "#76B900" },
  { category: "Stale Pages", count: 9, fill: "#76B900" },
  { category: "Missing Metadata", count: 14, fill: "#76B900" },
]

const errorsConfig = {
  count: { label: "Count" },
}

function ErrorsChart() {
  return (
    <ChartContainer config={errorsConfig} className="h-[240px] w-full">
      <BarChart data={errorsData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} style={{ stroke: "hsl(var(--border))", strokeOpacity: 0.8 }} />
        <XAxis type="number" className="text-xs" />
        <YAxis type="category" dataKey="category" className="text-xs" width={110} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {errorsData.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

// --- Main Component ---
export function RawDataCard() {
  const [dataTab, setDataTab] = useState<DataTab>("usefulness")
  const [timeRange, setTimeRange] = useState<TimeRange>("all")

  const tiles = kpiData[dataTab][timeRange]

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-heading-sm font-semibold text-foreground">Signals</h2>
      <p className="text-xs text-muted-foreground">Data points feeding this product's health assessment.</p>

      {/* Tab Control Row */}
      <div className="flex items-center justify-between">
        <Tabs value={dataTab} onValueChange={(v) => setDataTab(v as DataTab)}>
          <TabsList variant="pill">
            <TabsTrigger value="usefulness">Usefulness</TabsTrigger>
            <TabsTrigger value="findability">Findability</TabsTrigger>
            <TabsTrigger value="attractiveness">Attractiveness</TabsTrigger>
            <TabsTrigger value="popularity">Popularity</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
          <TabsList variant="pill">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="7d">7 D</TabsTrigger>
            <TabsTrigger value="30d">30 D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* KPI Tile Row */}
      <div className="grid grid-cols-4 gap-3">
        {tiles.map((tile, i) => (
          <KpiTileCard key={`${dataTab}-${timeRange}-${i}`} tile={tile} />
        ))}
      </div>

      {/* Visualization */}
      <Card>
        <CardContent>
          {dataTab === "usefulness" && <TrafficChart />}
          {dataTab === "findability" && <FindabilityChart />}
          {dataTab === "attractiveness" && <FeedbackFunnel />}
          {dataTab === "popularity" && <DiscoveryPanel />}
          {dataTab === "errors" && <ErrorsChart />}
        </CardContent>
      </Card>
    </section>
  )
}
