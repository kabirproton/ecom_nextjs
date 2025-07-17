"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Newsletter: React.FC = () => {
  return (
    <section className="bg-bibaRed-800 py-12 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-lg mb-8">Stay updated with the latest collections, offers, and style tips.</p>
        <div className="flex justify-center">
          <div className="flex w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-l-md border-none focus:ring-0 text-gray-800"
            />
            <Button className="bg-bibaGold-500 hover:bg-bibaGold-600 text-bibaRed-800 font-bold px-6 rounded-r-md">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
