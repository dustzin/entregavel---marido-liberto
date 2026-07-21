"use client"

import { ChevronLeft } from "lucide-react"
import { useNav } from "@/components/nav"

export function ModuleLayout({
  titulo,
  intro,
  children,
}: {
  titulo: string
  intro?: string
  children: React.ReactNode
}) {
  const { goHome } = useNav()
  return (
    <main className="mx-auto w-full max-w-[480px] px-5 pb-16 pt-5">
      <button
        type="button"
        onClick={goHome}
        className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Voltar aos módulos
      </button>

      <h1 className="text-balance text-2xl font-bold leading-tight text-foreground">
        {titulo}
      </h1>
      {intro && (
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </main>
  )
}

/** Card de oração reutilizável, com tipografia devocional. */
export function PrayerCard({
  titulo,
  texto,
}: {
  titulo?: string
  texto: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {titulo && (
        <h3 className="mb-2 font-semibold text-green-deep">{titulo}</h3>
      )}
      <p className="font-serif text-[15px] leading-relaxed text-foreground/90">
        {texto}
      </p>
    </div>
  )
}
