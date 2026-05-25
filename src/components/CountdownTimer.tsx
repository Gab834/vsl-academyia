"use client"
import { useEffect, useState } from "react"

// Altere esta data para o prazo real da oferta
const TARGET_DATE = new Date("2026-06-01T23:59:00")

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) return { h: "00", m: "00", s: "00", d: "00" }
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) }
}

export function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: time.d, label: "dias" },
    { value: time.h, label: "horas" },
    { value: time.m, label: "min" },
    { value: time.s, label: "seg" },
  ]

  return (
    <div style={{ margin: "0 auto 40px", maxWidth: 480 }}>
      <p style={{
        fontSize: 13, fontWeight: 600, color: "#ff8c00",
        letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: 14, textAlign: "center",
      }}>
        🔥 Oferta encerra em
      </p>
      <div style={{
        display: "flex", justifyContent: "center", gap: 12,
      }}>
        {units.map(({ value, label }) => (
          <div key={label} className="countdown-box" style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: "rgba(255,100,0,0.08)",
            border: "1px solid rgba(255,100,0,0.2)",
            borderRadius: 12, padding: "14px 18px", minWidth: 72,
          }}>
            <span className="countdown-value" style={{
              fontSize: 36, fontWeight: 800, color: "#EEEEF5",
              letterSpacing: "-2px", lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}>
              {value}
            </span>
            <span style={{ fontSize: 11, color: "rgba(238,238,245,0.4)", marginTop: 4, fontWeight: 500 }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
