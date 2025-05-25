'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { ShoppingCart, Menu, X, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems, toggleCart } = useCartStore()
  const totalItems = getTotalItems()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white font-bold">
                GT
              </div>
              <span className="font-heading text-xl font-bold text-gray-900">
                Ghous Tech
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-medium text-white">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-secondary-200">
                <button className="flex items-center space-x-2 text-base font-medium text-gray-700 hover:text-primary-500 transition-colors">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
