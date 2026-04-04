import { useState } from "react"
import {
  RiSearchLine,
  RiAlertFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiFileTextLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiRobot2Line,
  RiLoader4Line,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SidebarNav } from "@/components/custom/sidebar-nav"
import { MobileNav } from "@/components/custom/mobile-nav"
import {
  docFeedbackData,
  aiAgents,
  generateIssueTitle,
  generateIssueDescription,
} from "@/data/mock-doc-feedback"
import type {
  DocFeedbackEntry,
  Severity,
  IssueStatus,
} from "@/data/mock-doc-feedback"

const severityConfig: Record<
  Severity,
  { label: string; icon: typeof RiAlertFill; className: string }
> = {
  critical: {
    label: "Critical",
    icon: RiAlertFill,
    className: "bg-destructive text-destructive-foreground border-transparent",
  },
  major: {
    label: "Major",
    icon: RiErrorWarningFill,
    className: "bg-warn text-warn-foreground border-transparent",
  },
  minor: {
    label: "Minor",
    icon: RiInformationFill,
    className: "",
  },
}

const statusConfig: Record<IssueStatus, { label: string; className: string }> = {
  open: {
    label: "Issue Created",
    className: "bg-warn text-warn-foreground border-transparent",
  },
  in_progress: {
    label: "Agent Working",
    className: "bg-chart-1 text-primary-foreground border-transparent",
  },
  resolved: {
    label: "Resolved",
    className: "bg-success text-success-foreground border-transparent",
  },
}

function filterByTab(tab: string, data: DocFeedbackEntry[]) {
  if (tab === "all") return data
  if (tab === "unresolved") return data.filter((f) => f.issueStatus === null)
  return data.filter((f) => f.severity === tab)
}

