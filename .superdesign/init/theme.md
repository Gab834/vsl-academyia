# Theme — Academy.IA VSL

## Framework
- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 (imported via `@import "tailwindcss"`)
- Font: Geist (Google Fonts), variable `--font-geist`

## globals.css (full)
```css
@import "tailwindcss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --font-geist: "Geist", ui-sans-serif, system-ui, -apple-system, sans-serif;
}

html {
  font-family: var(--font-geist);
  background: #000;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: #000;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
}

::selection {
  background: rgba(139, 92, 246, 0.4);
  color: #fff;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.3); }
  50% { box-shadow: 0 0 60px rgba(139, 92, 246, 0.5); }
}

.animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fade-in { animation: fadeIn 0.8s ease both; }
.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
```

## Color Palette
- Background: `#000` (pure black)
- Text primary: `#fff`
- Text secondary: `rgba(255,255,255,0.4)`
- Text muted: `rgba(255,255,255,0.2)`
- Accent purple: `#a78bfa` (violet-400)
- Accent indigo: `#818cf8` (indigo-400)
- Accent blue: `#60a5fa` (blue-400)
- Gradient text: `linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)`
- CTA button: `linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)`
- Border subtle: `rgba(255,255,255,0.07)`
- Purple glow: `rgba(139,92,246,0.15–0.5)`
- Blue glow: `rgba(59,130,246,0.1)`

## Typography
- Font family: Geist (var(--font-geist))
- h1: clamp(1.9rem, 5.2vw, 4rem), weight 800, line-height 1.1, letter-spacing -0.025em
- Price display: clamp(3rem, 9vw, 5.5rem), weight 800
- Body: clamp(0.95rem, 1.8vw, 1.15rem), line-height 1.65
- Labels: 11–13px, weight 700, letter-spacing 0.15–0.2em, uppercase
- Features: 15px, line-height 1.55

## Spacing Scale (from page.tsx)
- Section gap: 48–64px
- Container: max-width 880px, padding 0 24px
- Header padding: 40px top, 56px bottom
- Orbs: fixed position decorative gradients

## Border Radius
- Video/cards: 14px
- Buttons: 10px
- Checkmark circles: 50%

## Shadows
- Video: `0 0 80px rgba(139,92,246,0.18), 0 40px 100px rgba(0,0,0,0.7)`
- CTA button: `0 0 48px rgba(124,58,237,0.3), 0 8px 32px rgba(0,0,0,0.4)`
- Play button: `0 4px 24px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,255,255,0.08)`
