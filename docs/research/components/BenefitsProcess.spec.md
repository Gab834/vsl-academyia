# BenefitsProcess Specification
(Two adjacent sections: Benefits + Process)

## Overview
- **Target file:** `src/components/BenefitsProcess.tsx`
- **Interaction model:** static

---

## Section 1: Benefits — "REACH YOUR POTENTIAL"

### DOM Structure
```
<section>
  <div> (label: | REACH YOUR POTENTIAL)
  <h2>The Benefits Of A Top-Tier Website</h2>
  <p>Our clients had the same problem you have right now with your business - missing out on potential to scale much faster.</p>
  <p>Working with us, our clients always:</p>
  <div> (3 benefit cards in row)
    <div> Lower client acquisition costs
    <div> Widely increase trust and conversions
    <div> Build a brand that creates a lasting impression
  </div>
  <div> (work preview image: service mockups)
</section>
```

### Section Container
- padding: 120px 28px
- max-width: 1100px centered

### Label
- | REACH YOUR POTENTIAL — cyan, uppercase, letter-spacing 0.1em, font-size 14px

### H2
- font-size: clamp(36px, 4vw, 60px); font-weight: 600; letter-spacing: -2px
- gradient text (white 50% → white 55%)

### Body text
- font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.65)
- max-width: 560px; margin-bottom: 48px

### Benefit card
- background: rgb(13, 18, 28)
- border: 1px solid rgba(255,255,255,0.08)
- border-radius: 16px
- padding: 32px 28px
- font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.85)
- 3 cards in row on desktop, stack on mobile

### Service images strip
- Horizontal strip of 5 service images (service-01 through 05)
- Each: height 130px, rounded corners, object-fit: cover
- Display as a marquee/scroll strip (overflow-x: hidden, animate-marquee)

---

## Section 2: Process — "Our Process"

### DOM Structure
```
<section id="process">
  <h2>Our Process</h2>
  <div> (4-step list)
    <div> (step 1)
      <span>01</span>
      <p>We start with an analysis of your target audience...</p>
    <div> (step 2)
      <span>02</span>
      <p>The mockups phase. At this stage we draft multiple potential ideas...</p>
    <div> (step 3)
      <span>03</span>
      <p>Deployment & data collection. We analyse performance and feedback data...</p>
    <div> (step 4)
      <span>04</span>
      <p>Ongoing edits. Once your website is live, we maintain availability...</p>
  </div>
</section>
```

### Section Container
- padding: 120px 28px
- max-width: 800px centered

### H2
- Same gradient text heading style
- text-align: center; margin-bottom: 64px

### Step number
- font-size: 56px; font-weight: 700; color: rgba(255,255,255,0.08) ← very faint ghost number
- line-height: 1
- display: block; margin-bottom: 12px

### Step text
- font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.65)

### Step container
- border-top: 1px solid rgba(255,255,255,0.08)
- padding: 32px 0
- display: grid; grid-template-columns: 80px 1fr; gap: 24px; align-items: start

## Text Content (verbatim)

**Benefits:**
"Our clients had the same problem you have right now with your business - missing out on potential to scale much faster."
"Working with us, our clients always:"
Cards: "Lower client acquisition costs" | "Widely increase trust and conversions" | "Build a brand that creates a lasting impression"

**Process:**
01: "We start with an analysis of your target audience. All websites need to be curated differently to appeal to different customer or investor profiles."
02: "The mockups phase. At this stage we draft multiple potential ideas, then shortlist and finalise the leading options to present."
03: "Deployment & data collection. We analyse performance and feedback data after deployment of your website to continue refinement."
04: "Ongoing edits. Once your website is live, we maintain availability to make small edits and updates to content, as well as do regular performance checks."

## Assets
- Service images: `/images/service-01.avif` through `/images/service-05.avif`

## Responsive
- Benefits cards: 3-col desktop → 1-col mobile
- Process steps: same on mobile (full width)
