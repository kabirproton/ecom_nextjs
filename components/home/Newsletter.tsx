"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Newsletter: React.FC = () => {
  return (
    <section className="bg-bibaRed-700 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold">BE A PART OF BIBA FAMILY</h3>
          <p className="text-sm text-bibaRed-100">Keep yourself updated with style tips & more</p>
        </div>
        <div className="flex w-full max-w-md">
          <Input
            type="email"
            placeholder="Enter email"
            className="flex-1 rounded-l-md rounded-r-none border-none bg-white/20 text-white placeholder:text-bibaRed-100 focus:ring-0 focus:ring-offset-0"
          />
          <Button className="bg-bibaRed-600 hover:bg-bibaRed-500 text-white rounded-r-md rounded-l-none px-6 py-2">
            SUBSCRIBE
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
