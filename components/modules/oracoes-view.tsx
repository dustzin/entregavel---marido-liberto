"use client"

import { ModuleLayout, PrayerCard } from "@/components/module-layout"
import { PrayerCTA } from "@/components/prayer-cta"
import { LIBERATION_PRAYERS } from "@/lib/content"
import { useApp } from "@/lib/store"

export function OracoesView() {
  const { user } = useApp()
  const selecionadas = user?.diagnosis?.problemas ?? []

  // Orações relativas às correntes do diagnóstico vêm primeiro e destacadas.
  const minhas = LIBERATION_PRAYERS.filter((p) =>
    selecionadas.includes(p.chainId),
  )
  const outras = LIBERATION_PRAYERS.filter(
    (p) => !selecionadas.includes(p.chainId),
  )

  return (
    <ModuleLayout
      titulo="Orações de Libertação"
      intro="Para quebrar as correntes invisíveis. Ore de acordo com o que identificamos no seu diagnóstico — você pode orar mais de uma."
    >
      {minhas.length > 0 && (
        <section className="mb-7">
          <h2 className="mb-3 text-sm font-semibold text-green-deep">
            Para as suas correntes
          </h2>
          <div className="flex flex-col gap-3">
            {minhas.map((p) => (
              <PrayerCard key={p.chainId} titulo={p.titulo} texto={p.texto} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          {minhas.length > 0 ? "Outras orações de libertação" : "Orações de libertação"}
        </h2>
        <div className="flex flex-col gap-3">
          {outras.map((p) => (
            <PrayerCard key={p.chainId} titulo={p.titulo} texto={p.texto} />
          ))}
        </div>
      </section>

      <PrayerCTA
        label="Concluí minhas orações hoje"
        completeModuleSlug="oracoes-libertacao"
      />
    </ModuleLayout>
  )
}
