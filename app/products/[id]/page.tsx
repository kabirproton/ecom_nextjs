"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store"
import { fetchProductById, clearSelectedProduct } from "@/store/slices/productSlice"
import { ProductDetails } from "@/components/product/ProductDetails"
import Loading from "@/app/loading"
import NotFound from "@/app/not-found"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch: AppDispatch = useDispatch()
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products)

  React.useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
    return () => {
      dispatch(clearSelectedProduct()) // Clear product on unmount
    }
  }, [id, dispatch])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Error loading product:</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!selectedProduct) {
    return <NotFound />
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <ProductDetails product={selectedProduct} />
    </div>
  )
}
