"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

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
        top: 48,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1000px, calc(100vw - 48px))",
        borderRadius: 9999,
        backdropFilter: "blur(3px)",
        zIndex: 999,
        transition: "background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        background: scrolled ? "rgba(3, 6, 4, 0.92)" : "transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px 10px 16px",
          height: 70,
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <span className="nav-logo-full">
            <Image src="/images/logo.avif" alt="Ninety Eight" width={120} height={18} priority />
          </span>
          <span className="nav-logo-icon">
            <Image src="/images/logo-icon.avif" alt="Ninety Eight" width={36} height={36} priority />
          </span>
        </a>

        {/* Links */}
        <div
          className="nav-links"
          style={{ display: "flex", gap: 32, alignItems: "center" }}
        >
          {["Home", "Our Work", "Process", "Pricing"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "")}`}
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                transition: "color 0.2s",
                fontFamily: "var(--font-inter)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff" }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#pricing"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 28px 10px 20px",
            borderRadius: 9999,
            border: "1.6px solid rgba(32, 252, 225, 0.37)",
            background: "transparent",
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            textDecoration: "none",
            transition: "background 0.2s, border-color 0.2s",
            fontFamily: "var(--font-inter)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,255,239,0.08)"
            e.currentTarget.style.borderColor = "rgba(0,255,239,0.7)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.borderColor = "rgba(32,252,225,0.37)"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Start Your Project
        </a>
      </div>

      <style>{`
        .nav-logo-icon { display: none; }
        .nav-logo-full { display: flex; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-logo-full { display: none; }
          .nav-logo-icon { display: flex; }
        }
      `}</style>
    </nav>
  )
}
