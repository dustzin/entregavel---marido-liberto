"use client"

import { useEffect } from "react"
import { Icon } from "@/components/icon"
import { chime, vibrate } from "@/lib/feedback"
import { useApp } from "@/lib/store"

/**
 * Toast global que aparece quando uma nova conquista é desbloqueada.
 * Lê a conquista pendente do store e a limpa após exibir.
 */
export function AchievementToast() {
  const { pendingAchievement, clearPendingAchievement } = useApp()

  useEffect(() => {
    if (!pendingAchievement) return
    vibrate([20, 40, 20])
    chime("unlock")
    const id = setTimeout(clearPendingAchievement, 4000)
    return () => clearTimeout(id)
  }, [pendingAchievement, clearPendingAchievement])

  if (!pendingAchievement) return null

  return (
    <div className="fixed inset-x-0 top-4 z-[70] mx-auto flex max-w-[440px] justify-center px-5">
      <button
        type="button"
        onClick={clearPendingAchievement}
        className="flex w-full animate-pop-in items-center gap-3 rounded-2xl border border-gold/40 bg-card p-3 text-left shadow-xl"
      >
        <span className="flex size-12 shrink-0 animate-unlock-badge items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Icon name={pendingAchievement.icon} className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground">
            Nova conquista desbloqueada
          </p>
          <p className="truncate font-bold text-foreground">
            {pendingAchievement.nome}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {pendingAchievement.descricao}
          </p>
        </div>
      </button>
    </div>
  )
}
