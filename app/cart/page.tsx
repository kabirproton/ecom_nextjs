"use client"
import Link from "next/link"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store"
import { removeItemFromCart, updateItemQuantity, clearCart } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const dispatch: AppDispatch = useDispatch()
  const { items, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart)
  const { toast } = useToast()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ id, quantity: newQuantity }))
    } else {
      dispatch(removeItemFromCart(id))
      toast({
        title: "Item Removed",
        description: "Product removed from your cart.",
      })
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id))
    toast({
      title: "Item Removed",
      description: "Product removed from your cart.",
    })
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 min-h-[calc(100vh-160px)]">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-6">Your cart is empty.</p>
          <Link href="/products">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-sm">
                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-md object-cover"
                  />
                </Link>
                <div className="flex-grow text-center sm:text-left sm:ml-4 mt-4 sm:mt-0">
                  <Link href={`/products/${item.id}`}>
                    <h2 className="text-lg font-semibold hover:text-primary transition-colors">{item.name}</h2>
                  </Link>
                  <p className="text-muted-foreground text-sm">{item.category}</p>
                  <p className="text-lg font-bold text-primary mt-1">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-auto">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                      className="w-16 text-center border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      +
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive/90 border-destructive hover:bg-destructive/10 bg-transparent"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="h-fit shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Total Items</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>₹0.00</span> {/* Placeholder */}
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Order Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
