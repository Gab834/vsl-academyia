# Routes — Academy.IA VSL

## Framework: Next.js App Router

| URL | File | Layout | Description |
|-----|------|--------|-------------|
| `/` | `src/app/page.tsx` | `src/app/layout.tsx` | VSL page — video + CTA |

## layout.tsx (full)
```tsx
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Academy.IA — Aprenda a Criar Sistemas com IA",
  description: "Enquanto você ainda tenta entender IA, tem gente usando Claude Code pra criar estruturas que vendem sozinhas 24 horas por dia.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body>{children}</body>
    </html>
  )
}
```

## Notes
- Single-page VSL app
- No routing beyond `/`
- No nav or footer in current implementation
