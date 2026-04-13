import { useState, useEffect, useCallback } from "react"

type Theme = "nvidia-light" | "nvidia-dark"

const STORAGE_KEY = "nvidia-theme"

function getSystemPreference(): Theme {
  if (typeof window === "undefined") return "nvidia-light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "nvidia-dark"
    : "nvidia-light"
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "nvidia-light"
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === "nvidia-light" || stored === "nvidia-dark") return stored
  return getSystemPreference()
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove("nvidia-light", "nvidia-dark")
  root.classList.add(theme)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Listen for system preference changes when no stored preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const next = getSystemPreference()
        setThemeState(next)
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "nvidia-light" ? "nvidia-dark" : "nvidia-light")
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme }
}
