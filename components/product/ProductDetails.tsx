"use client"

import * as React from "react"
import Image from "next/image"
import type { Product, Review } from "@/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart } from "lucide-react"
import { useDispatch } from "react-redux"
import { addItemToCart } from "@/store/slices/cartSlice"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [reviews, setReviews] = React.useState<Review[]>([])
  const [reviewsLoading, setReviewsLoading] = React.useState(true)
  const [reviewsError, setReviewsError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true)
      setReviewsError(null)
      try {
        const { data, error } = await supabase.from("reviews").select("*").eq("product_id", product.id)

        if (error) {
          throw new Error(error.message)
        }
        setReviews(data as Review[])
      } catch (err: any) {
        setReviewsError(err.message)
      } finally {
        setReviewsLoading(false)
      }
    }

    if (product?.id) {
      fetchReviews()
    }
  }, [product?.id])

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity: 1 }))
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "N/A"

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 py-8">
      {/* Product Images */}
      <div className="grid gap-4">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Placeholder for additional images */}
          <div className="relative h-24 w-full overflow-hidden rounded-lg cursor-pointer">
            <Image
              src="/images/product-detail-1.png"
              alt="Product thumbnail 1"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12vw, 8vw"
            />
          </div>
          <div className="relative h-24 w-full overflow-hidden rounded-lg cursor-pointer">
            <Image
              src="/images/product-detail-2.png"
              alt="Product thumbnail 2"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12vw, 8vw"
            />
          </div>
          <div className="relative h-24 w-full overflow-hidden rounded-lg cursor-pointer">
            <Image
              src="/images/product-detail-3.png"
              alt="Product thumbnail 3"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12vw, 8vw"
            />
          </div>
          <div className="relative h-24 w-full overflow-hidden rounded-lg cursor-pointer bg-muted flex items-center justify-center text-muted-foreground">
            + More
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="text-muted-foreground text-lg mt-2">{product.category}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(Number.parseFloat(averageRating)) ? "fill-yellow-500" : ""}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
          </div>
          <p className="text-4xl font-bold text-primary mt-4">₹{product.price.toFixed(2)}</p>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </>
            )}
          </Button>
        </div>

        <Separator />

        {/* Reviews Section */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Customer Reviews</h3>
          {reviewsLoading && (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}
          {reviewsError && <p className="text-destructive">Error loading reviews: {reviewsError}</p>}
          {!reviewsLoading && !reviewsError && reviews.length === 0 && (
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          )}
          {!reviewsLoading && !reviewsError && reviews.length > 0 && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500" : ""}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">{review.rating}/5 Stars</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Reviewed on {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
