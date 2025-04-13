"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="mr-2" />
            <span className="font-bold text-xl">TryFit AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/catalog" className="text-gray-700 hover:text-black">
              Catalog
            </Link>
            <Link href="/try-on" className="text-gray-700 hover:text-black">
              Virtual Try-On
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-black">
              How It Works
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button>Sign In</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="/catalog" className="text-gray-700 hover:text-black py-2" onClick={() => setIsMenuOpen(false)}>
              Catalog
            </Link>
            <Link href="/try-on" className="text-gray-700 hover:text-black py-2" onClick={() => setIsMenuOpen(false)}>
              Virtual Try-On
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-black py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="flex space-x-4 pt-2">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
