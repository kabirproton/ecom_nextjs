import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PromoBanners() {
  const banners = [
    {
      id: 1,
      image: "/images/promo-banner-1.png",
      alt: "Online Exclusive Sale",
      title: "END OF SEASON SALE",
      subtitle: "ONLINE EXCLUSIVE",
      discount: "UPTO 50% OFF",
      buttonText: "SHOP NOW",
      buttonLink: "/sale",
      bgColor: "bg-blue-600", // Example background color for text overlay
      textColor: "text-white",
      subtitleColor: "text-yellow-300",
    },
    {
      id: 2,
      image: "/images/promo-banner-2.png",
      alt: "Special Offer",
      title: "GET EXTRA 10% OFF",
      subtitle: "on purchase of ₹1999",
      discount: "CODE: EOS10",
      buttonText: "SHOP NOW",
      buttonLink: "/offers",
      bgColor: "bg-primary-800",
      textColor: "text-white",
      subtitleColor: "text-white",
    },
  ]

  const discountCards = [
    {
      id: 1,
      title: "GET EXTRA 10% OFF",
      subtitle: "on purchase of ₹1999",
      code: "EOS10",
    },
    {
      id: 2,
      title: "GET FLAT ₹500 OFF",
      subtitle: "on purchase of ₹2999",
      code: "EOS500",
    },
    {
      id: 3,
      title: "GET EXTRA 15% OFF",
      subtitle: "on purchase of ₹4999",
      code: "EOS15",
    },
    {
      id: 4,
      title: "GET FLAT ₹1500 OFF",
      subtitle: "on purchase of ₹9999",
      code: "EOS1500",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Large Promotional Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {banners.map((banner) => (
          <div key={banner.id} className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={banner.alt}
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <div className={`absolute inset-0 flex items-center justify-end p-8 z-10`}>
              <div className={`${banner.bgColor} ${banner.textColor} p-6 md:p-8 max-w-xs text-center`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{banner.title}</h3>
                <p className={`text-lg md:text-xl font-semibold ${banner.subtitleColor} mb-2`}>{banner.subtitle}</p>
                <p className="text-xl md:text-2xl font-extrabold mb-4">{banner.discount}</p>
                <Button className="bg-white text-primary-800 hover:bg-gray-100 px-6 py-3 text-base font-semibold">
                  <Link href={banner.buttonLink}>{banner.buttonText}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Small Discount Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {discountCards.map((card) => (
          <div key={card.id} className="bg-primary-800 text-white p-6 text-center rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Pattern"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm mb-3">{card.subtitle}</p>
              <p className="text-lg font-semibold bg-primary-700 inline-block px-4 py-1 rounded-full mb-4">
                CODE: {card.code}
              </p>
              <Button className="bg-white text-primary-800 hover:bg-gray-100 px-6 py-2 text-sm font-semibold">
                SHOP NOW
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
