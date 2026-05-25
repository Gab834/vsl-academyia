import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Academy.IA — Aprenda a construir com IA",
  description: "Skills prontas de Claude Code, aulas diretas ao ponto e comunidade ativa de quem já usa IA pra criar, vender e automatizar.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Academy.IA — Aprenda a construir com IA",
    description: "Skills prontas de Claude Code, aulas diretas ao ponto e comunidade ativa de quem já usa IA pra criar, vender e automatizar.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
