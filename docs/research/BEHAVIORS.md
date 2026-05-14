# Behavior Bible — ninetyeight.net

## Scroll Behaviors

### Navbar
- **Default state:** Fixed at top:48px, background transparent, pill-shaped with blur(3px)
- **Scrolled state:** Background becomes rgba(3,6,4,0.9) + box-shadow
- **Trigger:** scroll > ~50px
- **Transition:** background 0.3s ease, box-shadow 0.3s ease

### Section entrance animations
- Elements fade+slide up as they enter viewport
- IntersectionObserver pattern (Webflow GSAP/built-in)
- Delay staggers: 0.1s between child elements

## Click Behaviors

### CTA Buttons ("Start Your Project", "See Pricing", "Get started")
- Hover: slight brightness/opacity shift
- All link to Typeform or payment page

### FAQ Accordion
- Click to expand/collapse answer
- Smooth height transition (~0.3s)
- Chevron rotates 180deg on open

### Testimonials Carousel
- Left/Right arrow buttons
- Slides with opacity/transform transition
- Teal circle arrow buttons

### Portfolio (Work) Carousel
- Horizontal scroll
- "Drag To Reveal Results" — before/after comparison slider

## Hover States

### Nav links
- Color: rgba(255,255,255,0.5) → rgb(255,255,255)
- Transition: 0.2s

### CTA button ("Start Your Project")
- Pill shaped, black bg, white text
- Hover: background becomes teal accent, text becomes black
- Transition: 0.2s

### Pricing cards ("Get started")
- Border glow on hover
- Transform: translateY(-2px)

## Background Visual Effects
- Teal radial gradient orb: bottom-left of hero, rgba(0,255,239,0.15)
- Subtle grid/noise texture on some sections
- Green-dark bg with slight vignette

## Responsive (Mobile 390px)
- Navbar: collapses to logo + single CTA button (no links shown)
- H1: ~42px (from 76.8px desktop)
- Stats row: stacks or stays inline but smaller
- Portfolio: horizontal scroll cards
- Pricing: single column (cards stack)
- Process: single column
- FAQ: same accordion, full width
