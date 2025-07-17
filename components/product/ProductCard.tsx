"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, ShoppingBag } from "lucide-react"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <Card className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNewArrival && (
            <span className="absolute top-2 left-2 bg-bibaRed-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-bibaRed-700">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {product.discount && product.discount > 0 && (
            <span className="text-sm font-medium text-green-600">{product.discount}% OFF</span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <span className="flex items-center">
            {"⭐".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="ml-2">({product.reviews} reviews)</span>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            className="flex-1 border-bibaRed-600 text-bibaRed-600 hover:bg-bibaRed-50 hover:text-bibaRed-700 bg-transparent"
            aria-label="Add to Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button className="flex-1 bg-bibaRed-600 hover:bg-bibaRed-700 text-white" onClick={handleAddToCart}>
            <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
          </Button>
        </div>
      </CardContent>
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link href={`/products/${product.id}`}>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
            <Eye className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Quick View</span>
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white"
          aria-label="Add to Wishlist"
        >
          <Heart className="h-5 w-5 text-gray-700" />
          <span className="sr-only">Add to Wishlist</span>
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
