"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Play, Check, Zap, Bot, Map, BookOpen, Video, Users, ArrowRight, Lock, Shield } from "lucide-react"

const CHECKOUT_URL = "https://pay.cakto.com.br/32tatyi_883478"
const VIDEO_URL = "/vsl.mp4"
const REVEAL_AT_PERCENT = 0.70

const features = [
  { icon: Bot, title: "Agentes de IA", desc: "Sistemas que trabalham por você enquanto dorme — sem você precisar apertar um botão" },
  { icon: Map, title: "Mapas Mentais", desc: "Estruturas completas de como eu produzo, organizo e vendo usando IA no dia a dia" },
  { icon: BookOpen, title: "Claude Code na Prática", desc: "Do zero ao avançado. Sem enrolação, sem teoria inútil — só o que funciona" },
  { icon: Video, title: "Aulas Gravadas", desc: "Acesso vitalício a todo conteúdo gravado. Assiste quando quiser, quantas vezes quiser" },
  { icon: Users, title: "Lives no Discord", desc: "Sessões ao vivo com a comunidade. Tira dúvidas, vê aplicações reais em tempo real" },
  { icon: Zap, title: "Ferramentas e Arquivos", desc: "Templates, prompts e sistemas prontos pra copiar e usar imediatamente no seu negócio" },
]

