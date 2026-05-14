# Page Topology — ninetyeight.net

## Page Layout
- Scroll container: `body` (default browser scroll)
- Background: #030604 (near-black with green tint)
- Max-width sections: ~1000–1200px centered with auto margins
- Page height: ~13742px

## Sections (top to bottom)

| # | Name | Component | Interaction |
|---|------|-----------|-------------|
| 0 | Navbar | `Navbar` | scroll-driven (fixed, floating pill at scroll > 0) |
| 1 | Hero | `HeroSection` | static + device mockup scroll parallax |
| 2 | Work Showcase | `WorkShowcase` | horizontal scroll carousel |
| 3 | Problem Statement | `ProblemSection` | static |
| 4 | Pain Point | `PainSection` | static |
| 5 | Benefits | `BenefitsSection` | static |
| 6 | Process | `ProcessSection` | static (4-step numbered) |
| 7 | Portfolio Gallery | `PortfolioGallery` | drag-to-reveal / slider |
| 8 | Authority | `AuthoritySection` | static |
| 9 | Pricing | `PricingSection` | static (3-column plans) |
| 10 | Testimonials | `TestimonialsSection` | carousel (arrow nav) |
| 11 | FAQ | `FAQSection` | click-driven accordion |
| 12 | Final CTA | `FinalCTA` | static |
| 13 | Footer | `Footer` | logo marquee + links |

## Z-Index Layers
- Navbar: z-index 999, fixed
- Page content: z-index auto
- Modals/overlays: none detected

## Sticky/Fixed Elements
- Navbar: `position: fixed; top: 48px` — transitions to pill shape on scroll

## Key Observations
- Webflow-built site
- Very dark bg with teal/cyan accent (#00FFEF)
- Inter font throughout (300–700)
- Large headings: 76.8px, weight 600, letterSpacing -3.84px
- Teal glow effects on background (radial-gradient)
- Portfolio uses device mockup cards (browser + phone frames)
- Pricing: 3 plans at $6,990 / $9,990 / $15,000+
