"use client"

import { Button } from "@/components/ui/button"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import type { Banner } from "@/types"
import Link from "next/link"

interface HeroCarouselProps {
  banners: Banner[]
}

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Card className="rounded-none border-none">
                <CardContent className="flex aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6] items-center justify-center p-0 relative overflow-hidden">
                  <Image
                    src={banner.image_url || "/placeholder.svg"}
                    alt={banner.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="z-0"
                    priority={index === 0} // Prioritize loading the first image
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-center z-10">
                    <div className="text-white p-4 md:p-8">
                      <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 uppercase">{banner.title}</h2>
                      {banner.subtitle && (
                        <p className="text-lg md:text-2xl mb-4 md:mb-6 font-medium">{banner.subtitle}</p>
                      )}
                      {banner.button_text && banner.link && (
                        <Link href={banner.link}>
                          <Button className="bg-white text-red-800 hover:bg-gray-100 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-none">
                            {banner.button_text}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 z-20 text-white bg-black/50 hover:bg-black/70" />
      <CarouselNext className="absolute right-4 z-20 text-white bg-black/50 hover:bg-black/70" />
    </Carousel>
  )
}
