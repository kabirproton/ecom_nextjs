"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { addToCart } from "@/store/slices/cartSlice"
import type { Product } from "@/types"
import type { AppDispatch } from "@/store"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart(product))
  }

  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image_url || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4">
        <div className="w-full">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium mb-1 hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold">₹{product.price}</span>
            <Button size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
