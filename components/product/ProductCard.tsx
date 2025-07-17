"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Eye } from "lucide-react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const dispatch = useDispatch()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      addToCart({
        product,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0],
      }),
    )
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
          {/* Sale Badge */}
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded z-10">
              Sale
            </div>
          )}

          {/* Online Exclusive Badge */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded z-10">
            Online Exclusive
          </div>

          {/* Product Image */}
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover Actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full ${
                isWishlisted ? "bg-red-600 text-white" : "bg-white text-gray-600"
              } hover:bg-red-600 hover:text-white transition-colors`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
              <Eye size={16} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  MRP ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm text-green-600 font-medium">{discountPercentage}% OFF</span>
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
