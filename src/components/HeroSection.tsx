"use client"
import Image from "next/image"

const CAKTO = "https://pay.cakto.com.br/34aija3"


export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 28px 80px",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Banner FULL WIDTH — cobre TODA a section de borda a borda */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/hero-banner.png"
          alt=""
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        {/* Overlay escuro para texto ser legível */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,12,20,0.88) 0%, rgba(10,12,20,0.72) 35%, rgba(10,12,20,0.82) 65%, rgba(10,12,20,0.99) 100%)",
        }} />
      </div>

      {/* Conteúdo */}
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>

        {/* Logo real */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <Image
            src="/logo-academyia.png"
            alt="Academy.iA"
            width={355}
            height={200}
            className="hero-logo"
            priority
            style={{
              height: 200,
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 16px rgba(64,96,232,0.5))",
            }}
          />
        </div>

        <h1 style={{
          fontSize: "clamp(30px, 4vw, 52px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          color: "#EEEEF5",
          maxWidth: 780,
          margin: "0 auto 20px",
          textWrap: "balance",
        } as React.CSSProperties}>
          Aprenda a construir com IA — e pare de perder tempo assistindo tutorial que não aplica
        </h1>

        <p style={{
          fontSize: "clamp(17px, 2vw, 20px)",
          lineHeight: 1.65,
          color: "rgba(238,238,245,0.75)",
          maxWidth: 520,
          margin: "0 auto 44px",
        }}>
          Skills prontas de Claude Code, aulas diretas ao ponto e comunidade ativa de quem já usa IA pra criar, vender e automatizar.
        </p>

        <style>{`@media(max-width:768px){.hero-cta{padding:13px 28px!important;font-size:15px!important}}`}</style>
        <div style={{ marginBottom: 64 }}>
          <a
            href={CAKTO}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse-blue hero-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 48px",
              borderRadius: 9999,
              backgroundColor: "#4060E8",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 40px rgba(64,96,232,0.45)",
              transition: "transform 0.2s, box-shadow 0.2s",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 12px 48px rgba(64,96,232,0.7)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 40px rgba(64,96,232,0.45)"
            }}
          >
            Garantir meu acesso vitalício
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p style={{ marginTop: 14, fontSize: 13, color: "rgba(238,238,245,0.45)" }}>
            Pagamento único · Acesso imediato · Sem mensalidades
          </p>
        </div>


      </div>
    </section>
  )
}
