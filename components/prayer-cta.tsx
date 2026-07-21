"use client"

import { useState } from "react"
import { Check, HandHeart } from "lucide-react"
import { chime, vibrate } from "@/lib/feedback"
import { dateKey, useApp } from "@/lib/store"

/**
 * Botão para registrar que orou hoje. Conta para a conquista
 * "Intercessora Dedicada". Opcionalmente marca um módulo como concluído.
 */
export function PrayerCTA({
  label = "Marcar que orei hoje",
  completeModuleSlug,
}: {
  label?: string
  completeModuleSlug?: string
}) {
  const { user, registerPrayer, completeModule } = useApp()
  const jaOrouHoje = (user?.prayerDays ?? []).includes(dateKey())
  const [feito, setFeito] = useState(jaOrouHoje)

  function handle() {
    registerPrayer()
    if (completeModuleSlug) completeModule(completeModuleSlug)
    vibrate(30)
    chime("success")
    setFeito(true)
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={feito}
      className={`mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors ${
        feito
          ? "border border-border bg-card text-green-deep"
          : "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-green-deep"
      }`}
    >
      {feito ? <Check className="size-5" /> : <HandHeart className="size-5" />}
      {feito ? "Oração registrada hoje" : label}
    </button>
  )
}
