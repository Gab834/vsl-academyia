"use client"
import { useEffect, useRef } from "react"

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const painPoints = [
  { icon: "😮‍💨", text: "Já assistiu dezenas de tutoriais. Abriu o ChatGPT, o Claude, o Gemini... e ficou olhando pra tela sem saber o que fazer." },
  { icon: "🔌", text: "Os vídeos ensinam o básico, mas ninguém mostra como plugar isso no seu negócio, no seu projeto, na sua rotina." },
  { icon: "⏳", text: "Sem estrutura, sem comunidade e sem alguém que já fez — você vai continuar tentando sozinho." },
]

const solutions = [
  { icon: "🎯", title: "Aulas práticas", desc: "Não teoria. Você abre a aula, executa e já tem resultado. Criação de sites, automações, funis — tudo aplicado." },
  { icon: "⚡", title: "Skills prontas", desc: "Baixa, instala no agente e usa agora. Sem configurar do zero, sem perder horas aprendendo o básico." },
  { icon: "👥", title: "Comunidade ativa", desc: "Pessoas aplicando IA todo dia. Tire dúvidas, compartilhe resultados, faça parcerias — evolua junto." },
]

function PainCard({ icon, text, delay }: { icon: string; text: string; delay: number }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        display: "flex", gap: 20, alignItems: "flex-start",
        background: "rgb(14,17,28)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderLeft: "3px solid rgba(64,96,232,0.5)",
        borderRadius: 16, padding: "24px 28px",
        animationDelay: `${delay}s`,
      }}
    >
      <span style={{ fontSize: 32, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{icon}</span>
      <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(238,238,245,0.7)", margin: 0 }}>{text}</p>
    </div>
  )
}

function SolutionCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        background: "rgb(14,17,28)",
        border: "1px solid rgba(64,96,232,0.18)",
        borderRadius: 20, padding: "32px 28px",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        cursor: "default",
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(64,96,232,0.5)"
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(64,96,232,0.12)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(64,96,232,0.18)"
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: "rgba(64,96,232,0.1)",
        border: "1px solid rgba(64,96,232,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, marginBottom: 20,
      }}>
        {icon}
      </div>
      <p style={{ fontSize: 18, fontWeight: 700, color: "#EEEEF5", marginBottom: 10 }}>{title}</p>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(238,238,245,0.5)", margin: 0 }}>{desc}</p>
    </div>
  )
}

