"use client"
import { CountdownTimer } from "./CountdownTimer"

const CAKTO = "https://pay.cakto.com.br/32tatyi_883478"

const features = [
  "Todos os meus funis de low ticket que faturaram +R$50k",
  "Funis completos construídos com inteligência artificial",
  "Como implementar agentes de IA na sua operação",
  "Atendimento automático de clientes no WhatsApp com IA",
  "Prospecção de clientes com agentes inteligentes",
  "Como criar e crescer lista no WhatsApp com automação",
  "Páginas de venda profissionais feitas com IA",
  "Posts automáticos para redes sociais",
  "Roteiros para Reels, YouTube e TikTok com IA",
  "Como viralizar usando inteligência artificial",
  "Skills instaláveis em agentes de IA prontas para usar",
  "Lives gravadas ensinando ao vivo comigo",
  "Comunidade exclusiva de alunos",
  "Novos módulos e conteúdos toda semana",
  "Acesso vitalício — sem mensalidade jamais",
]

export function PricingSection() {
  return (
    <section id="pricing" style={{ background: "#0a0c14", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
          fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "#4060E8",
        }}>
          <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
          INVESTIMENTO
        </div>
        <h2 style={{
          fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1,
          background: "linear-gradient(135deg, #EEEEF5 50%, rgba(238,238,245,0.4))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: 48,
        }}>
          Um pagamento. Para sempre.
        </h2>

        <CountdownTimer />

        <div className="pricing-card" style={{
          background: "rgb(14, 17, 28)",
          border: "1.5px solid rgba(64,96,232,0.35)",
          boxShadow: "0 0 80px rgba(64,96,232,0.08)",
          borderRadius: 24, padding: "48px 40px",
          textAlign: "left",
        }}>
          {/* Urgency badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,100,0,0.1)", border: "1px solid rgba(255,100,0,0.25)",
            borderRadius: 9999, padding: "6px 16px", marginBottom: 24,
            fontSize: 12, fontWeight: 700, color: "#ff8c00", letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            🔥 OFERTA DE LANÇAMENTO — VAGAS LIMITADAS
          </div>

          <p style={{ fontSize: 22, fontWeight: 700, color: "#EEEEF5", marginBottom: 12 }}>Academy.IA</p>

          {/* Price comparison */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              <span style={{ fontSize: 12, color: "rgba(238,238,245,0.4)", fontWeight: 500 }}>
                Valor normal
              </span>
              <span style={{ fontSize: 22, color: "rgba(238,238,245,0.35)", textDecoration: "line-through", fontWeight: 600 }}>
                R$497,90
              </span>
            </div>
            <div style={{
              background: "rgba(64,96,232,0.12)", border: "1px solid rgba(64,96,232,0.3)",
              borderRadius: 8, padding: "4px 10px",
              fontSize: 11, fontWeight: 700, color: "#4060E8", letterSpacing: "0.06em",
            }}>
              -80% OFF
            </div>
          </div>

          {/* Main price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 600, color: "rgba(238,238,245,0.7)" }}>R$</span>
            <span className="pricing-price" style={{ fontSize: 80, fontWeight: 800, color: "#EEEEF5", letterSpacing: "-4px", lineHeight: 1 }}>97</span>
            <span style={{ fontSize: 16, color: "rgba(238,238,245,0.4)", alignSelf: "flex-end", paddingBottom: 12 }}>único</span>
          </div>

          {/* Installment */}
          <div style={{
            marginBottom: 36,
            background: "rgba(64,96,232,0.07)",
            border: "1px solid rgba(64,96,232,0.18)",
            borderRadius: 10, padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="#4060E8" strokeWidth="1.8"/>
              <path d="M2 10h20" stroke="#4060E8" strokeWidth="1.8"/>
            </svg>
            <span style={{ fontSize: 14, color: "rgba(238,238,245,0.65)", fontWeight: 500 }}>
              ou <strong style={{ color: "#EEEEF5" }}>12x de R$10,12</strong> no cartão de crédito
            </span>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 40 }}>
            {features.map((f) => (
              <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  border: "1px solid rgba(64,96,232,0.45)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 2,
                }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#4060E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 15, color: "rgba(238,238,245,0.75)", lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>

          <a href={CAKTO} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", width: "100%", padding: "18px 24px", borderRadius: 14,
            backgroundColor: "#4060E8", color: "#fff",
            fontSize: 18, fontWeight: 700, textAlign: "center", textDecoration: "none",
            justifyContent: "center", alignItems: "center", gap: 10,
            boxShadow: "0 8px 32px rgba(64,96,232,0.3)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Garantir meu acesso vitalício
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <p style={{ fontSize: 13, color: "rgba(238,238,245,0.28)", textAlign: "center", marginTop: 16 }}>
            Pagamento seguro via Cakto · Acesso imediato no email · 7 dias de garantia
          </p>

          {/* Selos de confiança */}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <img
              src="/selos.webp"
              alt="Pagamento seguro e garantido"
              style={{ maxWidth: "100%", height: "auto", opacity: 0.75 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
