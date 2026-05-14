export function FooterCTA() {
  return (
    <>
      <section style={{
        padding: "160px 28px", textAlign: "center", position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(0,255,239,0.15) 0%, transparent 65%)",
      }}>
        <h2 style={{
          fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1,
          background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          maxWidth: 700, margin: "0 auto 40px",
        }}>
          Help Your Prospects See The Best Version Of You
        </h2>
        <a href="#" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "16px 48px", borderRadius: 9999,
          background: "#ffffff", color: "#000000",
          fontSize: 18, fontWeight: 600, textDecoration: "none",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Speak To Us
        </a>
      </section>

      <footer style={{ background: "#000", padding: "64px 28px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: 48, alignItems: "center", justifyContent: "center",
            flexWrap: "wrap" as const, paddingBottom: 40, marginBottom: 40,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            {["WorldStar Hip Hop", "HIGHKEY CLOUT", "LightRay", "blendr"].map((logo) => (
              <span key={logo} style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.02em", textTransform: "uppercase" as const }}>{logo}</span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 24, marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 800, lineHeight: 1 }}>⊞</span>
              </div>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.3px" }}>NINETY EIGHT</span>
            </div>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 28px", borderRadius: 9999,
              border: "1.6px solid rgba(32,252,225,0.37)", background: "transparent",
              color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Speak To Us
            </a>
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>© Ninety Eight LLC, 2023-2026</p>
          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.18)", maxWidth: 600, margin: "0 auto" }}>
            Disclaimer: This site is not a part of Facebook. Ninety Eight is not endorsed by Facebook in any way. Facebook is solely a trademark of Facebook, Inc.
          </p>
        </div>
      </footer>
    </>
  )
}
