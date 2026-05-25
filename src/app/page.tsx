import { AnnouncementBar } from "@/components/AnnouncementBar"
import { HeroSection } from "@/components/HeroSection"
import { ModulesMarquee } from "@/components/ModulesMarquee"
import { ProblemSections } from "@/components/ProblemSections"
import { BenefitsProcess } from "@/components/BenefitsProcess"
import { PricingSection } from "@/components/PricingSection"
import { FAQSection } from "@/components/FAQSection"
import { CreatorSection } from "@/components/CreatorSection"
import { FooterCTA } from "@/components/FooterCTA"
import { WhatsAppButton } from "@/components/WhatsAppButton"

export default function Page() {
  return (
    <main style={{ background: "#0a0c14", minHeight: "100vh", color: "#EEEEF5", overflowX: "hidden" }}>
      <AnnouncementBar />
      <HeroSection />
      <ModulesMarquee />
      <ProblemSections />
      <BenefitsProcess />
      <PricingSection />
      <FAQSection />
      <CreatorSection />
      <FooterCTA />
      <WhatsAppButton />
    </main>
  )
}
