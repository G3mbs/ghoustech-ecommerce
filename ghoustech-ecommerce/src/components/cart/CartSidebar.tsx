'use client'

import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/lib/utils'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore()

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add some products to get started
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="btn-primary"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  {/* Product Image */}
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={item.image_url || '/images/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4 text-gray-500" />
                    </button>
                    <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full btn-primary btn-lg text-center block"
            >
              Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
