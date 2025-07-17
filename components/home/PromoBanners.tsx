import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PromoBanners() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Banner */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Summer Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Summer Collection</h3>
                    <p className="mb-4">Light and breezy outfits for the season</p>
                    <Button variant="secondary" asChild>
                      <Link href="/collections/summer">Shop Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Second Banner */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3]">
                <Image src="/placeholder.svg?height=400&width=600" alt="Festive Wear" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Festive Wear</h3>
                    <p className="mb-4">Elegant outfits for special occasions</p>
                    <Button variant="secondary" asChild>
                      <Link href="/collections/festive">Explore</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
