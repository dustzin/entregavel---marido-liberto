"use client"

/**
 * STORE DA APLICAÇÃO
 * ------------------------------------------------------------------
 * Gerencia o estado da usuária (autenticação, diagnóstico, progresso
 * e datas de desbloqueio) e persiste em localStorage.
 *
 * ⚠️ ATENÇÃO PARA PRODUÇÃO:
 * Toda esta camada é uma simulação para prototipagem. Antes de ir ao ar:
 *   1. A autenticação (email + senha) DEVE ser movida para um backend real
 *      com hashing de senha e sessões — nunca guarde senha em localStorage.
 *   2. `firstAccessDate` DEVE ser gravado/lido do servidor (data/hora do
 *      servidor), nunca do dispositivo do cliente, para evitar burla
 *      mudando a data do celular.
 *   3. A verificação de desbloqueio (`checkUnlockStatus`) DEVE ocorrer no
 *      backend / API route — o front-end nunca deve ser a única barreira,
 *      senão dá para burlar inspecionando o código do navegador.
 * As funções de data foram isoladas propositalmente para facilitar essa
 * migração depois.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Achievement, DiagnosisAnswers, UserState } from "./types"
import { earnedAchievementIds, getAchievement } from "./achievements"

const STORAGE_KEY = "mml:user"
const MS_POR_DIA = 1000 * 60 * 60 * 24

/** Chave de data no formato AAAA-MM-DD (nível de dia, local). */
export function dateKey(ts = Date.now()): string {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`
}

/** Diferença em dias inteiros entre duas chaves de data. */
function diffEmDias(de: string, ate: string): number {
  const a = new Date(`${de}T00:00:00`).getTime()
  const b = new Date(`${ate}T00:00:00`).getTime()
  return Math.round((b - a) / MS_POR_DIA)
}

/* ------------------------------------------------------------------ */
/* LÓGICA DE DATA / DESBLOQUEIO                                        */
/* (isolada para migração futura ao backend)                          */
/* ------------------------------------------------------------------ */

/** Dias inteiros decorridos desde o primeiro acesso. */
export function diasDesdeAcesso(firstAccessDate: string, now = Date.now()): number {
  const inicio = new Date(firstAccessDate).getTime()
  return Math.floor((now - inicio) / MS_POR_DIA)
}

/** Dia atual da jornada (1-based) — Dia 1 no primeiro acesso. */
export function diaDaJornada(firstAccessDate: string, now = Date.now()): number {
  return diasDesdeAcesso(firstAccessDate, now) + 1
}

/**
 * Verifica se um módulo está liberado.
 * ⚠️ MOVER PARA O BACKEND ANTES DE PRODUÇÃO.
 */
export function checkUnlockStatus(
  unlockDay: number,
  firstAccessDate: string,
  now = Date.now(),
): boolean {
  if (unlockDay <= 0) return true
  return diasDesdeAcesso(firstAccessDate, now) >= unlockDay
}

/** Tempo restante (em ms) até um módulo liberar. 0 se já liberado. */
export function tempoAteLiberar(
  unlockDay: number,
  firstAccessDate: string,
  now = Date.now(),
): number {
  const liberaEm = new Date(firstAccessDate).getTime() + unlockDay * MS_POR_DIA
  return Math.max(0, liberaEm - now)
}

/** Formata um intervalo em ms como "X dias, Y horas". */
export function formatarContagem(ms: number): string {
  const totalHoras = Math.floor(ms / (1000 * 60 * 60))
  const dias = Math.floor(totalHoras / 24)
  const horas = totalHoras % 24
  const minutos = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  if (dias > 0) {
    return `${dias} ${dias === 1 ? "dia" : "dias"}, ${horas}h`
  }
  if (horas > 0) {
    return `${horas}h ${minutos}min`
  }
  return `${minutos}min`
}

/* ------------------------------------------------------------------ */
/* CONTEXT                                                             */
/* ------------------------------------------------------------------ */

interface StreakResult {
  status: "same" | "started" | "continued" | "broken"
  streak: number
}

interface AppContextValue {
  user: UserState | null
  hydrated: boolean
  register: (name: string, email: string, password: string) => void
  login: (email: string, password: string) => boolean
  logout: () => void
  saveDiagnosis: (answers: DiagnosisAnswers) => void
  toggleDay: (dia: number) => void
  /** Registra acesso do dia e atualiza a sequência. */
  registerVisit: () => StreakResult
  /** Registra que orou hoje (qualquer módulo). */
  registerPrayer: () => void
  /** Marca um módulo como concluído. */
  completeModule: (slug: string) => void
  /** Conquista recém-desbloqueada aguardando exibição (toast/animação). */
  pendingAchievement: Achievement | null
  /** Limpa a conquista pendente após exibir. */
  clearPendingAchievement: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

/** Garante que estados antigos (sem campos novos) tenham defaults seguros. */
function normalize(u: UserState): UserState {
  return {
    ...u,
    streakCount: u.streakCount ?? 0,
    lastActiveDate: u.lastActiveDate ?? null,
    achievements: u.achievements ?? [],
    prayerDays: u.prayerDays ?? [],
    completedModules: u.completedModules ?? [],
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [pendingAchievement, setPendingAchievement] =
    useState<Achievement | null>(null)

  // Carrega do localStorage no primeiro render do cliente.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(normalize(JSON.parse(raw)))
    } catch {
      // ignora dados corrompidos
    }
    setHydrated(true)
  }, [])

  // Avalia conquistas sempre que o progresso muda; enfileira novas.
  useEffect(() => {
    if (!user) return
    const earned = earnedAchievementIds(user)
    const novas = earned.filter((id) => !user.achievements.includes(id))
    if (novas.length > 0) {
      setUser((prev) =>
        prev ? { ...prev, achievements: [...prev.achievements, ...novas] } : prev,
      )
      const ach = getAchievement(novas[0])
      if (ach) setPendingAchievement(ach)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user?.completedDays,
    user?.prayerDays,
    user?.completedModules,
    user?.streakCount,
  ])

  // Persiste sempre que mudar.
  useEffect(() => {
    if (!hydrated) return
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user, hydrated])

  const register = useCallback(
    (name: string, email: string, password: string) => {
      setUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        // ⚠️ Em produção, esta data deve vir do servidor.
        firstAccessDate: new Date().toISOString(),
        diagnosis: null,
        completedDays: [],
        streakCount: 0,
        lastActiveDate: null,
        achievements: [],
        prayerDays: [],
        completedModules: [],
      })
    },
    [],
  )

  const login = useCallback((email: string, password: string) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return false
      const stored: UserState = JSON.parse(raw)
      if (
        stored.email === email.trim().toLowerCase() &&
        stored.password === password
      ) {
        setUser(normalize(stored))
        return true
      }
    } catch {
      // ignora
    }
    return false
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const saveDiagnosis = useCallback((answers: DiagnosisAnswers) => {
    setUser((prev) => (prev ? { ...prev, diagnosis: answers } : prev))
  }, [])

  const toggleDay = useCallback((dia: number) => {
    setUser((prev) => {
      if (!prev) return prev
      const has = prev.completedDays.includes(dia)
      return {
        ...prev,
        completedDays: has
          ? prev.completedDays.filter((d) => d !== dia)
          : [...prev.completedDays, dia].sort((a, b) => a - b),
      }
    })
  }, [])

  const registerVisit = useCallback((): StreakResult => {
    const hoje = dateKey()
    let result: StreakResult = { status: "same", streak: 0 }
    setUser((prev) => {
      if (!prev) return prev
      const last = prev.lastActiveDate
      if (last === hoje) {
        result = { status: "same", streak: prev.streakCount }
        return prev
      }
      let novaStreak: number
      let status: StreakResult["status"]
      if (!last) {
        novaStreak = 1
        status = "started"
      } else {
        const gap = diffEmDias(last, hoje)
        if (gap === 1) {
          novaStreak = prev.streakCount + 1
          status = "continued"
        } else {
          novaStreak = 1
          status = "broken"
        }
      }
      result = { status, streak: novaStreak }
      return { ...prev, streakCount: novaStreak, lastActiveDate: hoje }
    })
    return result
  }, [])

  const registerPrayer = useCallback(() => {
    const hoje = dateKey()
    setUser((prev) => {
      if (!prev) return prev
      if (prev.prayerDays.includes(hoje)) return prev
      return { ...prev, prayerDays: [...prev.prayerDays, hoje] }
    })
  }, [])

  const completeModule = useCallback((slug: string) => {
    setUser((prev) => {
      if (!prev) return prev
      if (prev.completedModules.includes(slug)) return prev
      return { ...prev, completedModules: [...prev.completedModules, slug] }
    })
  }, [])

  const clearPendingAchievement = useCallback(
    () => setPendingAchievement(null),
    [],
  )

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      hydrated,
      register,
      login,
      logout,
      saveDiagnosis,
      toggleDay,
      registerVisit,
      registerPrayer,
      completeModule,
      pendingAchievement,
      clearPendingAchievement,
    }),
    [
      user,
      hydrated,
      register,
      login,
      logout,
      saveDiagnosis,
      toggleDay,
      registerVisit,
      registerPrayer,
      completeModule,
      pendingAchievement,
      clearPendingAchievement,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp deve ser usado dentro de <AppProvider>")
  return ctx
}

/** Hook que atualiza o relógio a cada minuto para contagens regressivas. */
export function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
