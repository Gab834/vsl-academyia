"use client"
import { useState } from "react"

const faqs = [
  { q: "Why are your rates high?", a: "At Ninety Eight we are solely specialised in high end websites. Websites that blow your prospects minds away, and turn them into customers. Websites that are visually stunning, and make you look like the best and leading option in your market. Websites that tell a story, and convert incredibly well. To achieve all of this, it takes lots of focus, time and experience from our designers, developers and copywriters. We only deliver the best, and therefore our clients always see incredible results from their websites. That's also why we are trusted by A-List offers and celebrities." },
  { q: "How much can you boost conversion rates?", a: "With a combination of optimised visuals, page structure and copy, we predictably lift the conversion rates of your business' website regardless of the industry. Depending on your plan we can also include ongoing A/B testing to find the best converting format for your specific offer. Please contact us to inquire." },
  { q: "How fast will I receive my website?", a: "We can work on rushed timelines if needed, but usually between 5 days and 11 days. Contact us if you have an urgent project with special requirements and we will be more than happy to accommodate." },
  { q: "What do you need from me?", a: "To begin, we will need exports of your branding assets (logo variations and any guidelines you have), some references of the style you like, and some information about the things you want your new website to achieve. Based on this info we will help you hit the KPIs you are looking for." },
  { q: "Who have you worked with?", a: "We have worked with A-list offers and celebrity clients including Andrew Tate - we are the team responsible for all of his websites for the last 3 years - as well as other big names like Luke Belmar, Sneako, and other influencers. Aside from influencers, we have also worked with tech, real estate startups, dozens of crypto projects and many other niches in the last few years." },
  { q: "What programs do you use?", a: "Primarily we use a stack of Figma for designs and mockups, then either Webflow, Framer or GoHighLevel depending on the needs of your business. Whatever your tech requirements are, we can deliver." },
  { q: "What do you guarantee?", a: "We guarantee unlimited changes until you are fully satisfied with how your website is looking. But most often, our clients love what they see without many edits. In addition, we include small changes after the website has gone live if you need any content updated. We're available to call with our clients at any time to discuss ideas, updates and general progress. The only reason we have been successful and received so many referrals as a team is because we genuinely care about the success of our clients. Let's crush your project. Contact us now." },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ background: "#030604", padding: "120px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{
          fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1,
          background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.5))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          textAlign: "center", marginBottom: 64,
        }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              width: "100%", padding: "24px 0", background: "transparent", border: "none",
              cursor: "pointer", textAlign: "left", fontSize: 18, fontWeight: 500, color: "#fff",
              fontFamily: "var(--font-inter)",
            }}>
              <span>{faq.q}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"
                style={{ flexShrink: 0, marginLeft: 16, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {open === i && (
              <div style={{ paddingBottom: 24, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
