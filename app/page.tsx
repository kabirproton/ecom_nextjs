import HeroCarousel from "@/components/home/HeroCarousel"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import CategorySection from "@/components/home/CategorySection"
import PromoBanners from "@/components/home/PromoBanners"
import Newsletter from "@/components/home/Newsletter"

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <FeaturedProducts />
      <CategorySection />
      <PromoBanners />
      <Newsletter />
    </div>
  )
}
