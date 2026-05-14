"use client"
import Image from "next/image"

const stats = [
  { number: "7+", label: "CELEBRITY CLIENTS" },
  { number: "+32.5%", label: "AV. CONVERSION RATE INCREASE" },
  { number: "DUBAI", label: "CORE OFFICE" },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        padding: "200px 28px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 100% 60% at 50% 100%, rgba(0,255,239,0.1) 0%, transparent 60%),
          radial-gradient(ellipse 70% 40% at 20% 90%, rgba(0,200,180,0.06) 0%, transparent 50%)
        `,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div
          className="animate-fade-up delay-1"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            marginBottom: 28, fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgb(0, 255, 239)",
          }}
        >
          <span style={{ width: 3, height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 2, flexShrink: 0 }} />
          PREMIER WEB DESIGN AGENCY IN DUBAI
        </div>

        {/* H1 */}
        <h1
          className="animate-fade-up delay-2"
          style={{
            fontSize: "clamp(42px, 5.5vw, 76.8px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.05em",
            background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            maxWidth: 860,
            margin: "0 auto 40px",
          }}
        >
          Web Design That Makes You Look Better Than Anyone Else
        </h1>

        {/* CTA Button */}
        <div className="animate-fade-up delay-3" style={{ marginBottom: 56 }}>
          <a
            href="#pricing"
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "14px 36px", borderRadius: 9999,
              background: "#ffffff", color: "#000000",
              fontSize: 18, fontWeight: 600, textDecoration: "none",
              transition: "opacity 0.2s",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88" }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
          >
            See Pricing
          </a>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-up delay-4"
          style={{
            display: "flex", justifyContent: "center", gap: 48,
            flexWrap: "wrap", padding: "32px 0",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{
                fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600,
                color: "#fff", letterSpacing: "-0.02em", lineHeight: 1,
              }}>
                {s.number}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 500, color: "rgb(0, 255, 239)",
                letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4,
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Device mockup */}
        <div className="animate-fade-in delay-5" style={{ marginTop: 64, position: "relative" }}>
          <Image
            src="/images/hero-image.avif"
            alt="Website design showcase"
            width={900}
            height={310}
            style={{ width: "100%", height: "auto", borderRadius: 16 }}
            priority
          />
        </div>

      </div>
    </section>
  )
}
