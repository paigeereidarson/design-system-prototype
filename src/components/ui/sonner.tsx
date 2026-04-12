"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: (
          <i
            className="ri-checkbox-circle-line"
            style={{ fontSize: "16px", color: "var(--success-solid)" }}
            aria-hidden="true"
          />
        ),
        info: (
          <i
            className="ri-information-line"
            style={{ fontSize: "16px", color: "var(--color-primary)" }}
            aria-hidden="true"
          />
        ),
        warning: (
          <i
            className="ri-alert-line"
            style={{ fontSize: "16px", color: "var(--warn-solid)" }}
            aria-hidden="true"
          />
        ),
        error: (
          <i
            className="ri-close-circle-line"
            style={{ fontSize: "16px", color: "var(--destructive-solid)" }}
            aria-hidden="true"
          />
        ),
        loading: (
          <i
            className="ri-loader-4-line animate-spin"
            style={{ fontSize: "16px", color: "var(--muted-foreground)" }}
            aria-hidden="true"
          />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success-bg": "var(--popover)",
          "--success-text": "var(--popover-foreground)",
          "--success-border": "var(--success-solid)",
          "--error-bg": "var(--popover)",
          "--error-text": "var(--popover-foreground)",
          "--error-border": "var(--destructive-solid)",
          "--warning-bg": "var(--popover)",
          "--warning-text": "var(--popover-foreground)",
          "--warning-border": "var(--warn-solid)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
