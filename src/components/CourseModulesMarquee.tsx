"use client"
import Image from "next/image"

const courseModules = [
  { src: "/modules/modulo-01.png", label: "Introdução" },
  { src: "/modules/modulo-02.png", label: "Claude Code na Prática" },
  { src: "/modules/modulo-03.png", label: "Codex na Prática" },
  { src: "/modules/modulo-04.png", label: "O que é Skill" },
  { src: "/modules/modulo-06.png", label: "Segundo Cérebro com IA" },
]

const doubled = [...courseModules, ...courseModules]

export function CourseModulesMarquee() {
  return (
    <section style={{
      background: "#0a0c14",
      padding: "80px 0",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes course-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .course-track {
          display: flex !important;
          flex-direction: row !important;
          width: max-content !important;
          animation: course-marquee 40s linear infinite;
        }
        .course-track:hover { animation-play-state: paused; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 48, padding: "0 28px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
          fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "#a855f7",
        }}>
          <span style={{ width: 3, height: 14, background: "rgba(168,85,247,0.4)", borderRadius: 2 }} />
          CONTEÚDO DO CURSO
          <span style={{ width: 3, height: 14, background: "rgba(168,85,247,0.4)", borderRadius: 2 }} />
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #EEEEF5 50%, rgba(238,238,245,0.4))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Módulos que vão transformar como você usa IA
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

        <div className="course-track" style={{ gap: 20, alignItems: "stretch" }}>
          {doubled.map((mod, i) => (
            <div
              key={i}
              style={{
                width: 220,
                height: 293,
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(168,85,247,0.15)",
                background: "rgb(14,17,28)",
                flexShrink: 0,
                transition: "border-color 0.25s, transform 0.25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"
                e.currentTarget.style.transform = "scale(1.04)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(168,85,247,0.15)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <Image
                src={mod.src}
                alt={mod.label}
                width={220}
                height={293}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
