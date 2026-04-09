# Component patterns

Reference this file before building any UI. Every installed SHADCN component
is listed here with correct usage, known quirks, and real examples from this
codebase. Do not build custom versions of anything on this list.

---

## Two rules that override everything else

1. **Use an installed SHADCN component before building anything custom.** If
   the component exists in `src/components/ui/`, use it. Only reach for a
   custom component in `src/components/custom/` if SHADCN can't cover the need.

2. **This project uses base-ui, not Radix UI.** Several APIs differ from the
   SHADCN docs. See the quirks callouts below — they will cause type errors if
   you ignore them.

---

## Installed components

```
accordion        avatar          badge           breadcrumb
button           calendar        card            checkbox
collapsible      command         dialog          input
input-group      label           navigation-menu popover
progress         resizable       scroll-area     select
separator        sheet           skeleton        sonner
switch           table           tabs            textarea
toggle           toggle-group    tooltip
```

Run `ls src/components/ui` to verify before using any component.

---

## Button

```tsx
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'

// Variants
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><RiAddLine className="size-4" /></Button>

// With icon (always use Remix icons)
<Button>
  <RiAddLine className="mr-1 size-4" />
  Create Issue
</Button>

// buttonVariants — use when a non-button element needs button styling
// (e.g. TooltipTrigger, PopoverTrigger — see quirks below)
className={buttonVariants({ variant: 'outline', size: 'sm' })}
```

---

## Badge

```tsx
import { Badge } from '@/components/ui/badge'

// Always pair background + foreground together (see design-tokens.md)
<Badge className="bg-success text-success-foreground">Active</Badge>
<Badge className="bg-destructive text-destructive-foreground">Failed</Badge>
<Badge className="bg-warn text-warn-foreground">Degraded</Badge>
<Badge variant="outline">Draft</Badge>
```

Badges use `rounded-sm` and `text-xs`. Do not override these.

---

## Card

```tsx
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Supporting context</CardDescription>
  </CardHeader>
  <CardContent>
    {/* main content */}
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>
```

Cards use `bg-card` and `rounded-lg` by default. Never override with
`bg-background` or `bg-white`.

---

## Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// Default (pill style)
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="details">...</TabsContent>
</Tabs>

// Line variant — used in the dashboard for content-level tabs
<Tabs defaultValue="all" onValueChange={(value) => setTab(value as string)}>
  <TabsList variant="line">
    <TabsTrigger value="all">All (12)</TabsTrigger>
    <TabsTrigger value="active">Active</TabsTrigger>
  </TabsList>
  <TabsContent value="all">...</TabsContent>
</Tabs>
```

Use the `line` variant for tabs that sit above a content list. Use the default
variant for top-level page navigation.

---

## Input

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Always pair with a Label
<div className="flex flex-col gap-1.5">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="Enter name" />
</div>

// Search input with icon (icon must be positioned, not in input-group)
<div className="relative w-full max-w-xs">
  <RiSearchLine className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-8" />
</div>
```

Input borders use `border-input`. Do not override with `border-border`.

---

## Select

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

