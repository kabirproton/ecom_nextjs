"use client"

import Link from "next/link"
import { Facebook, Instagram, PinIcon as Pinterest, Youtube, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-red-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
          {/* Top Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">TOP CATEGORIES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=anarkali-suit-sets" className="hover:underline">
                  Anarkali Suit Sets
                </Link>
              </li>
              <li>
                <Link href="/products?category=kurtas" className="hover:underline">
                  Kurtas
                </Link>
              </li>
              <li>
                <Link href="/products?category=biba-girls" className="hover:underline">
                  Biba Girls
                </Link>
              </li>
              <li>
                <Link href="/products?category=jewellery" className="hover:underline">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="/products?category=palazzos" className="hover:underline">
                  Palazzos
                </Link>
              </li>
              <li>
                <Link href="/products?category=straight-suit-sets" className="hover:underline">
                  Straight Suit Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/returns" className="hover:underline">
                  Returns & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* BIBA Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">BIBA BRAND</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/investor" className="hover:underline">
                  Investor Information
                </Link>
              </li>
              <li>
                <Link href="/business-enquiry" className="hover:underline">
                  Business Enquiry
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:underline">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/store-locator" className="hover:underline">
                  Store locator
                </Link>
              </li>
            </ul>
          </div>

          {/* My Profile */}
          <div>
            <h3 className="font-bold text-lg mb-4">MY PROFILE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/my-account" className="hover:underline">
                  My account
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:underline">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:underline">
                  Return & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline">
                  My cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/order-history" className="hover:underline">
                  Order history
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping-policy" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:underline">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-700 my-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="font-bold">Follow us</span>
            <div className="flex gap-3">
              <Link href="#" aria-label="Facebook" className="hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Pinterest" className="hover:text-gray-300">
                <Pinterest className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Youtube" className="hover:text-gray-300">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="font-bold">100% Secure Payments</span>
            <div className="flex gap-2">
              <Image src="/placeholder.svg" alt="Visa" width={40} height={25} />
              <Image src="/placeholder.svg" alt="Mastercard" width={40} height={25} />
              <Image src="/placeholder.svg" alt="Amex" width={40} height={25} />
              <Image src="/placeholder.svg" alt="Discover" width={40} height={25} />
              <Image src="/placeholder.svg" alt="PayPal" width={40} height={25} />
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="SSL" width={20} height={20} />
            <span>SSL 256 BIT Encryption</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs mt-8">
          <p>Copyright to Biba store | Name of Manufacturer - BIBA Fashion Limited | Country of Manufacture - India</p>
          <p className="mt-4 text-red-300">BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS/FRAUDULENT OFFERS</p>
          <p className="mt-2 text-red-300">
            Please be advised that BIBA does not run any promotions or offers involving electronics or high-value
            products outside of our business. We will never ask for personal information, payments, or banking details
            over the phone. Any such messages are not authorized by BIBA and should be ignored to protect yourself from
            potential scams.
          </p>
        </div>
      </div>
    </footer>
  )
}
