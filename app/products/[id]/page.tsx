"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductById, clearSelectedProduct } from "@/store/slices/productSlice"
import type { AppDispatch, RootState } from "@/store"
import ProductDetails from "@/components/product/ProductDetails"
import Loading from "@/app/loading" // Re-using the loading skeleton
import NotFound from "@/app/not-found" // Re-using the not-found page

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const dispatch = useDispatch<AppDispatch>()
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
    return () => {
      dispatch(clearSelectedProduct()) // Clear product on unmount
    }
  }, [dispatch, id])

  if (loading) {
    return <Loading />
  }

  if (error || !selectedProduct) {
    return <NotFound />
  }

  return (
    <div className="py-8">
      <ProductDetails product={selectedProduct} />
    </div>
  )
}
