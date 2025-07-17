import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase"
import type { Product, ProductState } from "@/types"

// Async Thunks
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
      const { data, error } = await supabase.from("products").select("*").eq("isFeatured", true)
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

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
  selectedProduct: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
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
      // Fetch Featured Products
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
      // Fetch Product By Id
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
        state.selectedProduct = null
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.selectedProduct = null
      })
  },
})

export const { clearProductError, clearSelectedProduct } = productSlice.actions
export default productSlice.reducer
