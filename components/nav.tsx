"use client"

import { createContext, useContext } from "react"

interface NavValue {
  openModule: (slug: string) => void
  goHome: () => void
}

const NavContext = createContext<NavValue | null>(null)

export const NavProvider = NavContext.Provider

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error("useNav deve ser usado dentro de NavProvider")
  return ctx
}
