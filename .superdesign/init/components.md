# Components — Academy.IA VSL

## Notes
This project has NO shared component library. All UI is inline in `src/app/page.tsx`.
No shadcn/ui, no Radix, no component files extracted yet.

## Inline Patterns (from page.tsx)

### Background Orbs
- Fixed positioned radial gradients (purple top-right, blue bottom-left)
- Purpose: ambient visual depth

### Video Player
- `<video>` element with custom play overlay
- Click to play, pointer-events none on video
- Play button: white circle 68px, black SVG play icon
- State: `playing` boolean controls overlay visibility

### CTA Section (conditional)
- Revealed when `video.currentTime / video.duration >= 0.7`
- Contains: feature list, price display, buy button, trust signals
- Animation: `.animate-fade-up`

### Feature List Item
- Flex row, purple circle checkmark icon + text
- Circle: 20px, `rgba(139,92,246,0.15)` bg, purple border

### CTA Button
- `<a>` tag to Cakto payment URL
- Purple gradient background
- Hover: translateY(-2px), stronger glow

### Trust Signals
- Flex row: "Acesso imediato", "Garantia de 7 dias", "Pagamento seguro"
- 11px uppercase muted text
