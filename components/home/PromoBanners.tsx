"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Banner } from "@/types"

interface PromoBannersProps {
  promoBanners: Banner[]
}

export function PromoBanners({ promoBanners }: PromoBannersProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {promoBanners.map((banner) => (
          <div key={banner.id} className="relative overflow-hidden group">
            <Image
              src={banner.image_url || "/placeholder.svg"}
              alt={banner.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center p-4">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 uppercase">{banner.title}</h3>
              {banner.subtitle && <p className="text-white text-base md:text-lg mb-4">{banner.subtitle}</p>}
              {banner.button_text && banner.link && (
                <Link href={banner.link}>
                  <Button className="bg-white text-red-800 hover:bg-gray-100 px-6 py-3 font-semibold rounded-none">
                    {banner.button_text}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
