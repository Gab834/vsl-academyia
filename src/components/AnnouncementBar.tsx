"use client"

const items = [
  "🔥 OFERTA LIMITADA",
  "Vagas se encerrando",
  "Últimas vagas disponíveis",
  "Garanta agora antes que suba",
  "Acesso vitalício",
  "🔥 OFERTA LIMITADA",
  "Vagas se encerrando",
  "Últimas vagas disponíveis",
  "Garanta agora antes que suba",
  "Acesso vitalício",
]

export function AnnouncementBar() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: 44,
      zIndex: 1001,
      background: "linear-gradient(90deg, #1a0a00, #3d1200, #1a0a00)",
      borderBottom: "1px solid rgba(255,120,0,0.25)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
    }}>
      {/* Glow edges */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to right, #1a0a00, transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to left, #1a0a00, transparent)",
        pointerEvents: "none",
      }} />

      {/* Scrolling text */}
      <div className="announcement-track" style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0 32px",
            fontSize: 13,
            fontWeight: 600,
            color: item.startsWith("🔥") ? "#ff8c00" : "rgba(255,200,100,0.85)",
            letterSpacing: item.startsWith("🔥") ? "0.06em" : "0.02em",
            textTransform: item.startsWith("🔥") ? "uppercase" as const : "none" as const,
          }}>
            {item}
            {!item.startsWith("🔥") && (
              <span style={{ marginLeft: 32, opacity: 0.35, fontSize: 10 }}>◆</span>
            )}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes announcement-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .announcement-track {
          animation: announcement-scroll 28s linear infinite;
        }
        .announcement-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
