import Link from 'next/link'
import { Palette, Code, GraduationCap, Smartphone } from 'lucide-react'

export default function CategorySection() {
  const categories = [
    {
      name: 'Design',
      description: 'Templates, UI Kits, Graphics',
      icon: Palette,
      count: '25+ Products',
      href: '/products?category=design',
      color: 'bg-pink-500'
    },
    {
      name: 'Development',
      description: 'Code Templates, Tools, Frameworks',
      icon: Code,
      count: '15+ Products',
      href: '/products?category=development',
      color: 'bg-blue-500'
    },
    {
      name: 'Education',
      description: 'Online Courses, Tutorials',
      icon: GraduationCap,
      count: '20+ Products',
      href: '/products?category=education',
      color: 'bg-green-500'
    },
    {
      name: 'Mobile',
      description: 'App Templates, UI Components',
      icon: Smartphone,
      count: '10+ Products',
      href: '/products?category=mobile',
      color: 'bg-purple-500'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kategori Produk
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan produk digital sesuai kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group block"
              >
                <div className="card hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="card-content text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {category.description}
                    </p>
                    <span className="text-sm text-primary-600 font-medium">
                      {category.count}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
