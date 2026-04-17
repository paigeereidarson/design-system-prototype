// Mock data for PM prototype — uses Design Language Spec vocabulary
// Status: "meets-expectations" | "needs-improvement" | "critical-gap"
// Priority: "must-fix" | "should-improve" | "watching"
// Trend: "improving" | "declining" | "stable"

export type Status = "meets-expectations" | "needs-improvement" | "critical-gap"
export type Priority = "must-fix" | "should-improve" | "watching"
export type Trend = "improving" | "declining" | "stable"

export interface DimensionScore {
  status: Status
  summary: string
  dataPoint: string
  trend: Trend
}

export interface EvidenceItem {
  description: string
  source: string
}

export interface ContributingDimension {
  name: string
  key: string
}

export interface DocPage {
  id: string
  title: string
  url: string
  status: Status
  trend: Trend
  lastUpdated: string
  lastUpdatedBy: string
  insights: Insight[]
}

export interface Insight {
  id: string
  diagnosticLabel: string
  priority: Priority
  summary: string
  solution: string
  evidence: string
  evidenceItems: EvidenceItem[]
  contributingTo: ContributingDimension[]
  affectedPages: { id: string; title: string }[]
  visitorsAffected: string
}

export interface Product {
  id: string
  name: string
  category: string
  overallStatus: Status
  trend: Trend
  assessment: string
  dimensions: {
    sentiment: DimensionScore
    repoHealth: DimensionScore
    devForum: DimensionScore
    surveyFeedback: DimensionScore
    traffic: DimensionScore
  }
  monthlyVisits: string
  openIssues: number
  weeklyVisitors: number // numeric for sorting + bar height
  weeklyVisitorsDisplay: string // e.g. "284.3K visits /wk"
  visitorsPast: string // e.g. "Was 300K two months ago"
  openIssuesCount: number
  openIssuesPast: string // e.g. "Was 2 issues a month ago"
  aiAssessment: string
  insights: Insight[]
  pages: DocPage[]
  rawDataPoints: RawDataPoint[]
}

export interface RawDataPoint {
  label: string
  value: string
  change?: string
  changeDirection?: "up" | "down" | "flat"
  category: "traffic" | "feedback" | "content" | "search"
}

// Raw data points with dummy values for CUDA
export const cudaRawData: RawDataPoint[] = [
  { label: "Total pages", value: "847", change: "+12 new this month", changeDirection: "up", category: "content" },
  { label: "Total visits (30d)", value: "284,302", change: "+8.3% vs last month", changeDirection: "up", category: "traffic" },
  { label: "Unique visitors (30d)", value: "142,891", change: "+5.1%", changeDirection: "up", category: "traffic" },
  { label: "Avg session duration", value: "4m 32s", change: "-12s vs last month", changeDirection: "down", category: "traffic" },
  { label: "Pages per session", value: "3.2", change: "-0.1", changeDirection: "down", category: "traffic" },
  { label: "Negative feedback", value: "127", change: "+34 vs last month", changeDirection: "up", category: "feedback" },
  { label: "Site satisfaction", value: "3.8 / 5", change: "-0.4 vs last month", changeDirection: "down", category: "feedback" },
  { label: "Logged feedback", value: "18 open", change: "6 unresolved > 14 days", changeDirection: "up", category: "feedback" },
  { label: "Survey engagement", value: "1.2%", change: "of total visits", changeDirection: "flat", category: "feedback" },
  { label: "Hard to find pages", value: "23", change: "+4 vs last month", changeDirection: "up", category: "content" },
  { label: "Unappealing pages", value: "8", change: "Found in search, rarely clicked", changeDirection: "flat", category: "content" },
  { label: "Popular pages", value: "12", change: "High traffic, monitor for issues", changeDirection: "flat", category: "content" },
  { label: "Unuseful pages", value: "5", change: "Low time + low scroll + negative feedback", changeDirection: "up", category: "content" },
  { label: "Broken links", value: "3", change: "Was 0 last month", changeDirection: "up", category: "content" },
  { label: "Top search term", value: "cuda install linux", change: "1,204 searches this month", changeDirection: "flat", category: "search" },
  { label: "Top search → page", value: "Installation Guide", change: "68% of searches land here", changeDirection: "flat", category: "search" },
  { label: "Visitors by region", value: "US 42%, IN 18%, CN 12%", change: "CN up 3%", changeDirection: "up", category: "traffic" },
  { label: "AI vs human traffic", value: "22% AI / 78% human", change: "AI up 6% vs last month", changeDirection: "up", category: "traffic" },
]

