"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/store"
import { removeFromCart, updateCartQuantity, clearCart } from "@/store/slices/cartSlice"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ShoppingCart from "@/components/icons/ShoppingCart" // Declaring the ShoppingCart variable

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-150px)] flex flex-col items-center justify-center">
        <ShoppingCart className="h-24 w-24 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-lg text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="bg-primary-800 hover:bg-primary-700 text-white px-8 py-3 text-lg">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart ({totalQuantity} items)</h1>
        <div className="space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-sm">
              <div className="relative w-24 h-24 flex-shrink-0 mr-4">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0">
                <Link
                  href={`/products/${item.id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-primary-800"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-600">Size: {item.size || "N/A"}</p>
                <p className="text-md font-medium text-gray-700 mt-1">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-auto">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                  className="w-16 text-center"
                  min="1"
                />
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={handleClearCart}
          className="mt-6 text-red-500 border-red-300 hover:bg-red-50 bg-transparent"
        >
          <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
        </Button>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-4">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal ({totalQuantity} items)</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>₹0.00</span> {/* Assuming free shipping for now */}
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-4 mt-4">
              <span>Total</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
            <Button
              asChild
              className="w-full bg-primary-800 hover:bg-primary-700 text-white py-3 text-lg font-semibold mt-6"
            >
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
