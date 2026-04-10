import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  RiArrowLeftLine,
  RiRobot2Line,
  RiCheckLine,
  RiFileTextLine,
  RiAddLine,
  RiLoader4Line,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { AppShell } from "@/components/custom/app-shell"
import { aiAgents } from "@/data/mock-doc-feedback"
import { cn } from "@/lib/utils"

const severityOptions = [
  {
    value: "critical",
    label: "Critical",
    className:
      "bg-destructive text-destructive-foreground border-transparent",
  },
  {
    value: "major",
    label: "Major",
    className: "bg-warn text-warn-foreground border-transparent",
  },
  { value: "minor", label: "Minor", className: "" },
]

function generateIssueNumber(): string {
  return `DOC-${Math.floor(1000 + Math.random() * 9000)}`
}

export function CreateIssue() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [docPage, setDocPage] = useState("")
  const [severity, setSeverity] = useState("")
  const [assignedAgent, setAssignedAgent] = useState("")

  const [step, setStep] = useState<"form" | "submitting" | "success">("form")
  const [issueNumber, setIssueNumber] = useState("")

  const isValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    severity !== "" &&
    assignedAgent !== ""

  function handleSubmit() {
    setStep("submitting")
    setTimeout(() => {
      setIssueNumber(generateIssueNumber())
      setStep("success")
    }, 1200)
  }

  function handleReset() {
    setTitle("")
    setDescription("")
    setDocPage("")
    setSeverity("")
    setAssignedAgent("")
    setStep("form")
  }

  const assignedAgentData = aiAgents.find((a) => a.id === assignedAgent)
  const selectedSeverity = severityOptions.find((s) => s.value === severity)

  return (
    <AppShell
      topBar={
        <div className="flex flex-1 items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-1 gap-1.5"
            onClick={() => navigate(-1)}
          >
            <RiArrowLeftLine className="size-4" />
            Back
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <RiAddLine className="size-4 text-muted-foreground" />
            <h1 className="text-base font-semibold">Create Issue</h1>
          </div>
        </div>
      }
    >
      <div className="flex flex-1 items-start justify-center">
        <div className="w-full max-w-xl">

          {/* ── Form ─────────────────────────────────────── */}
          {step === "form" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-title font-bold">New documentation issue</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Describe the problem and assign an AI agent to fix it.
                </p>
              </div>

              {/* Issue details */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">
                    Issue title{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Fix: CUDA installation guide outdated"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">
                    Description{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Describe what's wrong, what users reported, and what needs to change..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="doc-page">Doc page</Label>
                    <div className="relative">
                      <RiFileTextLine className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="doc-page"
                        placeholder="/docs/..."
                        className="pl-8"
                        value={docPage}
                        onChange={(e) => setDocPage(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>
                      Severity{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={severity}
                      onValueChange={(v) => setSeverity(v ?? "")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity..." />
                      </SelectTrigger>
                      <SelectContent>
                        {severityOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={cn("text-xs", opt.className)}
                              >
                                {opt.label}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Agent assignment */}
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-sm font-semibold">
                    Assign to AI Agent{" "}
                    <span className="text-destructive">*</span>
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    The selected agent will automatically rewrite the
                    documentation.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {aiAgents.map((agent) => {
                    const isSelected = assignedAgent === agent.id
                    const isBusy = agent.status === "busy"
                    return (
                      <button
                        key={agent.id}
                        type="button"
                        disabled={isBusy}
                        onClick={() => !isBusy && setAssignedAgent(agent.id)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                          isBusy && "cursor-not-allowed opacity-50",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-muted-foreground cursor-pointer"
                        )}
                      >
                        <Avatar size="sm">
                          <AvatarFallback className="text-xs">
                            {agent.avatarFallback}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-1 flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {agent.name}
                            </span>
                            {isBusy && (
                              <Badge variant="secondary" className="text-xs">
                                Busy
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {agent.speciality}
                          </span>
                        </div>
                        {isSelected ? (
                          <RiCheckLine className="size-4 shrink-0 text-primary" />
                        ) : (
                          !isBusy && (
                            <span className="size-2 shrink-0 rounded-full bg-success" />
                          )
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button disabled={!isValid} onClick={handleSubmit}>
                  <RiRobot2Line className="mr-1.5 size-4" />
                  Create & Assign
                </Button>
              </div>
            </div>
          )}

          {/* ── Submitting ───────────────────────────────── */}
          {step === "submitting" && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <RiLoader4Line className="size-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Creating issue and assigning agent...
              </p>
            </div>
          )}

          {/* ── Success ──────────────────────────────────── */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-6 py-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <RiCheckLine className="size-8 text-primary" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {issueNumber}
                </p>
                <h2 className="mt-1 text-title font-bold">{title}</h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Issue created and assigned to{" "}
                  <span className="font-medium text-foreground">
                    {assignedAgentData?.name}
                  </span>
                  . The agent will begin rewriting the documentation shortly.
                </p>
              </div>

              {/* Summary card */}
              <div className="flex w-full max-w-xs flex-col gap-3 rounded-lg border border-border p-4 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Severity</span>
                  <Badge
                    variant="secondary"
                    className={cn("text-xs", selectedSeverity?.className)}
                  >
                    {selectedSeverity?.label}
                  </Badge>
                </div>
                {docPage && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Doc page</span>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-normal">
                      {docPage}
                    </code>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Assigned to</span>
                  <div className="flex items-center gap-1.5">
                    <RiRobot2Line className="size-3" />
                    <span className="font-medium">
                      {assignedAgentData?.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <span className="flex items-center gap-1.5 font-medium text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Agent working
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/doc-feedback")}
                >
                  View Board
                </Button>
                <Button onClick={handleReset}>Create Another</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