export interface ProductCategory {
  name: string
  products: Product[]
}

// --- Mock Data ---

const cudaPages: DocPage[] = [
  {
    id: "cuda-install",
    title: "CUDA Toolkit Installation Guide",
    url: "docs.nvidia.com/cuda/cuda-installation-guide-linux/",
    status: "critical-gap",
    trend: "declining",
    lastUpdated: "2025-08-14",
    lastUpdatedBy: "Sarah Chen",
    insights: [],
  },
  {
    id: "cuda-quick-start",
    title: "CUDA Quick Start Guide",
    url: "docs.nvidia.com/cuda/cuda-quick-start-guide/",
    status: "needs-improvement",
    trend: "stable",
    lastUpdated: "2026-01-22",
    lastUpdatedBy: "Marcus Li",
    insights: [],
  },
  {
    id: "cuda-api-ref",
    title: "CUDA Runtime API Reference",
    url: "docs.nvidia.com/cuda/cuda-runtime-api/",
    status: "meets-expectations",
    trend: "stable",
    lastUpdated: "2026-03-10",
    lastUpdatedBy: "Auto-generated",
    insights: [],
  },
]

const dgxPages: DocPage[] = [
  {
    id: "dgx-setup",
    title: "DGX Cloud Setup Guide",
    url: "docs.nvidia.com/dgx-cloud/getting-started/",
    status: "needs-improvement",
    trend: "stable",
    lastUpdated: "2026-02-05",
    lastUpdatedBy: "James Park",
    insights: [],
  },
  {
    id: "dgx-admin",
    title: "DGX Cloud Administration",
    url: "docs.nvidia.com/dgx-cloud/admin-guide/",
    status: "meets-expectations",
    trend: "improving",
    lastUpdated: "2026-03-28",
    lastUpdatedBy: "James Park",
    insights: [],
  },
]

const bionemoPages: DocPage[] = [
  {
    id: "bionemo-quickstart",
    title: "BioNeMo Getting Started",
    url: "docs.nvidia.com/bionemo/getting-started/",
    status: "needs-improvement",
    trend: "declining",
    lastUpdated: "2025-11-03",
    lastUpdatedBy: "Priya Sharma",
    insights: [],
  },
  {
    id: "bionemo-models",
    title: "BioNeMo Pretrained Models",
    url: "docs.nvidia.com/bionemo/models/",
    status: "meets-expectations",
    trend: "stable",
    lastUpdated: "2026-03-15",
    lastUpdatedBy: "Priya Sharma",
    insights: [],
  },
]

const nemoPages: DocPage[] = [
  {
    id: "nemo-install",
    title: "NeMo Framework Installation",
    url: "docs.nvidia.com/nemo-framework/install/",
    status: "critical-gap",
    trend: "declining",
    lastUpdated: "2025-07-20",
    lastUpdatedBy: "Alex Rivera",
    insights: [],
  },
]

// --- Insights ---

