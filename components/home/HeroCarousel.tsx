"use client"

import type React from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import type { Banner } from "@/types"

interface HeroCarouselProps {
  banners: Banner[]
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners }) => {
  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
                <Image
                  src={banner.imageUrl || "/placeholder.svg"}
                  alt={banner.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="z-0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white z-10">
                  <div className="text-center p-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-4 drop-shadow-lg">{banner.title}</h1>
                    <p className="text-lg md:text-2xl mb-6 md:mb-8 drop-shadow-md">{banner.subtitle}</p>
                    <Link href={banner.link}>
                      <Button className="bg-bibaRed-600 hover:bg-bibaRed-700 text-white px-8 py-3 text-lg rounded-md shadow-lg">
                        {banner.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white" />
      </Carousel>
    </section>
  )
}

export default HeroCarousel
