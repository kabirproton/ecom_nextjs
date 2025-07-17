import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/types"

interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
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

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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
  },
})

export const { clearError } = productSlice.actions
export default productSlice.reducer
