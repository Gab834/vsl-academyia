"use client"
import Image from "next/image"

const CAKTO = "https://pay.cakto.com.br/34aija3"

const stats = [
  { value: "3+", label: "anos no digital" },
  { value: "6 díg.", label: "faturados online" },
  { value: "7k+", label: "seguidores" },
  { value: "IA", label: "na operação diária" },
]

export function CreatorSection() {
  return (
    <section style={{
      background: "#0a0c14",
      padding: "120px 28px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <style>{`
        @media(max-width: 768px) {
          .creator-grid { grid-template-columns: 1fr !important; }
          .creator-photo { max-width: 280px !important; margin: 0 auto; }
        }
      `}</style>

      <div style={{ maxWidth: 1040, margin: "0 auto" }}>

        {/* Label */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 56,
          fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "#4060E8",
        }}>
          <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
          QUEM VAI TE ENSINAR
        </div>

        <div className="creator-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "center" }}>

          {/* Foto */}
          <div className="creator-photo" style={{ position: "relative" }}>
            {/* Glow de fundo */}
            <div style={{
              position: "absolute", inset: -20, zIndex: 0,
              background: "radial-gradient(ellipse 80% 80% at 50% 60%, rgba(64,96,232,0.2), transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "relative", zIndex: 1,
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(64,96,232,0.25)",
              boxShadow: "0 0 60px rgba(64,96,232,0.15), 0 24px 64px rgba(0,0,0,0.5)",
            }}>
              <Image
                src="/gabriel.jpg"
                alt="Gabriel de Almeida"
                width={3072}
                height={4116}
                style={{ width: "100%", display: "block", objectFit: "cover", height: "auto" }}
              />
            </div>

            {/* Stats badges sobrepostos */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
              marginTop: 16, position: "relative", zIndex: 1,
            }}>
              {stats.map((s) => (
                <div key={s.label} style={{
                  background: "rgb(14,17,28)",
                  border: "1px solid rgba(64,96,232,0.2)",
                  borderRadius: 14, padding: "14px 16px",
                  textAlign: "center",
                }}>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#EEEEF5", letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: "rgba(238,238,245,0.4)", margin: "4px 0 0", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Texto */}
          <div>
            <h2 style={{
              fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 1.1,
              color: "#EEEEF5",
              marginBottom: 8,
            }}>
              Gabriel de Almeida
            </h2>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#4060E8", marginBottom: 28, letterSpacing: "0.02em" }}>
              Fundador da Academy.IA
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                "Comecei no digital com 16 anos, sem dinheiro e sem mentor. Aprendi design sozinho, criei conteúdo do zero e viralizei páginas no TikTok, YouTube e outras redes — só com tráfego orgânico.",
                "Com isso, faturei múltiplos seis dígitos na internet antes mesmo de conhecer IA. Mas quando descobri o que dava pra fazer com Claude Code, ChatGPT e Gemini — tudo mudou.",
                "Hoje, o que antes levava dias faço em minutos. Sites completos, funis, automações no WhatsApp, posts automáticos, roteiros para vídeos — tudo rodando com agentes de IA na minha operação.",
                "Criei a Academy.IA para te ensinar exatamente o que aplico. Não teoria — método real, com resultados reais. O mesmo sistema que me trouxe até aqui.",
              ].map((text, i) => (
                <p key={i} style={{
                  fontSize: 16, lineHeight: 1.8,
                  color: i === 3 ? "rgba(238,238,245,0.85)" : "rgba(238,238,245,0.6)",
                  margin: 0,
                  fontWeight: i === 3 ? 500 : 400,
                }}>
                  {text}
                </p>
              ))}
            </div>

            {/* Highlight box */}
            <div style={{
              marginTop: 32,
              background: "rgba(64,96,232,0.08)",
              border: "1px solid rgba(64,96,232,0.3)",
              borderRadius: 14,
              padding: "18px 24px",
            }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#EEEEF5", margin: 0, lineHeight: 1.6 }}>
                "O que você vai aprender dentro da Academy.IA é o que eu uso todo dia pra gerar resultado. Não é curso. É acesso ao meu método."
              </p>
            </div>

            <a href={CAKTO} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36,
              padding: "15px 36px", borderRadius: 9999,
              backgroundColor: "#4060E8", color: "#fff",
              fontSize: 16, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(64,96,232,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(64,96,232,0.55)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(64,96,232,0.35)"
              }}
            >
              Quero aprender com o Gabriel
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
