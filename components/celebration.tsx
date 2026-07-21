"use client"

import { useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Confetti } from "@/components/confetti"
import { fraseCelebracao } from "@/lib/content"

/**
 * Tela de celebração rápida ao concluir um dia do devocional.
 * Fecha sozinha em ~2.6s ou ao toque. Nunca bloqueia além de 3s.
 */
export function Celebration({
  dia,
  totalConcluido,
  onClose,
}: {
  dia: number
  totalConcluido: number
  onClose: () => void
}) {
  const finalDaJornada = totalConcluido >= 21

  useEffect(() => {
    const id = setTimeout(onClose, finalDaJornada ? 3000 : 2600)
    return () => clearTimeout(id)
  }, [onClose, finalDaJornada])

  return (
    <div
      role="dialog"
      aria-label={`Dia ${dia} concluído`}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex animate-fade-in cursor-pointer flex-col items-center justify-center bg-green-deep/95 px-6 text-center text-primary-foreground backdrop-blur-sm"
    >
      <Confetti pieces={finalDaJornada ? 60 : 40} />

      <div className="animate-pop-in">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary-foreground/15">
          <Sparkles className="size-10 text-gold" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
          {finalDaJornada ? "Jornada Completa" : "Conquista do dia"}
        </p>
        <h2 className="mt-2 text-balance text-4xl font-bold leading-tight">
          {finalDaJornada ? "Você venceu!" : `Dia ${dia} Concluído!`}
        </h2>
        <p className="mx-auto mt-4 max-w-xs text-balance text-base leading-relaxed text-primary-foreground/90">
          {fraseCelebracao(totalConcluido)}
        </p>
        <p className="mt-8 text-xs text-primary-foreground/60">
          Toque para continuar
        </p>
      </div>
    </div>
  )
}
