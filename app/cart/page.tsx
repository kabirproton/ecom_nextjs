"use client"

import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { removeFromCart, updateCartItemQuantity, clearCart } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart)
  const { toast } = useToast()

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart.",
    })
  }

  const handleQuantityChange = (id: string, newQuantity: number, selectedSize?: string, selectedColor?: string) => {
    if (newQuantity < 1) return // Prevent quantity from going below 1
    dispatch(updateCartItemQuantity({ id, quantity: newQuantity, selectedSize, selectedColor }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-800">
              Your Shopping Cart ({totalQuantity} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
                <Link href="/products">
                  <Button className="bg-red-800 hover:bg-red-700 text-white rounded-none">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/products/${item.id}`} className="flex-shrink-0">
                      <Image
                        src={item.images[0] || "/placeholder.jpg"}
                        alt={item.name}
                        width={100}
                        height={120}
                        className="rounded-md object-cover"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-lg text-gray-800 hover:text-red-800">{item.name}</h3>
                      </Link>
                      <p className="text-gray-600 text-sm">Category: {item.category}</p>
                      {item.selectedSize && <p className="text-gray-600 text-sm">Size: {item.selectedSize}</p>}
                      {item.selectedColor && <p className="text-gray-600 text-sm">Color: {item.selectedColor}</p>}
                      <p className="font-bold text-red-800 mt-1">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            Number.parseInt(e.target.value),
                            item.selectedSize,
                            item.selectedColor,
                          )
                        }
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)
                        }
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-800">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal ({totalQuantity} items)</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>Free</span> {/* Placeholder for now */}
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-900 border-t pt-4 mt-4">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-red-800 hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-none">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
