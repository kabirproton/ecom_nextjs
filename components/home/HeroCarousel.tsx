"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: "/images/hero-1.png",
      title: "END OF SEASON SALE",
      subtitle: "FIRST TIME ON DISCOUNT",
      discount: "UPTO 50% OFF",
      buttonText: "SHOP NOW",
    },
    {
      id: 2,
      image: "/images/hero-2.png",
      title: "NEW COLLECTION",
      subtitle: "ETHNIC WEAR",
      discount: "STARTING FROM ₹999",
      buttonText: "EXPLORE NOW",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-2">{slide.subtitle}</p>
                <p className="text-2xl md:text-4xl font-bold mb-8 text-yellow-400">{slide.discount}</p>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-black transition-colors">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
