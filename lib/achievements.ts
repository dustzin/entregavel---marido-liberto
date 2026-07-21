import type { Achievement, UserState } from "./types"

/**
 * Catálogo de conquistas e a regra (predicado) que as desbloqueia.
 * A avaliação é derivada do estado da usuária — nunca confie só no
 * front-end em produção; valide no backend antes de conceder benefícios.
 */
interface AchievementDef extends Achievement {
  earned: (u: UserState) => boolean
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "primeiro-passo",
    nome: "Primeiro Passo",
    descricao: "Você completou o Dia 1 do devocional.",
    icon: "Footprints",
    earned: (u) => u.completedDays.includes(1),
  },
  {
    id: "semana-fe",
    nome: "Uma Semana de Fé",
    descricao: "Você concluiu 7 dias do devocional.",
    icon: "Flame",
    earned: (u) => u.completedDays.length >= 7,
  },
  {
    id: "guerreira",
    nome: "Guerreira Persistente",
    descricao: "Você concluiu 14 dias do devocional.",
    icon: "Award",
    earned: (u) => u.completedDays.length >= 14,
  },
  {
    id: "vitoriosa",
    nome: "Vitoriosa",
    descricao: "Você completou os 21 dias da jornada.",
    icon: "Crown",
    earned: (u) => u.completedDays.length >= 21,
  },
  {
    id: "intercessora",
    nome: "Intercessora Dedicada",
    descricao: "Você orou em 5 dias diferentes.",
    icon: "HandHeart",
    earned: (u) => u.prayerDays.length >= 5,
  },
  {
    id: "quebradora",
    nome: "Quebradora de Correntes",
    descricao: "Você concluiu o módulo de Orações de Libertação.",
    icon: "Link2Off",
    earned: (u) => u.completedModules.includes("oracoes-libertacao"),
  },
  {
    id: "mapeadora",
    nome: "Mapeadora Espiritual",
    descricao: "Você concluiu o Mapa das Influências.",
    icon: "BookOpen",
    earned: (u) => u.completedModules.includes("mapa"),
  },
]

/** IDs das conquistas que o estado atual da usuária satisfaz. */
export function earnedAchievementIds(user: UserState): string[] {
  return ACHIEVEMENTS.filter((a) => a.earned(user)).map((a) => a.id)
}

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id)
}
