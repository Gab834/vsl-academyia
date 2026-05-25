"use client"
import { useEffect, useState } from "react"

const CAKTO = "https://pay.cakto.com.br/32tatyi_883478"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      style={{
        position: "fixed",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1000px, calc(100vw - 48px))",
        borderRadius: 9999,
        backdropFilter: "blur(12px)",
        zIndex: 999,
        transition: "background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        background: scrolled ? "rgba(10, 12, 20, 0.95)" : "transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
        border: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px 10px 24px", height: 66 }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#EEEEF5", letterSpacing: "-0.3px" }}>
            Academy<span style={{ color: "#4060E8" }}>.IA</span>
          </span>
        </a>

        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[
            { label: "O que é", href: "#problem" },
            { label: "Conteúdo", href: "#inclusos" },
            { label: "Preço", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ].map((link) => (
            <a key={link.label} href={link.href} style={{
              fontSize: 15, fontWeight: 500, color: "rgba(238,238,245,0.6)",
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#EEEEF5" }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(238,238,245,0.6)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href={CAKTO} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 24px", borderRadius: 9999,
          background: "#4060E8", color: "#fff",
          fontSize: 15, fontWeight: 700, textDecoration: "none",
          transition: "opacity 0.2s",
          whiteSpace: "nowrap",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85" }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
        >
          Entrar na Academy
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-logo-full { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
