"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye } from "lucide-react"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount = product.originalPrice && product.discount && product.discount > 0

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative w-full h-72 overflow-hidden">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            {hasDiscount && (
              <span className="absolute top-2 left-2 bg-bibaRed-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                Sale
              </span>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-800 rounded-full">
                <Heart size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-800 rounded-full">
                <Eye size={20} />
              </Button>
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
            <div className="flex items-center justify-center mb-2">
              <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{product.originalPrice?.toLocaleString()}
                </span>
              )}
              {hasDiscount && (
                <span className="text-sm text-bibaRed-600 font-medium ml-2">{product.discount}% OFF</span>
              )}
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <span className="flex items-center mr-1">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              ({product.reviews})
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export default ProductCard
