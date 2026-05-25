"use client"
import { useState } from "react"

const faqs = [
  { q: "O que é a Academy.IA?", a: "É uma plataforma de membros com aulas práticas de IA, biblioteca de skills prontas e comunidade exclusiva. Tudo focado em te ensinar a usar ferramentas de IA no dia a dia e no seu negócio." },
  { q: "Para quem é indicado?", a: "Para qualquer pessoa que quer aprender a usar IA de forma prática — empreendedores digitais, criadores de conteúdo, freelancers, ou quem quer usar IA para ganhar tempo e dinheiro todo dia." },
  { q: "O que está incluso no acesso?", a: "Aulas de Claude Code na prática, biblioteca de skills (prompts, templates, workflows), comunidade exclusiva de membros, lives gravadas, mapa mental de ferramentas de IA e novos conteúdos adicionados toda semana." },
  { q: "Por quanto tempo tenho acesso?", a: "Para sempre. É vitalício. Você paga R$97 uma única vez e tem acesso a tudo — incluindo todos os novos conteúdos adicionados no futuro. Sem mensalidade, sem prazo de expiração." },
  { q: "Como acesso a plataforma após comprar?", a: "Após o pagamento, você recebe um email com seu login e senha. Basta acessar a plataforma pelo celular ou computador e já começa a usar imediatamente." },
  { q: "Tem garantia?", a: "Sim. Se nos primeiros 7 dias você sentir que não foi o que esperava, pode pedir reembolso completo. Sem perguntas, sem burocracia." },
  { q: "Preciso ter experiência com IA?", a: "Não. A Academy.IA foi feita para todos os níveis — do iniciante que nunca usou IA até quem já usa e quer ir mais fundo e colocar em prática." },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" style={{ background: "#0a0c14", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: "#4060E8",
          }}>
            <span style={{ width: 3, height: 14, background: "rgba(64,96,232,0.4)", borderRadius: 2 }} />
            DÚVIDAS FREQUENTES
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #EEEEF5 50%, rgba(238,238,245,0.4))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Perguntas frequentes
          </h2>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", padding: "24px 0", background: "transparent", border: "none",
                cursor: "pointer", textAlign: "left", fontSize: 17, fontWeight: 500, color: "#EEEEF5",
                fontFamily: "var(--font-inter)",
              }}
            >
              <span>{faq.q}</span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="rgba(238,238,245,0.35)" strokeWidth="2"
                style={{
                  flexShrink: 0, marginLeft: 16,
                  transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {open === i && (
              <div style={{ paddingBottom: 24, fontSize: 16, lineHeight: 1.75, color: "rgba(238,238,245,0.55)" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
