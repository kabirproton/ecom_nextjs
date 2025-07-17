"use client"

import type React from "react"

import { Inter } from "next/font/google"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
