export function ProblemSections() {
  return (
    <>
      <section
        id="problem"
        style={{
          background: "#030604",
          padding: "120px 28px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 600,
            letterSpacing: "-0.04em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 40,
          }}>
            Without This, Your Business Can&apos;t Thrive
          </h2>
          {[
            "In a time where marketplaces like Dubai, and the rest of the world, are incredibly competitive...",
            "And customers are incredibly demanding...",
            "It is important you stand out from every other option.",
            "And position yourself as the absolute pinnacle offer in your space.",
            "People should see your website and immediately know you are the best.",
            "Without that, you won't be able to scale as fast...",
            "But Ninety Eight can make it happen.",
          ].map((text, i) => (
            <p key={i} style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: 16 }}>
              {text}
            </p>
          ))}
          <div style={{ marginTop: 40 }}>
            <a href="#pricing" style={{
              display: "inline-flex", alignItems: "center",
              padding: "14px 36px", borderRadius: 9999,
              background: "#ffffff", color: "#000000",
              fontSize: 17, fontWeight: 600, textDecoration: "none",
            }}>
              See Pricing
            </a>
          </div>
        </div>
      </section>

      <section style={{ background: "#030604", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
            fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: "rgb(0, 255, 239)",
          }}>
            <span style={{ width: 3, height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
            THE PROBLEM
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 600,
            letterSpacing: "-0.04em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 32,
          }}>
            You&apos;re Missing Out On a Great First Impression
          </h2>
          {[
            "Your website is the first thing that your potential customers see.",
            "Ask yourself, are you creating the greatest possible first impression to increase sales?",
            "If the answer is no, your business is suffering from opportunity cost, and you are wasting ad spend.",
            "To solve this you need:",
          ].map((text, i) => (
            <p key={i} style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: 16 }}>
              {text}
            </p>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", marginTop: 24 }}>
            {["Captivating Visuals", "Top Level Copy", "Conversion Optimisation"].map((item) => (
              <div key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: "1.5px solid rgba(0,255,239,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="rgb(0,255,239)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
