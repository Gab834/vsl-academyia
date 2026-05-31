"use client"
import { useEffect, useRef } from "react"

interface Node {
  x: number; y: number
  vx: number; vy: number
  fx: number; fy: number
  radius: number
  isHub: boolean
  dragging: boolean
  alpha: number
}

export function BrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let dragNode: Node | null = null
    let mouseX = -9999, mouseY = -9999
    let startTime = 0

    const NODE_COUNT = 110
    const HUB_COUNT = 7
    const REPULSION = 2200
    const ATTRACTION = 0.022
    const DAMPING = 0.72
    const CENTER_PULL = 0.005

    let nodes: Node[] = []
    let edges: [number, number][] = []

    const runPhysics = (steps: number) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      for (let step = 0; step < steps; step++) {
        nodes.forEach(n => { n.fx = 0; n.fy = 0 })

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j]
            const dx = a.x - b.x, dy = a.y - b.y
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
          n.fx += (cx - n.x) * CENTER_PULL
          n.fy += (cy - n.y) * CENTER_PULL
          n.vx = (n.vx + n.fx) * DAMPING
          n.vy = (n.vy + n.fy) * DAMPING
          n.x += n.vx
          n.y += n.vy
        })
      }
    }

    const init = () => {
      const W = canvas.width, H = canvas.height
      const cx = W / 2, cy = H / 2
      const R = Math.min(W, H) * 0.38

      nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
        const isHub = i < HUB_COUNT
        const angle = Math.random() * Math.PI * 2
        const r = isHub
          ? R * (0.15 + Math.random() * 0.45)
          : R * Math.pow(Math.random(), 0.6)
        return {
          x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * 20,
          y: cy + Math.sin(angle) * r * 0.85 + (Math.random() - 0.5) * 20,
          vx: 0, vy: 0, fx: 0, fy: 0,
          radius: isHub ? 7 + Math.random() * 7 : 2 + Math.random() * 3,
          isHub,
          dragging: false,
          alpha: 0,
        }
      })

      edges = []
      for (let i = 0; i < NODE_COUNT; i++) {
        const isHub = i < HUB_COUNT
        const count = isHub ? 10 + Math.floor(Math.random() * 14) : 2 + Math.floor(Math.random() * 3)
        for (let c = 0; c < count; c++) {
          const j = Math.floor(Math.random() * NODE_COUNT)
          if (j !== i) edges.push([i, j])
        }
      }

      // Settle the physics BEFORE first frame — no chaos visible
      runPhysics(500)

      startTime = Date.now()
    }

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
      dragNode = nodes.find(n => Math.hypot(n.x - p.x, n.y - p.y) < n.radius + 8) ?? null
      if (dragNode) dragNode.dragging = true
    }
    const onMouseUp = () => { if (dragNode) { dragNode.dragging = false; dragNode = null } }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const p = getPos(e.touches[0]); mouseX = p.x; mouseY = p.y
      if (dragNode) { dragNode.x = p.x; dragNode.y = p.y; dragNode.vx = 0; dragNode.vy = 0 }
    }
    const onTouchStart = (e: TouchEvent) => {
      const p = getPos(e.touches[0])
      dragNode = nodes.find(n => Math.hypot(n.x - p.x, n.y - p.y) < n.radius + 14) ?? null
      if (dragNode) dragNode.dragging = true
    }
    const onTouchEnd = () => { if (dragNode) { dragNode.dragging = false; dragNode = null } }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchmove", onTouchMove, { passive: false })
    canvas.addEventListener("touchstart", onTouchStart)
    canvas.addEventListener("touchend", onTouchEnd)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const elapsed = Date.now() - startTime

      // Staggered fade-in of nodes
      nodes.forEach((n, i) => {
        n.alpha = Math.min(1, Math.max(0, (elapsed - i * 9) / 700))
      })

      // Edges
      edges.forEach(([ai, bi]) => {
        const a = nodes[ai], b = nodes[bi]
        const t = Math.min(a.alpha, b.alpha)
        if (t < 0.05) return
        const nearA = Math.hypot(a.x - mouseX, a.y - mouseY) < 65
        const nearB = Math.hypot(b.x - mouseX, b.y - mouseY) < 65
        const near = nearA || nearB
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = near
          ? `rgba(230,200,255,${0.65 * t})`
          : `rgba(190,160,255,${0.2 * t})`
        ctx.lineWidth = near ? 0.9 : 0.5
        ctx.stroke()
      })

      // Nodes
      nodes.forEach(n => {
        if (n.alpha < 0.04) return
        const hovered = Math.hypot(n.x - mouseX, n.y - mouseY) < n.radius + 10
        const r = (hovered ? n.radius + 3 : n.radius)

        // Glow
        if (hovered || n.isHub) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5.5)
          g.addColorStop(0, `rgba(168,85,247,${0.45 * n.alpha})`)
          g.addColorStop(1, "rgba(168,85,247,0)")
          ctx.globalAlpha = n.alpha
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 5.5, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }

        ctx.globalAlpha = n.alpha
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = hovered ? "#ffffff" : (n.isHub ? "#f3e8ff" : "#ddd6fe")
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Gentle live physics (very slow drift after settling)
      if (!nodes.every(n => n.dragging === false)) {
        nodes.forEach(n => { n.fx = 0; n.fy = 0 })
        edges.forEach(([ai, bi]) => {
          const a = nodes[ai], b = nodes[bi]
          if (!a.dragging && !b.dragging) return
          const dx = b.x - a.x, dy = b.y - a.y
          a.fx += dx * 0.01; a.fy += dy * 0.01
          b.fx -= dx * 0.01; b.fy -= dy * 0.01
        })
        nodes.forEach(n => {
          if (n.dragging) return
          n.vx = (n.vx + n.fx) * 0.6
          n.vy = (n.vy + n.fy) * 0.6
          n.x += n.vx
          n.y += n.vy
        })
      }

      animId = requestAnimationFrame(draw)
    }

    const resize = () => {
      const p = canvas.parentElement!
      canvas.width = p.offsetWidth
      canvas.height = p.offsetHeight
      init()
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

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
