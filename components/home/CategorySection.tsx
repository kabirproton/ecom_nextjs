import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CategorySection() {
  const categories = [
    {
      name: "POSH PALETTE",
      image: "/images/collections.png", // Placeholder, replace with specific image if available
      link: "/collections/posh-palette",
    },
    {
      name: "INDIGO CHRONICALS",
      image: "/images/collections.png", // Placeholder
      link: "/collections/indigo-chronicals",
    },
    {
      name: "JEWELLERY",
      image: "/images/collections.png", // Placeholder
      link: "/collections/jewellery",
    },
    {
      name: "LUXURY PRET",
      image: "/images/collections.png", // Placeholder
      link: "/collections/luxury-pret",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">EXPLORE COLLECTION</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center group">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary-500 group-hover:border-primary-600 transition-colors duration-300">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                <h3 className="text-white text-xl font-semibold uppercase">{category.name}</h3>
              </div>
            </div>
            <Button asChild variant="link" className="mt-4 text-primary-800 hover:text-primary-600">
              <Link href={category.link}>SHOP NOW</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
