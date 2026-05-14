# TestimonialsAuthority Specification
(Covers: Authority Section + Testimonials Section)

## Overview
- **Target file:** `src/components/TestimonialsAuthority.tsx`
- **Interaction model:** static authority + click-driven testimonial carousel

---

## Section 1: Authority — "Everyone Copies Our Designs"

### DOM Structure
```
<section>
  <div> (celebrity images strip — slider-01, 03, 05)
  <div> (label: | WE SET THE EXAMPLE & PEOPLE FOLLOW)
  <h2>Everyone Copies Our Designs</h2>
  <p>Whatever we design, the market seems to copy.</p>
  <p>We've been pioneering website designs and landing pages behind the scenes...</p>
  <p>Our designs for Tate are the ones that most often inspire similar designs.</p>
</section>
```

### Container: padding 120px 28px, max-width 1000px centered

### Celebrity image strip
- 3 celebrity images: `/images/celebrity-02.avif`, `/images/celebrity-03.avif`
- Each: height 150px, border-radius 12px, object-fit: cover
- Display: horizontal flex row, gap 16px
- Width: 486px each (natural)

### Label
- | WE SET THE EXAMPLE & PEOPLE FOLLOW — cyan, uppercase, letter-spacing 0.1em
- margin-top: 40px

### H2
- clamp(36px, 4vw, 64px); font-weight 600; gradient white text
- margin-bottom: 24px

### Body paragraphs
- font-size 17px; color rgba(255,255,255,0.65); line-height 1.7; max-width 600px

---

## Section 2: Testimonials — "See us through our clients' eyes"

### DOM Structure
```
<section>
  <div> (label: TESTIMONIALS)
  <h2>See us through our clients' eyes</h2>
  <div> (carousel nav arrows — left/right, teal circle buttons)
  <div> (testimonial card)
    <div> (brand logo — tate-logo.svg)
    <blockquote>
      "These are the marketing blackbelts that are helping me in my conquest against the machine.
       <strong>They've done a lot of great things for me...</strong>
       They've done a lot of great things for me while I'm all the way in Croatia..."
    </blockquote>
    <div> (person info)
      <img> (avatar, small round 48px)
      <div>
        <p>Andrew Tate</p>
        <p>Entrepreneur</p>
      </div>
    </div>
  </div>
</section>
```

### Container: padding 120px 28px, max-width 900px centered

### Label
- TESTIMONIALS — cyan, uppercase, letter-spacing 0.15em, font-size 13px

### H2
- clamp(36px, 5vw, 68px); font-weight 600
- gradient text with "clients'" in slightly dimmer
- margin-bottom: 48px

### Carousel nav arrows
- display: flex; gap: 12px; justify-content: flex-end; margin-bottom: 32px
- Arrow button: width 52px; height 52px; border-radius 50%; border: 1.5px solid rgb(0,255,239); background: transparent
- Arrow icon: teal color, size 20px
- hover: background rgba(0,255,239,0.1)

### Testimonial card
- background: rgb(13, 18, 28)
- border: 1px solid rgba(255,255,255,0.08)
- border-radius: 20px
- padding: 40px 40px 36px

### Brand logo (Tate)
- SVG: `/images/tate-logo.svg`
- height: 40px; width: auto; margin-bottom: 24px

### Quote text
- font-size: 20px; line-height: 1.65; color: rgba(255,255,255,0.65)
- strong parts: color: rgb(255,255,255); font-weight: 600
- First bold part: "These are the marketing blackbelts that are helping me in my conquest against the machine."

### Person info
- display: flex; gap: 16px; align-items: center; margin-top: 32px
- Avatar img: 48px × 48px; border-radius 50%; object-fit: cover
- Name: font-size 16px; font-weight 600; color #fff
- Title: font-size 14px; color rgba(255,255,255,0.5)

## Text Content (verbatim)

**Authority:**
"Whatever we design, the market seems to copy."
"We've been pioneering website designs and landing pages behind the scenes, especially in the online and info space, in the last few years."
"Our designs for Tate are the ones that most often inspire similar designs."

**Testimonial (Andrew Tate):**
"\"These are the marketing blackbelts that are helping me in my conquest against the machine. They've done a lot of great things for me while I'm all the way in Croatia, and we're still getting the world conquered so thanks guys.\""
— Andrew Tate, Entrepreneur

## Assets
- Celebrity images: `/images/celebrity-02.avif`, `/images/celebrity-03.avif`
- Tate logo: `/images/tate-logo.svg`
- Person avatar: use placeholder (no real avatar downloaded)

## Responsive
- Mobile: arrows smaller, quote font 17px, card padding 28px
