"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Star, Minus, Plus, ShoppingBag } from "lucide-react"
import type { Product, Review } from "@/types"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store"
import { addToCart } from "@/store/slices/cartSlice"
import { useToast } from "@/components/ui/use-toast"

interface ProductDetailsProps {
  product: Product
  reviews: Review[]
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, reviews }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()

  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0])
  const [quantity, setQuantity] = useState<number>(1)
  const [mainImage, setMainImage] = useState<string>(product.images?.[0] || product.imageUrl)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select a size and color before adding to cart.",
        variant: "destructive",
      })
      return
    }

    dispatch(
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity, // Quantity is handled by the cart slice, but we pass it for initial add
      }),
    )
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
      variant: "default",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"} fill-current`} />
    ))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      {/* Product Images */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-lg h-[400px] md:h-[550px] mb-4 rounded-lg overflow-hidden shadow-md">
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="bg-white"
          />
        </div>
        {product.images && product.images.length > 1 && (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-lg"
          >
            <CarouselContent className="-ml-2">
              {product.images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/4 pl-2">
                  <div
                    className="relative w-24 h-24 cursor-pointer border-2 rounded-md overflow-hidden"
                    onClick={() => setMainImage(image)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        )}
      </div>

      {/* Product Details */}
      <div className="lg:sticky lg:top-24 h-fit">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center mb-4">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through ml-3">₹{product.originalPrice.toLocaleString()}</span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="text-lg text-bibaRed-600 font-semibold ml-3">{product.discount}% OFF</span>
          )}
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

        <Separator className="my-6" />

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <Label htmlFor="size-select" className="text-lg font-semibold mb-2 block">
              Select Size:
            </Label>
            <Select onValueChange={setSelectedSize} defaultValue={selectedSize}>
              <SelectTrigger id="size-select" className="w-full md:w-[200px]">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <Label htmlFor="color-select" className="text-lg font-semibold mb-2 block">
              Select Color:
            </Label>
            <Select onValueChange={setSelectedColor} defaultValue={selectedColor}>
              <SelectTrigger id="color-select" className="w-full md:w-[200px]">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center space-x-4 mb-8">
          <Label htmlFor="quantity-input" className="text-lg font-semibold">
            Quantity:
          </Label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="rounded-r-none"
            >
              <Minus size={18} />
            </Button>
            <Input
              id="quantity-input"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              className="w-16 text-center border-x border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
              min={1}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="rounded-l-none"
            >
              <Plus size={18} />
            </Button>
          </div>
          <Button
            className="flex-1 bg-bibaRed-600 hover:bg-bibaRed-700 text-white py-3 text-lg rounded-md shadow-md"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Product Specifications */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2">
            {product.material && (
              <p>
                <span className="font-semibold">Material:</span> {product.material}
              </p>
            )}
            {product.careInstructions && (
              <p>
                <span className="font-semibold">Care Instructions:</span> {product.careInstructions}
              </p>
            )}
            <p>
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            {product.isNewArrival && (
              <p>
                <span className="font-semibold">Status:</span> New Arrival
              </p>
            )}
            {product.isOnlineExclusive && (
              <p>
                <span className="font-semibold">Availability:</span> Online Exclusive
              </p>
            )}
          </CardContent>
        </Card>

        {/* Customer Reviews */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Customer Reviews ({reviews.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{review.userName}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500 ml-auto">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductDetails
