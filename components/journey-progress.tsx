"use client"

import { useEffect, useRef, useState } from "react"
import { Crown, Flame, Heart } from "lucide-react"

const MARCOS = [
  { dia: 7, Icon: Flame, label: "Dia 7" },
  { dia: 14, Icon: Heart, label: "Dia 14" },
  { dia: 21, Icon: Crown, label: "Dia 21" },
]

/**
 * Barra de progresso da jornada de 21 dias, com gradiente verde-dourado,
 * marcos que "acendem" e porcentagem que conta suavemente.
 */
export function JourneyProgress({ concluidos }: { concluidos: number }) {
  const alvo = Math.min(100, Math.round((concluidos / 21) * 100))
  const [pct, setPct] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const inicio = performance.now()
    const de = pct
    const dur = 700
    function tick(t: number) {
      const p = Math.min(1, (t - inicio) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(de + (alvo - de) * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alvo])

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">
          {concluidos} de 21 dias completos
        </span>
        <span className="font-bold text-primary tabular-nums">{pct}%</span>
      </div>

      <div className="relative mt-3">
        <div className="h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #22c55e 0%, #15803d 55%, #d4af37 100%)",
            }}
          />
        </div>

        {/* Marcos */}
        <div className="pointer-events-none absolute inset-0">
          {MARCOS.map(({ dia, Icon, label }) => {
            const alcancado = concluidos >= dia
            return (
              <span
                key={dia}
                aria-label={label}
                className={`absolute top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all ${
                  alcancado
                    ? "border-gold bg-gold text-gold-foreground shadow-md"
                    : "border-border bg-card text-muted-foreground"
                }`}
                style={{ left: `${(dia / 21) * 100}%` }}
              >
                <Icon
                  className="size-3.5"
                  fill={alcancado ? "currentColor" : "none"}
                />
              </span>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-between text-[10px] font-medium text-muted-foreground">
        <span>Início</span>
        <span>Meta: 21 dias</span>
      </div>
    </div>
  )
}
