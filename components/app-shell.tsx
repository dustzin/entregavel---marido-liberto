"use client"

import { useCallback, useMemo, useState } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { Dashboard } from "@/components/dashboard"
import { Logo } from "@/components/logo"
import { NavProvider } from "@/components/nav"
import { Onboarding } from "@/components/onboarding"
import { ClamorView } from "@/components/modules/clamor-view"
import { CoberturaView } from "@/components/modules/cobertura-view"
import { ConteudosView } from "@/components/modules/conteudos-view"
import { ConversasView } from "@/components/modules/conversas-view"
import { DiagnosticoView } from "@/components/modules/diagnostico-view"
import { ManualView } from "@/components/modules/manual-view"
import { OracoesView } from "@/components/modules/oracoes-view"
import { useApp } from "@/lib/store"

const MODULE_VIEWS: Record<string, React.ComponentType> = {
  diagnostico: DiagnosticoView,
  "oracoes-libertacao": OracoesView,
  manual: ManualView,
  clamor: ClamorView,
  conversas: ConversasView,
  cobertura: CoberturaView,
  conteudos: ConteudosView,
}

export function AppShell() {
  const { user, hydrated } = useApp()
  const [activeModule, setActiveModule] = useState<string | null>(null)

  const openModule = useCallback((slug: string) => {
    setActiveModule(slug)
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])
  const goHome = useCallback(() => {
    setActiveModule(null)
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])

  const navValue = useMemo(() => ({ openModule, goHome }), [openModule, goHome])

  // Splash enquanto carrega do localStorage para evitar flash de tela errada.
  if (!hydrated) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <Logo size="lg" />
      </div>
    )
  }

  if (!user) return <AuthScreen />
  if (!user.diagnosis) return <Onboarding />

  const ActiveView = activeModule ? MODULE_VIEWS[activeModule] : null

  return (
    <NavProvider value={navValue}>
      {ActiveView ? <ActiveView /> : <Dashboard />}
    </NavProvider>
  )
}
