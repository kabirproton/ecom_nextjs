"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store"
import { addToCart } from "@/store/slices/cartSlice"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }))
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      {product.discount && product.discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          Sale
        </span>
      )}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4 text-center">
        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg font-bold text-red-800">
            ₹{product.discount_price?.toFixed(2) || product.price.toFixed(2)}
          </span>
          {product.discount_price && (
            <span className="text-sm text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="text-sm text-green-600 font-medium">{product.discount}% OFF</span>
          )}
        </div>
        <div className="flex items-center justify-center text-sm text-gray-600">
          <StarRating rating={product.rating} />
          <span className="ml-1">({product.num_reviews})</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 bg-transparent">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 bg-transparent" asChild>
            <Link href={`/products/${product.id}`}>
              <Eye className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            onClick={handleAddToCart}
            className="bg-red-800 hover:bg-red-700 text-white rounded-full px-4 py-2 flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Add to Cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface StarRatingProps {
  rating: number
}

function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalfIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className="h-4 w-4 fill-gray-300 text-gray-300" />
      ))}
    </div>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function StarHalfIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17.77V2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77Z" />
    </svg>
  )
}