const cudaInsights: Insight[] = [
  {
    id: "cuda-broken-links",
    diagnosticLabel: "Must-Fix",
    priority: "must-fix",
    summary: "3 broken links on CUDA Install Guide — 12K visitors per week affected",
    solution: "Fix 3 broken links pointing to deprecated CUDA 11.x download pages. Replace with current CUDA 12.x URLs.",
    evidence: "Broken link scan detected 3 dead URLs on March 25. Page receives 12,400 weekly visits. Negative survey feedback mentions 'broken download link' 14 times this month.",
    evidenceItems: [
      { description: "3 URLs return 404\nCUDA Install Guide", source: "Link Crawler" },
      { description: "11 of 14 thumbs down\n\"broken download link\"", source: "HotJar Survey" },
      { description: "8 forum threads\n0 responses, 12 days", source: "Dev Forum" },
    ],
    contributingTo: [
      { name: "Traffic", key: "traffic" },
      { name: "Sentiment", key: "sentiment" },
      { name: "Dev Forum", key: "devForum" },
    ],
    affectedPages: [{ id: "cuda-install", title: "CUDA Toolkit Installation Guide" }],
    visitorsAffected: "12,412",
  },
  {
    id: "cuda-copy-paste",
    diagnosticLabel: "Improve",
    priority: "should-improve",
    summary: "Users are complaining about copy/paste interaction",
    solution: "Review code blocks on CUDA documentation for copy button functionality. Multiple users report inability to copy code samples.",
    evidence: "Survey feedback includes 6 mentions of 'copy paste' issues. 3 forum threads describe workarounds.",
    evidenceItems: [
      { description: "6 survey mentions of copy/paste issues", source: "HotJar Survey" },
      { description: "3 forum threads with workarounds", source: "Dev Forum" },
    ],
    contributingTo: [
      { name: "Sentiment", key: "sentiment" },
    ],
    affectedPages: [{ id: "cuda-install", title: "CUDA Toolkit Installation Guide" }],
    visitorsAffected: "4,871",
  },
  {
    id: "cuda-stale-docs",
    diagnosticLabel: "On Radar",
    priority: "watching",
    summary: "Documentation is stale after 1.2 years, consider updating",
    solution: "Review and update documentation that hasn't been touched in over a year. Prioritize by traffic volume.",
    evidence: "Last content update was January 22. CUDA 12.8 released February 15.",
    evidenceItems: [
      { description: "Last updated 1.2 years ago", source: "Content Metadata" },
      { description: "2 mentions of 'outdated instructions'", source: "HotJar Survey" },
    ],
    contributingTo: [
      { name: "Traffic", key: "traffic" },
    ],
    affectedPages: [{ id: "cuda-quick-start", title: "CUDA Quick Start Guide" }],
    visitorsAffected: "1,340",
  },
  {
    id: "cuda-forum-backlog",
    diagnosticLabel: "Must-Fix",
    priority: "must-fix",
    summary: "8 unanswered Dev Forum threads about CUDA installation — oldest is 12 days",
    solution: "Assign responder to clear the backlog of unanswered CUDA installation threads in the Developer Forum.",
    evidence: "8 threads tagged 'cuda-installation' have zero responses. Average time-to-first-response for CUDA topics has increased from 4 hours to 3 days over the past month.",
    evidenceItems: [
      { description: "8 threads with 0 responses", source: "Dev Forum" },
      { description: "Avg response time up from 4h to 3d", source: "Dev Forum" },
    ],
    contributingTo: [
      { name: "Dev Forum", key: "devForum" },
    ],
    affectedPages: [{ id: "cuda-install", title: "CUDA Toolkit Installation Guide" }],
    visitorsAffected: "8,203",
  },
  {
    id: "cuda-search-exits",
    diagnosticLabel: "Improve",
    priority: "should-improve",
    summary: "42% of searches for 'cuda install linux' exit without clicking a result",
    solution: "Review search metadata on install pages. Current pages may not match user intent for the top search query.",
    evidence: "1,204 searches this month for 'cuda install linux'. 42% exited without clicking any result.",
    evidenceItems: [
      { description: "1,204 searches, 42% exit rate", source: "Adobe Analytics" },
    ],
    contributingTo: [
      { name: "Traffic", key: "traffic" },
    ],
    affectedPages: [{ id: "cuda-install", title: "CUDA Toolkit Installation Guide" }],
    visitorsAffected: "506",
  },
]

const dgxInsights: Insight[] = [
  {
    id: "dgx-setup-feedback",
    diagnosticLabel: "Improve",
    priority: "should-improve",
    summary: "DGX Cloud Setup Guide receiving mixed survey feedback — 'Was this helpful?' ratio declining.",
    solution: "Review the Setup Guide for completeness. Three survey responses this month mention missing steps for multi-node configuration.",
    evidence: "'Was this helpful?' ratio dropped from 78% to 61% over the past 60 days. Free-text feedback mentions 'missing steps' and 'unclear prerequisites.'",
    evidenceItems: [
      { description: "Helpful ratio dropped from 78% to 61%", source: "HotJar Survey" },
      { description: "3 mentions of 'missing steps'", source: "Fern Survey" },
    ],
    contributingTo: [{ name: "Survey Feedback", key: "surveyFeedback" }],
    affectedPages: [{ id: "dgx-setup", title: "DGX Cloud Setup Guide" }],
    visitorsAffected: "2,318",
  },
]

