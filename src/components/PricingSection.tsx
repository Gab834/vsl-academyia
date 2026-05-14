"use client"

const plans = [
  {
    name: "Simple Website",
    price: "$6,990",
    features: ["Simple And Clean Design", "1 Medium Length Page", "Copywriting Included", "Unlimited Revisions"],
    highlight: false,
  },
  {
    name: "Best Website",
    price: "$9,990",
    features: ["Highest Level Design", "1 Long Page (+ Misc Pages)", "Top Level Copywriting", "Pagespeed Optimization", "A/B Testing (For Conversions)", "Unlimited Revisions"],
    highlight: true,
  },
  {
    name: "Multi-Page",
    price: "$15,000+",
    features: ["Everything in Best Plan", "Multiple Medium-Long Pages", "Designed For Larger Businesses", "Meets Custom Requirements"],
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" style={{ background: "#030604", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <style>{`@media(max-width:768px){.pricing-grid{grid-template-columns:1fr!important}}`}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
          fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "rgb(0, 255, 239)",
        }}>
          <span style={{ width: 3, height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
          PRICING PLANS
        </div>
        <h2 style={{
          fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1,
          background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: 56,
        }}>
          Choose a Plan And Discuss With Us
        </h2>

        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              background: "rgb(13, 18, 28)",
              border: plan.highlight ? "1.5px solid rgba(0,255,239,0.4)" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: plan.highlight ? "0 0 48px rgba(0,255,239,0.07)" : "none",
              borderRadius: 20, padding: "40px 32px",
              display: "flex", flexDirection: "column",
            }}>
              <p style={{ fontSize: 20, fontWeight: 600, color: "rgb(0, 255, 239)", marginBottom: 8 }}>{plan.name}</p>
              <p style={{
                fontSize: 56, fontWeight: 700, color: "#fff",
                letterSpacing: "-2px", lineHeight: 1, marginBottom: 28,
              }}>{plan.price}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, marginBottom: 32 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      border: "1px solid rgba(0,255,239,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="rgb(0,255,239)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#" style={{
                display: "block", width: "100%", padding: "14px 24px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", fontSize: 16, fontWeight: 600, textAlign: "center", textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,255,239,0.1)"
                  e.currentTarget.style.borderColor = "rgba(0,255,239,0.35)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                }}
              >
                Get started
              </a>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 40 }}>
          If you have a larger or custom project, please let us know.
        </p>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 40px", borderRadius: 9999,
            background: "#fff", color: "#000",
            fontSize: 16, fontWeight: 600, textDecoration: "none",
          }}>
            Speak To Us
          </a>
        </div>
      </div>
    </section>
  )
}
