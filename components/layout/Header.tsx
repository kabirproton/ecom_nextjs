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
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity)

  const navLinks = [
    { name: "NEW", href: "/new" },
    { name: "SUIT SETS", href: "/suit-sets" },
    { name: "KURTAS & TOPS", href: "/kurtas-tops" },
    { name: "DRESSES", href: "/dresses" },
    { name: "DRESS MATERIAL", href: "/dress-material" },
    { name: "BOTTOMS", href: "/bottoms" },
    { name: "JEWELLERY", href: "/jewellery" },
    { name: "FRAGRANCES", href: "/fragrances" },
    { name: "GIRLS", href: "/girls" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "CO-ORD SETS", href: "/co-ord-sets" },
    { name: "SALE", href: "/sale", isSale: true },
  ]

  const categories = [
    { name: "Shop All", href: "/shop-all" },
    { name: "Straight Suit Sets", href: "/straight-suit-sets" },
    { name: "Anarkali Suit Sets", href: "/anarkali-suit-sets" },
    { name: "Flared Suit Sets", href: "/flared-suit-sets" },
    { name: "A-line & Kalidar Suits", href: "/a-line-kalidar-suits" },
    { name: "Asymmetric Suits", href: "/asymmetric-suits" },
    { name: "Fusion Suit Sets", href: "/fusion-suit-sets" },
    { name: "Lehengas & Skirt Sets", href: "/lehengas-skirt-sets" },
    { name: "Unstitched Suit Sets", href: "/unstitched-suit-sets" },
  ]

  const collections = [
    { name: "Shop All", href: "/collections/shop-all" },
    { name: "Autumn Winter", href: "/collections/autumn-winter" },
    { name: "Casual", href: "/collections/casual" },
    { name: "Festive", href: "/collections/festive" },
    { name: "Spring Summer", href: "/collections/spring-summer" },
    { name: "Wedding", href: "/collections/wedding" },
    { name: "Workwear", href: "/collections/workwear" },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Sale Banner */}
      <div className="bg-yellow-500 text-white text-center py-2 text-sm font-medium">
        END OF SEASON SALE - UPTO 50% OFF
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder-logo.png" alt="BIBA Logo" width={80} height={40} className="h-auto" />
        </Link>

        {/* Ship To & Search (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-2xl mx-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm">
                Ship to{" "}
                <Image
                  src="/placeholder.svg?height=16&width=16"
                  alt="India Flag"
                  width={16}
                  height={16}
                  className="rounded-full"
                />{" "}
                India (R) <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>USA</DropdownMenuItem>
              <DropdownMenuItem>UK</DropdownMenuItem>
              <DropdownMenuItem>Canada</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search kurta, shirts and dupattas"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-0 focus:border-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
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
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartQuantity}
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

        {/* Mobile Menu Toggle & Icons */}
        <div className="flex lg:hidden items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-6 w-6 text-gray-700" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-4">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/placeholder-logo.png" alt="BIBA Logo" width={80} height={40} />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
              <nav className="grid gap-2 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block py-2 ${link.isSale ? "text-red-600 font-bold" : "text-gray-700 hover:text-gray-900"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/auth/login"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Navigation (Desktop) */}
      <nav className="hidden lg:block bg-white border-t border-gray-200">
        <ul className="container mx-auto px-4 flex justify-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <Link
                href={link.href}
                className={`block py-4 text-sm font-semibold uppercase ${
                  link.isSale ? "text-red-600" : "text-gray-700 hover:text-gray-900"
                } border-b-2 border-transparent group-hover:border-primary-500 transition-colors duration-200`}
              >
                {link.name}
              </Link>
              {/* Example of a mega menu for 'NEW' and 'DRESSES' */}
              {(link.name === "NEW" || link.name === "DRESSES") && (
                <div className="absolute left-0 top-full w-[800px] bg-white shadow-lg pt-4 pb-6 hidden group-hover:block z-10">
                  <div className="grid grid-cols-2 gap-8 px-6">
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800">CATEGORY</h3>
                      <ul className="grid gap-2">
                        {categories.map((cat) => (
                          <li key={cat.name}>
                            <Link href={cat.href} className="text-gray-600 hover:text-primary-500 text-sm">
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800">COLLECTION</h3>
                      <ul className="grid gap-2">
                        {collections.map((col) => (
                          <li key={col.name}>
                            <Link href={col.href} className="text-gray-600 hover:text-primary-500 text-sm">
                              {col.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
