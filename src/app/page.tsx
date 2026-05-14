import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ProblemSections } from "@/components/ProblemSections"
import { BenefitsProcess } from "@/components/BenefitsProcess"
import { PricingSection } from "@/components/PricingSection"
import { TestimonialsAuthority } from "@/components/TestimonialsAuthority"
import { FAQSection } from "@/components/FAQSection"
import { FooterCTA } from "@/components/FooterCTA"

export default function Page() {
  return (
    <main style={{ background: "#030604", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <ProblemSections />
      <BenefitsProcess />
      <PricingSection />
      <TestimonialsAuthority />
      <FAQSection />
      <FooterCTA />
    </main>
  )
}
