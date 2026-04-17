import { useState, useEffect } from "react"

const STORAGE_KEY = "docs-health-subscribed-products"
const DEFAULT_IDS = ["cuda", "dgx-cloud", "bionemo"]

export function getSubscribedProductIds(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  return DEFAULT_IDS
}

export function setSubscribedProductIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  // Dispatch a storage event so other components re-render
  window.dispatchEvent(new Event("subscribed-products-changed"))
}

export function useSubscribedProductIds(): [string[], (ids: string[]) => void] {
  const [ids, setIds] = useState<string[]>(getSubscribedProductIds)

  useEffect(() => {
    const handler = () => setIds(getSubscribedProductIds())
    window.addEventListener("subscribed-products-changed", handler)
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener("subscribed-products-changed", handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  const update = (newIds: string[]) => {
    setSubscribedProductIds(newIds)
    setIds(newIds)
  }

  return [ids, update]
}
