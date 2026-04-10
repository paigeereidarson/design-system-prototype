import { useState } from 'react'
import { toast } from 'sonner'
import { AppShell } from '@/components/custom/app-shell'
import {
  BarChart3Icon,
  LineChartIcon,
  AreaChartIcon,
  FilterIcon,
  BellIcon,
  SearchIcon,
  SettingsIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  BookOpenIcon,
  CodeIcon,
  LayersIcon,
  FileTextIcon,
  ZapIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster } from '@/components/ui/sonner'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

import { Calendar } from '@/components/ui/calendar'

// ─── Data ────────────────────────────────────────────────────────────────────

const gpuTableData = [
  { model: 'H100 SXM5', region: 'US-West', units: 1_240, utilization: 91, updated: '2 min ago', status: 'healthy' },
  { model: 'A100 PCIe', region: 'EU-Central', units: 876, utilization: 67, updated: '8 min ago', status: 'healthy' },
  { model: 'L40S', region: 'APAC', units: 512, utilization: 43, updated: '15 min ago', status: 'degraded' },
  { model: 'RTX 6000 Ada', region: 'US-East', units: 320, utilization: 78, updated: '1 hr ago', status: 'healthy' },
  { model: 'H200 NVL', region: 'US-West', units: 96, utilization: 99, updated: '30 sec ago', status: 'critical' },
] as const

type GpuStatus = 'healthy' | 'degraded' | 'critical'

const statusConfig: Record<GpuStatus, { label: string; className: string }> = {
  healthy: { label: 'Healthy', className: 'bg-success/10 text-success-foreground border-success/20' },
  degraded: { label: 'Degraded', className: 'bg-warn/10 text-warn-foreground border-warn/20' },
  critical: { label: 'Critical', className: 'bg-destructive/10 text-destructive border-destructive/20' },
}

const gpuModels = [
  'H100 SXM5 80GB', 'H100 PCIe 80GB', 'H200 NVL 141GB', 'A100 SXM4 80GB',
  'A100 PCIe 80GB', 'A100 SXM4 40GB', 'A30 24GB', 'A10G 24GB',
  'L40S 48GB', 'L40 48GB', 'L4 24GB', 'RTX 6000 Ada 48GB',
  'RTX A6000 48GB', 'RTX 4090 24GB', 'T4 16GB', 'V100 SXM2 32GB',
  'V100 PCIe 32GB', 'V100 SXM2 16GB', 'P100 PCIe 16GB', 'Jetson Orin 64GB',
]

const docSections = [
  {
    label: 'Platform Overview',
    children: ['Architecture guide', 'Release notes', 'Migration paths'],
  },
  {
    label: 'API Reference',
    children: ['Authentication', 'Endpoints', 'Rate limits', 'Webhooks'],
  },
  {
    label: 'SDK Documentation',
    children: ['Python SDK', 'C++ SDK', 'CUDA toolkit'],
  },
]

const progressItems = [
  { label: 'GPU cluster utilization', value: 91 },
  { label: 'Memory allocation', value: 67 },
  { label: 'Storage capacity', value: 34 },
]

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  eyebrow,
  children,
}: {
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </p>
      {children}
    </section>
  )
}

// ─── Playground ───────────────────────────────────────────────────────────────

export function Playground() {
  const [chartType, setChartType] = useState('bar')
  const [timeRange, setTimeRange] = useState('30d')
  const [calDate, setCalDate] = useState<Date | undefined>(new Date())
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true })
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilters, setStatusFilters] = useState<Record<string, boolean>>({
    healthy: true,
    degraded: false,
    critical: false,
  })

  const toggleSection = (i: number) =>
    setOpenSections(prev => ({ ...prev, [i]: !prev[i] }))

  const toggleStatus = (key: string) =>
    setStatusFilters(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <AppShell
      topBar={
        <div className="flex flex-1 items-center gap-3">
          <h1 className="text-base font-semibold">Component Playground</h1>
          <span className="text-xs text-muted-foreground">Design system QA</span>
        </div>
      }
    >
      <Toaster />

      <div className="space-y-12">

        {/* ── 1. Navigation Menu ───────────────────────────────────────────── */}
        <Section eyebrow="Navigation menu">
          <div className="rounded-lg border border-border bg-card p-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-1 p-2">
                      {[
                        { icon: LayersIcon, label: 'Infrastructure', desc: 'Cluster and node management' },
                        { icon: ZapIcon, label: 'Acceleration', desc: 'GPU scheduling and tuning' },
                        { icon: SettingsIcon, label: 'Configuration', desc: 'Environment and secrets' },
                      ].map(({ icon: Icon, label, desc }) => (
                        <li key={label}>
                          <NavigationMenuLink className="flex gap-3 rounded-md p-2 hover:bg-accent cursor-pointer items-start">
                            <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{label}</p>
                              <p className="text-xs text-muted-foreground">{desc}</p>
                            </div>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-52 gap-1 p-2">
                      {['Getting started', 'API reference', 'SDK guides', 'Changelog'].map(item => (
                        <li key={item}>
                          <NavigationMenuLink className={navigationMenuTriggerStyle() + ' w-full justify-start cursor-pointer'}>
                            {item}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Support
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Status
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </Section>

        <Separator />

        {/* ── 2. Breadcrumb ────────────────────────────────────────────────── */}
        <Section eyebrow="Breadcrumb">
          <div className="space-y-4 rounded-lg border border-border bg-card p-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Dashboard</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>API Reference</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">API Reference</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Authentication</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Section>

        <Separator />

        {/* ── 3. Data Table ────────────────────────────────────────────────── */}
        <Section eyebrow="Data table">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Units deployed</TableHead>
                  <TableHead className="text-right">Utilization</TableHead>
                  <TableHead>Last updated</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gpuTableData.map(row => {
                  const cfg = statusConfig[row.status as GpuStatus]
                  return (
                    <TableRow key={row.model}>
                      <TableCell className="font-medium">{row.model}</TableCell>
                      <TableCell className="text-muted-foreground">{row.region}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.units.toLocaleString()}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.utilization}%</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.updated}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${cfg.className}`}>
                          {cfg.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Section>

        <Separator />

        {/* ── 4. Progress ──────────────────────────────────────────────────── */}
        <Section eyebrow="Progress">
          <Card>
            <CardContent className="space-y-5 pt-6">
              {progressItems.map(({ label, value }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="tabular-nums text-muted-foreground">{value}%</span>
                  </div>
                  <Progress value={value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 5. Toggle Group ──────────────────────────────────────────────── */}
        <Section eyebrow="Toggle group">
          <Card>
            <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-start">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Chart type</p>
                <ToggleGroup
                  value={[chartType]}
                  onValueChange={(vals) => { if (vals.length > 0) setChartType(vals[vals.length - 1]) }}
                >
                  <ToggleGroupItem value="bar" aria-label="Bar chart">
                    <BarChart3Icon className="size-4 mr-1.5" />Bar
                  </ToggleGroupItem>
                  <ToggleGroupItem value="line" aria-label="Line chart">
                    <LineChartIcon className="size-4 mr-1.5" />Line
                  </ToggleGroupItem>
                  <ToggleGroupItem value="area" aria-label="Area chart">
                    <AreaChartIcon className="size-4 mr-1.5" />Area
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Time range</p>
                <ToggleGroup
                  value={[timeRange]}
                  onValueChange={(vals) => { if (vals.length > 0) setTimeRange(vals[vals.length - 1]) }}
                >
                  {(['7d', '30d', '90d', '1y'] as const).map(v => (
                    <ToggleGroupItem key={v} value={v} aria-label={v}>
                      {v.toUpperCase()}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 6. Tooltip ───────────────────────────────────────────────────── */}
        <Section eyebrow="Tooltip">
          <Card>
            <CardContent className="flex gap-3 pt-6">
              {[
                { icon: SearchIcon, label: 'Search docs', tip: 'Search across all NVIDIA documentation' },
                { icon: BellIcon, label: 'Notifications', tip: 'View alerts for your GPU clusters' },
                { icon: FilterIcon, label: 'Filter', tip: 'Filter metrics by region and model' },
                { icon: SettingsIcon, label: 'Settings', tip: 'Manage workspace preferences' },
              ].map(({ icon: Icon, label, tip }) => (
                <Tooltip key={label}>
                  <TooltipTrigger
                    className={buttonVariants({ variant: 'outline', size: 'icon' })}
                    aria-label={label}
                  >
                    <Icon className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 7. Command palette ───────────────────────────────────────────── */}
        <Section eyebrow="Command palette">
          <div className="rounded-lg border border-border shadow-sm overflow-hidden">
            <Command className="rounded-lg">
              <CommandInput placeholder="Search docs, components, actions…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                  <CommandItem>
                    <BookOpenIcon className="mr-2 size-4" />
                    Getting started
                  </CommandItem>
                  <CommandItem>
                    <CodeIcon className="mr-2 size-4" />
                    API reference
                  </CommandItem>
                  <CommandItem>
                    <FileTextIcon className="mr-2 size-4" />
                    Release notes
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>
                    <FilterIcon className="mr-2 size-4" />
                    Filter by region
                  </CommandItem>
                  <CommandItem>
                    <BellIcon className="mr-2 size-4" />
                    Set utilization alert
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Recent">
                  <CommandItem>H100 SXM5 — US-West cluster</CommandItem>
                  <CommandItem>A100 deployment report</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </Section>

        <Separator />

        {/* ── 8. Collapsible sidebar nav ───────────────────────────────────── */}
        <Section eyebrow="Collapsible">
          <Card className="max-w-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-0">
              {docSections.map((section, i) => (
                <Collapsible
                  key={section.label}
                  open={openSections[i] ?? false}
                  onOpenChange={() => toggleSection(i)}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                    {section.label}
                    <ChevronDownIcon
                      className={`size-4 text-muted-foreground transition-transform ${openSections[i] ? 'rotate-180' : ''}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-3">
                      {section.children.map(child => (
                        <li key={child}>
                          <a
                            href="#"
                            className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            onClick={e => e.preventDefault()}
                          >
                            {child}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 9. Popover filter ────────────────────────────────────────────── */}
        <Section eyebrow="Popover">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                  <PopoverTrigger
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    <FilterIcon className="mr-2 size-4" />
                    Filter by status
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start" className="w-56">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Cluster status
                      </p>
                      {Object.entries(statusFilters).map(([key, checked]) => (
                        <div key={key} className="flex items-center gap-2">
                          <Checkbox
                            id={`filter-${key}`}
                            checked={checked}
                            onCheckedChange={() => toggleStatus(key)}
                          />
                          <Label htmlFor={`filter-${key}`} className="text-sm capitalize cursor-pointer">
                            {key}
                          </Label>
                        </div>
                      ))}
                      <Separator />
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => setFilterOpen(false)}
                      >
                        Apply filter
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-muted-foreground">
                  Active:{' '}
                  {Object.entries(statusFilters)
                    .filter(([, v]) => v)
                    .map(([k]) => k)
                    .join(', ') || 'none'}
                </p>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 10. Scroll area ──────────────────────────────────────────────── */}
        <Section eyebrow="Scroll area">
          <Card className="max-w-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">GPU model catalog</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[300px] pr-4">
                <ul className="space-y-px">
                  {gpuModels.map(model => (
                    <li key={model}>
                      <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-foreground">
                        {model}
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 11. Skeleton ─────────────────────────────────────────────────── */}
        <Section eyebrow="Skeleton">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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

        {/* ── 12. Resizable ────────────────────────────────────────────────── */}
        <Section eyebrow="Resizable">
          <div className="rounded-lg border border-border overflow-hidden h-64">
            <ResizablePanelGroup orientation="horizontal" className="h-full">
              <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
                <div className="flex h-full flex-col bg-muted/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Sections
                  </p>
                  <nav className="space-y-0.5">
                    {['Overview', 'Metrics', 'Alerts', 'Logs', 'Settings'].map(item => (
                      <button
                        key={item}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <ChevronRightIcon className="size-3 shrink-0" />
                        {item}
                      </button>
                    ))}
                  </nav>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={75}>
                <div className="flex h-full flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Overview
                  </p>
                  <h2 className="text-[18px] font-semibold leading-[22px] mb-4">H100 SXM5 — US-West</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Drag the handle to resize panels. The sidebar minimum is 15% and maximum is 40% of available width.
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </Section>

        <Separator />

        {/* ── 13. Sonner toasts ────────────────────────────────────────────── */}
        <Section eyebrow="Sonner — toast notifications">
          <Card>
            <CardContent className="flex flex-wrap gap-3 pt-6">
              <Button
                variant="outline"
                onClick={() =>
                  toast.success('Deployment complete', {
                    description: 'H100 cluster in US-West is now serving traffic.',
                  })
                }
              >
                Success toast
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.error('Deployment failed', {
                    description: 'Could not reach the US-East availability zone.',
                  })
                }
              >
                Error toast
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.info('Maintenance window', {
                    description: 'Scheduled downtime starts in 30 minutes.',
                  })
                }
              >
                Info toast
              </Button>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 14. Calendar ─────────────────────────────────────────────────── */}
        <Section eyebrow="Calendar">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Card className="w-fit">
              <CardContent className="pt-4">
                <Calendar
                  mode="single"
                  selected={calDate}
                  onSelect={setCalDate}
                />
              </CardContent>
            </Card>
            <div className="self-center max-w-xs">
              <p className="text-sm text-muted-foreground">
                The Calendar component renders a month picker from{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">react-day-picker</code>.
                Compose it with{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Popover</code>{' '}
                to build a DateRangePicker.
              </p>
              {calDate && (
                <p className="mt-3 text-sm font-medium">
                  Selected:{' '}
                  <span className="text-foreground">
                    {calDate.toLocaleDateString('en-US', { dateStyle: 'long' })}
                  </span>
                </p>
              )}
            </div>
          </div>
        </Section>

      </div>
    </AppShell>
  )
}
