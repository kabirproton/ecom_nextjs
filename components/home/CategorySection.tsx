"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CategorySectionProps {
  title: string
  categories: {
    name: string
    slug: string
    image: string
  }[]
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, categories }) => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.slug} className="relative group overflow-hidden rounded-full aspect-square">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <Link href={`/categories/${category.slug}`}>
                <Button
                  variant="outline"
                  className="bg-white text-bibaRed-700 hover:bg-gray-100 hover:text-bibaRed-800 border-bibaRed-700"
                >
                  SHOP NOW
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategorySection
