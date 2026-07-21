import { Link2Off } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({
  size = "md",
  withText = true,
  className,
}: {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
}) {
  const ring = {
    sm: "size-11",
    md: "size-14",
    lg: "size-20",
  }[size]
  const icon = {
    sm: "size-5",
    md: "size-7",
    lg: "size-10",
  }[size]

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-4 ring-gold/40",
          ring,
        )}
      >
        <Link2Off className={icon} aria-hidden="true" />
      </div>
      {withText && (
        <div className="text-center leading-tight">
          <p className="font-semibold tracking-wide text-green-deep">
            Manual do
          </p>
          <p className="font-serif text-lg font-bold tracking-wide text-foreground">
            MARIDO LIBERTO
          </p>
        </div>
      )}
    </div>
  )
}
