import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalQuantity: number
  totalAmount: number
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find((item) => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          id: product.id,
          product,
          quantity,
        })
      }

      state.totalQuantity += quantity
      state.totalAmount += product.price * quantity
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      const existingItem = state.items.find((item) => item.product.id === productId)

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= existingItem.product.price * existingItem.quantity
        state.items = state.items.filter((item) => item.product.id !== productId)
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const existingItem = state.items.find((item) => item.product.id === productId)

      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity
        existingItem.quantity = quantity
        state.totalQuantity += quantityDiff
        state.totalAmount += existingItem.product.price * quantityDiff
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
