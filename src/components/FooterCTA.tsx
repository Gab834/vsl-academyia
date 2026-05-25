"use client"

const CAKTO = "https://pay.cakto.com.br/32tatyi_883478"

export function FooterCTA() {
  return (
    <>
      <footer style={{ background: "#06080f", padding: "48px 28px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap" as const, gap: 24, marginBottom: 32,
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#EEEEF5", letterSpacing: "-0.3px" }}>
              Academy<span style={{ color: "#4060E8" }}>.IA</span>
            </span>
            <a href={CAKTO} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 28px", borderRadius: 9999,
              border: "1.5px solid rgba(64,96,232,0.35)", background: "transparent",
              color: "#EEEEF5", fontSize: 15, fontWeight: 600, textDecoration: "none",
              transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(64,96,232,0.65)"
                e.currentTarget.style.background = "rgba(64,96,232,0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(64,96,232,0.35)"
                e.currentTarget.style.background = "transparent"
              }}
            >
              Entrar na Academy
            </a>
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "rgba(238,238,245,0.18)", marginBottom: 6 }}>
            © Academy.IA 2026 — Todos os direitos reservados
          </p>
          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(238,238,245,0.12)", maxWidth: 600, margin: "0 auto" }}>
            Este site não é afiliado ao Facebook, Instagram ou Google. As marcas mencionadas são de propriedade de seus respectivos donos.
          </p>
        </div>
      </footer>
    </>
  )
}
