import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product, Category } from "@/types"
import { supabase } from "@/lib/supabase"

interface ProductState {
  products: Product[]
  categories: Category[]
  featuredProducts: Product[]
  loading: boolean
  error: string | null
  filters: {
    category: string
    priceRange: [number, number]
    sizes: string[]
    colors: string[]
    sortBy: string
  }
}

const initialState: ProductState = {
  products: [],
  categories: [],
  featuredProducts: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    priceRange: [0, 10000],
    sizes: [],
    colors: [],
    sortBy: "newest",
  },
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters?: Partial<ProductState["filters"]>) => {
    let query = supabase.from("products").select("*")

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Product[]
  },
)

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const { data, error } = await supabase.from("categories").select("*")
  if (error) throw error
  return data as Category[]
})

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
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
        state.featuredProducts = action.payload.filter((p) => p.isFeatured)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { setFilters, clearFilters } = productSlice.actions
export default productSlice.reducer
