import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.product_id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          id: `cart_${Date.now()}`,
          product_id: action.payload.id,
          quantity: 1,
          product: action.payload,
        })
      }

      state.total = calculateTotal(state.items)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product_id !== action.payload)
      state.total = calculateTotal(state.items)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.product_id === action.payload.productId)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.product_id !== action.payload.productId)
        }
      }
      state.total = calculateTotal(state.items)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
