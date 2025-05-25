import Link from 'next/link'
import { ArrowRight, Star, Users, Download } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-100/50 to-primary-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Premium Digital Products
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Solusi Digital
              <span className="text-primary-500 block">Premium</span>
              untuk Profesional
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Temukan koleksi lengkap produk digital berkualitas tinggi. Dari template design, 
              software tools, hingga course online yang akan meningkatkan produktivitas dan 
              kreativitas Anda.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center lg:justify-start">
                  <Users className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">10K+</span>
                </div>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center lg:justify-start">
                  <Download className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">50K+</span>
                </div>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center lg:justify-start">
                  <Star className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="btn-primary btn-lg group"
              >
                Jelajahi Produk
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories"
                className="btn-outline btn-lg"
              >
                Lihat Kategori
              </Link>
            </div>
          </div>

          {/* Right content - Hero Image/Illustration */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main hero image placeholder */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-square bg-gradient-primary rounded-xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">GT</div>
                    <div className="text-lg">Premium Products</div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-bounce-in">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Design Templates</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Software Tools</span>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-white rounded-lg shadow-lg p-4 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Online Courses</span>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200/20 to-primary-300/20 rounded-full blur-3xl transform scale-150"></div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
