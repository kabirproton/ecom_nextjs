import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0)
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product
        quantity: number
        size: string
        color: string
      }>,
    ) => {
      const { product, quantity, size, color } = action.payload
      const existingItem = state.items.find(
        (item) => item.productId === product.id && item.size === size && item.color === color,
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${size}-${color}`,
          productId: product.id,
          product,
          quantity,
          size,
          color,
        }
        state.items.push(newItem)
      }

      state.total = calculateTotal(state.items)
      state.itemCount = calculateItemCount(state.items)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.total = calculateTotal(state.items)
      state.itemCount = calculateItemCount(state.items)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = quantity
        state.total = calculateTotal(state.items)
        state.itemCount = calculateItemCount(state.items)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
