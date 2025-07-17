import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/types"

interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  currentProduct: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data
})

export const fetchFeaturedProducts = createAsyncThunk("products/fetchFeaturedProducts", async () => {
  const { data, error } = await supabase.from("products").select("*").eq("is_featured", true).limit(8)

  if (error) throw error
  return data
})

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (productId: string) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

  if (error) throw error
  return data
})

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch product"
      })
  },
})

export const { clearCurrentProduct, clearError } = productSlice.actions
export default productSlice.reducer
