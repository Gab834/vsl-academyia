"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Banner {
  id: string
  image_url: string | null
  title: string
  subtitle?: string | null
  bg_color?: string | null
  link_url?: string | null
}

interface Props {
  banners: Banner[]
  autoplayMs?: number
}

const PLACEHOLDER_BANNERS: Banner[] = [
  { id: "p1", image_url: null, title: "Bem-vindo à Academy.IA", subtitle: "Sua comunidade de IA na prática", bg_color: "from-[#0f172a] to-[#1e293b]", link_url: null },
  { id: "p2", image_url: null, title: "Novos recursos toda semana", subtitle: "Skills, ferramentas e agentes prontos para usar", bg_color: "from-[#1a1a2e] to-[#16213e]", link_url: null },
  { id: "p3", image_url: null, title: "Aulas ao vivo no Discord", subtitle: "Fique ligado nos próximos eventos da comunidade", bg_color: "from-[#0d1117] to-[#161b22]", link_url: null },
]

export function BannerCarousel({ banners, autoplayMs = 5000 }: Props) {
  const items = banners.length > 0 ? banners : PLACEHOLDER_BANNERS
  // Extended list: clone first item at end for seamless infinite loop
  const extended = [...items, items[0]]

  const [current, setCurrent] = useState(0)
  const [animated, setAnimated] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goNext = useCallback(() => {
    setCurrent(c => c + 1)
  }, [])

  const goPrev = () => {
    setCurrent(c => Math.max(c - 1, 0))
  }

  // When landing on the cloned first slide, instantly snap back to real first
  const handleTransitionEnd = () => {
    if (current === items.length) {
      setAnimated(false)
      setCurrent(0)
    }
  }

  // Re-enable animation after snap
  useEffect(() => {
    if (!animated) {
      const id = setTimeout(() => setAnimated(true), 30)
      return () => clearTimeout(id)
    }
  }, [animated])

  // Autoplay
  useEffect(() => {
    if (items.length <= 1) return
    timerRef.current = setInterval(goNext, autoplayMs)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [goNext, autoplayMs, items.length])

  const realIndex = current === items.length ? 0 : current

  if (items.length === 0) return null

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "1280/400" }}>
      <div
        className={cn("flex h-full", animated && "transition-transform duration-500 ease-in-out")}
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extended.map((b, i) => (
          <div key={`${b.id}-${i}`} className="min-w-full h-full relative shrink-0">
            {b.image_url ? (
              <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
            ) : (
              <div className={cn("w-full h-full bg-gradient-to-br flex flex-col items-center justify-center gap-2 select-none", b.bg_color ?? "from-neutral-800 to-neutral-900")}>
                <p className="text-xl md:text-3xl font-bold text-white text-center px-6">{b.title}</p>
                {b.subtitle && <p className="text-sm md:text-base text-white/60 text-center px-6">{b.subtitle}</p>}
              </div>
            )}
            {b.link_url && (
              <a href={b.link_url} className="absolute inset-0" aria-label={b.title} />
            )}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "rounded-full transition-all",
                  i === realIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                )}
                aria-label={`Banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
