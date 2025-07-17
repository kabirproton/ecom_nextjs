"use client"

import { useEffect } from "react"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { fetchProducts } from "@/store/slices/productSlice"
import ProductCard from "@/components/product/ProductCard"
import type { Product } from "@/types"

interface FeaturedProductsProps {
  products: Product[]
  title: string
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, title }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredProducts, loading } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const productsToShow = featuredProducts.length > 0 ? featuredProducts : products

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-80 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsToShow.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
