"use client"

import { useState } from "react"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Logo } from "@/components/logo"
import { Icon } from "@/components/icon"
import {
  CHAINS,
  SENTIMENTO_OPCOES,
  TEMPO_OPCOES,
  getChain,
} from "@/lib/content"
import { useApp } from "@/lib/store"
import type { ChainId } from "@/lib/types"

type Step = "welcome" | "q1" | "q2" | "q3" | "result"

export function Onboarding() {
  const { user, saveDiagnosis } = useApp()
  const [step, setStep] = useState<Step>("welcome")
  const [problemas, setProblemas] = useState<ChainId[]>([])
  const [tempo, setTempo] = useState("")
  const [sentimento, setSentimento] = useState("")

  function toggleProblema(id: ChainId) {
    setProblemas((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  function finalizar() {
    saveDiagnosis({ problemas, tempo, sentimento })
    // O AppShell passa a renderizar o dashboard automaticamente.
  }

  const progresso =
    step === "q1" ? 1 : step === "q2" ? 2 : step === "q3" ? 3 : 0

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-5 py-8">
      {step === "welcome" && (
        <WelcomeStep onStart={() => setStep("q1")} />
      )}

      {(step === "q1" || step === "q2" || step === "q3") && (
        <>
          <ProgressDots total={3} current={progresso} />
          {step === "q1" && (
            <QuestionShell
              titulo="Qual desses problemas MAIS afeta seu marido hoje?"
              subtitulo="Pode marcar mais de uma opção. Não há resposta errada — só honestidade diante de Deus."
            >
              <div className="flex flex-col gap-3">
                {CHAINS.map((c) => {
                  const ativo = problemas.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleProblema(c.id)}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                        ativo
                          ? "border-primary bg-secondary"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                          ativo
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon name={c.icon} className="size-5" />
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground">
                        {c.problema}
                      </span>
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          ativo
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border"
                        }`}
                      >
                        {ativo && <Check className="size-4" />}
                      </span>
                    </button>
                  )
                })}
              </div>
              <NextButton
                disabled={problemas.length === 0}
                onClick={() => setStep("q2")}
              />
            </QuestionShell>
          )}

          {step === "q2" && (
            <QuestionShell
              titulo="Há quanto tempo ele está assim?"
              subtitulo="Isso nos ajuda a entender a profundidade da batalha."
            >
              <SingleChoice
                options={TEMPO_OPCOES}
                value={tempo}
                onChange={setTempo}
              />
              <NextButton disabled={!tempo} onClick={() => setStep("q3")} />
            </QuestionShell>
          )}

          {step === "q3" && (
            <QuestionShell
              titulo="O que você mais sente hoje?"
              subtitulo="Deus se importa com o seu coração nessa jornada também."
            >
              <SingleChoice
                options={SENTIMENTO_OPCOES}
                value={sentimento}
                onChange={setSentimento}
              />
              <NextButton
                label="Ver meu diagnóstico"
                disabled={!sentimento}
                onClick={() => setStep("result")}
              />
            </QuestionShell>
          )}
        </>
      )}

      {step === "result" && (
        <ResultStep
          nome={user?.name ?? ""}
          problemas={problemas}
          onContinue={finalizar}
        />
      )}
    </main>
  )
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <Logo size="lg" />
      <h1 className="mt-8 text-balance text-2xl font-bold leading-tight text-foreground">
        Bem-vinda ao Manual do Marido Liberto
      </h1>
      <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
        Antes de começar, vamos identificar exatamente o que está afastando seu
        marido de Deus.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-green-deep"
      >
        Iniciar Diagnóstico
        <ArrowRight className="size-5" />
      </button>
    </div>
  )
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-all ${
            i + 1 <= current ? "w-8 bg-primary" : "w-2 bg-border"
          }`}
        />
      ))}
    </div>
  )
}

function QuestionShell({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string
  subtitulo: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-balance text-xl font-bold leading-snug text-foreground">
        {titulo}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {subtitulo}
      </p>
      <div className="mt-6 flex flex-1 flex-col">{children}</div>
    </div>
  )
}

function SingleChoice({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const ativo = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all ${
              ativo
                ? "border-primary bg-secondary"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <span className="text-sm font-medium text-foreground">{opt}</span>
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                ativo
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border"
              }`}
            >
              {ativo && <Check className="size-4" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function NextButton({
  onClick,
  disabled,
  label = "Continuar",
}: {
  onClick: () => void
  disabled?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      {label}
      <ArrowRight className="size-5" />
    </button>
  )
}

function ResultStep({
  nome,
  problemas,
  onContinue,
}: {
  nome: string
  problemas: ChainId[]
  onContinue: () => void
}) {
  const correntes = problemas.map(getChain)
  return (
    <div className="flex flex-1 flex-col py-4">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Sparkles className="size-7" />
        </span>
        <h1 className="mt-5 text-balance text-2xl font-bold text-foreground">
          Seu Diagnóstico está pronto{nome ? `, ${nome}` : ""}
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          Identificamos as correntes invisíveis que têm prendido o coração do
          seu marido. Agora você sabe contra o que orar.
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-3">
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

      <p className="mt-7 text-center text-sm font-medium text-green-deep">
        Vamos começar sua jornada de 21 dias.
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-green-deep"
      >
        Acessar Meus Módulos
        <ArrowRight className="size-5" />
      </button>
    </div>
  )
}
