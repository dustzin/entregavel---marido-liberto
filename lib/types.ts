export type ChainId =
  | "escravidao"
  | "coracao-endurecido"
  | "impureza"
  | "escassez"
  | "ira"
  | "incredulidade"
  | "opressao"

export interface Chain {
  id: ChainId
  /** Texto do problema mostrado na pergunta 1 do diagnóstico */
  problema: string
  /** Nome espiritual da corrente */
  nome: string
  descricao: string
  icon: string
}

export interface DiagnosisAnswers {
  /** Problemas selecionados (pergunta 1, múltipla escolha) -> ChainId */
  problemas: ChainId[]
  /** Há quanto tempo (pergunta 2) */
  tempo: string
  /** O que mais sente hoje (pergunta 3) */
  sentimento: string
}

export interface DevotionalDay {
  dia: number
  semana: number
  titulo: string
  versiculo: string
  referencia: string
  reflexao: string
  oracao: string
  acao: string
}

export interface LiberationPrayer {
  chainId: ChainId
  titulo: string
  texto: string
}

export interface CoberturaPrayer {
  titulo: string
  texto: string
}

export interface ConversaEstrategia {
  titulo: string
  texto: string
}

export interface FrasePronta {
  momento: string
  frase: string
}

export interface ClamorDia {
  dia: number
  foco: string
}

export interface ConteudoItem {
  categoria: string
  itens: { titulo: string; descricao?: string }[]
}

export interface InfluenciaCategoria {
  titulo: string
  perguntas: string[]
  oracao: string
}

export type ModuleStatus = "concluido" | "disponivel" | "bloqueado" | "comprar"

export interface ModuleDef {
  slug: string
  icon: string
  titulo: string
  descricao: string
  /** Dia da jornada em que o módulo é liberado (0 = imediato) */
  unlockDay: number
}

export interface UserState {
  name: string
  email: string
  password: string
  /** ISO string — data/hora do primeiro acesso (deveria vir do servidor em produção) */
  firstAccessDate: string
  diagnosis: DiagnosisAnswers | null
  /** Dias do devocional marcados como concluídos */
  completedDays: number[]
  /** Sequência de dias consecutivos de acesso */
  streakCount: number
  /** Chave de data (AAAA-MM-DD) do último dia ativo */
  lastActiveDate: string | null
  /** Conquistas já desbloqueadas (ids) */
  achievements: string[]
  /** Chaves de data (AAAA-MM-DD) em que orou (qualquer módulo) */
  prayerDays: string[]
  /** Slugs de módulos marcados como concluídos (ex.: orações, mapa) */
  completedModules: string[]
}

export interface Achievement {
  id: string
  nome: string
  descricao: string
  /** Nome do ícone no mapa de ícones */
  icon: string
}
