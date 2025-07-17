"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }))
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {product.discountPrice && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          Sale
        </span>
      )}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-800 rounded-full">
              <Eye className="h-5 w-5" />
              <span className="sr-only">Quick View</span>
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-800 rounded-full">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex items-center gap-2 mb-3">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold text-primary-800">₹{product.discountPrice.toLocaleString()}</span>
              <span className="text-sm text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-red-500 font-semibold">
                {((1 - product.discountPrice / product.price) * 100).toFixed(0)}% OFF
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
          )}
        </div>
        <Button className="w-full bg-primary-800 hover:bg-primary-700 text-white" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </div>
    </div>
  )
}
