"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Banner } from "@/types"

interface PromoBannersProps {
  banners: Banner[]
}

const PromoBanners: React.FC<PromoBannersProps> = ({ banners }) => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <Card key={banner.id} className="relative overflow-hidden rounded-lg shadow-md group">
            <Link href={banner.link}>
              <CardContent className="p-0">
                <div className="relative w-full h-[250px] md:h-[350px]">
                  <Image
                    src={banner.imageUrl || "/placeholder.svg"}
                    alt={banner.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center drop-shadow-lg">{banner.title}</h3>
                    <p className="text-md md:text-lg mb-4 text-center drop-shadow-md">{banner.subtitle}</p>
                    <Button className="bg-bibaRed-600 hover:bg-bibaRed-700 text-white px-6 py-2 rounded-md shadow-lg">
                      {banner.buttonText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default PromoBanners
