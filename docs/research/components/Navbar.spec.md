# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Interaction model:** scroll-driven — floats as pill at top, background becomes opaque on scroll

## DOM Structure
```
<nav> (fixed pill container, centered)
  <div> (inner flex row)
    <a href="#hero"> (logo)
      <img src="/images/logo.avif" width=196 height=57 />
    </a>
    <div> (links group)
      <a>Home</a>
      <a>Our Work</a>
      <a>Process</a>
      <a>Pricing</a>
    </div>
    <a href="#"> (CTA button)
      <span>🐋 icon (emoji or svg)</span>
      <span>Start Your Project</span>
    </a>
  </div>
</nav>
```

## Computed Styles (exact from getComputedStyle)

### nav container
- position: fixed
- top: 48px
- left: 50% + translateX(-50%) — centered
- width: 1000px
- max-width: calc(100vw - 48px)
- height: 69.75px
- border-radius: 1440px (pill shape)
- background: transparent (default) → rgba(3, 6, 4, 0.92) (scrolled)
- backdrop-filter: blur(3px)
- z-index: 999
- border: 1px solid rgba(255,255,255,0.08) (scrolled state)
- transition: background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease

### inner flex container
- display: flex
- flex-direction: row
- justify-content: space-between
- align-items: center
- padding: 12px 20px 12px 16px
- height: 100%

### logo img
- width: 120px (desktop), height: auto
- object-fit: contain

### nav links
- font-size: 16px
- font-weight: 500
- color: rgba(255, 255, 255, 0.7)
- letter-spacing: normal
- gap: 32px between links
- hover → color: rgb(255, 255, 255), transition: 0.2s

### CTA button "Start Your Project"
- padding: 10.4px 32px 10.4px 24px
- border-radius: 1440px (pill)
- border: 1.6px solid rgba(32, 252, 225, 0.37)  ← teal border
- background: transparent
- color: rgb(255, 255, 255)
- font-size: 16px
- font-weight: 700
- has icon (chat/whale emoji or SVG) before text
- hover → background: rgba(0,255,239,0.1), border-color: rgba(0,255,239,0.7)
- transition: 0.2s

## States & Behaviors

### Scroll trigger
- **Before (scrollY=0):** background transparent, no box-shadow, no border
- **After (scrollY > 50):** background rgba(3,6,4,0.92), box-shadow: 0 4px 32px rgba(0,0,0,0.4), border: 1px solid rgba(255,255,255,0.08)
- **Transition:** all 0.3s ease
- **Implementation:** `useEffect` + scroll listener → `useState(scrolled)`

## Mobile Behavior (< 768px)
- Links hidden (display: none)
- Only logo + CTA button shown
- Logo: use mobile icon version `/images/logo-icon.avif` (98×98 square mark)
- Nav padding adjusts

## Text Content
- Links: Home | Our Work | Process | Pricing
- CTA: "Start Your Project"
- Link href "#": use as placeholder (single page)

## Assets
- Logo: `/images/logo.avif` (392×57)
- Logo icon (mobile): `/images/logo-icon.avif` (98×98)
