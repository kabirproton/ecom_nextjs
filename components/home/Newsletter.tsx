"use client"

import type React from "react"

import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="bg-red-800 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">BE A PART OF BIBA FAMILY</h2>
        <p className="text-lg mb-8">Keep yourself updated with style tips & more</p>

        {isSubscribed ? (
          <div className="bg-green-600 text-white p-4 rounded-lg inline-block">
            Thank you for subscribing to our newsletter!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Newsletter
