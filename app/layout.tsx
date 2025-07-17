import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ReduxProvider } from "@/components/providers/ReduxProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BIBA E-commerce",
  description: "A fully responsive e-commerce website for ethnic wear.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
