"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { fetchProductsSuccess, fetchProductsFailure } from "@/store/slices/productSlice"
import { HeroCarousel } from "@/components/home/HeroCarousel"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { PromoBanners } from "@/components/home/PromoBanners"
import { CategorySection } from "@/components/home/CategorySection"
import { Newsletter } from "@/components/home/Newsletter"
import type { Collection } from "@/types"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    // Simulate fetching products from Supabase
    const fetchProducts = async () => {
      // In a real app, you'd fetch from Supabase here
      // For now, use dummy data
      try {
        const { data, error } = await supabase.from("products").select("*")
        if (error) throw error
        dispatch(fetchProductsSuccess(data))
      } catch (err: any) {
        dispatch(fetchProductsFailure(err.message))
      }
    }

    fetchProducts()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      const { data: banners, error: bannersError } = await supabase
        .from("banners")
        .select("*")
        .order("position", { ascending: true }) // Order by position to get hero first

      if (bannersError) {
        console.error("Error fetching banners:", bannersError)
      }

      const heroBanners = banners?.filter((banner) => banner.position === "hero") || []
      const promoBanners = banners?.filter((banner) => banner.position === "promo") || []

      const { data: collections, error: collectionsError } = await supabase.from("collections").select("*")

      if (collectionsError) {
        console.error("Error fetching collections:", collectionsError)
      }

      const dummyCollections: Collection[] = [
        { id: "1", name: "Posh Palette", slug: "posh-palette", image: "/images/collections.png" },
        { id: "2", name: "Indigo Chronicals", slug: "indigo-chronicals", image: "/images/collections.png" },
        { id: "3", name: "Jewellery", slug: "jewellery", image: "/images/collections.png" },
        { id: "4", name: "Luxury Pret", slug: "luxury-pret", image: "/images/collections.png" },
      ]

      // Dispatch actions if needed
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    )
  if (error) return <div className="text-center text-red-500 p-8">Error: {error}</div>

  return (
    <div className="flex flex-col min-h-screen">
      <HeroCarousel />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanners />
      <Newsletter />
    </div>
  )
}