export function DocFeedbackTriage() {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [items, setItems] = useState(docFeedbackData)

  // Issue creation form state
  const [issueTitle, setIssueTitle] = useState("")
  const [issueDescription, setIssueDescription] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("")
  const [justAssigned, setJustAssigned] = useState<string | null>(null)

  const filtered = filterByTab(activeTab, items).filter(
    (f) =>
      f.feedbackText.toLowerCase().includes(search.toLowerCase()) ||
      f.docPage.toLowerCase().includes(search.toLowerCase()) ||
      f.customerName.toLowerCase().includes(search.toLowerCase())
  )

  const unresolvedCount = items.filter((f) => f.issueStatus === null).length

  function handleExpand(feedback: DocFeedbackEntry) {
    if (expandedId === feedback.id) {
      setExpandedId(null)
      return
    }
    setExpandedId(feedback.id)
    setIssueTitle(generateIssueTitle(feedback))
    setIssueDescription(generateIssueDescription(feedback))
    setSelectedAgent("")
    setJustAssigned(null)
  }

  function handleAssign(feedbackId: string) {
    if (!selectedAgent) return
    setItems((prev) =>
      prev.map((f) =>
        f.id === feedbackId ? { ...f, issueStatus: "in_progress" as IssueStatus } : f
      )
    )
    setJustAssigned(feedbackId)
    setTimeout(() => {
      setExpandedId(null)
      setJustAssigned(null)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border md:block">
        <SidebarNav className="h-full" />
      </aside>

      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-border px-4 py-3 md:px-6">
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <RiFileTextLine className="size-5 text-muted-foreground" />
              <h1 className="text-lg font-semibold">Documentation Feedback</h1>
              <Badge variant="secondary" className="ml-1">
                {unresolvedCount} unresolved
              </Badge>
            </div>
            <div className="relative w-full max-w-xs">
              <RiSearchLine className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList variant="line">
              <TabsTrigger value="all">
                All ({items.length})
              </TabsTrigger>
              <TabsTrigger value="unresolved">
                Unresolved ({unresolvedCount})
              </TabsTrigger>
              <TabsTrigger value="critical">
                Critical ({items.filter((f) => f.severity === "critical").length})
              </TabsTrigger>
              <TabsTrigger value="major">
                Major ({items.filter((f) => f.severity === "major").length})
              </TabsTrigger>
              <TabsTrigger value="minor">
                Minor ({items.filter((f) => f.severity === "minor").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <div className="flex flex-col gap-3">
                {filtered.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No feedback matches your filters.
                  </p>
                )}
                {filtered.map((feedback) => {
                  const severity = severityConfig[feedback.severity]
                  const SeverityIcon = severity.icon
                  const isExpanded = expandedId === feedback.id
                  const wasJustAssigned = justAssigned === feedback.id

                  return (
                    <Card
                      key={feedback.id}
                      className={
                        isExpanded
                          ? "ring-1 ring-ring transition-shadow"
                          : "transition-shadow"
                      }
                    >
                      {/* Summary row — always visible */}
                      <CardHeader
                        className="cursor-pointer"
                        onClick={() => handleExpand(feedback)}
                      >
                        <div className="flex flex-1 items-start gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>
                              {feedback.avatarFallback}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {feedback.customerName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {feedback.date}
                              </span>
                            </div>
                            <p className="text-sm text-card-foreground line-clamp-2">
                              {feedback.feedbackText}
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <RiFileTextLine className="size-3" />
                              <span className="truncate">{feedback.docPage}</span>
                              <span>·</span>
                              <span>{feedback.thumbsDown} reports</span>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={severity.className}
                            >
                              <SeverityIcon className="mr-1 size-3" />
                              {severity.label}
                            </Badge>
                            {feedback.issueStatus && (
                              <Badge
                                variant="secondary"
                                className={
                                  statusConfig[feedback.issueStatus].className
                                }
                              >
                                {feedback.issueStatus === "in_progress" && (
                                  <RiLoader4Line className="mr-1 size-3 animate-spin" />
                                )}
                                {statusConfig[feedback.issueStatus].label}
                              </Badge>
                            )}
                            <RiArrowRightSLine
                              className={`size-4 text-muted-foreground transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </CardHeader>

                      {/* Expanded panel — issue creation */}
                      {isExpanded && (
                        <CardContent className="border-t border-border pt-4">
                          {wasJustAssigned ? (
                            <div className="flex items-center justify-center gap-2 py-6 text-sm font-medium text-success">
                              <RiCheckLine className="size-5" />
                              Issue created and assigned — agent is working on it
                            </div>
                          ) : feedback.issueStatus !== null ? (
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-2 text-sm">
                                <RiRobot2Line className="size-4 text-muted-foreground" />
                                <span>
                                  This feedback already has an issue{" "}
                                  <Badge
                                    variant="secondary"
                                    className={
                                      statusConfig[feedback.issueStatus]
                                        .className
                                    }
                                  >
                                    {statusConfig[feedback.issueStatus].label}
                                  </Badge>
                                </span>
                              </div>
                              <div className="rounded-md bg-muted p-3">
                                <p className="text-xs text-muted-foreground">
                                  An AI agent is currently working on fixing this
                                  documentation page. You'll be notified when the
                                  fix is ready for review.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                              {/* Left: context */}
                              <div className="flex flex-col gap-3">
                                <h3 className="text-sm font-semibold">
                                  Feedback Context
                                </h3>
                                <div className="rounded-md bg-muted p-3">
                                  <p className="text-sm">
                                    "{feedback.feedbackText}"
                                  </p>
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    — {feedback.customerName}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Page:</span>
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                                      {feedback.docPage}
                                    </code>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Section:</span>
                                    <span className="text-muted-foreground">
                                      {feedback.docSection}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Reports:</span>
                                    <span className="text-muted-foreground">
                                      {feedback.thumbsDown} users flagged this
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: issue form */}
                              <div className="flex flex-col gap-3">
                                <h3 className="text-sm font-semibold">
                                  Create Issue
                                </h3>
                                <div className="flex flex-col gap-2">
                                  <Label htmlFor={`title-${feedback.id}`}>
                                    Issue title
                                  </Label>
                                  <Input
                                    id={`title-${feedback.id}`}
                                    value={issueTitle}
                                    onChange={(e) =>
                                      setIssueTitle(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Label htmlFor={`desc-${feedback.id}`}>
                                    Description
                                  </Label>
                                  <textarea
                                    id={`desc-${feedback.id}`}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={issueDescription}
                                    onChange={(e) =>
                                      setIssueDescription(e.target.value)
                                    }
                                  />
                                </div>

                                <Separator />

                                <div className="flex flex-col gap-2">
                                  <Label>Assign AI Agent</Label>
                                  <Select
                                    value={selectedAgent}
                                    onValueChange={(value) => setSelectedAgent(value ?? "")}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select an agent..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {aiAgents.map((agent) => (
                                        <SelectItem
                                          key={agent.id}
                                          value={agent.id}
                                          disabled={agent.status === "busy"}
                                        >
                                          <div className="flex items-center gap-2">
                                            <RiRobot2Line className="size-4" />
                                            <span>{agent.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                              · {agent.speciality}
                                            </span>
                                            {agent.status === "busy" && (
                                              <Badge
                                                variant="secondary"
                                                className="ml-1 text-xs"
                                              >
                                                Busy
                                              </Badge>
                                            )}
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  {selectedAgent && (
                                    <p className="text-xs text-muted-foreground">
                                      {
                                        aiAgents.find(
                                          (a) => a.id === selectedAgent
                                        )?.description
                                      }
                                    </p>
                                  )}
                                </div>

                                <div className="flex justify-end gap-2 pt-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setExpandedId(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    disabled={!selectedAgent || !issueTitle}
                                    onClick={() => handleAssign(feedback.id)}
                                  >
                                    <RiRobot2Line className="mr-1 size-4" />
                                    Assign & Fix
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
