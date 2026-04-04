export type Severity = "critical" | "major" | "minor"
export type IssueStatus = "open" | "in_progress" | "resolved"

export interface DocFeedbackEntry {
  id: string
  customerName: string
  avatarFallback: string
  feedbackText: string
  docPage: string
  docSection: string
  date: string
  severity: Severity
  issueStatus: IssueStatus | null
  thumbsDown: number
}

export interface AIAgent {
  id: string
  name: string
  description: string
  avatarFallback: string
  speciality: string
  status: "available" | "busy"
}

export const aiAgents: AIAgent[] = [
  {
    id: "agent-1",
    name: "DocFix Agent",
    description: "Rewrites unclear sections, fixes code examples, and improves step-by-step instructions.",
    avatarFallback: "DF",
    speciality: "Technical writing",
    status: "available",
  },
  {
    id: "agent-2",
    name: "API Docs Agent",
    description: "Specializes in API reference pages, endpoint descriptions, and request/response examples.",
    avatarFallback: "AD",
    speciality: "API documentation",
    status: "available",
  },
  {
    id: "agent-3",
    name: "Tutorial Agent",
    description: "Rebuilds tutorials and quickstart guides with working code samples and clear prerequisites.",
    avatarFallback: "TA",
    speciality: "Tutorials & guides",
    status: "busy",
  },
]

export const docFeedbackData: DocFeedbackEntry[] = [
  {
    id: "df-1",
    customerName: "Marcus Johnson",
    avatarFallback: "MJ",
    feedbackText: "The CUDA installation guide is completely outdated. It references toolkit v11.4 but the latest is v12.6. Wasted two hours following broken steps.",
    docPage: "/docs/cuda/installation-guide",
    docSection: "Getting Started > Installation",
    date: "2026-04-02",
    severity: "critical",
    issueStatus: null,
    thumbsDown: 47,
  },
  {
    id: "df-2",
    customerName: "Priya Patel",
    avatarFallback: "PP",
    feedbackText: "The TensorRT optimization tutorial skips over the model export step entirely. You go from training to deployment with no explanation of ONNX conversion.",
    docPage: "/docs/tensorrt/optimization-tutorial",
    docSection: "Tutorials > Model Optimization",
    date: "2026-04-02",
    severity: "major",
    issueStatus: null,
    thumbsDown: 32,
  },
  {
    id: "df-3",
    customerName: "David Kim",
    avatarFallback: "DK",
    feedbackText: "Code samples in the Triton Inference Server quickstart don't compile. Missing import statements and wrong function signatures.",
    docPage: "/docs/triton/quickstart",
    docSection: "Quickstart > Running Your First Model",
    date: "2026-04-01",
    severity: "critical",
    issueStatus: null,
    thumbsDown: 28,
  },
  {
    id: "df-4",
    customerName: "Elena Vasquez",
    avatarFallback: "EV",
    feedbackText: "The multi-GPU training guide mentions 'see configuration options below' but there's no configuration section on the page. Broken anchor link.",
    docPage: "/docs/nccl/multi-gpu-training",
    docSection: "Guides > Multi-GPU Setup",
    date: "2026-04-01",
    severity: "major",
    issueStatus: null,
    thumbsDown: 19,
  },
  {
    id: "df-5",
    customerName: "Tom Erikson",
    avatarFallback: "TE",
    feedbackText: "The container runtime docs have inconsistent version numbers. The prerequisites say Docker 24.x but the commands use Docker 20.x syntax.",
    docPage: "/docs/container-toolkit/runtime-setup",
    docSection: "Setup > Container Runtime",
    date: "2026-03-31",
    severity: "minor",
    issueStatus: null,
    thumbsDown: 14,
  },
  {
    id: "df-6",
    customerName: "Aisha Rahman",
    avatarFallback: "AR",
    feedbackText: "The RAPIDS cuDF API reference has zero examples for the merge() function. Every other DataFrame method has examples except this one.",
    docPage: "/docs/rapids/cudf-api-reference",
    docSection: "API Reference > DataFrame.merge()",
    date: "2026-03-31",
    severity: "minor",
    issueStatus: null,
    thumbsDown: 11,
  },
  {
    id: "df-7",
    customerName: "James Wright",
    avatarFallback: "JW",
    feedbackText: "The DeepStream SDK page links to a GitHub repo that was archived six months ago. None of the sample pipelines work anymore.",
    docPage: "/docs/deepstream/sdk-samples",
    docSection: "Samples > Video Analytics Pipelines",
    date: "2026-03-30",
    severity: "critical",
    issueStatus: "in_progress",
    thumbsDown: 39,
  },
  {
    id: "df-8",
    customerName: "Mei Lin",
    avatarFallback: "ML",
    feedbackText: "The NeMo fine-tuning guide doesn't mention that you need at least 48GB VRAM for the default config. I burned through cloud credits before finding this out from a forum post.",
    docPage: "/docs/nemo/fine-tuning-guide",
    docSection: "Guides > Fine-Tuning LLMs",
    date: "2026-03-29",
    severity: "major",
    issueStatus: null,
    thumbsDown: 24,
  },
]

export function generateIssueTitle(feedback: DocFeedbackEntry): string {
  const prefixes: Record<Severity, string> = {
    critical: "Fix",
    major: "Update",
    minor: "Improve",
  }
  const pageName = feedback.docPage.split("/").pop()?.replace(/-/g, " ") ?? "documentation"
  return `${prefixes[feedback.severity]}: ${pageName}`
}

export function generateIssueDescription(feedback: DocFeedbackEntry): string {
  return `## Problem\n${feedback.feedbackText}\n\n## Location\n- **Page:** ${feedback.docPage}\n- **Section:** ${feedback.docSection}\n\n## Customer impact\n${feedback.thumbsDown} users reported this issue.\n\n## Expected fix\nReview and correct the documentation at the specified section.`
}
