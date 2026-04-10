# Icons

This project uses Remixicon exclusively. Never use Lucide, Heroicons,
or any other icon library. Never install a new icon package.

Remixicon is already installed. The CSS import is in src/index.css.
No additional setup needed.

## Usage

No imports required. Icons render via className on an <i> tag:

  <i className="ri-arrow-right-line" />
  <i className="ri-search-line text-muted-foreground" style={{ fontSize: '16px' }} />

## Naming pattern

Every icon follows: ri-{name}-{style}

  line  — outlined (DEFAULT — always use line unless explicitly told otherwise)
  fill  — solid filled (only when explicitly requested)
  bold  — heavier stroke (only when explicitly requested)

When no style is specified, always use line.

Full searchable library: https://remixicon.com

## Size

Always set font-size explicitly. Never let icons inherit container size.

  style={{ fontSize: '12px' }}  — inline with xs text
  style={{ fontSize: '16px' }}  — default for most icons
  style={{ fontSize: '20px' }}  — section headers
  style={{ fontSize: '24px' }}  — max, decorative only

## Color

Always use a token class. Never hardcode color.

  <i className="ri-check-line text-success-foreground" />
  <i className="ri-alert-line text-destructive-foreground" />
  <i className="ri-info-line text-muted-foreground" />
  <i className="ri-home-line text-foreground" />

## Common icons

  ri-home-line            nav
  ri-search-line          search
  ri-filter-line          filter
  ri-arrow-right-line     directional
  ri-arrow-left-line      directional
  ri-external-link-line   links opening new tab
  ri-alert-line           warnings
  ri-check-line           success / confirmed
  ri-close-line           dismiss / remove
  ri-more-2-line          overflow / kebab menu
  ri-settings-line        settings
  ri-refresh-line         sync / refresh

## Never do this

  import { AlertCircle } from 'lucide-react'   wrong library
  style={{ color: '#76B900' }}                  hardcoded color
  className="text-red-500"                      primitive color class
  <i className="ri-search-line" />              missing size in sized containers
  style={{ fontSize: '13px' }}                  off the size scale
  ri-search-fill                                never default to fill
