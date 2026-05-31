"use client"
import Image from "next/image"

export function ObsidianBrainSection() {
  return (
    <section style={{
      background: "linear-gradient(180deg, #0a0c14 0%, #0d0b1a 50%, #0a0c14 100%)",
      padding: "100px 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes brain-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.03); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .brain-float { animation: brain-float 6s ease-in-out infinite; }
        .glow-bg { animation: glow-pulse 4s ease-in-out infinite; }
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
          .brain-video-side { width: 100% !important; min-height: 300px !important; }
        }
      `}</style>

      {/* Fundo roxo brilhante */}
      <div className="glow-bg" style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="brain-grid" style={{
          display: "flex", alignItems: "center", gap: 60,
        }}>

          {/* Lado do cérebro */}
          <div className="brain-video-side" style={{
            flex: "0 0 460px", width: 460, height: 460,
            position: "relative",
          }}>
            <Image
              src="/obsidian-brain.png"
              alt="Segundo cérebro no Obsidian"
              width={460}
              height={460}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "invert(1)",
                mixBlendMode: "screen",
                display: "block",
              }}
            />
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
