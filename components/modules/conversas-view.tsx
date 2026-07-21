"use client"

import { Quote, X } from "lucide-react"
import { ModuleLayout } from "@/components/module-layout"
import {
  CONVERSAS_ESTRATEGIAS,
  CONVERSAS_EVITAR,
  CONVERSAS_FRASES,
  CONVERSAS_PRINCIPIO,
} from "@/lib/content"

export function ConversasView() {
  return (
    <ModuleLayout
      titulo="Conversas que Trazem Deus para o Lar"
      intro="Como falar de fé sem gerar conflito. Presença gentil abre portas; cobrança fecha."
    >
      <div className="mb-7 rounded-2xl border border-primary/30 bg-secondary p-5">
        <p className="font-serif text-[15px] leading-relaxed text-green-deep">
          {CONVERSAS_PRINCIPIO}
        </p>
      </div>

      <section className="mb-7">
        <h2 className="mb-3 text-sm font-semibold text-urgency">
          O que evitar
        </h2>
        <ul className="flex flex-col gap-2">
          {CONVERSAS_EVITAR.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-3"
            >
              <X className="mt-0.5 size-4 shrink-0 text-urgency" />
              <span className="text-pretty text-sm leading-snug text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-7">
        <h2 className="mb-3 text-sm font-semibold text-green-deep">
          Estratégias que funcionam
        </h2>
        <div className="flex flex-col gap-3">
          {CONVERSAS_ESTRATEGIAS.map((e) => (
            <div
              key={e.titulo}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <h3 className="mb-1.5 font-semibold text-foreground">
                {e.titulo}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {e.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-green-deep">
          Frases prontas para cada momento
        </h2>
        <div className="flex flex-col gap-3">
          {CONVERSAS_FRASES.map((f) => (
            <div
              key={f.momento}
              className="rounded-2xl border border-accent bg-accent/30 p-4"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                {f.momento}
              </p>
              <div className="flex items-start gap-2">
                <Quote className="mt-1 size-4 shrink-0 text-gold" />
                <p className="font-serif text-[15px] leading-relaxed text-foreground">
                  {f.frase}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ModuleLayout>
  )
}