export function ProblemSections() {
  const calloutRef = useReveal()
  const warningRef = useReveal()
  const titleRef1 = useReveal()
  const titleRef2 = useReveal()
  const compRef = useReveal()

  return (
    <>
      {/* ── SEÇÃO 1: A DOR ── */}
      <section id="problem" style={{ background: "#0a0c14", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <style>{`@media(max-width:768px){.solutions-grid{grid-template-columns:1fr!important}.comp-grid{grid-template-columns:1fr!important}}`}</style>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <div ref={titleRef1} className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{
              fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 1.1,
              background: "linear-gradient(135deg, #EEEEF5 50%, rgba(238,238,245,0.4))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: 0,
            }}>
              Você sabe que IA é poderosa.<br />
              Mas ainda não sabe como <span style={{ WebkitTextFillColor: "#4060E8" }}>usar de verdade.</span>
            </h2>
          </div>

          {/* Pain cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
            {painPoints.map((p, i) => (
              <PainCard key={i} icon={p.icon} text={p.text} delay={i * 0.1} />
            ))}
          </div>

          {/* Callout de contraste */}
          <div ref={calloutRef} className="reveal" style={{
            background: "linear-gradient(135deg, rgba(64,96,232,0.12), rgba(64,96,232,0.05))",
            border: "1px solid rgba(64,96,232,0.35)",
            borderRadius: 20, padding: "32px 36px", marginBottom: 32,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(64,96,232,0.15), transparent 70%)",
              pointerEvents: "none",
            }} />
            <p style={{ fontSize: 13, fontWeight: 700, color: "#4060E8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              ⚡ ENQUANTO ISSO...
            </p>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#EEEEF5", lineHeight: 1.6, margin: 0 }}>
              Tem gente criando sites completos com Claude Code em 30 minutos, automatizando tarefas que levavam horas, e <strong style={{ color: "#4060E8" }}>vendendo isso.</strong>
            </p>
            <p style={{ fontSize: 16, color: "rgba(238,238,245,0.55)", marginTop: 12, marginBottom: 0 }}>
              Não é porque eles são mais inteligentes. É porque alguém mostrou o caminho certo.
            </p>
          </div>

          {/* Warning */}
          <div ref={warningRef} className="reveal" style={{
            background: "rgba(255,80,0,0.06)",
            border: "1px solid rgba(255,80,0,0.2)",
            borderRadius: 14, padding: "18px 24px",
            display: "flex", alignItems: "center", gap: 14, marginBottom: 48,
          }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>⏰</span>
            <p style={{ fontSize: 16, color: "rgba(238,238,245,0.75)", margin: 0, fontWeight: 500 }}>
              A janela de vantagem está fechando. Quem aprender IA agora vai estar anos à frente.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <a href="#pricing" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 40px", borderRadius: 9999,
              backgroundColor: "#4060E8", color: "#fff",
              fontSize: 17, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(64,96,232,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(64,96,232,0.55)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(64,96,232,0.35)"
              }}
            >
              Quero resolver isso agora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 2: A SOLUÇÃO ── */}
      <section style={{ background: "#0a0c14", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          <div ref={titleRef2} className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
              fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
              color: "#4060E8",
            }}>
              <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
              O PROBLEMA
            </div>
            <h2 style={{
              fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 1.1,
              background: "linear-gradient(135deg, #EEEEF5 50%, rgba(238,238,245,0.4))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: 20,
            }}>
              O problema não é falta de ferramenta.<br />
              É <span style={{ WebkitTextFillColor: "#4060E8" }}>falta de método.</span>
            </h2>
            <p style={{ fontSize: 18, color: "rgba(238,238,245,0.5)", maxWidth: 560, margin: "0 auto" }}>
              Claude Code, ChatGPT, Gemini — você tem acesso às mesmas ferramentas que os caras que mais faturam online. Mas ferramenta sem método é só mais um app que você não usa.
            </p>
          </div>

          {/* Comparação: Sem método vs Com método */}
          <div ref={compRef} className="reveal comp-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 64,
          }}>
            <div style={{
              background: "rgba(255,60,60,0.05)",
              border: "1px solid rgba(255,60,60,0.2)",
              borderRadius: 20, padding: "28px 32px",
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,100,100,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 20 }}>
                ✗ Sem método
              </p>
              {["Assiste tutorial, não aplica", "Tem a ferramenta, não sabe o que fazer com ela", "Tenta sozinho e desiste no meio", "Fica pra trás enquanto outros vendem"].map((t) => (
                <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ color: "rgba(255,100,100,0.6)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>
                  <span style={{ fontSize: 15, color: "rgba(238,238,245,0.5)", lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{
              background: "rgba(64,96,232,0.07)",
              border: "1px solid rgba(64,96,232,0.3)",
              borderRadius: 20, padding: "28px 32px",
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#4060E8", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 20 }}>
                ✓ Com a Academy.IA
              </p>
              {["Aprende aplicando, com resultado na primeira aula", "Skill pronta: baixa, instala e usa", "Comunidade tira dúvidas em tempo real", "Sai na frente com IA enquanto outros ainda assistem tutorial"].map((t) => (
                <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ color: "#4060E8", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: "rgba(238,238,245,0.7)", lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Solution cards */}
          <div className="solutions-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {solutions.map((s, i) => (
              <SolutionCard key={i} icon={s.icon} title={s.title} desc={s.desc} delay={i * 0.12} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