const bionemoInsights: Insight[] = [
  {
    id: "bionemo-stale",
    diagnosticLabel: "Improve",
    priority: "should-improve",
    summary: "Getting Started guide last updated 5 months ago — traffic declining as content ages.",
    solution: "Update the Getting Started guide with current API endpoints and model versions. Content references BioNeMo 1.2, current version is 1.5.",
    evidence: "Page traffic down 22% over 90 days. Last content edit was November 3, 2025. Two Dev Forum threads reference outdated code samples from this page.",
    evidenceItems: [
      { description: "Traffic down 22% over 90 days", source: "Adobe Analytics" },
      { description: "2 forum threads cite outdated samples", source: "Dev Forum" },
    ],
    contributingTo: [{ name: "Traffic", key: "traffic" }],
    affectedPages: [{ id: "bionemo-quickstart", title: "BioNeMo Getting Started" }],
    visitorsAffected: "724",
  },
  {
    id: "bionemo-hard-to-find",
    diagnosticLabel: "On Radar",
    priority: "watching",
    summary: "BioNeMo Models page has low organic search traffic — may be a findability issue.",
    solution: "No action needed yet. Monitor whether search traffic recovers after the new docs site indexing completes.",
    evidence: "Organic search visits dropped 15% this month, but this correlates with a site migration. May resolve on its own within 2-3 weeks.",
    evidenceItems: [
      { description: "Organic search visits down 15%", source: "Adobe Analytics" },
    ],
    contributingTo: [{ name: "Traffic", key: "traffic" }],
    affectedPages: [{ id: "bionemo-models", title: "BioNeMo Pretrained Models" }],
    visitorsAffected: "183",
  },
]

const nemoInsights: Insight[] = [
  {
    id: "nemo-critical",
    diagnosticLabel: "Must-Fix",
    priority: "must-fix",
    summary: "NeMo Installation page has 5 broken links and hasn't been updated in 9 months — 8K weekly visitors affected.",
    solution: "Fix 5 broken links and update installation instructions for NeMo Framework 2.0. Current page references deprecated NeMo 1.x setup.",
    evidence: "5 broken links detected. Page last updated July 2025. NeMo 2.0 released October 2025. Survey feedback: 73% thumbs down. 4 unanswered forum threads reference this page.",
    evidenceItems: [
      { description: "5 broken links detected", source: "Link Crawler" },
      { description: "73% thumbs down on install page", source: "HotJar Survey" },
      { description: "4 unanswered forum threads", source: "Dev Forum" },
    ],
    contributingTo: [
      { name: "Traffic", key: "traffic" },
      { name: "Sentiment", key: "sentiment" },
      { name: "Dev Forum", key: "devForum" },
    ],
    affectedPages: [{ id: "nemo-install", title: "NeMo Framework Installation" }],
    visitorsAffected: "7,891",
  },
]

// Wire insights to pages
cudaPages[0].insights = [cudaInsights[0], cudaInsights[1]]
cudaPages[1].insights = [cudaInsights[2]]
dgxPages[0].insights = [dgxInsights[0]]
bionemoPages[0].insights = [bionemoInsights[0]]
bionemoPages[1].insights = [bionemoInsights[1]]
nemoPages[0].insights = [nemoInsights[0]]

// --- Products ---

