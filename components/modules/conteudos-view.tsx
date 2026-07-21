"use client"

import { Lightbulb } from "lucide-react"
import { ModuleLayout } from "@/components/module-layout"
import { CONTEUDOS, CONTEUDOS_COMO_USAR } from "@/lib/content"

export function ConteudosView() {
  return (
    <ModuleLayout
      titulo="Coleção de Conteúdos que Ativam a Fé"
      intro="Filmes, livros, músicas e canais para manter o ambiente espiritual vivo dentro de casa — sem pressão, sem forçar."
    >
      <div className="flex flex-col gap-4">
        {CONTEUDOS.map((c) => (
          <section
            key={c.categoria}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="mb-3 text-pretty font-semibold text-green-deep">
              {c.categoria}
            </h2>
            <ul className="flex flex-col gap-3">
              {c.itens.map((item) => (
                <li key={item.titulo} className="border-l-2 border-secondary pl-3">
                  <p className="text-sm font-medium text-foreground">
                    {item.titulo}
                  </p>
                  {item.descricao && (
                    <p className="mt-0.5 text-pretty text-sm leading-snug text-muted-foreground">
                      {item.descricao}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-accent bg-accent/40 p-5">
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-accent-foreground">
          <Lightbulb className="size-4" />
          Como usar com sabedoria
        </h2>
        <ul className="flex flex-col gap-2">
          {CONTEUDOS_COMO_USAR.map((dica) => (
            <li
              key={dica}
              className="text-pretty text-sm leading-relaxed text-foreground/90"
            >
              {dica}
            </li>
          ))}
        </ul>
      </section>
    </ModuleLayout>
  )
}
