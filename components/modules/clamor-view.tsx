"use client"

import { Heart } from "lucide-react"
import { ModuleLayout } from "@/components/module-layout"
import { PrayerCTA } from "@/components/prayer-cta"
import { CLAMOR, CLAMOR_COMO_USAR } from "@/lib/content"
import { diaDaJornada, useApp, useNow } from "@/lib/store"

export function ClamorView() {
  const { user } = useApp()
  const now = useNow()
  const diaAtual = user ? diaDaJornada(user.firstAccessDate, now) : 1

  return (
    <ModuleLayout
      titulo="21 Dias de Clamor pela Restauração"
      intro="Um foco de oração para cada dia. Caminhe junto com o devocional — sussurre o clamor do dia ao acordar e volte a ele nos momentos de tensão."
    >
      <div className="mb-6 rounded-2xl border border-accent bg-accent/40 p-4">
        <p className="text-pretty text-sm leading-relaxed text-accent-foreground">
          {CLAMOR_COMO_USAR}
        </p>
      </div>

      <ol className="flex flex-col gap-2.5">
        {CLAMOR.map((c) => {
          const isToday = c.dia === diaAtual
          return (
            <li
              key={c.dia}
              className={[
                "flex items-center gap-3 rounded-xl border p-3.5 transition-colors",
                isToday
                  ? "border-primary bg-secondary"
                  : "border-border bg-card",
              ].join(" ")}
            >
              <span
                className={[
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  isToday
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-green-deep",
                ].join(" ")}
              >
                {c.dia}
              </span>
              <p className="text-pretty text-sm leading-snug text-foreground">
                {c.foco}
              </p>
              {isToday && (
                <Heart className="ml-auto size-4 shrink-0 text-primary" />
              )}
            </li>
          )
        })}
      </ol>

      <PrayerCTA label="Clamei hoje pela restauração" />
    </ModuleLayout>
  )
}