export const products: Product[] = [
  {
    id: "cuda",
    name: "CUDA",
    category: "Compute",
    overallStatus: "critical-gap",
    trend: "declining",
    monthlyVisits: "48,231",
    openIssues: 3,
    weeklyVisitors: 284310,
    weeklyVisitorsDisplay: "284.3K visits /wk",
    visitorsPast: "Was 300K two months ago",
    openIssuesCount: 14,
    openIssuesPast: "Was 2 issues a month ago",
    aiAssessment: "CUDA has 14 open issues and high visitor traffic — broken links on your highest-traffic install guide and unanswered forum threads piling up.",
    assessment: "CUDA has 3 open issues — broken links on your highest-traffic install guide and unanswered forum threads piling up.",
    dimensions: {
      sentiment: { status: "critical-gap", summary: "Critical gap — sustained negative feedback on installation docs with no action taken.", dataPoint: "79% thumbs down\nWas 34% two months ago", trend: "declining" },
      repoHealth: { status: "meets-expectations", summary: "Meets expectations.", dataPoint: "8/9 must-haves\nAll checks passing", trend: "stable" },
      devForum: { status: "critical-gap", summary: "Critical gap — 8 threads unanswered for 12+ days.", dataPoint: "40% unanswered\nWas 5% last month", trend: "declining" },
      surveyFeedback: { status: "needs-improvement", summary: "Needs improvement — 'Was this helpful?' ratio below threshold on 2 pages.", dataPoint: "87% unhelpful\nWas 32% last quarter", trend: "declining" },
      traffic: { status: "needs-improvement", summary: "Needs improvement — 3 broken links appearing on high-traffic pages.", dataPoint: "3 broken links\nWas 0 last month", trend: "declining" },
    },
    insights: cudaInsights,
    pages: cudaPages,
    rawDataPoints: cudaRawData,
  },
  {
    id: "dgx-cloud",
    name: "DGX Cloud",
    category: "Cloud Services",
    overallStatus: "needs-improvement",
    trend: "stable",
    monthlyVisits: "12,847",
    openIssues: 1,
    weeklyVisitors: 12660,
    weeklyVisitorsDisplay: "12.6K visits /wk",
    visitorsPast: "Was 1.2K two months ago",
    openIssuesCount: 2,
    openIssuesPast: "Was 0 issues a month ago",
    aiAssessment: "DGX Cloud is mostly healthy with 2 open issues. Survey feedback on the Setup Guide needs attention — helpfulness ratio declining.",
    assessment: "DGX Cloud is mostly healthy. Survey feedback on the Setup Guide needs attention — helpfulness ratio declining.",
    dimensions: {
      sentiment: { status: "needs-improvement", summary: "Needs improvement — mixed feedback on Setup Guide.", dataPoint: "61% helpful\nWas 78% last quarter", trend: "declining" },
      repoHealth: { status: "meets-expectations", summary: "Meets expectations.", dataPoint: "7/9 must-haves\nCONTRIBUTING needs update", trend: "stable" },
      devForum: { status: "meets-expectations", summary: "Meets expectations — response times within threshold.", dataPoint: "2.4h avg response\nWithin SLA", trend: "stable" },
      surveyFeedback: { status: "needs-improvement", summary: "Needs improvement — helpfulness ratio dropped from 78% to 61%.", dataPoint: "61% helpful\nWas 78% last quarter", trend: "declining" },
      traffic: { status: "meets-expectations", summary: "Meets expectations.", dataPoint: "4.2K weekly visits\nStable", trend: "stable" },
    },
    insights: dgxInsights,
    pages: dgxPages,
    rawDataPoints: cudaRawData,
  },
  {
    id: "bionemo",
    name: "BioNeMo",
    category: "Cloud Services",
    overallStatus: "meets-expectations",
    trend: "stable",
    monthlyVisits: "6,231",
    openIssues: 2,
    weeklyVisitors: 800,
    weeklyVisitorsDisplay: "1.1K visits /wk",
    visitorsPast: "Was 671 two months ago",
    openIssuesCount: 4,
    openIssuesPast: "Was 3 issues a month ago",
    aiAssessment: "BioNeMo is healthy but has low visitor sessions. Consider improving discoverability to increase visibility.",
    assessment: "BioNeMo's Getting Started guide is aging — traffic declining as content goes stale. No critical issues but trend is negative.",
    dimensions: {
      sentiment: { status: "meets-expectations", summary: "Meets expectations.", dataPoint: "82% thumbs up\nStable", trend: "stable" },
      repoHealth: { status: "needs-improvement", summary: "Needs improvement — README missing quickstart section.", dataPoint: "5/9 must-haves\nQuickstart missing", trend: "stable" },
      devForum: { status: "meets-expectations", summary: "Meets expectations.", dataPoint: "1.8h avg response\nWithin SLA", trend: "stable" },
      surveyFeedback: { status: "meets-expectations", summary: "Meets expectations.", dataPoint: "74% helpful\nStable", trend: "stable" },
      traffic: { status: "needs-improvement", summary: "Needs improvement — organic search traffic declining 22% over 90 days.", dataPoint: "22% decline in visits\nOver 90 days", trend: "declining" },
    },
    insights: bionemoInsights,
    pages: bionemoPages,
    rawDataPoints: cudaRawData,
  },
  {
    id: "nemo-llm",
    name: "NeMo LLM",
    category: "AI Frameworks",
    overallStatus: "needs-improvement",
    trend: "declining",
    monthlyVisits: "8,914",
    openIssues: 1,
    weeklyVisitors: 67450,
    weeklyVisitorsDisplay: "67.5K visits /wk",
    visitorsPast: "Was 20.2K two months ago",
    openIssuesCount: 5,
    openIssuesPast: "Was 14 issues a month ago",
    aiAssessment: "NeMo LLM has 5 open issues and the Get Started guide is aging — traffic declining as content goes stale. No critical issues but trend is negative.",
    assessment: "NeMo LLM has a critical gap — installation page has 5 broken links, hasn't been updated in 9 months, and 73% thumbs down.",
    dimensions: {
      sentiment: { status: "critical-gap", summary: "Critical gap — 73% negative survey feedback on installation page.", dataPoint: "73% thumbs down", trend: "declining" },
      repoHealth: { status: "needs-improvement", summary: "Needs improvement — CONTRIBUTING guide missing issue templates.", dataPoint: "6/9 must-haves\nIssue templates missing", trend: "stable" },
      devForum: { status: "needs-improvement", summary: "Needs improvement — 4 unanswered threads this month.", dataPoint: "4 unanswered\nOldest: 9 days", trend: "declining" },
      surveyFeedback: { status: "critical-gap", summary: "Critical gap — sustained thumbs-down on primary install page with no action.", dataPoint: "Helpful: 27%\nWas 61% last quarter", trend: "declining" },
      traffic: { status: "meets-expectations", summary: "Meets expectations — 8K weekly visitors.", dataPoint: "8K weekly visits", trend: "stable" },
    },
    insights: nemoInsights,
    pages: nemoPages,
    rawDataPoints: cudaRawData,
  },
]

