"use client"

import Link from "next/link"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroCarousel() {
  const slides = [
    {
      id: 1,
      image: "/images/hero-1.png",
      alt: "End of Season Sale",
      title: "END OF SEASON SALE",
      subtitle: "FIRST TIME ON DISCOUNT",
      discount: "UPTO 50% OFF",
      buttonText: "SHOP NOW",
      buttonLink: "/sale",
      position: "right", // Content on the right side
    },
    {
      id: 2,
      image: "/images/hero-2.png",
      alt: "New Collection",
      title: "NEW COLLECTION",
      subtitle: "FRESH ARRIVALS",
      discount: "EXPLORE NOW",
      buttonText: "VIEW COLLECTION",
      buttonLink: "/new",
      position: "left", // Content on the left side
    },
  ]

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  className="z-0"
                />
                <div
                  className={`absolute inset-0 flex items-center p-8 md:p-16 lg:p-24 ${
                    slide.position === "right" ? "justify-end" : "justify-start"
                  } z-10`}
                >
                  <div
                    className={`bg-primary-800/80 text-white p-6 md:p-10 lg:p-12 max-w-xs md:max-w-md text-center ${
                      slide.position === "right" ? "mr-0 md:mr-16 lg:mr-24" : "ml-0 md:ml-16 lg:ml-24"
                    }`}
                  >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-yellow-300 mb-2 md:mb-3">
                      {slide.subtitle}
                    </p>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6">{slide.discount}</p>
                    <Button className="bg-white text-primary-800 hover:bg-gray-100 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold">
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow-md" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow-md" />
      </Carousel>
    </section>
  )
}
