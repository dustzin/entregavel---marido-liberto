"use client"

import { ModuleLayout, PrayerCard } from "@/components/module-layout"
import { COBERTURA_PRAYERS } from "@/lib/content"

export function CoberturaView() {
  return (
    <ModuleLayout
      titulo="Campanha da Cobertura Conjugal"
      intro="Orações de proteção sobre as três dimensões da vida do seu marido. Ore uma a cada dia, ou todas juntas como um clamor de cobertura."
    >
      <div className="flex flex-col gap-3">
        {COBERTURA_PRAYERS.map((p) => (
          <PrayerCard key={p.titulo} titulo={p.titulo} texto={p.texto} />
        ))}
      </div>
    </ModuleLayout>
  )
}
