import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Siap Meningkatkan Produktivitas Anda?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan profesional yang telah mempercayai produk digital kami
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="btn-secondary btn-lg group"
            >
              Mulai Sekarang
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center text-primary-100">
              <Mail className="h-5 w-5 mr-2" />
              <span>atau hubungi kami di hello@ghoustech.com</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-400">
            <div>
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-primary-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-primary-200">Digital Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">99%</div>
              <div className="text-primary-200">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-primary-200">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
