"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { fetchProductsSuccess, fetchProductsFailure } from "@/store/slices/productSlice"
import HeroCarousel from "@/components/home/HeroCarousel"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import PromoBanners from "@/components/home/PromoBanners"
import CategorySection from "@/components/home/CategorySection"
import type { Product } from "@/types"

// Dummy Data (replace with Supabase fetching)
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Orange Cotton Printed Anarkali Suit Set",
    description: "A beautiful orange cotton printed anarkali suit set for festive occasions.",
    price: 3496,
    originalPrice: 4395,
    discount: 20,
    imageUrl: "/placeholder.jpg",
    category: "Suit Sets",
    rating: 4.5,
    reviews: 120,
    isNewArrival: true,
    isOnlineExclusive: true,
  },
  {
    id: "2",
    name: "Indigo Blue and White Straight Co-ord Set",
    description: "Stylish indigo blue and white co-ord set for a modern look.",
    price: 3219,
    originalPrice: 4599,
    discount: 30,
    imageUrl: "/placeholder.jpg",
    category: "Co-ord Sets",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: "3",
    name: "Orange Cotton Blend Schiffli Straight Kurta Set",
    description: "Comfortable orange cotton blend kurta set with schiffli work.",
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    imageUrl: "/placeholder.jpg",
    category: "Kurtas",
    rating: 4.0,
    reviews: 60,
  },
  {
    id: "4",
    name: "Dull Blue Cotton Flared Printed Kurta Set",
    description: "Elegant dull blue flared kurta set with intricate prints.",
    price: 2799,
    originalPrice: 3599,
    discount: 22,
    imageUrl: "/placeholder.jpg",
    category: "Kurtas",
    rating: 4.7,
    reviews: 150,
  },
  {
    id: "5",
    name: "Off-White and Black Pure Cotton Printed Kurta Set",
    description: "Classic off-white and black pure cotton kurta set for everyday wear.",
    price: 2519,
    originalPrice: 3599,
    discount: 30,
    imageUrl: "/placeholder.jpg",
    category: "Kurtas",
    rating: 4.3,
    reviews: 95,
  },
  {
    id: "6",
    name: "Pink Floral Embroidered Anarkali Suit",
    description: "Stunning pink anarkali suit with delicate floral embroidery.",
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    imageUrl: "/placeholder.jpg",
    category: "Suit Sets",
    rating: 4.8,
    reviews: 200,
    isNewArrival: true,
  },
  {
    id: "7",
    name: "Green Silk Blend Straight Kurta",
    description: "Luxurious green silk blend straight kurta, perfect for special occasions.",
    price: 3899,
    originalPrice: 4500,
    discount: 13,
    imageUrl: "/placeholder.jpg",
    category: "Kurtas",
    rating: 4.1,
    reviews: 70,
  },
  {
    id: "8",
    name: "Yellow Georgette Palazzo Set",
    description: "Vibrant yellow georgette palazzo set with intricate detailing.",
    price: 4200,
    originalPrice: 5000,
    discount: 16,
    imageUrl: "/placeholder.jpg",
    category: "Bottoms",
    rating: 4.6,
    reviews: 110,
  },
]

const dummyHeroBanners = [
  {
    id: "hero-1",
    imageUrl: "/images/hero-1.png",
    title: "END OF SEASON SALE",
    subtitle: "FIRST TIME ON DISCOUNT UPTO 50% OFF",
    buttonText: "SHOP NOW",
    link: "/sale",
  },
  {
    id: "hero-2",
    imageUrl: "/images/hero-2.png",
    title: "NEW ARRIVALS",
    subtitle: "Discover the latest trends in ethnic wear",
    buttonText: "EXPLORE NOW",
    link: "/new-arrivals",
  },
]

const dummyPromoBanners = [
  {
    id: "promo-1",
    imageUrl: "/images/favourites.png", // This image contains multiple sections, will use for one promo
    title: "Kriti's Favourites",
    subtitle: "Shop her curated collection",
    buttonText: "SHOP NOW",
    link: "/kriti-favourites",
  },
  {
    id: "promo-2",
    imageUrl: "/images/promo-banner-1.png",
    title: "ONLINE EXCLUSIVE",
    subtitle: "Special discounts just for you",
    buttonText: "SHOP NOW",
    link: "/online-exclusive",
  },
  {
    id: "promo-3",
    imageUrl: "/images/promo-banner-2.png",
    title: "BIBA INDIAN WEAR",
    subtitle: "BEST INDIAN ETHNIC WEAR DRESSES ONLINE FOR WOMEN & GIRLS",
    buttonText: "VIEW MORE",
    link: "/about-us",
  },
]

const dummyCategoryCollections = [
  {
    name: "POSH PALETTE",
    slug: "posh-palette",
    image: "/placeholder.jpg", // Replace with actual image
  },
  {
    name: "INDIGO CHRONICALS",
    slug: "indigo-chronicals",
    image: "/placeholder.jpg", // Replace with actual image
  },
  {
    name: "JEWELLERY",
    slug: "jewellery",
    image: "/placeholder.jpg", // Replace with actual image
  },
  {
    name: "LUXURY PRET",
    slug: "luxury-pret",
    image: "/placeholder.jpg", // Replace with actual image
  },
]

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    // Simulate fetching products from Supabase
    const fetchProducts = async () => {
      // In a real app, you'd fetch from Supabase here
      // For now, use dummy data
      try {
        // const { data, error } = await supabase.from('products').select('*');
        // if (error) throw error;
        dispatch(fetchProductsSuccess(dummyProducts))
      } catch (err: any) {
        dispatch(fetchProductsFailure(err.message))
      }
    }

    fetchProducts()
  }, [dispatch])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    )
  if (error) return <div className="text-center text-red-500 p-8">Error: {error}</div>

  return (
    <div className="min-h-screen">
      <HeroCarousel banners={dummyHeroBanners} />
      <PromoBanners banners={dummyPromoBanners} />
      <FeaturedProducts title="RECOMMENDED FOR YOU" products={products} />
      <CategorySection title="EXPLORE COLLECTION" categories={dummyCategoryCollections} />
      {/* Newsletter is already part of the footer, but can be added as a separate section if needed */}
      {/* <Newsletter /> */}
    </div>
  )
}

export default HomePage
