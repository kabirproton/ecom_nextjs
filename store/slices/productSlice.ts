import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase"
import type { Product, ProductState } from "@/types"

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("products").select("*")
    if (error) {
      return rejectWithValue(error.message)
    }
    return data as Product[]
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("is_featured", true).limit(8) // Fetch up to 8 featured products
      if (error) {
        return rejectWithValue(error.message)
      }
      return data as Product[]
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
      if (error) {
        return rejectWithValue(error.message)
      }
      return data as Product
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.featuredProducts = action.payload
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state) => {
        state.loading = false
        // No direct state update for single product, it's fetched for a specific page
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default productSlice.reducer
