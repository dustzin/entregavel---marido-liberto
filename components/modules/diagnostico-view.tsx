"use client"

import { Sparkles } from "lucide-react"
import { Icon } from "@/components/icon"
import { ModuleLayout } from "@/components/module-layout"
import { getChain } from "@/lib/content"
import { useApp } from "@/lib/store"

export function DiagnosticoView() {
  const { user } = useApp()
  if (!user) return null
  const d = user.diagnosis
  const correntes = (d?.problemas ?? []).map(getChain)

  return (
    <ModuleLayout
      titulo="Diagnóstico das Correntes Invisíveis"
      intro="Este é o resumo do que identificamos juntas. Use-o para direcionar suas orações."
    >
      <div className="mb-5 flex items-center gap-2 rounded-2xl border border-gold/30 bg-accent/60 p-4 text-accent-foreground">
        <Sparkles className="size-5 shrink-0" />
        <p className="text-sm leading-relaxed">
          Agora você sabe contra o que orar. Volte aqui sempre que precisar
          lembrar o foco da sua batalha.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {correntes.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-green-deep">
                <Icon name={c.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{c.nome}</h3>
                <p className="text-xs text-muted-foreground">{c.problema}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {c.descricao}
            </p>
          </div>
        ))}
      </div>

      {(d?.tempo || d?.sentimento) && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {d?.tempo && (
            <InfoCard rotulo="Há quanto tempo" valor={d.tempo} />
          )}
          {d?.sentimento && (
            <InfoCard rotulo="O que você sente" valor={d.sentimento} />
          )}
        </div>
      )}
    </ModuleLayout>
  )
}

function InfoCard({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {rotulo}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{valor}</p>
    </div>
  )
}
