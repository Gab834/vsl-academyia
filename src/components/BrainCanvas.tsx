"use client"
import { useEffect, useRef } from "react"

interface Node {
  ox: number; oy: number; oz: number
  size: number
  delay: number
  color: string
  pulse: number
}

export function BrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let rotX = 0.25
    let rotY = 0
    let velX = 0
    let velY = 0.004
    let isDragging = false
    let lastMX = 0, lastMY = 0
    const startTime = Date.now()

    const resize = () => {
      const p = canvas.parentElement!
      canvas.width = p.offsetWidth
      canvas.height = p.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    const NODE_COUNT = 100
    let RADIUS = Math.min(canvas.width, canvas.height) * 0.38

    const COLORS = ["#a855f7", "#818cf8", "#c084fc", "#6366f1", "#e879f9", "#ffffff"]

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      // Fibonacci sphere — even distribution across a sphere surface
      const phi = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 0.75 + Math.random() * 0.25
      return {
        ox: r * Math.sin(phi) * Math.cos(theta),
        oy: r * Math.sin(phi) * Math.sin(theta) * 0.85,
        oz: r * Math.cos(phi),
        size: 1.8 + Math.random() * 2.8,
        delay: i * 18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
      }
    })

    // Mouse / touch
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = e.clientX - lastMX
      const dy = e.clientY - lastMY
      velY = dx * 0.006
      velX = dy * 0.006
      lastMX = e.clientX
      lastMY = e.clientY
    }
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      lastMX = e.clientX; lastMY = e.clientY
      canvas.style.cursor = "grabbing"
    }
    const onMouseUp = () => { isDragging = false; canvas.style.cursor = "grab" }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return
      e.preventDefault()
      const dx = e.touches[0].clientX - lastMX
      const dy = e.touches[0].clientY - lastMY
      velY = dx * 0.006
      velX = dy * 0.006
      lastMX = e.touches[0].clientX
      lastMY = e.touches[0].clientY
    }
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches[0]) return
      isDragging = true
      lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY
    }
    const onTouchEnd = () => { isDragging = false }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchmove", onTouchMove, { passive: false })
    canvas.addEventListener("touchstart", onTouchStart)
    canvas.addEventListener("touchend", onTouchEnd)

    const ry = (x: number, z: number, a: number) => ({
      x: x * Math.cos(a) + z * Math.sin(a),
      z: -x * Math.sin(a) + z * Math.cos(a),
    })
    const rx = (y: number, z: number, a: number) => ({
      y: y * Math.cos(a) - z * Math.sin(a),
      z: y * Math.sin(a) + z * Math.cos(a),
    })

    const draw = () => {
      const elapsed = Date.now() - startTime
      RADIUS = Math.min(canvas.width, canvas.height) * 0.38
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const fov = Math.min(canvas.width, canvas.height) * 1.1

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Rotation
      if (!isDragging) {
        velX *= 0.92
        velY = velY * 0.96 + 0.004
      }
      rotX += velX
      rotY += velY

      type Proj = { sx: number; sy: number; sz: number; sc: number; t: number; node: Node }
      const pts: Proj[] = []

      for (const node of nodes) {
        const t = Math.min(1, Math.max(0, (elapsed - node.delay) / 900))
        const ease = 1 - Math.pow(1 - t, 3)

        let x = node.ox * RADIUS * ease
        let y = node.oy * RADIUS * ease
        let z = node.oz * RADIUS * ease

        const r1 = ry(x, z, rotY); x = r1.x; z = r1.z
        const r2 = rx(y, z, rotX); y = r2.y; z = r2.z

        const pz = z + fov
        const sc = fov / pz

        pts.push({ sx: x * sc + cx, sy: y * sc + cy, sz: z, sc, t, node })
      }

      pts.sort((a, b) => a.sz - b.sz)

      // Connections
      const MAX_DIST_SQ = (RADIUS * 0.52) ** 2
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          const minT = Math.min(a.t, b.t)
          if (minT < 0.05) continue

          const dx = a.node.ox - b.node.ox
          const dy = a.node.oy - b.node.oy
          const dz = a.node.oz - b.node.oz
          const d2 = (dx * dx + dy * dy + dz * dz) * RADIUS * RADIUS
          if (d2 > MAX_DIST_SQ) continue

          const dist = Math.sqrt(d2)
          const alpha = (1 - dist / (RADIUS * 0.52)) * 0.35 * minT
          const depth = Math.max(0.1, (((a.sz + b.sz) / 2) + RADIUS) / (RADIUS * 2))

          ctx.beginPath()
          ctx.moveTo(a.sx, a.sy)
          ctx.lineTo(b.sx, b.sy)
          ctx.strokeStyle = `rgba(140, 100, 240, ${alpha * depth})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      // Nodes
      const pulse = Date.now() / 1000
      for (const p of pts) {
        if (p.t < 0.04) continue
        const pf = 0.85 + 0.15 * Math.sin(pulse * 1.8 + p.node.pulse)
        const s = p.node.size * p.sc * pf * Math.min(p.t * 2, 1)
        const depth = Math.max(0.15, (p.sz + RADIUS) / (RADIUS * 2))

        // Glow
        const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, s * 4)
        g.addColorStop(0, p.node.color + "99")
        g.addColorStop(1, p.node.color + "00")
        ctx.globalAlpha = depth * p.t * 0.6
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, s * 4, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // Core
        ctx.globalAlpha = depth * Math.min(p.t * 1.5, 1)
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, s, 0, Math.PI * 2)
        ctx.fillStyle = p.node.color
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("touchmove", onTouchMove)
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }}
    />
  )
}