// Group by category for the product list view
export const productCategories: ProductCategory[] = [
  {
    name: "Compute",
    products: products.filter(p => p.category === "Compute"),
  },
  {
    name: "Cloud Services",
    products: products.filter(p => p.category === "Cloud Services"),
  },
  {
    name: "AI Frameworks",
    products: products.filter(p => p.category === "AI Frameworks"),
  },
]

// Helper to map status to badge variant
export function statusToBadgeVariant(status: Status): "success" | "warning" | "critical" {
  switch (status) {
    case "meets-expectations": return "success"
    case "needs-improvement": return "warning"
    case "critical-gap": return "critical"
  }
}

// Helper to map status to human-readable label
export function statusToLabel(status: Status): string {
  switch (status) {
    case "meets-expectations": return "Meets Expectations"
    case "needs-improvement": return "Needs Improvement"
    case "critical-gap": return "Critical Gap"
  }
}

// Helper to map priority to human-readable label
export function priorityToLabel(priority: Priority): string {
  switch (priority) {
    case "must-fix": return "Must-Fix"
    case "should-improve": return "Should-Improve"
    case "watching": return "Watching"
  }
}

// Helper to map priority to badge variant
// Map overall product status to the card badge label
export function statusToPriorityLabel(status: Status): string {
  switch (status) {
    case "critical-gap": return "Critical"
    case "needs-improvement": return "Improve"
    case "meets-expectations": return "On Radar"
  }
}

// Badge variant for the overview product card priority badge
// "On Radar" gets default (gray) styling per Figma
export function statusToPriorityBadgeVariant(status: Status): "critical" | "warning" | "default" {
  switch (status) {
    case "critical-gap": return "critical"
    case "needs-improvement": return "warning"
    case "meets-expectations": return "default"
  }
}

export function statusToDotVariant(status: Status): "dot-critical" | "dot-warning" | "dot-success" {
  switch (status) {
    case "critical-gap": return "dot-critical"
    case "needs-improvement": return "dot-warning"
    case "meets-expectations": return "dot-success"
  }
}

export function priorityToBadgeVariant(priority: Priority): "critical" | "warning" | "default" {
  switch (priority) {
    case "must-fix": return "critical"
    case "should-improve": return "warning"
    case "watching": return "default"
  }
}

// Helper for trend display
export function trendToLabel(trend: Trend): string {
  switch (trend) {
    case "improving": return "Improving"
    case "declining": return "Declining"
    case "stable": return "Stable"
  }
}

// --- All Products card data ---
// Lightweight summary data for the All Products list. Scores are 0-100.
export interface AllProductCard {
  id: string
  name: string
  healthScore: number
  healthHistory: number[] // recent score trend for the sparkline
  improvementsIdentified: number
  summary: string
}

