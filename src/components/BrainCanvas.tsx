"use client"
import { useEffect, useRef } from "react"

interface Node {
  x: number; y: number
  vx: number; vy: number
  fx: number; fy: number
  radius: number
  color: string
  isHub: boolean
  dragging: boolean
  born: number
}

const COLORS = ["#a855f7", "#818cf8", "#c084fc", "#e879f9", "#d8b4fe", "#ffffff"]
const HUB_INDICES = [0, 4, 10, 18, 28, 40, 55, 70, 85]
const NODE_COUNT = 130
const REPULSION = 1400
const ATTRACTION = 0.016
const DAMPING = 0.84
const CENTER_PULL = 0.0025

export function BrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number

    const resize = () => {
      const p = canvas.parentElement!
      canvas.width = p.offsetWidth
      canvas.height = p.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    const cx = () => canvas.width / 2
    const cy = () => canvas.height / 2

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const isHub = HUB_INDICES.includes(i)
      return {
        x: cx() + (Math.random() - 0.5) * 160,
        y: cy() + (Math.random() - 0.5) * 160,
        vx: 0, vy: 0, fx: 0, fy: 0,
        radius: isHub ? 5 + Math.random() * 5 : 1.5 + Math.random() * 2.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isHub,
        dragging: false,
        born: Date.now() + i * 12,
      }
    })

    // Edges: hubs get many connections, regular nodes get few
    const edges: [number, number][] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const isHub = HUB_INDICES.includes(i)
      const count = isHub ? 8 + Math.floor(Math.random() * 10) : 2 + Math.floor(Math.random() * 3)
      for (let c = 0; c < count; c++) {
        const j = Math.floor(Math.random() * NODE_COUNT)
        if (j !== i) edges.push([i, j])
      }
    }

    let mouseX = -9999, mouseY = -9999
    let dragNode: Node | null = null

    const getPos = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onMouseMove = (e: MouseEvent) => {
      const p = getPos(e); mouseX = p.x; mouseY = p.y
      if (dragNode) { dragNode.x = p.x; dragNode.y = p.y; dragNode.vx = 0; dragNode.vy = 0 }
    }
    const onMouseDown = (e: MouseEvent) => {
      const p = getPos(e)
      const hit = nodes.find(n => Math.hypot(n.x - p.x, n.y - p.y) < n.radius + 6)
      if (hit) { dragNode = hit; dragNode.dragging = true }
    }
    const onMouseUp = () => { if (dragNode) { dragNode.dragging = false; dragNode = null } }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const p = getPos(e.touches[0]); mouseX = p.x; mouseY = p.y
      if (dragNode) { dragNode.x = p.x; dragNode.y = p.y }
    }
    const onTouchStart = (e: TouchEvent) => {
      const p = getPos(e.touches[0])
      const hit = nodes.find(n => Math.hypot(n.x - p.x, n.y - p.y) < n.radius + 12)
      if (hit) { dragNode = hit; dragNode.dragging = true }
    }
    const onTouchEnd = () => { if (dragNode) { dragNode.dragging = false; dragNode = null } }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchmove", onTouchMove, { passive: false })
    canvas.addEventListener("touchstart", onTouchStart)
    canvas.addEventListener("touchend", onTouchEnd)

    const applyForces = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      nodes.forEach(n => { n.fx = 0; n.fy = 0 })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy || 0.001
          const dist = Math.sqrt(d2)
          const force = REPULSION / d2
          const fx = (dx / dist) * force
          const fy = (dy / dist) * force
          a.fx += fx; a.fy += fy
          b.fx -= fx; b.fy -= fy
        }
      }

      edges.forEach(([ai, bi]) => {
        const a = nodes[ai], b = nodes[bi]
        const dx = b.x - a.x, dy = b.y - a.y
        a.fx += dx * ATTRACTION; a.fy += dy * ATTRACTION
        b.fx -= dx * ATTRACTION; b.fy -= dy * ATTRACTION
      })

      nodes.forEach(n => {
        n.fx += (centerX - n.x) * CENTER_PULL
        n.fy += (centerY - n.y) * CENTER_PULL
        if (n.dragging) return
        n.vx = (n.vx + n.fx) * DAMPING
        n.vy = (n.vy + n.fy) * DAMPING
        n.x += n.vx
        n.y += n.vy
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()

      // Edges
      edges.forEach(([ai, bi]) => {
        const a = nodes[ai], b = nodes[bi]
        const ta = Math.min(1, Math.max(0, (now - a.born) / 900))
        const tb = Math.min(1, Math.max(0, (now - b.born) / 900))
        const t = Math.min(ta, tb)
        if (t < 0.05) return

        const nearMouse =
          Math.hypot(a.x - mouseX, a.y - mouseY) < 70 ||
          Math.hypot(b.x - mouseX, b.y - mouseY) < 70

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = nearMouse
          ? `rgba(200,160,255,${0.55 * t})`
          : `rgba(130,90,220,${0.18 * t})`
        ctx.lineWidth = nearMouse ? 0.9 : 0.5
        ctx.stroke()
      })

      // Nodes
      nodes.forEach(n => {
        const t = Math.min(1, Math.max(0, (now - n.born) / 700))
        if (t < 0.04) return

        const hovered = Math.hypot(n.x - mouseX, n.y - mouseY) < n.radius + 10
        const r = (hovered ? n.radius + 2.5 : n.radius) * t

        if (hovered || n.isHub) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6)
          g.addColorStop(0, n.color + "55")
          g.addColorStop(1, n.color + "00")
          ctx.globalAlpha = t * 0.75
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
          ctx.globalAlpha = 1
        }

        ctx.globalAlpha = t
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = hovered ? "#ffffff" : n.color
        ctx.fill()
        ctx.globalAlpha = 1
      })

      applyForces()
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
