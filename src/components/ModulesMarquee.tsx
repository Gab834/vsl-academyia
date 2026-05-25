"use client"

const modules = [
  { src: "/modules/module-14.png", label: "Claude Code" },
  { src: "/modules/module-15.png", label: "ChatGPT" },
  { src: "/modules/module-16.png", label: "Codex" },
  { src: "/modules/module-17.png", label: "Gemini" },
  { src: "/modules/module-18.png", label: "Obsidian" },
  { src: "/modules/module-19.png", label: "Claude + Web" },
  { src: "/modules/module-20.png", label: "Obsidian 2" },
]

const doubled = [...modules, ...modules]

export function ModulesMarquee() {
  return (
    <section style={{
      background: "#0a0c14",
      padding: "80px 0",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes marquee-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .modules-track {
          display: flex !important;
          flex-direction: row !important;
          width: max-content !important;
          animation: marquee-slide 35s linear infinite;
        }
        .modules-track:hover { animation-play-state: paused; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 48, padding: "0 28px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
          fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "#4060E8",
        }}>
          <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
          MÓDULOS DISPONÍVEIS
          <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #EEEEF5 50%, rgba(238,238,245,0.4))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Ferramentas de IA que você vai dominar
        </h2>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: "linear-gradient(to right, #0a0c14, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: "linear-gradient(to left, #0a0c14, transparent)",
          pointerEvents: "none",
        }} />

        <div className="modules-track" style={{ gap: 16 }}>
          {doubled.map((mod, i) => (
            <div
              key={i}
              style={{
                width: 280,
                height: 158,
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(64,96,232,0.15)",
                background: "rgb(14,17,28)",
                flexShrink: 0,
                transition: "border-color 0.25s, transform 0.25s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(64,96,232,0.45)"
                e.currentTarget.style.transform = "scale(1.03)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(64,96,232,0.15)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <img
                src={mod.src}
                alt={mod.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
