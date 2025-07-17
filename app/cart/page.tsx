"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const dispatch = useDispatch()
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({itemCount} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">₹{item.product.price.toLocaleString()}</span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors text-center block font-medium"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
