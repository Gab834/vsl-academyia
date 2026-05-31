# Layouts — Academy.IA VSL

## RootLayout
- File: `src/app/layout.tsx`
- No nav, no footer, no sidebar
- Pure black body, Geist font, children centered

## Page Layout Pattern (from page.tsx)
- Outer wrapper: `background #000, minHeight 100vh, overflowX hidden, position relative`
- Fixed orbs layer: `zIndex 0`
- Content container: `position relative, zIndex 1, maxWidth 880px, margin 0 auto, padding 0 24px`
- Sections stack vertically with `marginBottom` spacing
