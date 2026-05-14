# FooterCTA Specification
(Covers: Final CTA section + Footer)

## Overview
- **Target file:** `src/components/FooterCTA.tsx`
- **Interaction model:** static

---

## Section 1: Final CTA — "Help Your Prospects See The Best Version Of You"

### DOM Structure
```
<section>
  <div> (teal glow bg — large radial gradient bottom center)
  <h2>Help Your Prospects See The Best Version Of You</h2>
  <a href="#"> (CTA button "Speak To Us")
</section>
```

### Container
- padding: 160px 28px
- text-align: center
- position: relative; overflow: hidden
- background: radial-gradient(ellipse at bottom center, rgba(0,255,239,0.18) 0%, transparent 65%)
- Also shows faint grid/text watermark in background (ghost text from brand)

### H2
- font-size: clamp(40px, 5vw, 72px)
- font-weight: 600
- letter-spacing: -2.5px
- gradient text
- max-width: 700px; margin: 0 auto 40px

### Speak To Us button
- Same pill style as hero (white bg, black text, borderRadius 1440px)
- padding: 16px 48px; font-size 18px; font-weight 600
- Has an icon (chat emoji 💬 or SVG) before text

---

## Section 2: Footer

### DOM Structure
```
<footer>
  <div> (logos marquee strip — clients)
    WorldStar HipHop | HighKey Clout | LightRay | Blendr (logos)
  </div>
  <hr>
  <div> (bottom row)
    <div> (NINETY EIGHT logo text)
    <a href="#">Speak To Us</a>
  </div>
  <p>© Ninety Eight LLC, 2023-2026</p>
  <p>Disclaimer: This site is not a part of Facebook...</p>
</footer>
```

### Footer Container
- background: #000 (slightly darker than page)
- padding: 64px 28px 40px
- max-width: 1200px centered

### Client logos strip
- Display: horizontal flex, gap: 48px, align-items: center
- Each logo: height 40px; filter: brightness(0) invert(1) (white logos); opacity: 0.6
- logos: text-based (WorldStar, HighKey Clout, LightRay, Blendr)

### Divider
- border: none; border-top: 1px solid rgba(255,255,255,0.08)
- margin: 32px 0

### Bottom row
- display: flex; justify-content: space-between; align-items: center
- NINETY EIGHT: font-size 24px; font-weight 700; letter-spacing -0.5px
- Has box/logo icon before text (⊞ or similar)

### Speak To Us
- Same pill button style (teal border, transparent bg, white text)

### Copyright
- font-size: 13px; color: rgba(255,255,255,0.3); text-align: center; margin-top: 24px

### Disclaimer
- font-size: 12px; color: rgba(255,255,255,0.2); text-align: center; max-width: 600px; margin: 8px auto

## Text Content (verbatim)
**CTA H2:** "Help Your Prospects See The Best Version Of You"
**CTA button:** "Speak To Us"

**Footer:**
"© Ninety Eight LLC, 2023-2026"
"Speak To Us"
"Disclaimer: This site is not a part of Facebook. Ninety Eight is not endorsed by Facebook in any way. Facebook is solely a trademark of Facebook, Inc."

Client logos (text): WorldStar Hip Hop | HIGHKEY CLOUT | LightRay Deep Neural Networks | blendr

## Responsive
- Footer logos: hide some on mobile or scroll
- Bottom row: stack on mobile
