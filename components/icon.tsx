import {
  Award,
  BookOpen,
  CloudOff,
  CloudRain,
  Coins,
  Crown,
  EyeOff,
  Flame,
  Footprints,
  HandHeart,
  Heart,
  HeartCrack,
  Link2Off,
  Medal,
  MessagesSquare,
  Shield,
  Smartphone,
  Sprout,
  Trophy,
  Wine,
  type LucideIcon,
} from "lucide-react"

const MAP: Record<string, LucideIcon> = {
  Wine,
  HeartCrack,
  EyeOff,
  Coins,
  Flame,
  CloudOff,
  CloudRain,
  HandHeart,
  BookOpen,
  Heart,
  MessagesSquare,
  Shield,
  Smartphone,
  Sprout,
  Link2Off,
  Award,
  Crown,
  Footprints,
  Medal,
  Trophy,
}

export function Icon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Cmp = MAP[name] ?? Flame
  return <Cmp className={className} aria-hidden="true" />
}