export const allProductsCards: AllProductCard[] = [
  {
    id: "cuda",
    name: "CUDA",
    healthScore: 32,
    healthHistory: [52, 49, 46, 43, 39, 35, 32],
    improvementsIdentified: 14,
    summary: "Broken links and outdated install steps are creating critical gaps in the highest-traffic documentation in the system.",
  },
  {
    id: "nemo-llm",
    name: "NeMo LLM",
    healthScore: 41,
    healthHistory: [58, 55, 52, 49, 46, 43, 41],
    improvementsIdentified: 5,
    summary: "The Get Started guide is aging and traffic is declining as content goes stale. Trend is negative.",
  },
  {
    id: "dgx-cloud",
    name: "DGX Cloud",
    healthScore: 61,
    healthHistory: [70, 68, 66, 64, 63, 62, 61],
    improvementsIdentified: 2,
    summary: "Mostly healthy with minor survey feedback issues on the Setup Guide. Helpfulness ratio declining.",
  },
  {
    id: "bionemo",
    name: "BioNeMo",
    healthScore: 74,
    healthHistory: [72, 73, 71, 74, 73, 75, 74],
    improvementsIdentified: 4,
    summary: "Healthy but low visibility. Discoverability improvements could meaningfully increase weekly sessions.",
  },
  {
    id: "deepstream",
    name: "DeepStream SDK",
    healthScore: 38,
    healthHistory: [49, 47, 44, 42, 40, 39, 38],
    improvementsIdentified: 8,
    summary: "Pipeline configuration docs are severely outdated and missing examples for the latest plugin API changes.",
  },
  {
    id: "triton",
    name: "Triton Inference Server",
    healthScore: 44,
    healthHistory: [56, 53, 51, 49, 47, 45, 44],
    improvementsIdentified: 11,
    summary: "High critical issue count relative to traffic. Install and quickstart guides are the primary failure points.",
  },
  {
    id: "rapids",
    name: "RAPIDS",
    healthScore: 55,
    healthHistory: [60, 58, 57, 56, 55, 55, 55],
    improvementsIdentified: 5,
    summary: "Moderate health with stale content in the API reference. One critical broken link on the quickstart page.",
  },
  {
    id: "omniverse",
    name: "Omniverse",
    healthScore: 53,
    healthHistory: [64, 62, 60, 58, 56, 54, 53],
    improvementsIdentified: 24,
    summary: "Connector and extension docs are fragmented across multiple hubs, making discovery and navigation difficult.",
  },
  {
    id: "tensorrt",
    name: "TensorRT",
    healthScore: 47,
    healthHistory: [58, 55, 53, 51, 49, 48, 47],
    improvementsIdentified: 9,
    summary: "Python API reference has multiple broken examples. Migration guide from TensorRT 8 to 10 is incomplete and generating repeat support tickets.",
  },
  {
    id: "isaac-sim",
    name: "Isaac Sim",
    healthScore: 66,
    healthHistory: [60, 61, 63, 64, 65, 66, 66],
    improvementsIdentified: 6,
    summary: "Improving steadily since last quarter. ROS2 integration guide still references deprecated workflows but traffic is healthy.",
  },
  {
    id: "nemo-framework",
    name: "NeMo Framework",
    healthScore: 42,
    healthHistory: [55, 52, 50, 48, 45, 43, 42],
    improvementsIdentified: 13,
    summary: "Fine-tuning and PEFT guides are outdated for the 2.0 release. High search volume with low result click-through.",
  },
  {
    id: "cuquantum",
    name: "cuQuantum",
    healthScore: 78,
    healthHistory: [74, 75, 76, 77, 77, 78, 78],
    improvementsIdentified: 2,
    summary: "Well-maintained niche documentation. Small audience but high satisfaction scores and low error count.",
  },
  {
    id: "drive-agx",
    name: "DRIVE AGX",
    healthScore: 51,
    healthHistory: [62, 60, 58, 56, 54, 52, 51],
    improvementsIdentified: 15,
    summary: "Safety certification docs are current but developer onboarding guides have significant gaps in sensor calibration workflows.",
  },
]

// --- Subscribed product IDs (shown under "My Products" in sidebar) ---
export const subscribedProductIds = ["cuda", "dgx-cloud", "bionemo"]
export const subscribedProducts = products.filter(p => subscribedProductIds.includes(p.id))

// --- Per-product health metrics for Product Detail page ---
export interface DetailMetric {
  label: string
  value: string
  score: number
  change: string
  barColor: "destructive" | "success"
  target?: number
  tooltipLine1?: string
  tooltipLine2?: string
}

export interface DetailOverallHealth {
  score: number
  history: number[]
  change: string
  target: number
  tooltipLine1: string
  tooltipLine2: string
}

