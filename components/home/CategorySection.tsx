import Image from "next/image"
import Link from "next/link"

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "POSH PALETTE",
      image: "/placeholder.svg",
      href: "/category/posh-palette",
    },
    {
      id: 2,
      name: "INDIGO CHRONICALS",
      image: "/placeholder.svg",
      href: "/category/indigo-chronicals",
    },
    {
      id: 3,
      name: "JEWELLERY",
      image: "/placeholder.svg",
      href: "/category/jewellery",
    },
    {
      id: 4,
      name: "LUXURY PRET",
      image: "/placeholder.svg",
      href: "/category/luxury-pret",
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">EXPLORE COLLECTION</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-full aspect-square hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-full">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-8">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <button className="border border-white text-white px-6 py-2 text-sm hover:bg-white hover:text-black transition-colors">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
