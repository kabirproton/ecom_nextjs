import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, PinIcon as Pinterest } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Top Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">TOP CATEGORIES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/anarkali-suit-sets" className="hover:underline">
                  Anarkali Suit Sets
                </Link>
              </li>
              <li>
                <Link href="/category/kurtas" className="hover:underline">
                  Kurtas
                </Link>
              </li>
              <li>
                <Link href="/category/biba-girls" className="hover:underline">
                  Biba Girls
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery" className="hover:underline">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="/category/palazzos" className="hover:underline">
                  Palazzos
                </Link>
              </li>
              <li>
                <Link href="/category/straight-suit-sets" className="hover:underline">
                  Straight Suit Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/returns" className="hover:underline">
                  Returns & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
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
            <h3 className="text-lg font-semibold mb-4">BIBA BRAND</h3>
            <ul className="space-y-2 text-sm">
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
                <Link href="/business" className="hover:underline">
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
            <h3 className="text-lg font-semibold mb-4">MY PROFILE</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profile" className="hover:underline">
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
                <Link href="/orders" className="hover:underline">
                  Order history
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-red-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm">Follow us</span>
              <div className="flex space-x-3">
                <Facebook size={20} className="hover:text-blue-400 cursor-pointer" />
                <Pinterest size={20} className="hover:text-pink-400 cursor-pointer" />
                <Instagram size={20} className="hover:text-pink-400 cursor-pointer" />
                <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
                <Youtube size={20} className="hover:text-red-400 cursor-pointer" />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm">100% Secure Payments</span>
              <div className="flex space-x-2">
                <Image src="/placeholder.svg" alt="Visa" width={40} height={25} className="bg-white rounded" />
                <Image src="/placeholder.svg" alt="Mastercard" width={40} height={25} className="bg-white rounded" />
                <Image src="/placeholder.svg" alt="Discover" width={40} height={25} className="bg-white rounded" />
                <Image
                  src="/placeholder.svg"
                  alt="American Express"
                  width={40}
                  height={25}
                  className="bg-white rounded"
                />
                <Image src="/placeholder.svg" alt="PayPal" width={40} height={25} className="bg-white rounded" />
              </div>
            </div>

            {/* SSL Certificate */}
            <div className="flex items-center space-x-2">
              <div className="bg-white text-red-800 px-2 py-1 rounded text-xs font-bold">SSL</div>
              <span className="text-sm">256 BIT Encryption</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-sm">
            <p>
              Copyright to Biba store | Name of Manufacturer - BIBA Fashion Limited | Country of Manufacture - India
            </p>
          </div>

          {/* Warning */}
          <div className="mt-6 p-4 border border-red-600 rounded">
            <h4 className="font-semibold text-center mb-2">
              BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS/FRAUDULENT OFFERS
            </h4>
            <p className="text-sm text-center">
              Please be advised that BIBA does not run any promotions or offers involving electronics or high-value
              products outside of our business. We will never ask for personal information, payments, or banking details
              over the phone. Any such messages are not authorized by BIBA and should be ignored to protect yourself
              from potential scams.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
