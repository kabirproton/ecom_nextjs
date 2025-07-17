"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartTotalQuantity = useSelector((state: RootState) => state.cart.totalQuantity)

  const navLinks = [
    { name: "NEW", href: "/new-arrivals" },
    { name: "SUIT SETS", href: "/products?category=suit-sets" },
    { name: "KURTAS & TOPS", href: "/products?category=kurtas-tops" },
    { name: "DRESSES", href: "/products?category=dresses" },
    { name: "DRESS MATERIAL", href: "/products?category=dress-material" },
    { name: "BOTTOMS", href: "/products?category=bottoms" },
    { name: "JEWELLERY", href: "/products?category=jewellery" },
    { name: "FRAGRANCES", href: "/products?category=fragrances" },
    { name: "GIRLS", href: "/products?category=girls" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "CO-ORD SETS", href: "/products?category=co-ord-sets" },
    { name: "SALE", href: "/sale" },
  ]

  const mobileNavCategories = [
    {
      name: "CATEGORY",
      links: [
        { name: "Shop All", href: "/products" },
        { name: "Straight Suit Sets", href: "/products?category=straight-suit-sets" },
        { name: "Anarkali Suit Sets", href: "/products?category=anarkali-suit-sets" },
        { name: "Flared Suit Sets", href: "/products?category=flared-suit-sets" },
        { name: "A-line & Kalidar Suits", href: "/products?category=a-line-kalidar-suits" },
        { name: "Asymmetric Suits", href: "/products?category=asymmetric-suits" },
        { name: "Fusion Suit Sets", href: "/products?category=fusion-suit-sets" },
        { name: "Lehengas & Skirt Sets", href: "/products?category=lehengas-skirt-sets" },
        { name: "Unstitched Suit Sets", href: "/products?category=unstitched-suit-sets" },
      ],
    },
    {
      name: "COLLECTION",
      links: [
        { name: "Shop All", href: "/collections" },
        { name: "Autumn Winter", href: "/collections?season=autumn-winter" },
        { name: "Festive", href: "/collections?occasion=festive" },
        { name: "Spring Summer", href: "/collections?season=spring-summer" },
        { name: "Wedding", href: "/collections?occasion=wedding" },
        { name: "Winterwear", href: "/collections?season=winterwear" },
        { name: "Workwear", href: "/collections?occasion=workwear" },
        { name: "Lehengas & Skirt Sets", href: "/products?category=lehengas-skirt-sets" },
      ],
    },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-red-800 text-white text-center py-2 text-sm font-medium">
        END OF SEASON SALE - UPTO 50% OFF
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder-logo.svg" alt="BIBA Logo" width={80} height={30} className="h-auto" />
        </Link>

        {/* Ship to & Search (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 flex-grow max-w-2xl mx-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-gray-700">
                Ship to <Image src="/placeholder.svg" alt="India flag" width={20} height={15} className="ml-1" /> India
                (R) <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>India (R)</DropdownMenuItem>
              <DropdownMenuItem>USA ($)</DropdownMenuItem>
              <DropdownMenuItem>UK (£)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search kurta, shirts and dupattas"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-6 w-6 text-gray-700" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartTotalQuantity}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/auth/login">
              <User className="h-6 w-6 text-gray-700" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle & Icons (Mobile) */}
        <div className="lg:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartTotalQuantity}
                </span>
              )}
            </Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="flex justify-between items-center mb-6">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/placeholder-logo.svg" alt="BIBA Logo" width={80} height={30} className="h-auto" />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="grid gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-800 hover:text-red-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Separator className="my-4" />
                <Link
                  href="/auth/login"
                  className="text-lg font-medium text-gray-800 hover:text-red-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/wishlist"
                  className="text-lg font-medium text-gray-800 hover:text-red-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Navigation (Desktop) */}
      <nav className="hidden lg:block bg-white border-t border-gray-200">
        <ul className="container mx-auto px-4 flex justify-center gap-8 py-3">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-gray-800 hover:text-red-700 font-semibold text-sm uppercase transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-px bg-gray-200 ${className}`} />
}
