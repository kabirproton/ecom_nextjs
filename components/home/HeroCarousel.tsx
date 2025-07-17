"use client"

import type React from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

interface HeroCarouselProps {
  banners: {
    id: string
    imageUrl: string
    title: string
    subtitle: string
    buttonText: string
    link: string
  }[]
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners }) => {
  return (
    <section className="relative w-full overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
                <Image
                  src={banner.imageUrl || "/placeholder.svg"}
                  alt={banner.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="object-center"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-center p-4">
                  <div className="max-w-md space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">{banner.title}</h2>
                    <p className="text-lg md:text-xl">{banner.subtitle}</p>
                    <Button className="bg-bibaRed-600 hover:bg-bibaRed-700 text-white px-8 py-3 text-lg font-semibold rounded-md">
                      {banner.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full p-2 shadow-md" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full p-2 shadow-md" />
      </Carousel>
    </section>
  )
}

export default HeroCarousel
