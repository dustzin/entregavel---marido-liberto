"use client"

import { X } from "lucide-react"
import { Icon } from "@/components/icon"
import { ACHIEVEMENTS } from "@/lib/achievements"
import { useApp } from "@/lib/store"

/** Modal com a galeria de conquistas (desbloqueadas em cor, demais em cinza). */
export function AchievementsGallery({ onClose }: { onClose: () => void }) {
  const { user } = useApp()
  const desbloqueadas = user?.achievements ?? []
  const total = ACHIEVEMENTS.length
  const conquistadas = desbloqueadas.length

  return (
    <div
      role="dialog"
      aria-label="Galeria de conquistas"
      className="fixed inset-0 z-[65] flex animate-fade-in items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[85dvh] w-full max-w-[480px] animate-pop-in overflow-y-auto rounded-t-3xl bg-card p-5 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Suas Conquistas
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {conquistadas} de {total} desbloqueadas
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const ok = desbloqueadas.includes(a.id)
            return (
              <div
                key={a.id}
                className={`flex items-center gap-3 rounded-2xl border p-3 transition-all ${
                  ok
                    ? "border-gold/40 bg-accent/50"
                    : "border-border bg-muted/40"
                }`}
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                    ok
                      ? "bg-gold/15 text-gold"
                      : "bg-muted text-muted-foreground grayscale"
                  }`}
                >
                  <Icon name={a.icon} className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-semibold ${
                      ok ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {a.nome}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.descricao}</p>
                </div>
                {ok && (
                  <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold-foreground">
                    Conquistada
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