export default function VslPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)

  function handlePlay() {
    const v = videoRef.current
    if (!v || playing) return
    v.play().then(() => setPlaying(true)).catch(() => {})
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    function onTimeUpdate() {
      if (!v.duration || showCta) return
      if (v.currentTime / v.duration >= REVEAL_AT_PERCENT) {
        setShowCta(true)
        setTimeout(() => ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 400)
      }
    }

    v.addEventListener("timeupdate", onTimeUpdate)
    return () => v.removeEventListener("timeupdate", onTimeUpdate)
  }, [showCta])

  return (
    <div className="min-h-screen text-white" style={{ background: "oklch(0.10 0.008 264)" }}>

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 max-w-5xl mx-auto">
        <span className="text-xl font-black tracking-tight">
          Academy<span style={{ color: "oklch(0.60 0.22 264)" }}>.IA</span>
        </span>
        <Link href="/login" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          Já sou membro →
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8"
          style={{
            background: "oklch(0.55 0.22 264 / 12%)",
            border: "1px solid oklch(0.55 0.22 264 / 30%)",
            color: "oklch(0.75 0.18 264)",
          }}
        >
          <Zap className="w-3.5 h-3.5" />
          Acesso vitalício por apenas R$97,90
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-black leading-[1.1] tracking-tight mb-6">
          Enquanto você ainda tenta{" "}
          <span style={{ color: "oklch(0.60 0.22 264)" }}>entender IA</span>, tem gente usando{" "}
          <span style={{ color: "oklch(0.78 0.14 75)" }}>Claude Code</span> pra criar estruturas que{" "}
          <em className="not-italic underline decoration-wavy" style={{ textDecorationColor: "oklch(0.55 0.22 264 / 50%)" }}>
            vendem sozinhas
          </em>{" "}
          24 horas por dia
        </h1>

        <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
          Neste vídeo eu mostro os agentes, os mapas mentais e as ferramentas que uso no meu dia a dia
          pra produzir em 1 hora o que levaria 1 semana —{" "}
          <strong className="text-white/80 font-semibold">e como você pode copiar exatamente isso.</strong>
        </p>
      </section>

      {/* VIDEO PLAYER */}
      <section className="max-w-4xl mx-auto px-6 pb-6">
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            aspectRatio: "16/9",
            background: "oklch(0.08 0.008 264)",
            border: "1px solid oklch(1 0 0 / 8%)",
            boxShadow: "0 0 80px oklch(0.55 0.22 264 / 15%)",
          }}
          onClick={handlePlay}
          onContextMenu={e => e.preventDefault()}
        >
          {/* Placeholder background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Video className="w-14 h-14 mb-3" style={{ color: "oklch(1 0 0 / 15%)" }} />
            <p className="text-sm" style={{ color: "oklch(1 0 0 / 20%)" }}>Vídeo em breve</p>
          </div>

          <video
            ref={videoRef}
            src={VIDEO_URL}
            preload="metadata"
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: "none" }}
          />

          {/* Play overlay */}
          {!playing && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-200"
              style={{ background: playing ? "transparent" : "oklch(0 0 0 / 40%)" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: "oklch(0.55 0.22 264)",
                  boxShadow: "0 0 50px oklch(0.55 0.22 264 / 50%)",
                }}
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
              <p className="text-white/70 text-sm font-medium">Clique para assistir</p>
            </div>
          )}
        </div>

        {/* Lock bar */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs" style={{ color: "oklch(1 0 0 / 25%)" }}>
          <Lock className="w-3 h-3" />
          Vídeo protegido — assista até o final para ver a oferta completa
        </div>
      </section>

      {/* CTA SECTION — aparece aos 70% do vídeo */}
      {showCta && (
        <div ref={ctaRef} className="animate-fade-up">

          {/* DIVIDER */}
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="h-px" style={{ background: "linear-gradient(to right, transparent, oklch(0.55 0.22 264 / 40%), transparent)" }} />
          </div>

          {/* O QUE VOCÊ RECEBE */}
          <section className="max-w-4xl mx-auto px-6 pb-14">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                O que você recebe com acesso vitalício
              </h2>
              <p style={{ color: "oklch(1 0 0 / 45%)" }}>
                Tudo isso por um único pagamento. Sem mensalidade, sem renovação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 rounded-xl p-5 transition-all duration-200"
                  style={{
                    background: "oklch(0.15 0.010 264)",
                    border: "1px solid oklch(1 0 0 / 7%)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.55 0.22 264 / 15%)" }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: "oklch(0.65 0.20 264)" }} />
                  </div>
                  <div>
                    <p className="font-bold mb-0.5">{f.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(1 0 0 / 50%)" }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PRICE + CTA */}
          <section className="max-w-2xl mx-auto px-6 pb-24">
            <div
              className="rounded-2xl p-8 md:p-12 text-center"
              style={{
                background: "oklch(0.14 0.012 264)",
                border: "1px solid oklch(0.55 0.22 264 / 35%)",
                boxShadow: "0 0 60px oklch(0.55 0.22 264 / 10%)",
              }}
            >
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "oklch(1 0 0 / 35%)" }}>
                Oferta especial — acesso vitalício
              </p>

              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-xl line-through" style={{ color: "oklch(1 0 0 / 25%)" }}>R$297</span>
                <span className="text-5xl md:text-6xl font-black" style={{ color: "oklch(0.78 0.14 75)" }}>
                  R$97,90
                </span>
              </div>
              <p className="text-sm mb-10" style={{ color: "oklch(1 0 0 / 40%)" }}>
                Pagamento único • Acesso imediato após confirmação
              </p>

              <div className="space-y-3 text-left mb-10">
                {[
                  "Agentes e sistemas de IA que uso diariamente",
                  "Mapas mentais das minhas estruturas de vendas",
                  "Claude Code na prática — do zero ao avançado",
                  "Aulas gravadas com acesso vitalício",
                  "Lives no Discord com a comunidade",
                  "Ferramentas, arquivos e templates prontos",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.55 0.22 264 / 20%)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "oklch(0.65 0.20 264)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "oklch(1 0 0 / 75%)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={CHECKOUT_URL}
                className="block w-full font-black text-lg py-5 rounded-xl text-white text-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: "oklch(0.55 0.22 264)",
                  boxShadow: "0 0 40px oklch(0.55 0.22 264 / 40%)",
                }}
              >
                QUERO MEU ACESSO AGORA <ArrowRight className="inline w-5 h-5 ml-1 -mt-0.5" />
              </a>

              <div className="flex items-center justify-center gap-2 mt-5" style={{ color: "oklch(1 0 0 / 30%)" }}>
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs">Compra 100% segura via Cakto</span>
              </div>
            </div>
          </section>

        </div>
      )}
    </div>
  )
}
