"use client"

import { useState } from "react"
import { Check, ChevronLeft, Lock, Quote } from "lucide-react"
import { Celebration } from "@/components/celebration"
import { JourneyProgress } from "@/components/journey-progress"
import { ModuleLayout } from "@/components/module-layout"
import { DEVOTIONAL } from "@/lib/content"
import { chime, vibrate } from "@/lib/feedback"
import { useApp } from "@/lib/store"
import type { DevotionalDay } from "@/lib/types"

const SEMANAS = [
  { n: 1, titulo: "Semana 1 — Identificando e Quebrando as Correntes" },
  { n: 2, titulo: "Semana 2 — Restaurando a Conexão" },
  { n: 3, titulo: "Semana 3 — Jejum e Expectativa" },
]

export function ManualView() {
  const { user } = useApp()
  const [diaAberto, setDiaAberto] = useState<number | null>(null)

  if (!user) return null
  const completos = user.completedDays

  // Trilha sequencial: Dia N libera quando Dia N-1 foi concluído.
  function liberado(dia: number) {
    return dia === 1 || completos.includes(dia - 1)
  }

  if (diaAberto !== null) {
    const day = DEVOTIONAL.find((d) => d.dia === diaAberto)!
    return (
      <DayDetail
        day={day}
        onBack={() => setDiaAberto(null)}
        concluido={completos.includes(day.dia)}
        completedCount={completos.length}
      />
    )
  }

  return (
    <ModuleLayout
      titulo="Manual do Marido Liberto"
      intro="21 dias de oração com propósito. Conclua cada dia para liberar o próximo."
    >
      <div className="mb-6">
        <JourneyProgress concluidos={completos.length} />
      </div>

      <div className="flex flex-col gap-6">
        {SEMANAS.map((semana) => (
          <div key={semana.n}>
            <h2 className="mb-3 text-sm font-semibold text-green-deep">
              {semana.titulo}
            </h2>
            <ol className="relative flex flex-col gap-2.5 pl-2">
              {DEVOTIONAL.filter((d) => d.semana === semana.n).map((d) => {
                const concluido = completos.includes(d.dia)
                const disp = liberado(d.dia)
                return (
                  <li key={d.dia}>
                    <button
                      type="button"
                      onClick={() => disp && setDiaAberto(d.dia)}
                      disabled={!disp}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                        disp
                          ? "border-border bg-card shadow-sm hover:border-primary/40"
                          : "border-border bg-muted/50"
                      } ${disp ? "" : "cursor-not-allowed"}`}
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          concluido
                            ? "bg-primary text-primary-foreground"
                            : disp
                              ? "bg-secondary text-green-deep"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {concluido ? (
                          <Check className="size-4" />
                        ) : !disp ? (
                          <Lock className="size-3.5" />
                        ) : (
                          d.dia
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Dia {d.dia}
                        </p>
                        <p
                          className={`truncate text-sm font-medium ${
                            disp ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {d.titulo}
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
    </ModuleLayout>
  )
}

function DayDetail({
  day,
  onBack,
  concluido,
  completedCount,
}: {
  day: DevotionalDay
  onBack: () => void
  concluido: boolean
  completedCount: number
}) {
  const { toggleDay } = useApp()
  const [celebrar, setCelebrar] = useState<number | null>(null)

  function handleToggle() {
    const vaiConcluir = !concluido
    toggleDay(day.dia)
    if (vaiConcluir) {
      vibrate([30, 50, 30])
      chime("success")
      // Total após esta conclusão.
      setCelebrar(completedCount + 1)
    }
  }

  return (
    <main className="mx-auto w-full max-w-[480px] px-5 pb-16 pt-5">
      {celebrar !== null && (
        <Celebration
          dia={day.dia}
          totalConcluido={celebrar}
          onClose={() => setCelebrar(null)}
        />
      )}

      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Voltar à trilha
      </button>

      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Dia {day.dia} de 21
      </p>
      <h1 className="mt-1 text-balance text-2xl font-bold leading-tight text-foreground">
        {day.titulo}
      </h1>

      {/* Versículo */}
      <div className="mt-6 rounded-2xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/20">
        <Quote className="size-6 text-primary-foreground/60" />
        <p className="mt-2 font-serif text-lg leading-relaxed">
          {day.versiculo}
        </p>
        <p className="mt-3 text-sm font-medium text-primary-foreground/85">
          {day.referencia}
        </p>
      </div>

      <Section titulo="Reflexão">
        <p className="text-pretty leading-relaxed text-foreground/90">
          {day.reflexao}
        </p>
      </Section>

      <Section titulo="Oração guiada">
        <p className="font-serif text-[15px] leading-relaxed text-foreground/90">
          {day.oracao}
        </p>
      </Section>

      <Section titulo="Ação do dia">
        <p className="text-pretty leading-relaxed text-foreground/90">
          {day.acao}
        </p>
      </Section>

      <button
        type="button"
        onClick={handleToggle}
        className={`mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors ${
          concluido
            ? "border border-border bg-card text-foreground hover:bg-muted"
            : "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-green-deep"
        }`}
      >
        <Check className="size-5" />
        {concluido ? "Concluído — desmarcar" : "Marcar como concluído"}
      </button>
    </main>
  )
}

function Section({
  titulo,
  children,
}: {
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-deep">
        {titulo}
      </h2>
      {children}
    </section>
  )
}
