"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real application, you would send this email to your backend/newsletter service
      console.log("Subscribing email:", email)
      toast({
        title: "Subscription Successful!",
        description: `Thank you for subscribing, ${email}!`,
      })
      setEmail("")
    } else {
      toast({
        title: "Subscription Failed",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
    }
  }

  return (
    <section className="bg-red-800 text-white py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">BE A PART OF BIBA FAMILY</h2>
          <p className="text-lg">Keep yourself updated with style tips & more</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input
            type="email"
            placeholder="Enter email"
            className="flex-grow bg-white text-gray-800 px-4 py-2 rounded-none focus:ring-0 focus:border-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-none font-semibold uppercase"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
