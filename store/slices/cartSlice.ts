import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, Product } from "@/types"

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
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ ...newItem, quantity: 1 })
      }
      state.totalQuantity++
      state.totalAmount += newItem.price
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload
      const existingItem = state.items.find((item) => item.id === idToRemove)

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= existingItem.price * existingItem.quantity
        state.items = state.items.filter((item) => item.id !== idToRemove)
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        const oldQuantity = existingItem.quantity
        existingItem.quantity = quantity
        state.totalQuantity += quantity - oldQuantity
        state.totalAmount += existingItem.price * (quantity - oldQuantity)
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
