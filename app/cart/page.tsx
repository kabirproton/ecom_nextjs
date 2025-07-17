"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

const CartPage: React.FC = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount)

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) quantity = 1 // Ensure quantity is at least 1
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
          <Link href="/">
            <Button className="bg-bibaRed-600 hover:bg-bibaRed-700 text-white px-6 py-3 text-lg rounded-md">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-sm">
                <div className="relative w-32 h-32 flex-shrink-0 mr-4">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2 gap-2">
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 mt-4 sm:mt-0 sm:ml-auto">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </Card>
            ))}
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-bibaRed-600 border-bibaRed-600 hover:bg-bibaRed-50 bg-transparent"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Cart Summary */}
          <Card className="h-fit sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Total Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span>₹0.00</span> {/* Assuming free shipping for now */}
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-4">
                <span>Order Total:</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full bg-bibaRed-600 hover:bg-bibaRed-700 text-white py-3 text-lg rounded-md">
                  Proceed to Checkout
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default CartPage
