# Design System — Academy.IA VSL Page

## Brand Identity
- Product: **Academy.IA** — plataforma de ensino de Claude Code / IA para brasileiros
- Tagline: "Enquanto você ainda tenta entender IA, tem gente usando Claude Code pra criar estruturas que vendem sozinhas 24 horas por dia"
- Tone: premium, direto, urgente, sem enrolação
- Visual reference: ninetyeight.net — dark, minimal, ultra-premium, high-contrast
- Language: Portuguese (BR)

## Colors
- Background: `#000` (pure black — never use off-black or charcoal)
- Surface: `#080808` (video/card backgrounds)
- Border subtle: `rgba(255,255,255,0.07)`
- Border medium: `rgba(255,255,255,0.12)`
- Text primary: `#ffffff`
- Text secondary: `rgba(255,255,255,0.55)`
- Text muted: `rgba(255,255,255,0.28)`
- Text ultra-muted: `rgba(255,255,255,0.18)`
- Accent purple: `#a78bfa`
- Accent indigo: `#818cf8`
- Accent blue: `#60a5fa`
- Gradient text: `linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)`
- CTA button bg: `linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)`
- CTA hover bg: `linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)`
- Purple glow ambient: `rgba(139,92,246,0.15)`
- Blue glow ambient: `rgba(59,130,246,0.08)`

## Typography
- Font family: Geist (Google Fonts) — `var(--font-geist)`
- Fallback: `ui-sans-serif, system-ui, -apple-system, sans-serif`
- Headline: `clamp(2rem, 5.5vw, 4.2rem)`, weight 800, line-height 1.08, letter-spacing -0.03em
- Sub-headline: `clamp(1rem, 2vw, 1.2rem)`, weight 400, color secondary, line-height 1.65
- Section label: 11px, weight 700, letter-spacing 0.2em, uppercase, color muted
- Body: 15–16px, line-height 1.6
- Price big: `clamp(3.2rem, 9vw, 5.8rem)`, weight 800, letter-spacing -0.04em
- Price strikethrough: 14px, color ultra-muted, text-decoration line-through
- Caption: 12–13px, color ultra-muted

## Spacing
- Container max-width: 880px, padding 0 24px, margin auto
- Section gap: 56–72px
- Element gap: 16–24px
- Tight gap: 8–12px

## Border Radius
- Cards / video: 14–16px
- Buttons: 10px
- Pills / badges: 999px
- Icons / circles: 50%

## Shadows & Glows
- Video shadow: `0 0 80px rgba(139,92,246,0.18), 0 40px 100px rgba(0,0,0,0.7)`
- CTA button shadow: `0 0 48px rgba(124,58,237,0.3), 0 8px 32px rgba(0,0,0,0.4)`
- CTA hover shadow: `0 0 72px rgba(124,58,237,0.5), 0 12px 40px rgba(0,0,0,0.4)`
- Card shadow: `0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px rgba(0,0,0,0.4)`

## Animations
- `.animate-fade-up`: `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both`
- `.animate-fade-in`: `fadeIn 0.8s ease both`
- `.animate-pulse-glow`: `pulse-glow 3s ease-in-out infinite`
- Hover transitions: `0.15s ease`

## Components Patterns

### Background Orbs
Fixed radial gradient decorations:
- Top-right: 70vw circle, purple `rgba(139,92,246,0.15)`, zIndex 0
- Bottom-left: 65vw circle, blue `rgba(59,130,246,0.1)`, zIndex 0

### Section Divider
`width: 48px, height: 1px, background: linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent), margin: 0 auto`

### Feature List Item
`flex row, gap 12, purple circle (20px, border rgba(139,92,246,0.35)) + white checkmark SVG + text`

### CTA Button
`<a> tag, padding 17px 48px, purple gradient, border-radius 10px, uppercase, weight 700, letter-spacing 0.06em`
Hover: `translateY(-2px)` + stronger glow

### Trust Row
`flex row, gap 32, 11px uppercase muted text: "Acesso imediato" | "Garantia de 7 dias" | "Pagamento seguro"`

### Testimonial Card
`dark surface card, border rgba(255,255,255,0.07), border-radius 14px, padding 28px, quote + name + role`

## Page Structure (VSL)
1. **Fixed background orbs**
2. **Logo/brand label** — "Academy · IA", small uppercase muted
3. **Pre-headline tag** — e.g. "ATENÇÃO: leia antes de fechar esta página"
4. **H1 Headline** — bold, gradient accent words
5. **Sub-headline paragraph**
6. **Video player** — click-to-play, 70% reveal gate
7. **Divider**
8. **Problem section** — "O problema..."
9. **Social proof numbers** — stats / metrics
10. **Feature list** — "O que você vai aprender"
11. **Testimonials** — 2–3 cards
12. **Price + CTA** — revealed after 70% OR always visible below video
13. **Guarantee** — 7 days money back
14. **FAQ** — 3–4 questions
15. **Footer** — disclaimer, copyright

## VSL Logic
- Video at `/vsl.mp4` (public folder)
- CTA section reveals when `video.currentTime / video.duration >= 0.7`
- Before 70%: show "Assista ao vídeo para liberar o acesso"
- After 70%: animate-fade-up the full CTA block

## Offer Details
- Product: Academy.IA — módulo Claude Code
- Price: R$97,90
- Price from: R$297,00
- Installments: 12x de R$9,08
- Buy link: `https://pay.cakto.com.br/32tatyi_883478`
- Guarantee: 7 dias
