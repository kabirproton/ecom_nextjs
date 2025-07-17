"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProductCard } from "@/components/product/ProductCard"
import { fetchFeaturedProducts } from "@/store/slices/productSlice"
import type { RootState, AppDispatch } from "@/store"

export function FeaturedProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredProducts, loading } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted aspect-square rounded-lg mb-4" />
                <div className="bg-muted h-4 rounded mb-2" />
                <div className="bg-muted h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked favorites from our latest collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
