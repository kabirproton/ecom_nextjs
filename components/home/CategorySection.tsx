"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Collection } from "@/types"

interface CategorySectionProps {
  collections: Collection[]
}

export function CategorySection({ collections }: CategorySectionProps) {
  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold mb-8 uppercase">Explore Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((collection) => (
          <div key={collection.id} className="flex flex-col items-center group">
            <div className="relative w-64 h-64 rounded-full overflow-hidden mb-4 border-2 border-gray-200 group-hover:border-red-800 transition-colors duration-300">
              <Image
                src={collection.image || "/placeholder.jpg"}
                alt={collection.name}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href={collection.slug ? `/collections/${collection.slug}` : "#"} passHref>
                  <Button className="bg-white text-red-800 hover:bg-gray-100 px-6 py-3 font-semibold rounded-none">
                    SHOP NOW
                  </Button>
                </Link>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 uppercase">{collection.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
