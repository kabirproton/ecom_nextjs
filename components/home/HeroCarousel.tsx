"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const heroSlides = [
  {
    id: 1,
    title: "New Collection",
    subtitle: "Discover the latest trends in ethnic wear",
    image: "/images/hero-1.png",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected items",
    image: "/images/hero-2.png",
    cta: "Explore Deals",
  },
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-purple-400 to-pink-400">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white space-y-4 max-w-2xl px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">{slide.title}</h1>
                    <p className="text-lg md:text-xl">{slide.subtitle}</p>
                    <Button size="lg" className="mt-6">
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </section>
  )
}
