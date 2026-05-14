"use client"
import Image from "next/image"
import { useState } from "react"

export function TestimonialsAuthority() {
  const [current] = useState(0)
  return (
    <>
      <section style={{ background: "#030604", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 48, overflowX: "auto" as const }}>
            <Image src="/images/celebrity-03.avif" alt="Celebrity client" width={486} height={150}
              style={{ height: 150, width: "auto", borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
            <Image src="/images/celebrity-02.avif" alt="Celebrity client" width={486} height={152}
              style={{ height: 150, width: "auto", borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
            fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: "rgb(0, 255, 239)",
          }}>
            <span style={{ width: 3, height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
            WE SET THE EXAMPLE &amp; PEOPLE FOLLOW
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 24,
          }}>
            Everyone Copies Our Designs
          </h2>
          {["Whatever we design, the market seems to copy.", "We've been pioneering website designs and landing pages behind the scenes, especially in the online and info space, in the last few years.", "Our designs for Tate are the ones that most often inspire similar designs."].map((t, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", marginBottom: 12 }}>{t}</p>
          ))}
        </div>
      </section>

      <section style={{ background: "#030604", padding: "80px 28px 120px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgb(0,255,239)", marginBottom: 16 }}>TESTIMONIALS</p>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 48,
          }}>
            See us through our clients&apos; eyes
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginBottom: 32 }}>
            {[{ d: "M15 18l-6-6 6-6" }, { d: "M9 18l6-6-6-6" }].map((arrow, i) => (
              <button key={i} style={{
                width: 52, height: 52, borderRadius: "50%",
                border: "1.5px solid rgb(0,255,239)", background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(0,255,239)" strokeWidth="2">
                  <path d={arrow.d} />
                </svg>
              </button>
            ))}
          </div>
          <div style={{
            background: "rgb(13,18,28)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20, padding: "40px 40px 36px",
          }}>
            <Image src="/images/tate-logo.svg" alt="Tate" width={80} height={40}
              style={{ height: 40, width: "auto", marginBottom: 28 }} />
            <blockquote style={{ margin: 0, fontSize: 20, lineHeight: 1.65, color: "rgba(255,255,255,0.65)", fontStyle: "normal" }}>
              &ldquo;<strong style={{ color: "#fff", fontWeight: 600 }}>These are the marketing blackbelts that are helping me in my conquest against the machine.</strong>{" "}They&apos;ve done a lot of great things for me while I&apos;m all the way in Croatia, and we&apos;re still getting the world conquered so thanks guys.&rdquo;
            </blockquote>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 32 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 2 }}>Andrew Tate</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Entrepreneur</p>
              </div>
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>
            {current + 1} / 1
          </p>
        </div>
      </section>
    </>
  )
}
