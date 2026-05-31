"use client"
import Image from "next/image"
import { useRef } from "react"

export function ObsidianBrainSection() {
  const tiltRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg) scale(1.04)`
  }

  const handleMouseLeave = () => {
    const el = tiltRef.current
    if (!el) return
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)"
  }

  return (
    <section style={{
      background: "linear-gradient(180deg, #0a0c14 0%, #0d0b1a 50%, #0a0c14 100%)",
      padding: "100px 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes brain-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.35; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 0.75; transform: translate(-50%,-50%) scale(1.18); }
        }
        @keyframes scan-sweep {
          0%   { top: 8%; opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { top: 88%; opacity: 0; }
        }
        @keyframes glitch-flash {
          0%,100% { clip-path: inset(0 0 100% 50%); opacity: 0; }
          10% { clip-path: inset(20% 0 60% 50%); opacity: 0.35; }
          20% { clip-path: inset(55% 0 30% 50%); opacity: 0.25; }
          30% { clip-path: inset(10% 0 75% 50%); opacity: 0.4; }
          40% { clip-path: inset(0 0 100% 50%); opacity: 0; }
        }
        .brain-tilt {
          transition: transform 0.18s ease-out;
          transform-style: preserve-3d;
        }
        .brain-float-wrap {
          animation: brain-float 7s ease-in-out infinite;
        }
        .glow-behind {
          animation: glow-breathe 4s ease-in-out infinite;
        }
        .scan-line {
          animation: scan-sweep 3.5s linear infinite;
        }
        .glitch-overlay {
          animation: glitch-flash 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .brain-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(168,85,247,0.12);
          border: 1px solid rgba(168,85,247,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c084fc;
          margin-bottom: 24px;
        }
        .brain-feature {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          border-radius: 12px;
          background: rgba(168,85,247,0.06);
          border: 1px solid rgba(168,85,247,0.12);
          transition: background 0.25s, border-color 0.25s;
        }
        .brain-feature:hover {
          background: rgba(168,85,247,0.12);
          border-color: rgba(168,85,247,0.3);
        }
        .brain-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(168,85,247,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .brain-grid { flex-direction: column !important; }
          .brain-video-side { width: 100% !important; min-height: 320px !important; }
        }
      `}</style>

      {/* Fundo roxo respirando */}
      <div className="glow-behind" style={{
        position: "absolute", top: "50%", left: "30%",
        width: 520, height: 520,
        background: "radial-gradient(circle, rgba(120,60,240,0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="brain-grid" style={{
          display: "flex", alignItems: "center", gap: 60,
        }}>

          {/* Lado do cérebro */}
          <div
            className="brain-video-side"
            style={{ flex: "0 0 460px", width: 460, height: 460 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Float wrapper */}
            <div className="brain-float-wrap" style={{ width: "100%", height: "100%", position: "relative" }}>
              {/* Tilt wrapper */}
              <div ref={tiltRef} className="brain-tilt" style={{ width: "100%", height: "100%", position: "relative" }}>

                {/* Imagem principal */}
                <Image
                  src="/brain-ai.png"
                  alt="Segundo cérebro com IA"
                  width={460}
                  height={460}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    mixBlendMode: "screen",
                    display: "block",
                    position: "relative", zIndex: 1,
                  }}
                />

                {/* Scan line — só no lado direito (digital) */}
                <div style={{
                  position: "absolute", top: 0, left: "50%", right: 0, bottom: 0,
                  overflow: "hidden", zIndex: 2, pointerEvents: "none",
                }}>
                  <div className="scan-line" style={{
                    position: "absolute", left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg, transparent, rgba(100,160,255,0.7), rgba(180,220,255,0.9), rgba(100,160,255,0.7), transparent)",
                    boxShadow: "0 0 12px 3px rgba(120,180,255,0.5)",
                  }} />
                </div>

                {/* Glitch flash overlay — lado direito */}
                <div className="glitch-overlay" style={{
                  position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                  background: "rgba(80,120,255,0.18)",
                }} />

              </div>
            </div>
          </div>

          {/* Lado do texto */}
          <div style={{ flex: 1 }}>
            <div className="brain-tag">
              <span>🧠</span> SEGUNDO CÉREBRO COM IA
            </div>

            <h2 style={{
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}>
              Pare de esquecer o que{" "}
              <span style={{
                background: "linear-gradient(135deg, #c084fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                você aprende.
              </span>
            </h2>

            <p style={{
              fontSize: 17, lineHeight: 1.7,
              color: "rgba(238,238,245,0.65)",
              marginBottom: 36,
            }}>
              Aprenda a conectar o <strong style={{ color: "#c084fc" }}>Obsidian</strong> com o{" "}
              <strong style={{ color: "#818cf8" }}>Claude Code</strong> para criar um sistema de
              memória e produtividade que trabalha por você 24h por dia.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
              {[
                { icon: "⚡", title: "IA que lembra por você", desc: "Notas organizadas automaticamente com inteligência artificial" },
                { icon: "🔗", title: "Tudo conectado", desc: "Seu conhecimento vira uma rede interligada e pesquisável" },
                { icon: "🚀", title: "Produtividade exponencial", desc: "Recupere qualquer informação em segundos, não horas" },
              ].map((f, i) => (
                <div key={i} className="brain-feature">
                  <div className="brain-icon">{f.icon}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 2, color: "#EEEEF5" }}>{f.title}</p>
                    <p style={{ fontSize: 13, color: "rgba(238,238,245,0.55)", lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://pay.cakto.com.br/32tatyi_883478"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "linear-gradient(135deg, #7c3aed, #4060E8)",
                color: "#fff", fontWeight: 700, fontSize: 15,
                padding: "14px 28px", borderRadius: 12,
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(124,58,237,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(124,58,237,0.5)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(124,58,237,0.35)"
              }}
            >
              Quero meu segundo cérebro →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
