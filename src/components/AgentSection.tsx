"use client"

const steps = [
  {
    num: "01",
    icon: "🧩",
    title: "Defina o objetivo",
    desc: "Diga ao agente exatamente o que ele precisa fazer — em português simples, sem código.",
    color: "#4060E8",
  },
  {
    num: "02",
    icon: "⚙️",
    title: "Claude Code monta",
    desc: "O Claude Code estrutura as ferramentas, memória e lógica do agente automaticamente.",
    color: "#7c3aed",
  },
  {
    num: "03",
    icon: "🚀",
    title: "Agente no ar",
    desc: "Seu agente executa tarefas, pesquisa, escreve e entrega resultados — enquanto você dorme.",
    color: "#a855f7",
  },
]

const useCases = [
  { icon: "📊", label: "Agente de pesquisa de mercado" },
  { icon: "✍️", label: "Agente de criação de conteúdo" },
  { icon: "💰", label: "Agente de prospecção de clientes" },
  { icon: "📧", label: "Agente de automação de emails" },
  { icon: "🔍", label: "Agente de análise de dados" },
  { icon: "📱", label: "Agente de gestão de redes sociais" },
]

export function AgentSection() {
  return (
    <section style={{
      background: "#0a0c14",
      padding: "100px 28px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes agent-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes step-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(120deg) translateX(140px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(140px) rotate(-480deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(240deg) translateX(140px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(140px) rotate(-600deg); }
        }
        .agent-step-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px;
          flex: 1;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .agent-step-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(64,96,232,0.35);
          transform: translateY(-4px);
        }
        .agent-step-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--card-color);
          opacity: 0.6;
          border-radius: 20px 20px 0 0;
        }
        .use-case-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(64,96,232,0.1);
          border: 1px solid rgba(64,96,232,0.2);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(238,238,245,0.75);
          transition: background 0.2s, border-color 0.2s;
        }
        .use-case-tag:hover {
          background: rgba(64,96,232,0.2);
          border-color: rgba(64,96,232,0.45);
          color: #EEEEF5;
        }
        @media (max-width: 768px) {
          .agent-steps { flex-direction: column !important; }
          .agent-orbit-visual { display: none !important; }
        }
      `}</style>

      {/* Glows de fundo */}
      <div style={{
        position: "absolute", top: "20%", right: "-10%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(64,96,232,0.1) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "agent-glow 5s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "agent-glow 7s ease-in-out infinite",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
            background: "rgba(64,96,232,0.12)", border: "1px solid rgba(64,96,232,0.3)",
            borderRadius: 100, padding: "6px 16px",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const,
            color: "#818cf8",
          }}>
            <span>🤖</span> AGENTES DE IA
          </div>

          <h2 style={{
            fontSize: "clamp(32px, 4.5vw, 58px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em",
            marginBottom: 20,
          }}>
            Crie seu próprio{" "}
            <span style={{
              background: "linear-gradient(135deg, #4060E8, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Agente de IA
            </span>
            <br />sem escrever uma linha de código
          </h2>

          <p style={{
            fontSize: 18, lineHeight: 1.7,
            color: "rgba(238,238,245,0.6)",
            maxWidth: 620, margin: "0 auto",
          }}>
            Com Claude Code você monta agentes que executam tarefas complexas,
            pesquisam na internet, analisam dados e entregam resultados — no piloto automático.
          </p>
        </div>

        {/* Steps */}
        <div className="agent-steps" style={{
          display: "flex", gap: 20, marginBottom: 60,
        }}>
          {steps.map((s) => (
            <div
              key={s.num}
              className="agent-step-card"
              style={{ ["--card-color" as string]: s.color }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
              }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <span style={{
                  fontSize: 12, fontWeight: 800, color: s.color,
                  letterSpacing: "0.1em",
                }}>
                  PASSO {s.num}
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#EEEEF5" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(238,238,245,0.55)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Use cases */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{
            fontSize: 13, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(238,238,245,0.35)",
            marginBottom: 20,
          }}>
            O que você pode automatizar
          </p>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10,
            justifyContent: "center",
          }}>
            {useCases.map((u, i) => (
              <div key={i} className="use-case-tag">
                <span>{u.icon}</span> {u.label}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="https://pay.cakto.com.br/34aija3"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, #4060E8, #7c3aed)",
              color: "#fff", fontWeight: 700, fontSize: 16,
              padding: "16px 36px", borderRadius: 14,
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(64,96,232,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
              ;(e.currentTarget as HTMLElement).style.boxShadow = "0 14px 40px rgba(64,96,232,0.5)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)"
              ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(64,96,232,0.35)"
            }}
          >
            🤖 Quero criar meu agente agora →
          </a>
          <p style={{ fontSize: 13, color: "rgba(238,238,245,0.35)", marginTop: 12 }}>
            Acesso vitalício · R$497,90 de investimento único
          </p>
        </div>
      </div>
    </section>
  )
}
