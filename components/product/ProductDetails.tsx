"use client"
import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, ShoppingCart, Heart, Share2, Truck, RefreshCw, ShieldCheck } from "lucide-react"
import type { Product } from "@/types"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store"
import { addToCart } from "@/store/slices/cartSlice"
import { useToast } from "@/components/ui/use-toast"

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to choose a size before adding to cart.",
        variant: "destructive",
      })
      return
    }
    dispatch(addToCart({ ...product, quantity, size: selectedSize }))
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} (Size: ${selectedSize}) has been added to your cart.`,
    })
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Image Carousel */}
      <div className="w-full">
        <Carousel className="w-full max-w-full mx-auto">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="bg-gray-100"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow-md" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow-md" />
        </Carousel>
        <div className="flex gap-2 mt-4 justify-center">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="relative w-20 h-20 cursor-pointer border border-gray-200 hover:border-primary-500 transition-colors rounded-md overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="contain"
                className="bg-gray-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          {product.discountPrice ? (
            <>
              <span className="text-3xl font-bold text-primary-800">₹{product.discountPrice.toLocaleString()}</span>
              <span className="text-lg text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
              <span className="text-base text-red-500 font-semibold">
                {((1 - product.discountPrice / product.price) * 100).toFixed(0)}% OFF
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span>({product.numReviews} Reviews)</span>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
          <div className="flex flex-wrap gap-2">
            {product.size.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className={`min-w-[50px] ${selectedSize === size ? "bg-primary-800 text-white hover:bg-primary-700" : "border-gray-300 hover:bg-gray-100"}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
              -
            </Button>
            <span className="px-4 text-lg font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
              +
            </Button>
          </div>
          <Button
            className="flex-1 bg-primary-800 hover:bg-primary-700 text-white py-3 text-lg font-semibold"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
          </Button>
          <Button variant="outline" size="icon" className="border-gray-300 hover:bg-gray-100 bg-transparent">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary-800" />
            <span>Free Shipping on orders above ₹999</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary-800" />
            <span>Easy Returns & Exchanges</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary-800" />
            <span>Secure Payment Options</span>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary-800" />
            <span>Share this product</span>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Product Details</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">SKU:</span> {product.sku}
            </li>
            <li>
              <span className="font-semibold">Brand:</span> {product.brand}
            </li>
            <li>
              <span className="font-semibold">Material:</span> {product.material}
            </li>
            <li>
              <span className="font-semibold">Color:</span> {product.color}
            </li>
            <li>
              <span className="font-semibold">Care Instructions:</span> {product.careInstructions}
            </li>
          </ul>
        </div>

        {/* Customer Reviews (Placeholder) */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Customer Reviews</h3>
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
          {/* Add review form/list here later */}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
