"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronRight, Flame, Lock, Sparkles, Trophy } from "lucide-react"
import { AchievementsGallery } from "@/components/achievements-gallery"
import { Icon } from "@/components/icon"
import { Logo } from "@/components/logo"
import { useNav } from "@/components/nav"
import { ProfileMenu } from "@/components/profile-menu"
import {
  MODULES,
  REFORCO_ATIVA,
  REFORCO_INATIVA,
  REFORCO_MARCO,
  getChain,
  versiculoDoDia,
} from "@/lib/content"
import {
  checkUnlockStatus,
  dateKey,
  diaDaJornada,
  diasDesdeAcesso,
  formatarContagem,
  tempoAteLiberar,
  useApp,
  useNow,
} from "@/lib/store"
import type { ModuleDef } from "@/lib/types"

const MS_POR_DIA = 1000 * 60 * 60 * 24

export function Dashboard() {
  const { user, registerVisit } = useApp()
  const { openModule } = useNav()
  const now = useNow()
  const [toast, setToast] = useState<string | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [streakBroken, setStreakBroken] = useState(false)
  const [flamePulse, setFlamePulse] = useState(false)
  const visitDone = useRef(false)

  // Registra o acesso do dia (atualiza a sequência) uma vez por montagem.
  useEffect(() => {
    if (visitDone.current) return
    visitDone.current = true
    const r = registerVisit()
    if (r.status === "broken") setStreakBroken(true)
    if (r.status === "started" || r.status === "continued") {
      setFlamePulse(true)
      setTimeout(() => setFlamePulse(false), 1000)
    }
  }, [registerVisit])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(id)
  }, [toast])

  if (!user) return null

  const dia = diaDaJornada(user.firstAccessDate, now)
  const correntes = (user.diagnosis?.problemas ?? []).map(getChain)
  const manualConcluido = user.completedDays.length >= 21
  const verse = versiculoDoDia(now)
  const ativaHoje = user.lastActiveDate === dateKey(now)

  function statusFor(m: ModuleDef): {
    status: "concluido" | "disponivel" | "bloqueado"
    restante?: string
    label: string
    progresso?: number
    quaseLa?: boolean
  } {
    if (!user) return { status: "disponivel", label: "Disponível" }
    if (m.slug === "diagnostico") {
      return { status: "concluido", label: "Concluído — rever resultado" }
    }
    if (m.slug === "manual" && manualConcluido) {
      return { status: "concluido", label: "Jornada concluída" }
    }
    if (user.completedModules.includes(m.slug)) {
      return { status: "concluido", label: "Concluído" }
    }
    const liberado = checkUnlockStatus(m.unlockDay, user.firstAccessDate, now)
    if (liberado) return { status: "disponivel", label: "Disponível" }
    const restanteMs = tempoAteLiberar(m.unlockDay, user.firstAccessDate, now)
    const decorridos = diasDesdeAcesso(user.firstAccessDate, now)
    const progresso = Math.min(100, Math.round((decorridos / m.unlockDay) * 100))
    return {
      status: "bloqueado",
      restante: formatarContagem(restanteMs),
      label: `Libera no Dia ${m.unlockDay}`,
      progresso,
      quaseLa: restanteMs > 0 && restanteMs < MS_POR_DIA,
    }
  }

  function handleClick(m: ModuleDef) {
    const { status } = statusFor(m)
    if (status === "bloqueado") {
      setToast(
        `Esse conteúdo libera no Dia ${m.unlockDay} da sua jornada. Continue firme!`,
      )
      return
    }
    openModule(m.slug)
  }

  // Mensagem de reforço variável, escolhida na montagem.
  const reforco = pickReforco(user.completedDays.length, ativaHoje, dia)

  return (
    <main className="mx-auto w-full max-w-[480px] px-5 pb-16 pt-6">
      {/* Topo */}
      <header className="flex items-center justify-between">
        <Logo size="sm" withText={false} />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            aria-label="Ver minhas conquistas"
            className="relative flex size-10 items-center justify-center rounded-full border border-gold/30 bg-card text-gold shadow-sm transition-colors hover:bg-accent"
          >
            <Trophy className="size-5" />
            {user.achievements.length > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
                {user.achievements.length}
              </span>
            )}
          </button>
          <ProfileMenu onOpenAchievements={() => setGalleryOpen(true)} />
        </div>
      </header>

      {/* Versículo de boas-vindas do dia */}
      <div className="mt-5 rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
          Palavra de hoje
        </p>
        <p className="mt-1.5 text-pretty font-serif text-[15px] leading-relaxed text-foreground">
          “{verse.texto}”
        </p>
        <p className="mt-1.5 text-xs font-medium text-muted-foreground">
          {verse.referencia}
        </p>
      </div>

      <h1 className="mt-5 text-2xl font-bold text-foreground">
        Olá, {user.name.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{reforco}</p>

      {/* Sequência (streak) */}
      <StreakBanner
        streak={user.streakCount}
        broken={streakBroken}
        pulse={flamePulse}
      />

      {/* Resumo do diagnóstico */}
      {correntes.length > 0 && (
        <div className="mt-4 rounded-2xl border border-gold/30 bg-accent/60 p-4">
          <div className="flex items-center gap-2 text-accent-foreground">
            <Sparkles className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Suas correntes identificadas
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {correntes.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-green-deep shadow-sm"
              >
                <Icon name={c.icon} className="size-3.5" />
                {c.nome}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contador da jornada */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary p-4 text-primary-foreground shadow-lg shadow-primary/25">
        <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-foreground/15">
          <span className="text-lg font-bold leading-none">{dia}</span>
        </div>
        <div>
          <p className="text-sm font-semibold">
            Você está no Dia {dia} da sua jornada
          </p>
          <p className="text-xs text-primary-foreground/80">
            {user.completedDays.length} de 21 dias do devocional concluídos
          </p>
        </div>
      </div>

      {/* Módulos principais */}
      <section className="mt-7">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Seus módulos
        </h2>
        <div className="flex flex-col gap-3">
          {MODULES.map((m) => (
            <ModuleCard
              key={m.slug}
              module={m}
              {...statusFor(m)}
              onClick={() => handleClick(m)}
            />
          ))}

          {/* Card de upsell (espaço reservado) */}
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-gold/50 bg-accent/40 p-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <Sparkles className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-accent-foreground">
                Continue sua jornada
              </h3>
              <p className="mt-0.5 text-pretty text-xs text-muted-foreground">
                Em breve, novos conteúdos exclusivos para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toast de bloqueio */}
      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 mx-auto flex max-w-[440px] items-center gap-2 px-5">
          <div className="flex w-full items-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-sm text-background shadow-xl">
            <Lock className="size-4 shrink-0" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {galleryOpen && (
        <AchievementsGallery onClose={() => setGalleryOpen(false)} />
      )}
    </main>
  )
}

function StreakBanner({
  streak,
  broken,
  pulse,
}: {
  streak: number
  broken: boolean
  pulse: boolean
}) {
  const apagada = broken || streak === 0
  return (
    <div
      className={`mt-4 flex items-center gap-3 rounded-2xl border p-4 ${
        apagada
          ? "border-border bg-muted/50"
          : "border-gold/30 bg-accent/50"
      }`}
    >
      <Flame
        className={`size-9 shrink-0 ${pulse ? "animate-flame-pulse" : ""} ${
          apagada ? "text-muted-foreground" : "text-gold"
        }`}
        fill={apagada ? "none" : "currentColor"}
      />
      <div className="min-w-0 flex-1">
        {broken ? (
          <p className="text-pretty text-sm font-medium text-foreground">
            Sua sequência foi interrompida, mas Deus não desiste de você. Vamos
            recomeçar hoje?
          </p>
        ) : (
          <>
            <p className="text-sm font-bold text-foreground">
              {streak} {streak === 1 ? "dia" : "dias"} de sequência
            </p>
            <p className="text-xs text-muted-foreground">
              {streak <= 1
                ? "Volte amanhã para manter a chama acesa."
                : "Sua constância está acendendo o céu."}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function pickReforco(
  diasConcluidos: number,
  ativaHoje: boolean,
  diaJornada: number,
): string {
  // Perto de um marco (dias 6, 13, 20 -> falta 1 para 7/14/21)
  if ([6, 13, 20].includes(diasConcluidos)) {
    return REFORCO_MARCO[Math.floor(Math.random() * REFORCO_MARCO.length)]
  }
  const pool = ativaHoje ? REFORCO_ATIVA : REFORCO_INATIVA
  return pool[Math.floor(Math.random() * pool.length)]
}

function ModuleCard({
  module: m,
  status,
  label,
  restante,
  progresso,
  quaseLa,
  onClick,
}: {
  module: ModuleDef
  status: "concluido" | "disponivel" | "bloqueado"
  label: string
  restante?: string
  progresso?: number
  quaseLa?: boolean
  onClick: () => void
}) {
  const bloqueado = status === "bloqueado"

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
        bloqueado
          ? "border-border bg-muted/50 [filter:grayscale(40%)_opacity(0.75)]"
          : "border-border bg-card shadow-sm hover:border-primary/40 hover:shadow-md"
      } ${quaseLa ? "animate-soft-pulse border-gold/50" : ""}`}
    >
      <span
        className={`relative flex size-12 shrink-0 items-center justify-center rounded-xl ${
          bloqueado
            ? "bg-muted text-muted-foreground"
            : status === "concluido"
              ? "bg-secondary text-green-deep"
              : "bg-primary/10 text-primary"
        }`}
      >
        <Icon name={m.icon} className="size-6" />
        {bloqueado && (
          <span
            className={`absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full ${
              quaseLa
                ? "bg-gold text-gold-foreground"
                : "bg-foreground text-background"
            }`}
          >
            <Lock className="size-3" />
          </span>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate font-semibold ${
            bloqueado ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {m.titulo}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {m.descricao}
        </p>
        <StatusBadge
          status={status}
          label={label}
          restante={restante}
          quaseLa={quaseLa}
        />
        {bloqueado && typeof progresso === "number" && (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                quaseLa ? "bg-gold" : "bg-muted-foreground/50"
              }`}
              style={{ width: `${progresso}%` }}
            />
          </div>
        )}
      </div>

      {!bloqueado && (
        <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
      )}
    </button>
  )
}

function StatusBadge({
  status,
  label,
  restante,
  quaseLa,
}: {
  status: "concluido" | "disponivel" | "bloqueado"
  label: string
  restante?: string
  quaseLa?: boolean
}) {
  if (status === "bloqueado") {
    return (
      <span
        className={`mt-1.5 inline-flex items-center gap-1 text-xs font-medium ${
          quaseLa ? "text-gold-foreground" : "text-urgency"
        }`}
      >
        <Lock className="size-3" />
        {quaseLa ? `Quase liberado! ${restante}` : `Libera em ${restante}`}
      </span>
    )
  }
  if (status === "concluido") {
    return (
      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-green-deep">
        <Check className="size-3" />
        {label}
      </span>
    )
  }
  return (
    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
      {label}
    </span>
  )
}
