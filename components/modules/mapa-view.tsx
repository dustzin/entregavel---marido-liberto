"use client"

import { Check } from "lucide-react"
import { ModuleLayout } from "@/components/module-layout"
import { INFLUENCIAS } from "@/lib/content"
import { chime, vibrate } from "@/lib/feedback"
import { useApp } from "@/lib/store"

export function MapaView() {
  const { user, completeModule, registerPrayer } = useApp()
  const concluido = user?.completedModules.includes("mapa") ?? false

  function handleConcluir() {
    if (concluido) return
    completeModule("mapa")
    registerPrayer()
    vibrate(30)
    chime("success")
  }

  return (
    <ModuleLayout
      titulo="Mapa das Influências"
      intro="Identifique as forças que moldam o seu marido e cubra cada área em oração. Reflita sobre as perguntas e ore com fé."
    >
      <div className="flex flex-col gap-4">
        {INFLUENCIAS.map((cat) => (
          <div
            key={cat.titulo}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <h3 className="font-semibold text-green-deep">{cat.titulo}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {cat.perguntas.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-secondary/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-deep">
                Oração
              </p>
              <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-foreground/90">
                {cat.oracao}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleConcluir}
        disabled={concluido}
        className={`mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors ${
          concluido
            ? "border border-border bg-card text-green-deep"
            : "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-green-deep"
        }`}
      >
        <Check className="size-5" />
        {concluido ? "Mapa concluído" : "Concluir mapa e orar"}
      </button>
    </ModuleLayout>
  )
}
