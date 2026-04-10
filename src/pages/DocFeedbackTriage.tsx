import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  RiSearchLine,
  RiAlertFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiFileTextLine,
  RiRobot2Line,
  RiArrowRightLine,
  RiLoader4Line,
  RiCheckLine,
  RiThumbDownLine,
  RiAddLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AppShell } from "@/components/custom/app-shell"
import {
  initialCards,
  aiAgents,
  generateIssueTitle,
} from "@/data/mock-doc-feedback"
import type { DocFeedbackCard, BoardColumn } from "@/data/mock-doc-feedback"

const columns: { id: BoardColumn; label: string; emptyText: string }[] = [
  { id: "new", label: "New Feedback", emptyText: "No new feedback" },
  { id: "issue_created", label: "Issue Created", emptyText: "No pending issues" },
  { id: "agent_working", label: "Agent Working", emptyText: "No agents active" },
  { id: "resolved", label: "Resolved", emptyText: "Nothing resolved yet" },
]

const severityConfig: Record<
  string,
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

const columnColors: Record<BoardColumn, string> = {
  new: "bg-muted-foreground",
  issue_created: "bg-warn",
  agent_working: "bg-chart-1",
  resolved: "bg-success",
}

export function DocFeedbackTriage() {
  const navigate = useNavigate()
  const [cards, setCards] = useState<DocFeedbackCard[]>(initialCards)
  const [search, setSearch] = useState("")
  const [selectedCard, setSelectedCard] = useState<DocFeedbackCard | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Issue creation form state
  const [issueTitle, setIssueTitle] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("")

  const filtered = cards.filter(
    (c) =>
      c.feedbackText.toLowerCase().includes(search.toLowerCase()) ||
      c.docPage.toLowerCase().includes(search.toLowerCase()) ||
      c.customerName.toLowerCase().includes(search.toLowerCase())
  )

  function openCard(card: DocFeedbackCard) {
    setSelectedCard(card)
    setIssueTitle(card.issueTitle ?? generateIssueTitle(card))
    setSelectedAgent(card.assignedAgent ?? "")
    setDialogOpen(true)
  }

  function moveCard(cardId: string, to: BoardColumn, agent?: string) {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              column: to,
              issueTitle: issueTitle || generateIssueTitle(c),
              assignedAgent: agent ?? c.assignedAgent,
            }
          : c
      )
    )
    setDialogOpen(false)
  }

  function getColumnCards(columnId: BoardColumn) {
    return filtered.filter((c) => c.column === columnId)
  }

  return (
    <AppShell
      fullBleed
      topBar={
        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <RiFileTextLine className="size-5 text-muted-foreground" />
            <h1 className="text-lg font-semibold">Doc Feedback Triage</h1>
            <Badge variant="secondary" className="ml-1">
              {cards.filter((c) => c.column === "new").length} new
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full max-w-xs">
              <RiSearchLine className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button size="sm" onClick={() => navigate("/create-issue")}>
              <RiAddLine className="mr-1 size-4" />
              Create Issue
            </Button>
          </div>
        </div>
      }
    >
      {/* Board */}
      <div className="flex flex-1 gap-4 overflow-x-auto p-4 md:p-6">
        {columns.map((col) => {
          const colCards = getColumnCards(col.id)
          return (
            <section
              key={col.id}
              className="flex w-72 shrink-0 flex-col rounded-lg bg-muted/50 md:w-80"
              aria-label={col.label}
            >
              {/* Column header */}
              <div className="flex items-center gap-2 px-3 pt-3 pb-2">
                <span
                  className={`size-2 rounded-full ${columnColors[col.id]}`}
                />
                <h2 className="text-sm font-semibold">{col.label}</h2>
                <span className="ml-auto text-xs text-muted-foreground">
                  {colCards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
                {colCards.length === 0 && (
                  <p className="px-2 py-6 text-center text-xs text-muted-foreground">
                    {col.emptyText}
                  </p>
                )}
                {colCards.map((card) => {
                  const sev = severityConfig[card.severity]
                  const SevIcon = sev.icon
                  return (
                    <Card
                      key={card.id}
                      className="cursor-pointer transition-shadow hover:shadow-md"
                      onClick={() => openCard(card)}
                    >
                      <CardContent className="flex flex-col gap-2 p-3">
                        {/* Top row: severity + reports */}
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${sev.className}`}
                          >
                            <SevIcon className="mr-1 size-3" />
                            {sev.label}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <RiThumbDownLine className="size-3" />
                            {card.thumbsDown}
                          </span>
                        </div>

                        {/* Feedback text */}
                        <p className="text-sm leading-snug line-clamp-3">
                          {card.feedbackText}
                        </p>

                        {/* Doc page */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <RiFileTextLine className="size-3 shrink-0" />
                          <span className="truncate">{card.docPage}</span>
                        </div>

                        {/* Footer: author + agent */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5">
                            <Avatar size="sm">
                              <AvatarFallback className="text-[10px]">
                                {card.avatarFallback}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {card.customerName}
                            </span>
                          </div>
                          {card.assignedAgent && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <RiRobot2Line className="size-3" />
                              <span>
                                {aiAgents.find((a) => a.id === card.assignedAgent)?.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Card detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedCard && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={severityConfig[selectedCard.severity].className}
                  >
                    {severityConfig[selectedCard.severity].label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {selectedCard.date}
                  </span>
                </div>
                <DialogTitle className="text-base">
                  Feedback on{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-normal">
                    {selectedCard.docPage}
                  </code>
                </DialogTitle>
              </DialogHeader>

              {/* Feedback quote */}
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm">"{selectedCard.feedbackText}"</p>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallback className="text-[10px]">
                      {selectedCard.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {selectedCard.customerName}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <RiThumbDownLine className="size-3" />
                    {selectedCard.thumbsDown} reports
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Section:</span>{" "}
                {selectedCard.docSection}
              </div>

              <Separator />

              {/* Actions based on current column */}
              {selectedCard.column === "new" && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold">Create Issue</h3>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="issue-title">Issue title</Label>
                    <Input
                      id="issue-title"
                      value={issueTitle}
                      onChange={(e) => setIssueTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      disabled={!issueTitle}
                      onClick={() =>
                        moveCard(selectedCard.id, "issue_created")
                      }
                    >
                      Create Issue
                      <RiArrowRightLine className="ml-1 size-4" />
                    </Button>
                  </div>
                </div>
              )}

              {selectedCard.column === "issue_created" && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold">Assign AI Agent</h3>
                  <div className="flex flex-col gap-2">
                    <Label>Select agent</Label>
                    <Select
                      value={selectedAgent}
                      onValueChange={(v) => setSelectedAgent(v ?? "")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose an agent..." />
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
                                <Badge variant="secondary" className="ml-1 text-xs">
                                  Busy
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      disabled={!selectedAgent}
                      onClick={() =>
                        moveCard(
                          selectedCard.id,
                          "agent_working",
                          selectedAgent
                        )
                      }
                    >
                      <RiRobot2Line className="mr-1 size-4" />
                      Assign & Fix
                    </Button>
                  </div>
                </div>
              )}

              {selectedCard.column === "agent_working" && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <RiLoader4Line className="size-4 animate-spin text-chart-1" />
                    <span className="font-medium">Agent is working on this</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                    <RiRobot2Line className="size-4 text-muted-foreground" />
                    <span className="text-sm">
                      {aiAgents.find((a) => a.id === selectedCard.assignedAgent)?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      is rewriting the documentation
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        moveCard(selectedCard.id, "resolved")
                      }
                    >
                      <RiCheckLine className="mr-1 size-4" />
                      Mark Resolved
                    </Button>
                  </div>
                </div>
              )}

              {selectedCard.column === "resolved" && (
                <div className="flex items-center gap-2 text-sm text-success">
                  <RiCheckLine className="size-5" />
                  <span className="font-medium">
                    This documentation issue has been resolved
                  </span>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
