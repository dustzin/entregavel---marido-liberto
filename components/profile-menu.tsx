"use client"

import { useEffect, useRef, useState } from "react"
import { LogOut, Trophy, User } from "lucide-react"
import { useApp } from "@/lib/store"

/** Menu de perfil no canto do dashboard: Minha Jornada e Sair. */
export function ProfileMenu({
  onOpenAchievements,
}: {
  onOpenAchievements: () => void
}) {
  const { user, logout } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [open])

  const inicial = user?.name?.trim()?.[0]?.toUpperCase() ?? "?"

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menu de perfil"
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform active:scale-95"
      >
        {inicial}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-52 animate-pop-in overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl">
          <div className="flex items-center gap-2 px-3 py-2">
            <User className="size-4 text-muted-foreground" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {user?.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onOpenAchievements()
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Trophy className="size-4 text-gold" />
            Minha Jornada
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              logout()
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-urgency transition-colors hover:bg-urgency/10"
          >
            <LogOut className="size-4" />
            Sair
          </button>
        </div>
      )}
    </div>
  )
}
