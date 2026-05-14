# PricingSection Specification

## Overview
- **Target file:** `src/components/PricingSection.tsx`
- **Interaction model:** static (3-column pricing cards)

## DOM Structure
```
<section id="pricing">
  <div> (label: | PRICING PLANS)
  <h2>Choose a Plan And Discuss With Us</h2>
  <div> (3-column grid)
    <div> (card 1: Simple Website)
    <div> (card 2: Best Website — highlighted)
    <div> (card 3: Multi-Page)
  </div>
  <p>If you have a larger or custom project, please let us know.</p>
  <a href="#">Speak To Us</a>
</section>
```

## Section Container
- background: var(--bg) #030604
- padding: 120px 28px
- max-width: 1200px centered

## Label
- Same badge style: | PRICING PLANS (cyan, uppercase, letter-spacing 0.1em, font-size 14px)
- margin-bottom: 16px

## H2
- font-size: clamp(36px, 4vw, 64px)
- font-weight: 600
- letter-spacing: -2px
- gradient text (white 50% → white 55% opacity)
- margin-bottom: 56px

## Cards Grid
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: 24px
- Mobile: single column

## Card (base)
- background: rgb(13, 18, 28)  ← #0d121c
- border: 1px solid rgba(255, 255, 255, 0.08)
- border-radius: 20px
- padding: 40px 32px
- display: flex; flex-direction: column; gap: 8px

## Card — highlighted ("Best Website")
- border: 1.5px solid rgba(0, 255, 239, 0.4) ← teal border
- box-shadow: 0 0 48px rgba(0, 255, 239, 0.08)

## Plan Name (e.g. "Simple Website")
- font-size: 20px
- font-weight: 600
- color: rgb(0, 255, 239) ← cyan
- margin-bottom: 4px

## Price (e.g. "$6,990")
- font-size: 56px
- font-weight: 700
- color: rgb(255, 255, 255)
- letter-spacing: -2px
- margin-bottom: 24px

## Feature list items
- display: flex; align-items: center; gap: 10px
- font-size: 16px; color: rgba(255,255,255,0.7)
- Checkmark icon: cyan circle with ✓ inside
- gap: 12px between items
- margin-bottom: 32px

## "Get started" button
- display: block; width: 100%
- padding: 14px 24px
- background: rgba(255,255,255,0.06)
- border: 1px solid rgba(255,255,255,0.12)
- border-radius: 12px
- color: #fff; font-size: 16px; font-weight: 600
- text-align: center
- hover: background rgba(0,255,239,0.1), border-color rgba(0,255,239,0.4)
- transition: 0.2s

## Text Content (verbatim)

**Plan 1 — Simple Website**
- "$6,990"
- Features: "Simple And Clean Design" | "1 Medium Length Page" | "Copywriting Included" | "Unlimited Revisions"
- CTA: "Get started"

**Plan 2 — Best Website** (most popular)
- "$9,990"
- Features: "Highest Level Design" | "1 Long Page (+ Misc Pages)" | "Top Level Copywriting" | "Pagespeed Optimization" | "A/B Testing (For Conversions)" | "Unlimited Revisions"
- CTA: "Get started"

**Plan 3 — Multi-Page**
- "$15,000+"
- Features: "Everything in Best Plan" | "Multiple Medium-Long Pages" | "Designed For Larger Businesses" | "Meets Custom Requirements"
- CTA: "Get started"

**Footer note:** "If you have a larger or custom project, please let us know."
**Footer CTA:** "Speak To Us"

## Responsive
- Desktop: 3-column grid
- Mobile: single column (stack cards)
