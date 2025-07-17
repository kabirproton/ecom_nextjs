"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeaturedProducts } from "@/store/slices/productSlice"
import type { RootState, AppDispatch } from "@/store"
import ProductCard from "@/components/product/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredProducts, loading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Kriti's Favourites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-full h-[300px] rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 text-center text-red-500">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Kriti's Favourites</h2>
        <p>Error loading featured products: {error}</p>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Kriti's Favourites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
