"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { setSelectedProduct } from "@/store/slices/productSlice"
import ProductDetails from "@/components/product/ProductDetails"
import { notFound } from "next/navigation"
import type { Product, Review } from "@/types"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Dummy data for a single product and reviews
const dummyProduct: Product = {
  id: "1",
  name: "Orange Cotton Printed Anarkali Suit Set",
  description:
    "A beautiful orange cotton printed anarkali suit set for festive occasions. This elegant ensemble features intricate prints and a comfortable cotton blend fabric, perfect for all-day wear. The Anarkali style offers a flattering silhouette, making it a must-have for your ethnic wardrobe. Pair it with traditional jewelry for a complete look.",
  price: 3496,
  originalPrice: 4395,
  discount: 20,
  imageUrl: "/placeholder.jpg",
  images: [
    "/images/product-detail-1.png",
    "/images/product-detail-2.png",
    "/images/product-detail-3.png",
    "/placeholder.jpg",
  ],
  category: "Suit Sets",
  rating: 4.5,
  reviews: 120,
  isNewArrival: true,
  isOnlineExclusive: true,
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Orange", "Red", "Yellow"],
  material: "Cotton Blend",
  careInstructions: "Hand wash cold, do not bleach, iron on low heat.",
}

const dummyReviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userId: "u1",
    userName: "Priya Sharma",
    rating: 5,
    comment: "Absolutely stunning! The fabric is so comfortable and the print is vibrant. Received many compliments.",
    date: "2024-03-10",
  },
  {
    id: "r2",
    productId: "1",
    userId: "u2",
    userName: "Anjali Singh",
    rating: 4,
    comment: "Good quality and fits well. The color is slightly different from the picture but still beautiful.",
    date: "2024-03-15",
  },
  {
    id: "r3",
    productId: "1",
    userId: "u3",
    userName: "Sneha Patel",
    rating: 5,
    comment: "Loved it! Perfect for a festive occasion. Fast delivery too.",
    date: "2024-03-20",
  },
]

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { id } = params
  const dispatch = useDispatch<AppDispatch>()
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products)
  const [reviews, setReviews] = useState<Review[]>(dummyReviews) // Using dummy reviews for now

  useEffect(() => {
    // In a real app, you'd fetch from Supabase here
    // dispatch(fetchProductById(id));
    // For now, simulate fetching with dummy data
    if (id === dummyProduct.id) {
      dispatch(setSelectedProduct(dummyProduct))
    } else {
      // If product not found in dummy data, simulate notFound
      // In a real app, fetchProductById would handle this
      dispatch(setSelectedProduct(null))
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">Error: {error}</div>
  }

  if (!selectedProduct) {
    notFound() // Use Next.js notFound to render 404 page
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <ProductDetails product={selectedProduct} reviews={reviews} />
    </div>
  )
}

export default ProductPage
