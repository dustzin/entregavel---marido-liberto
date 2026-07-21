"use client"

import { useMemo } from "react"

/**
 * Confete leve em CSS puro (sem libs). Renderiza N partículas douradas/verdes
 * que caem uma única vez. Use dentro de um container fixo/absoluto.
 */
export function Confetti({ pieces = 36 }: { pieces?: number }) {
  const cores = ["#d4af37", "#22c55e", "#15803d", "#fde68a", "#86efac"]
  const particulas = useMemo(
    () =>
      Array.from({ length: pieces }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.8 + Math.random() * 1.4,
        cor: cores[i % cores.length],
        rodar: Math.random() > 0.5 ? 1 : -1,
        escala: 0.7 + Math.random() * 0.8,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pieces],
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particulas.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.cor,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.escala})`,
          }}
        />
      ))}
    </div>
  )
}
