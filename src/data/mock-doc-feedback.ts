export type BoardColumn = "new" | "issue_created" | "agent_working" | "resolved"

export interface DocFeedbackCard {
  id: string
  customerName: string
  avatarFallback: string
  feedbackText: string
  docPage: string
  docSection: string
  date: string
  severity: "critical" | "major" | "minor"
  thumbsDown: number
  column: BoardColumn
  assignedAgent?: string
  issueTitle?: string
}

export interface AIAgent {
  id: string
  name: string
  avatarFallback: string
  speciality: string
  status: "available" | "busy"
}

export const aiAgents: AIAgent[] = [
  {
    id: "agent-1",
    name: "DocFix Agent",
    avatarFallback: "DF",
    speciality: "Technical writing",
    status: "available",
  },
  {
    id: "agent-2",
    name: "API Docs Agent",
    avatarFallback: "AD",
    speciality: "API documentation",
    status: "available",
  },
  {
    id: "agent-3",
    name: "Tutorial Agent",
    avatarFallback: "TA",
    speciality: "Tutorials & guides",
    status: "busy",
  },
]

export const initialCards: DocFeedbackCard[] = [
  {
    id: "df-1",
    customerName: "Marcus Johnson",
    avatarFallback: "MJ",
    feedbackText: "The CUDA installation guide is completely outdated. It references toolkit v11.4 but the latest is v12.6. Wasted two hours following broken steps.",
    docPage: "/docs/cuda/installation-guide",
    docSection: "Getting Started > Installation",
    date: "2026-04-02",
    severity: "critical",
    thumbsDown: 47,
    column: "new",
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
    thumbsDown: 32,
    column: "new",
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
    thumbsDown: 28,
    column: "new",
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
    thumbsDown: 19,
    column: "new",
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
    thumbsDown: 14,
    column: "issue_created",
    issueTitle: "Improve: runtime setup",
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
    thumbsDown: 11,
    column: "issue_created",
    issueTitle: "Improve: cudf api reference",
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
    thumbsDown: 39,
    column: "agent_working",
    issueTitle: "Fix: sdk samples",
    assignedAgent: "agent-1",
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
    thumbsDown: 24,
    column: "resolved",
    issueTitle: "Update: fine tuning guide",
    assignedAgent: "agent-2",
  },
]

export function generateIssueTitle(card: DocFeedbackCard): string {
  const prefixes: Record<string, string> = {
    critical: "Fix",
    major: "Update",
    minor: "Improve",
  }
  const pageName = card.docPage.split("/").pop()?.replace(/-/g, " ") ?? "documentation"
  return `${prefixes[card.severity]}: ${pageName}`
}
