import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, CartState } from "@/types"

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedColor === newItem.selectedColor,
      )

      if (existingItem) {
        existingItem.quantity += newItem.quantity
      } else {
        state.items.push(newItem)
      }
      state.totalQuantity += newItem.quantity
      state.totalAmount += newItem.price * newItem.quantity
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload
      const itemToRemove = state.items.find((item) => item.id === idToRemove)

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity
        state.items = state.items.filter((item) => item.id !== idToRemove)
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number; selectedSize?: string; selectedColor?: string }>,
    ) => {
      const { id, quantity, selectedSize, selectedColor } = action.payload
      const itemToUpdate = state.items.find(
        (item) => item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor,
      )

      if (itemToUpdate) {
        const oldQuantity = itemToUpdate.quantity
        itemToUpdate.quantity = quantity
        state.totalQuantity += quantity - oldQuantity
        state.totalAmount += itemToUpdate.price * (quantity - oldQuantity)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    },
  },
})

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
