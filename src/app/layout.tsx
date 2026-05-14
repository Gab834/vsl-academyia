import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Ninety Eight | Web Design Agency",
  description: "Building world-class brands that drive revenue.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Ninety Eight | Web Design Agency",
    description: "Web Design That Makes You Look Better Than Anyone Else",
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
