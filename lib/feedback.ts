/**
 * Feedback tátil e sonoro leve.
 * Tudo é protegido: se o navegador/dispositivo não suportar, falha em
 * silêncio sem lançar erro.
 */

/** Vibração curta (se suportada). */
export function vibrate(pattern: number | number[] = 30) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern)
    }
  } catch {
    // fallback silencioso
  }
}

let audioCtx: AudioContext | null = null

/**
 * Toca um "sino" suave gerado via WebAudio (sem necessidade de asset).
 * Usado em conclusões e desbloqueios.
 */
export function chime(kind: "success" | "unlock" = "success") {
  try {
    if (typeof window === "undefined") return
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!Ctx) return
    if (!audioCtx) audioCtx = new Ctx()
    const ctx = audioCtx
    if (ctx.state === "suspended") ctx.resume()

    const notes = kind === "unlock" ? [523.25, 659.25, 783.99] : [659.25, 987.77]
    const now = ctx.currentTime
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.value = freq
      const start = now + i * 0.12
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.42)
    })
  } catch {
    // fallback silencioso
  }
}
