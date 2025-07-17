"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types"

interface CategorySectionProps {
  title: string
  categories: Category[]
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, categories }) => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.slug} className="relative overflow-hidden rounded-lg shadow-md group">
            <Link href={`/category/${category.slug}`}>
              <CardContent className="p-0">
                <div className="relative w-full h-64">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center p-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                      <Button className="bg-white text-bibaRed-600 hover:bg-gray-100 px-6 py-2 rounded-full text-sm font-medium">
                        SHOP NOW
                      </Button>
                    </div>
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

export default CategorySection