<Select onValueChange={(value) => setValue(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option-a">Option A</SelectItem>
    <SelectItem value="option-b">Option B</SelectItem>
  </SelectContent>
</Select>
```

---

## Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog title</DialogTitle>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

Dialogs use `rounded-xl`. Do not add `rounded-*` to `DialogContent`.

---

## Sheet

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

// side: "right" (default) | "left" | "top" | "bottom"
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open panel</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Panel title</SheetTitle>
    </SheetHeader>
    {/* content */}
  </SheetContent>
</Sheet>
```

Use Sheet for detail drawers, filter panels, and mobile nav overlays.

---

## Tooltip

**base-ui quirk: `TooltipTrigger` does not support `asChild`.**

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'

// Correct — apply buttonVariants className directly to the trigger
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger className={buttonVariants({ variant: 'outline', size: 'sm' })}>
      Hover me
    </TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>

// WRONG — asChild is not supported, will throw type error
<TooltipTrigger asChild><Button>Hover me</Button></TooltipTrigger>
```

---

## Popover

**base-ui quirk: `PopoverTrigger` does not support `asChild`.**

```tsx
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { buttonVariants } from '@/components/ui/button'

// Correct — apply buttonVariants className directly to the trigger
<Popover>
  <PopoverTrigger className={buttonVariants({ variant: 'outline' })}>
    Open popover
  </PopoverTrigger>
  <PopoverContent className="w-80">
    {/* content */}
  </PopoverContent>
</Popover>
```

---

## Toggle group

**base-ui quirk: `value` is always `readonly string[]`, not `string`.**

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const [selected, setSelected] = useState('list')

<ToggleGroup
  type="single"
  value={[selected]}
  onValueChange={(vals: readonly string[]) => {
    if (vals.length) setSelected(vals[0])
  }}
>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>
```

---

## Progress

**base-ui quirk: `Progress` does not accept children — it's a self-closing
element. Render labels as siblings, not children.**

```tsx
import { Progress } from '@/components/ui/progress'

// Correct — label and value rendered as siblings above
<div className="flex flex-col gap-1.5">
  <div className="flex justify-between">
    <span className="text-xs text-muted-foreground">Health score</span>
    <span className="text-xs font-medium text-foreground">{value}%</span>
  </div>
  <Progress value={value} />
</div>
```

---

## Resizable

**base-ui quirk: use `orientation`, not `direction`.**

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'

// Correct
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={30}>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Right</ResizablePanel>
</ResizablePanelGroup>

// WRONG — will throw type error
<ResizablePanelGroup direction="horizontal">
```

---

## Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell className="font-medium">{row.name}</TableCell>
        <TableCell>
          <Badge className="bg-success text-success-foreground">{row.status}</Badge>
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

Wrap `Table` in a `Card` when it appears on a page. Do not place bare tables
directly on `bg-background`.

---

## Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section title</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## Collapsible

For inline expand/collapse that isn't a full accordion section.

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

const [open, setOpen] = useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm">
      {open ? 'Hide' : 'Show'} details
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* content */}
  </CollapsibleContent>
</Collapsible>
```

---

## Command

For search palettes, quick-switch menus, and combobox-style selectors.

```tsx
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Item one</CommandItem>
      <CommandItem>Item two</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

Wrap in a `Popover` or `Dialog` when triggered from a button.

---

## Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src={user.avatarUrl} alt={user.name} />
  <AvatarFallback>{user.initials}</AvatarFallback>
</Avatar>
```

Always include `AvatarFallback` — image load can fail.

---

## Breadcrumb

```tsx
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

## Skeleton

Use while data is loading. Match the shape of the real content.

```tsx
import { Skeleton } from '@/components/ui/skeleton'

// Card placeholder
<div className="flex flex-col gap-3">
  <Skeleton className="h-5 w-48" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>

// Avatar placeholder
<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>
```

---

## Scroll area

For fixed-height containers that need custom scrollbars.

```tsx
import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-72">
  {/* content taller than 288px */}
</ScrollArea>
```

Do not use `ScrollArea` on full-page containers — let the browser handle
page-level scroll.

---

## Sonner (toasts)

```tsx
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

// Add Toaster once in App.tsx (already done)
<Toaster />

// Trigger from anywhere
toast.success('Saved successfully')
toast.error('Something went wrong')
toast('Info message', { description: 'Additional context here' })
```

---

## Calendar

```tsx
import { Calendar } from '@/components/ui/calendar'

const [date, setDate] = useState<Date | undefined>()

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

Wrap in a `Popover` when triggered from a date input field.

---

## Switch

```tsx
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Switch id="notifications" checked={enabled} onCheckedChange={setEnabled} />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

## Checkbox

```tsx
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Checkbox id="agree" checked={checked} onCheckedChange={setChecked} />
  <Label htmlFor="agree">I agree to the terms</Label>
</div>
```

---

## Navigation menu

For top-level site nav with dropdown submenus. Not for sidebar navigation —
use the custom `SidebarNav` component for that.

```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/products/gpu">GPU</NavigationMenuLink>
        <NavigationMenuLink href="/products/sdk">SDK</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

## Icons

This project uses Remix Icon (`@remixicon/react`), not Lucide. Use Remix icons
in all new components. Exception: if an existing file already imports from
`lucide-react`, leave those imports alone.

```tsx
import { RiAddLine, RiSearchLine, RiArrowRightLine } from '@remixicon/react'

// Size via Tailwind — always use size-* shorthand
<RiAddLine className="size-4" />
<RiSearchLine className="size-5 text-muted-foreground" />
```

Icon sizing convention:
- `size-4` (16px) — inline with text, inside buttons
- `size-5` (20px) — standalone action icons
- `size-6` (24px) — section header icons, nav items

---

## Custom components (already built)

These live in `src/components/custom/` and are safe to reuse:

| Component       | Use for |
|-----------------|---------|
| `SidebarNav`    | Left sidebar navigation — already wired to routes |
| `MobileNav`     | Hamburger + Sheet overlay for mobile |
| `MetricCard`    | KPI stat card with trend indicator |
| `FeedbackCard`  | Feedback entry row with sentiment badge |
| `ProductCard`   | Product health card with sparkline and alert |

Import from `@/components/custom/<name>`.

---

## What to never do

```tsx
// Don't build a custom button — Button is installed
<div className="cursor-pointer rounded bg-primary px-4 py-2 text-primary-foreground">
  Click me
</div>

// Don't build a custom modal — Dialog is installed
<div className="fixed inset-0 z-50 flex items-center justify-center">

// Don't use asChild on Tooltip or Popover triggers — base-ui doesn't support it
<TooltipTrigger asChild><Button /></TooltipTrigger>

// Don't use direction on ResizablePanelGroup — use orientation
<ResizablePanelGroup direction="horizontal">

// Don't put children inside Progress — render siblings instead
<Progress value={50}>50%</Progress>

// Don't use ToggleGroup value as a plain string — it's readonly string[]
<ToggleGroup value="list">
```
