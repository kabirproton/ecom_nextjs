"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { fetchProducts } from "@/store/slices/productSlice"
import ProductCard from "@/components/product/ProductCard"
import { ChevronRight } from "lucide-react"

const FeaturedProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredProducts, loading } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Mock data for demonstration
  const mockProducts = [
    {
      id: "1",
      name: "Orange Cotton Printed Anarkali Suit Set",
      price: 3496,
      originalPrice: 4995,
      discount: 30,
      images: ["/placeholder.svg"],
      category: "suit-sets",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Orange"],
      inStock: true,
      isOnSale: true,
      rating: 4.5,
      reviews: 128,
      description: "Beautiful orange cotton printed anarkali suit set",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Indigo Blue and White Straight Co-ord Set",
      price: 3219,
      originalPrice: 4599,
      discount: 30,
      images: ["/placeholder.svg"],
      category: "co-ord-sets",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "White"],
      inStock: true,
      isOnSale: true,
      rating: 4.3,
      reviews: 95,
      description: "Stylish indigo blue and white straight co-ord set",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "3",
      name: "Orange Cotton Blend Schiffli Straight Kurta Set",
      price: 2799,
      originalPrice: 3999,
      discount: 30,
      images: ["/placeholder.svg"],
      category: "kurtas",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Orange"],
      inStock: true,
      isOnSale: true,
      rating: 4.7,
      reviews: 203,
      description: "Elegant orange cotton blend schiffli kurta set",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "4",
      name: "Dull Blue Cotton Flared Printed Kurta Set",
      price: 2799,
      originalPrice: 3999,
      discount: 30,
      images: ["/placeholder.svg"],
      category: "kurtas",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue"],
      inStock: true,
      isOnSale: true,
      rating: 4.4,
      reviews: 156,
      description: "Comfortable dull blue cotton flared kurta set",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "5",
      name: "Off-White and Black Pure Cotton Printed Kurta Set",
      price: 2519,
      originalPrice: 3599,
      discount: 30,
      images: ["/placeholder.svg"],
      category: "kurtas",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Off-White", "Black"],
      inStock: true,
      isOnSale: true,
      rating: 4.6,
      reviews: 89,
      description: "Classic off-white and black cotton kurta set",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ]

  const productsToShow = featuredProducts.length > 0 ? featuredProducts : mockProducts

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-80 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">RECOMMENDED FOR YOU</h2>
          <button className="flex items-center text-red-600 hover:text-red-700 font-medium">
            View All <ChevronRight size={20} className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {productsToShow.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
