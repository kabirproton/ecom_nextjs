"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PromoBannersProps {
  banners: {
    id: string
    imageUrl: string
    title: string
    subtitle: string
    buttonText: string
    link: string
  }[]
}

const PromoBanners: React.FC<PromoBannersProps> = ({ banners }) => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="relative group overflow-hidden rounded-lg shadow-md">
            <Image
              src={banner.imageUrl || "/placeholder.svg"}
              alt={banner.title}
              width={400}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center p-4">
              <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
              <p className="text-sm mb-4">{banner.subtitle}</p>
              <Link href={banner.link}>
                <Button className="bg-bibaRed-600 hover:bg-bibaRed-700 text-white px-6 py-2 text-sm font-semibold rounded-md">
                  {banner.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PromoBanners
