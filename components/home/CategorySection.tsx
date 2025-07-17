import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Kurtas",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categories/kurtas",
  },
  {
    id: 2,
    name: "Dresses",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categories/dresses",
  },
  {
    id: 3,
    name: "Suits",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categories/suits",
  },
  {
    id: 4,
    name: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categories/accessories",
  },
]

export function CategorySection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">Discover our wide range of ethnic and contemporary wear</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
