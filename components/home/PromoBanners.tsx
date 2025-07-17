import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PromoBanners() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 md:h-80">
                <Image src="/images/promo-banner-1.png" alt="Summer Collection" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold">Summer Collection</h3>
                    <p className="text-lg">Light & Breezy Outfits</p>
                    <Button variant="secondary">Shop Collection</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 md:h-80">
                <Image src="/images/promo-banner-2.png" alt="Festive Wear" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold">Festive Wear</h3>
                    <p className="text-lg">Celebrate in Style</p>
                    <Button variant="secondary">Explore Now</Button>
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
