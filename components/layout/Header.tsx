"use client"

import { useState } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ShoppingCart, Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { RootState } from "@/store"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const user = useSelector((state: RootState) => state.auth.user)

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link href="/products" className="text-lg">
                Products
              </Link>
              <Link href="/categories" className="text-lg">
                Categories
              </Link>
              <Link href="/about" className="text-lg">
                About
              </Link>
              <Link href="/contact" className="text-lg">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">BIBA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/categories" className="transition-colors hover:text-primary">
            Categories
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Search */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <div className="hidden md:block">
              <Input type="search" placeholder="Search products..." className="w-[300px]" />
            </div>
          </div>

          {/* User Account */}
          <Button variant="ghost" size="icon" asChild>
            <Link href={user ? "/account" : "/auth/login"}>
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="border-t px-4 py-2 md:hidden">
          <Input type="search" placeholder="Search products..." />
        </div>
      )}
    </header>
  )
}