export const productDetailMetrics: Record<string, { overall: DetailOverallHealth; metrics: DetailMetric[] }> = {
  cuda: {
    overall: {
      score: 38, history: [52, 49, 46, 43, 40, 39, 38],
      change: "↓ 18% from prior period", target: 74,
      tooltipLine1: "Target: 74.",
      tooltipLine2: "This benchmark reflects the documentation quality standard set for top-tier NVIDIA products.",
    },
    metrics: [
      { label: "Usefulness", value: "34", score: 34, change: "↓ 18% from prior period", barColor: "destructive", target: 80, tooltipLine1: "Target: 80.", tooltipLine2: "The minimum threshold for documentation that supports self-serve developer onboarding." },
      { label: "Findability", value: "52", score: 52, change: "↓ 6% from prior period", barColor: "destructive", target: 90, tooltipLine1: "Target: 90.", tooltipLine2: "Users should be able to locate CUDA documentation within two search interactions." },
      { label: "Attractiveness", value: "75", score: 75, change: "Stable", barColor: "success", target: 74, tooltipLine1: "Target: 74.", tooltipLine2: "Reflects visual clarity, formatting consistency, and code block readability across pages." },
      { label: "Popularity", value: "74", score: 74, change: "↑ 11% from last release", barColor: "success", target: 74, tooltipLine1: "Target: 74.", tooltipLine2: "Indicates healthy traffic distribution across core CUDA documentation pages." },
      { label: "Errors", value: "9", score: 9, change: "↑ 2 from prior period", barColor: "destructive" },
      { label: "Traffic", value: "908 visits", score: 30, change: "↑ Up 7% last 6 weeks", barColor: "destructive" },
    ],
  },
  "dgx-cloud": {
    overall: {
      score: 61, history: [70, 68, 66, 64, 63, 62, 61],
      change: "↓ 9% from prior period", target: 74,
      tooltipLine1: "Target: 74.",
      tooltipLine2: "This benchmark reflects the documentation quality standard set for top-tier NVIDIA products.",
    },
    metrics: [
      { label: "Usefulness", value: "72", score: 72, change: "↑ 4% from prior period", barColor: "success", target: 80, tooltipLine1: "Target: 80.", tooltipLine2: "The minimum threshold for documentation that supports self-serve developer onboarding." },
      { label: "Findability", value: "58", score: 58, change: "↓ 3% from prior period", barColor: "destructive", target: 85, tooltipLine1: "Target: 85.", tooltipLine2: "Users should be able to locate DGX Cloud documentation within two search interactions." },
      { label: "Attractiveness", value: "78", score: 78, change: "↑ 2% from prior period", barColor: "success", target: 74, tooltipLine1: "Target: 74.", tooltipLine2: "Reflects visual clarity, formatting consistency, and code block readability across pages." },
      { label: "Popularity", value: "45", score: 45, change: "↓ 12% from prior period", barColor: "destructive", target: 70, tooltipLine1: "Target: 70.", tooltipLine2: "Indicates healthy traffic distribution across DGX Cloud documentation pages." },
      { label: "Errors", value: "2", score: 2, change: "no change", barColor: "destructive" },
      { label: "Traffic", value: "4.2K visits", score: 42, change: "Stable", barColor: "destructive" },
    ],
  },
  bionemo: {
    overall: {
      score: 74, history: [72, 73, 71, 74, 73, 75, 74],
      change: "↑ 2% from prior period", target: 80,
      tooltipLine1: "Target: 80.",
      tooltipLine2: "This benchmark reflects the documentation quality standard set for emerging NVIDIA products.",
    },
    metrics: [
      { label: "Usefulness", value: "81", score: 81, change: "↑ 6% from prior period", barColor: "success", target: 80, tooltipLine1: "Target: 80.", tooltipLine2: "The minimum threshold for documentation that supports self-serve developer onboarding." },
      { label: "Findability", value: "68", score: 68, change: "↓ 2% from prior period", barColor: "destructive", target: 85, tooltipLine1: "Target: 85.", tooltipLine2: "Users should be able to locate BioNeMo documentation within two search interactions." },
      { label: "Attractiveness", value: "82", score: 82, change: "Stable", barColor: "success", target: 74, tooltipLine1: "Target: 74.", tooltipLine2: "Reflects visual clarity, formatting consistency, and code block readability across pages." },
      { label: "Popularity", value: "71", score: 71, change: "↑ 8% from prior period", barColor: "success", target: 74, tooltipLine1: "Target: 74.", tooltipLine2: "Indicates healthy traffic distribution across BioNeMo documentation pages." },
      { label: "Errors", value: "1", score: 1, change: "↓ 2 from prior period", barColor: "destructive" },
      { label: "Traffic", value: "1.1K visits", score: 11, change: "↓ 15% over 90 days", barColor: "destructive" },
    ],
  },
}

// Color helpers for health score → token
// <50: red, 50-69: amber, >=70: green
export function healthScoreTextClass(score: number): string {
  if (score < 50) return "text-destructive-foreground"
  if (score < 70) return "text-warn-foreground"
  return "text-success-foreground"
}

export function healthScoreBgClass(score: number): string {
  if (score < 50) return "bg-destructive-foreground"
  if (score < 70) return "bg-warn-foreground"
  return "bg-success-foreground"
}
