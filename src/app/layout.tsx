import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ConditionalSidebar } from "@/components/conditional-sidebar"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Academy.IA",
  description: "Skills, projetos e aulas exclusivas de IA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="h-full flex bg-background text-foreground">
        <ConditionalSidebar />
        <main className="flex-1 overflow-y-auto pt-14 md:pt-0 pb-16 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  )
}
