import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"
import { supabase } from "@/lib/supabase" // Assuming you have a supabase client setup

interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
}

// Async Thunk for fetching all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("products").select("*")
    if (error) {
      throw error
    }
    return data as Product[]
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

// Async Thunk for fetching a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
      if (error) {
        throw error
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
  reducers: {
    // For dummy data or initial state setup
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false
      state.products = action.payload
      state.featuredProducts = action.payload.filter((p) => p.isFeatured) // Example: filter featured
      state.error = null
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload
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
        state.featuredProducts = action.payload.filter((p) => p.isFeatured) // Assuming a 'isFeatured' flag
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
        state.selectedProduct = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
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

export const { fetchProductsSuccess, fetchProductsFailure, setSelectedProduct } = productSlice.actions
export default productSlice.reducer
