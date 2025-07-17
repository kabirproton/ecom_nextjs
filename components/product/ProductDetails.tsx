"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StarIcon } from "lucide-react"
import type { Product, Review } from "@/types"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store"
import { addToCart } from "@/store/slices/cartSlice"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailsProps {
  product: Product
  reviews: Review[]
}

export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.size?.[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.color)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize && product.size && product.size.length > 0) {
      toast({
        title: "Please select a size",
        description: "You need to choose a size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedSize,
        selectedColor,
      }),
    )
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    })
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-4 md:p-8">
      {/* Product Image Gallery */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg border">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-opacity duration-300"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full h-24 p-0 overflow-hidden rounded-lg ${
                selectedImage === image ? "border-2 border-red-800" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </Button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">({product.num_reviews} reviews)</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-red-800">
            ₹{product.discount_price?.toFixed(2) || product.price.toFixed(2)}
          </span>
          {product.discount_price && (
            <span className="text-lg text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
          )}
          {product.discount_price && product.price && (
            <span className="text-base text-green-600 font-medium">
              {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
            </span>
          )}
        </div>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        {/* Size Selection */}
        {product.size && product.size.length > 0 && (
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
              Size:
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.size.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= product.stock}
            >
              +
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-red-800 hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-none"
          >
            Add to Cart
          </Button>
        </div>

        {/* Product Information Accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">Product Details</AccordionTrigger>
            <AccordionContent className="text-gray-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>SKU: {product.sku}</li>
                {product.brand && <li>Brand: {product.brand}</li>}
                {product.material && <li>Material: {product.material}</li>}
                {product.color && <li>Color: {product.color}</li>}
                {product.care_instructions && <li>Care Instructions: {product.care_instructions}</li>}
                <li>Category: {product.category}</li>
                <li>
                  In Stock: {product.stock > 0 ? "Yes" : "No"} ({product.stock} available)
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              Customer Reviews ({reviews.length})
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to review this product!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-medium">{review.user_name || "Anonymous"}</span>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
