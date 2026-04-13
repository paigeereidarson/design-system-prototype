import { useState } from "react"
import { toast } from "sonner"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function Playground() {
  const [calDate, setCalDate] = useState<Date | undefined>(new Date())
  const [switchOn, setSwitchOn] = useState(true)
  const [progress] = useState(68)
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-heading font-bold text-foreground">Component Playground</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every installed SHADCN component, styled with design system tokens.
        </p>
      </div>

      {/* ── Button ──────────────────────────────────── */}
      <Section title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">
            Secondary
            <i className="ri-arrow-right-line" style={{ fontSize: '14px' }} />
          </Button>
          <Button variant="critical">Critical</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
          <Button size="icon">
            <i className="ri-add-line" style={{ fontSize: "16px" }} />
          </Button>
        </div>
      </Section>

      <Separator />

      {/* ── Badge ───────────────────────────────────── */}
      <Section title="Badge">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="default-menu">Default Menu</Badge>
          <Badge variant="outline-menu">Outline Menu</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="critical">Critical</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success-solid">Success Solid</Badge>
          <Badge variant="warning-solid">Warning Solid</Badge>
          <Badge variant="critical-solid">Critical Solid</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="dot" />
          <Badge variant="dot-success" />
          <Badge variant="dot-warning" />
          <Badge variant="dot-critical" />
        </div>
      </Section>

      <Separator />

      {/* ── Avatar ──────────────────────────────────── */}
      <Section title="Avatar">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Separator />

      {/* ── Input + Label + Textarea ────────────────── */}
      <Section title="Input / Label / Textarea">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pg-name">Name</Label>
            <Input id="pg-name" placeholder="Enter product name..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pg-desc">Description</Label>
            <Textarea id="pg-desc" placeholder="Describe the documentation issue..." />
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Select ──────────────────────────────────── */}
      <Section title="Select">
        <div className="max-w-xs">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a product..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="platform-api">Platform API</SelectItem>
              <SelectItem value="sdk-reference">SDK Reference</SelectItem>
              <SelectItem value="getting-started">Getting Started</SelectItem>
              <SelectItem value="admin-console">Admin Console</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Separator />

      {/* ── Checkbox + Switch ───────────────────────── */}
      <Section title="Checkbox / Switch">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="pg-check" defaultChecked />
            <Label htmlFor="pg-check">Enable automatic page scanning</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="pg-switch" checked={switchOn} onCheckedChange={setSwitchOn} />
            <Label htmlFor="pg-switch">Dark mode (token-driven)</Label>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Card ────────────────────────────────────── */}
      <Section title="Card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Platform API", description: "Core REST API documentation and reference guides", health: 42, strokeClass: "stroke-destructive-solid", textClass: "text-destructive-solid", insight: "23 pages have stale content with high negative feedback rate." },
            { title: "SDK Reference", description: "Client libraries for JavaScript, Python, and Go", health: 67, strokeClass: "stroke-warn-solid", textClass: "text-warn-solid", insight: "Python SDK examples failing validation across 8 pages." },
            { title: "Getting Started", description: "Onboarding guides and quick start tutorials", health: 94, strokeClass: "stroke-success-solid", textClass: "text-success-solid", insight: "All guides current with strong user engagement metrics." },
          ].map((product) => (
            <Card key={product.title}>
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1 flex-1">
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-muted" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.5" fill="none" className={product.strokeClass} strokeWidth="3" strokeDasharray={`${product.health * 0.9738} ${97.38 - product.health * 0.9738}`} strokeLinecap="round" />
                      </svg>
                      <span className={`absolute font-bold ${product.textClass}`} style={{ fontSize: 18 }}>{product.health}</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Health</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-foreground">{product.insight}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Tabs ────────────────────────────────────── */}
      <Section title="Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-3">
            <p className="text-sm text-muted-foreground">Product health overview goes here.</p>
          </TabsContent>
          <TabsContent value="insights" className="mt-3">
            <p className="text-sm text-muted-foreground">Insights backlog goes here.</p>
          </TabsContent>
          <TabsContent value="settings" className="mt-3">
            <p className="text-sm text-muted-foreground">Configuration panel goes here.</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      {/* ── Table ───────────────────────────────────── */}
      <Section title="Table">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Health</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Platform API</TableCell>
                <TableCell>156</TableCell>
                <TableCell><Badge variant="critical">42</Badge></TableCell>
                <TableCell className="text-right text-muted-foreground">2h ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SDK Reference</TableCell>
                <TableCell>89</TableCell>
                <TableCell><Badge variant="warning">67</Badge></TableCell>
                <TableCell className="text-right text-muted-foreground">4h ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Getting Started</TableCell>
                <TableCell>34</TableCell>
                <TableCell><Badge variant="success">94</Badge></TableCell>
                <TableCell className="text-right text-muted-foreground">1d ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      <Separator />

      {/* ── Accordion ───────────────────────────────── */}
      <Section title="Accordion">
        <Accordion className="max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>What data sources are analyzed?</AccordionTrigger>
            <AccordionContent>
              Feedback widgets, session analytics, support tickets, NPS surveys, and page crawlers are all analyzed to generate insights.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How often is data refreshed?</AccordionTrigger>
            <AccordionContent>
              Health scores update every 15 minutes. Insight generation runs hourly with a full recompute every 24 hours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I customize severity thresholds?</AccordionTrigger>
            <AccordionContent>
              Yes. Navigate to Settings and adjust the threshold sliders for critical, warning, and healthy ranges.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Separator />

      {/* ── Breadcrumb ──────────────────────────────── */}
      <Section title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Overview</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Platform API</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Insight Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      <Separator />

      {/* ── Progress ────────────────────────────────── */}
      <Section title="Progress">
        <div className="max-w-sm">
          <Progress value={progress}>
            <ProgressLabel className="text-xs text-muted-foreground">Confidence</ProgressLabel>
            <ProgressValue className="text-xs text-foreground" />
          </Progress>
        </div>
      </Section>

      <Separator />

      {/* ── Dialog ──────────────────────────────────── */}
      <Section title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button />}>
            Open Dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Issue</DialogTitle>
              <DialogDescription>
                Describe the documentation problem and assign an AI agent to fix it.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 pt-2">
              <Input placeholder="Issue title..." />
              <Textarea placeholder="Description..." />
              <div className="flex justify-end">
                <Button>Create Issue</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Section>

      <Separator />

      {/* ── Sheet ───────────────────────────────────── */}
      <Section title="Sheet">
        <Sheet>
          <SheetTrigger render={<Button />}>
            Open Sheet
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Page Details</SheetTitle>
              <SheetDescription>
                View metrics and feedback for this documentation page.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Health Score</span>
                <Badge variant="warning">67</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Traffic</span>
                <span className="font-mono text-foreground">12.4k</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Feedback</span>
                <span className="font-mono text-foreground">23 responses</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </Section>

      <Separator />

      {/* ── Popover ─────────────────────────────────── */}
      <Section title="Popover">
        <Popover>
          <PopoverTrigger render={<Button />}>
            <i className="ri-filter-line" style={{ fontSize: "16px" }} />
            Filter
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Status filter
              </p>
              <div className="flex items-center gap-2">
                <Checkbox id="f-critical" defaultChecked />
                <Label htmlFor="f-critical">Critical</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="f-warning" defaultChecked />
                <Label htmlFor="f-warning">Warning</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="f-healthy" />
                <Label htmlFor="f-healthy">Healthy</Label>
              </div>
              <Button size="default">Apply</Button>
            </div>
          </PopoverContent>
        </Popover>
      </Section>

      <Separator />

      {/* ── Tooltip ─────────────────────────────────── */}
      <Section title="Tooltip">
        <div className="flex gap-3">
          <Tooltip>
            <TooltipTrigger render={<Button size="icon" />}>
              <i className="ri-search-line" style={{ fontSize: "16px" }} />
            </TooltipTrigger>
            <TooltipContent>Search documentation</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button size="icon" />}>
              <i className="ri-notification-line" style={{ fontSize: "16px" }} />
            </TooltipTrigger>
            <TooltipContent>View notifications</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button size="icon" />}>
              <i className="ri-settings-line" style={{ fontSize: "16px" }} />
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>
      </Section>

      <Separator />

      {/* ── Command ─────────────────────────────────── */}
      <Section title="Command">
        <div className="max-w-md rounded-lg border border-border overflow-hidden">
          <Command>
            <CommandInput placeholder="Search docs, components, actions..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem>Getting Started</CommandItem>
                <CommandItem>API Reference</CommandItem>
                <CommandItem>Release Notes</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>Create Issue</CommandItem>
                <CommandItem>Run Health Check</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </Section>

      <Separator />

      {/* ── Collapsible ─────────────────────────────── */}
      <Section title="Collapsible">
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="max-w-sm">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Data Sources (4)
            <i
              className={`ri-arrow-down-s-line text-muted-foreground transition-transform ${collapsibleOpen ? "rotate-180" : ""}`}
              style={{ fontSize: "16px" }}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 flex flex-col gap-1 pl-3 border-l border-border ml-2">
              <span className="text-sm text-muted-foreground py-1">Feedback Widget</span>
              <span className="text-sm text-muted-foreground py-1">Session Analytics</span>
              <span className="text-sm text-muted-foreground py-1">Support Tickets</span>
              <span className="text-sm text-muted-foreground py-1">NPS Survey</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Separator />

      {/* ── Calendar ────────────────────────────────── */}
      <Section title="Calendar">
        <Card className="w-fit">
          <CardContent className="pt-4">
            <Calendar mode="single" selected={calDate} onSelect={setCalDate} />
          </CardContent>
        </Card>
      </Section>

      <Separator />

      {/* ── Toggle / Toggle Group ───────────────────── */}
      <Section title="Toggle / Toggle Group">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Toggle aria-label="Bold">
              <i className="ri-bold" style={{ fontSize: "16px" }} />
            </Toggle>
            <Toggle aria-label="Italic">
              <i className="ri-italic" style={{ fontSize: "16px" }} />
            </Toggle>
            <Toggle aria-label="Underline">
              <i className="ri-underline" style={{ fontSize: "16px" }} />
            </Toggle>
          </div>
          <ToggleGroup defaultValue={["grid"]}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <i className="ri-grid-line" style={{ fontSize: "16px" }} /> Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <i className="ri-list-check" style={{ fontSize: "16px" }} /> List
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Section>

      <Separator />

      {/* ── Scroll Area ─────────────────────────────── */}
      <Section title="Scroll Area">
        <Card className="max-w-xs">
          <CardHeader>
            <CardTitle className="text-sm">GPU Models</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-48">
              <div className="flex flex-col">
                {[
                  "H100 SXM5", "H100 PCIe", "A100 80GB", "A100 40GB",
                  "L40S", "L4", "A30", "A10", "T4", "V100",
                  "RTX 6000 Ada", "RTX 5000 Ada", "RTX 4090", "RTX 4080",
                ].map((model) => (
                  <button
                    key={model}
                    className="rounded-md px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-foreground"
                  >
                    {model}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </Section>

      <Separator />

      {/* ── Resizable ───────────────────────────────── */}
      <Section title="Resizable">
        <div className="rounded-lg border border-border overflow-hidden h-48">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="flex h-full flex-col bg-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Sidebar
                </p>
                <p className="text-sm text-muted-foreground">Drag the handle to resize.</p>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full flex-col p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Content
                </p>
                <p className="text-sm text-muted-foreground">Main content area.</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Section>

      <Separator />

      {/* ── Skeleton ────────────────────────────────── */}
      <Section title="Skeleton">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6 space-y-3">
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Sonner Toasts ───────────────────────────── */}
      <Section title="Sonner (Toast)">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast.success("Deployment complete", {
                description: "H100 cluster in US-West is now serving traffic.",
              })
            }
          >
            Success Toast
          </Button>
          <Button
            onClick={() =>
              toast.error("Deployment failed", {
                description: "Could not reach the US-East availability zone.",
              })
            }
          >
            Error Toast
          </Button>
          <Button
            onClick={() =>
              toast.info("Maintenance window", {
                description: "Scheduled downtime starts in 30 minutes.",
              })
            }
          >
            Info Toast
          </Button>
        </div>
      </Section>

      <Separator />

      {/* ── Separator ───────────────────────────────── */}
      <Section title="Separator">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Overview</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Insights</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Settings</span>
        </div>
      </Section>
    </div>
  )
}
