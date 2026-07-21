"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { useApp } from "@/lib/store"

export function AuthScreen() {
  const { register, login } = useApp()
  const [mode, setMode] = useState<"register" | "login">("register")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (mode === "register") {
      if (!name.trim() || !email.trim() || !password) {
        setError("Preencha todos os campos para começar.")
        return
      }
      register(name, email, password)
    } else {
      const ok = login(email, password)
      if (!ok) setError("Email ou senha incorretos. Tente novamente.")
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col justify-center px-5 py-10">
      <Logo size="lg" className="mb-8" />

      <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5">
        <h1 className="text-balance text-center text-xl font-bold text-foreground">
          {mode === "register"
            ? "Crie seu acesso, esposa guerreira"
            : "Bem-vinda de volta"}
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
          {mode === "register"
            ? "Sua jornada de 21 dias começa com um passo de fé. Vamos juntas."
            : "Entre para continuar sua jornada de oração."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {mode === "register" && (
            <Field
              label="Seu nome"
              value={name}
              onChange={setName}
              placeholder="Como podemos te chamar?"
              autoComplete="name"
            />
          )}
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="seuemail@exemplo.com"
            autoComplete="email"
          />
          <Field
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete={mode === "register" ? "new-password" : "current-password"}
          />

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-green-deep"
          >
            {mode === "register" ? "Começar minha jornada" : "Entrar"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "register" ? "Já tem acesso? " : "Ainda não tem acesso? "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "register" ? "login" : "register")
              setError("")
            }}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {mode === "register" ? "Entrar" : "Criar acesso"}
          </button>
        </p>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Acesso simulado para prototipagem (dados salvos apenas neste
        dispositivo). A integração com banco de dados e login seguro será feita
        antes da publicação.
      </p>
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-primary focus:ring-3 focus:ring-primary/20"
      />
    </label>
  )
}
