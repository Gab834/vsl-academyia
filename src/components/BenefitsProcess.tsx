"use client"
import Image from "next/image"

const features = [
  {
    icon: "🎬",
    title: "Aulas de Claude Code",
    desc: "Vídeos práticos ensinando como usar IA para criar sites, automatizar tarefas e vender mais.",
  },
  {
    icon: "⚡",
    title: "Biblioteca de Skills",
    desc: "Skills prontas para baixar e usar: prompts, templates e workflows de IA para o seu negócio.",
  },
  {
    icon: "👥",
    title: "Comunidade Exclusiva",
    desc: "Grupo com outros membros para trocar experiências, dúvidas e oportunidades de parceria.",
  },
  {
    icon: "📡",
    title: "Lives Gravadas",
    desc: "Sessões ao vivo gravadas e disponíveis pra assistir quando quiser, sem perder nada.",
  },
  {
    icon: "🗺️",
    title: "Mapa Mental de IA",
    desc: "Guia visual completo com as melhores ferramentas e como conectá-las no seu fluxo.",
  },
  {
    icon: "🔔",
    title: "Novidades Constantes",
    desc: "Conteúdo novo toda semana. Você não compra um produto estático — entra em uma comunidade viva.",
  },
]

const steps = [
  { num: "01", text: "Clique no botão, faça o pagamento único de R$497,90 e receba acesso imediato no seu email." },
  { num: "02", text: "Faça login na plataforma e explore as aulas, skills e recursos organizados por categoria." },
  { num: "03", text: "Coloque em prática com as skills prontas e tire dúvidas na comunidade com outros membros." },
  { num: "04", text: "Acesse para sempre — sem mensalidade, sem prazo. Novos conteúdos adicionados toda semana." },
]

export function BenefitsProcess() {
  return (
    <>
      <section id="inclusos" style={{ background: "#0a0c14", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <style>{`@media(max-width:768px){.features-grid{grid-template-columns:1fr!important}}`}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: "#4060E8",
          }}>
            <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
            O QUE ESTÁ INCLUSO
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1,
            color: "#EEEEF5",
            marginBottom: 16, maxWidth: 700,
          }}>
            Tudo que você precisa para dominar a IA
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(238,238,245,0.55)", maxWidth: 520, marginBottom: 48 }}>
            Uma plataforma completa que cresce toda semana. Tudo o que você precisa para aplicar IA de verdade.
          </p>

          {/* Mockup da comunidade */}
          <div style={{ width: "100%", marginBottom: 64, textAlign: "center" }}>
            <Image
              src="/community-mockup.png"
              alt="Plataforma Academy.IA"
              width={1672}
              height={941}
              style={{
                width: "100%",
                maxWidth: 900,
                height: "auto",
                display: "inline-block",
              }}
            />
          </div>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: "rgb(14, 17, 28)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "28px 24px",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(64,96,232,0.25)" }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)" }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <p style={{ fontSize: 17, fontWeight: 600, color: "#EEEEF5", marginBottom: 8 }}>{f.title}</p>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(238,238,245,0.5)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" style={{ background: "#0a0c14", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
              fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
              color: "#4060E8",
            }}>
              <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
              COMO FUNCIONA
            </div>
            <h2 style={{
              fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1,
              color: "#EEEEF5",
            }}>
              Simples assim
            </h2>
          </div>
          {steps.map((step) => (
            <div key={step.num} style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "32px 0",
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: 24,
              alignItems: "start",
            }}>
              <span style={{ fontSize: 52, fontWeight: 700, color: "rgba(64,96,232,0.15)", lineHeight: 1 }}>
                {step.num}
              </span>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(238,238,245,0.65)", paddingTop: 8 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
