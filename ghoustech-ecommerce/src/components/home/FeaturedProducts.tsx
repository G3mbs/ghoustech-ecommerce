import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function FeaturedProducts() {
  // Mock data - will be replaced with real data from Supabase
  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Design Templates Pack',
      description: 'Collection of 50+ professional design templates',
      price: 299000,
      image_url: '/images/design-templates.jpg',
      category: 'Design',
      rating: 4.9,
      reviews: 156
    },
    {
      id: '2',
      name: 'Social Media Automation Tool',
      description: 'Complete automation tool for social media',
      price: 499000,
      image_url: '/images/social-automation.jpg',
      category: 'Software',
      rating: 4.8,
      reviews: 89
    },
    {
      id: '3',
      name: 'E-commerce Starter Kit',
      description: 'Ready-to-use e-commerce website template',
      price: 799000,
      image_url: '/images/ecommerce-kit.jpg',
      category: 'Development',
      rating: 5.0,
      reviews: 234
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Produk Unggulan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilihan terbaik dari koleksi produk digital premium kami yang paling diminati
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="card hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-2">{product.category}</div>
                      <div className="text-sm">Premium Product</div>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-primary-600 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="card-content">
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-600">
                      {formatCurrency(product.price)}
                    </div>
                    <button className="btn-primary btn-sm group/btn">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-outline btn-lg"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </div>
    </section>
  )
}
