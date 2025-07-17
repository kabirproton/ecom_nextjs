import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { wrapper } from "@/store" // Import the Redux wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BIBA E-commerce",
  description: "A fully responsive e-commerce website built with Next.js and Tailwind CSS.",
    generator: 'v0.dev'
}

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

// Wrap the RootLayout with the Redux wrapper
export default wrapper.withRedux(RootLayout)
