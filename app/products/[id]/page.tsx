import { ProductDetails } from "@/components/product/ProductDetails"
import { supabase } from "@/lib/supabase"
import type { Product, Review } from "@/types"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params

  // Fetch product details
  const { data: product, error: productError } = await supabase.from("products").select("*").eq("id", id).single()

  if (productError || !product) {
    console.error("Error fetching product:", productError)
    notFound() // Show 404 page if product not found
  }

  // Fetch reviews for the product
  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", id)
    .order("created_at", { ascending: false })

  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError)
    // Continue without reviews if there's an error
  }

  return (
    <div className="container mx-auto py-8">
      <ProductDetails product={product as Product} reviews={(reviews as Review[]) || []} />
    </div>
  )
}
