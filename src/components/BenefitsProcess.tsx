import Image from "next/image"

const steps = [
  { num: "01", text: "We start with an analysis of your target audience. All websites need to be curated differently to appeal to different customer or investor profiles." },
  { num: "02", text: "The mockups phase. At this stage we draft multiple potential ideas, then shortlist and finalise the leading options to present." },
  { num: "03", text: "Deployment & data collection. We analyse performance and feedback data after deployment of your website to continue refinement." },
  { num: "04", text: "Ongoing edits. Once your website is live, we maintain availability to make small edits and updates to content, as well as do regular performance checks." },
]

const benefits = [
  "Lower client acquisition costs",
  "Widely increase trust and conversions",
  "Build a brand that creates a lasting impression",
]

export function BenefitsProcess() {
  return (
    <>
      <section style={{ background: "#030604", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
            fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: "rgb(0, 255, 239)",
          }}>
            <span style={{ width: 3, height: 16, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
            REACH YOUR POTENTIAL
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 24, maxWidth: 700,
          }}>
            The Benefits Of A Top-Tier Website
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 560, marginBottom: 16 }}>
            Our clients had the same problem you have right now with your business - missing out on potential to scale much faster.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 560, marginBottom: 40 }}>
            Working with us, our clients always:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {benefits.map((b) => (
              <div key={b} style={{
                background: "rgb(13, 18, 28)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "28px", fontSize: 18, fontWeight: 500,
                color: "rgba(255,255,255,0.85)", lineHeight: 1.5,
              }}>
                {b}
              </div>
            ))}
          </div>

          <div style={{ overflow: "hidden", marginTop: 48, position: "relative" }}>
            <div style={{ display: "flex", gap: 16, width: "max-content", animation: "marquee 30s linear infinite" }}>
              {[0, 1].map((set) =>
                [1, 2, 3, 4, 5].map((n) => (
                  <Image
                    key={`${set}-${n}`}
                    src={`/images/service-0${n}.avif`}
                    alt={`Service ${n}`}
                    width={340}
                    height={130}
                    style={{ height: 130, width: "auto", borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="process" style={{ background: "#030604", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            textAlign: "center", marginBottom: 64,
          }}>
            Our Process
          </h2>
          {steps.map((step) => (
            <div key={step.num} style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "32px 0",
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: 24,
              alignItems: "start",
            }}>
              <span style={{ fontSize: 56, fontWeight: 700, color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>
                {step.num}
              </span>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
