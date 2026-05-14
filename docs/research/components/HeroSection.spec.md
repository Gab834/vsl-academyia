# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/ninetyeight-desktop-hero.png`
- **Interaction model:** static content + teal radial glow background

## DOM Structure
```
<section> (hero wrapper, full viewport height min)
  <div> (teal bg glow orb — bottom left)
  <div> (content container, max-width 1000px, centered)
    <div> (badge/label — small caps pill)
      | PREMIER WEB DESIGN AGENCY IN DUBAI
    </div>
    <h1>Web Design That Makes You Look Better Than Anyone Else</h1>
    <a href="#pricing"> (CTA button "See Pricing")
    <div> (stats row)
      <div> (stat: 7+ / CELEBRITY CLIENTS)
      <div> (stat: +32.5% / AV. CONVERSION RATE INCREASE)
      <div> (stat: DUBAI / CORE OFFICE)
    </div>
  </div>
  <div> (device mockup images — phones/browser screenshots, hero-image.avif)
</section>
```

## Computed Styles

### Section container
- background: radial-gradient(ellipse at bottom left, rgba(0,255,239,0.12) 0%, transparent 60%) — teal glow
- padding-top: 200px (accounts for fixed navbar at top:48px + height ~70px)
- padding-bottom: 80px
- padding-left/right: 28px
- text-align: center
- position: relative
- overflow: hidden

### Badge / label pill
- display: inline-flex
- align-items: center
- gap: 8px
- font-size: 14px
- font-weight: 500
- letter-spacing: 0.1em (1.6px)
- color: rgb(0, 255, 239) ← cyan
- text-transform: uppercase
- margin-bottom: 24px
- has a vertical bar `|` before the text in white/muted
- Style: `| PREMIER WEB DESIGN AGENCY IN DUBAI`

### H1
- font-size: 76.8px (desktop) → clamp(42px, 7vw, 76.8px)
- font-weight: 600
- line-height: 80.64px (1.05)
- letter-spacing: -3.84px (-0.05em)
- background: linear-gradient(135deg, rgb(255,255,255) 50%, rgba(255,255,255,0.55))
- -webkit-background-clip: text
- -webkit-text-fill-color: transparent
- max-width: 820px
- margin: 0 auto 40px
- text-align: center

### See Pricing button
- display: inline-flex
- padding: 14px 36px
- background: rgb(255, 255, 255)
- color: rgb(0, 0, 0)
- border-radius: 1440px (pill)
- font-size: 18px
- font-weight: 600
- margin-bottom: 56px
- hover → background: rgba(255,255,255,0.88)
- transition: 0.2s

### Stats row
- display: flex
- flex-direction: row
- justify-content: center
- gap: 48px
- flex-wrap: wrap
- padding: 32px 0

### Stat item
- display: flex
- flex-direction: column
- align-items: center
- gap: 4px

### Stat number (e.g. "7+", "+32.5%", "DUBAI")
- font-size: 48px
- font-weight: 600
- color: rgb(255, 255, 255)
- letter-spacing: -1px
- line-height: 1

### Stat label (e.g. "CELEBRITY CLIENTS")
- font-size: 11px
- font-weight: 500
- color: rgb(0, 255, 239) ← cyan
- letter-spacing: 0.12em
- text-transform: uppercase

### Hero device image (bottom of section)
- width: 100%
- max-width: 900px
- margin: 0 auto
- display: block
- position: relative (stacked mockups)

## States & Behaviors

### Entrance animations
- Badge fades in (delay 0.1s)
- H1 fades up (delay 0.2s)
- Button fades up (delay 0.3s)
- Stats fade up (delay 0.4s)
- Image fades in (delay 0.5s)

## Assets
- Hero image: `/images/hero-image.avif` (shows website mockups/devices)
- Hero bg: `/images/hero-bg.avif` (background texture/image)

## Text Content (verbatim)
- Badge: "PREMIER WEB DESIGN AGENCY IN DUBAI"
- H1: "Web Design That Makes You Look Better Than Anyone Else"
- CTA: "See Pricing"
- Stats: "7+" / "CELEBRITY CLIENTS", "+32.5%" / "AV. CONVERSION RATE INCREASE", "DUBAI" / "CORE OFFICE"
- Also: "THIS IS DESIGNED FOR" / "+ ANYONE THAT CARES ABOUT CUSTOMER PERCEPTION" / "CRUSHING CONVERSIONS"

## Responsive
- Desktop (1440px): H1 76.8px, stats side by side, max-width 1000px container
- Mobile (390px): H1 ~42px, stats stack to column, image hidden or smaller
