import { Star, Quote } from 'lucide-react'

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmad Rizki',
      role: 'UI/UX Designer',
      company: 'Tech Startup',
      content: 'Template design dari Ghous Tech sangat membantu mempercepat workflow saya. Kualitasnya premium dan mudah dikustomisasi.',
      rating: 5,
      avatar: 'AR'
    },
    {
      id: 2,
      name: 'Sari Indah',
      role: 'Digital Marketer',
      company: 'E-commerce Company',
      content: 'Course digital marketing yang saya beli sangat lengkap dan praktis. Langsung bisa diaplikasikan untuk bisnis saya.',
      rating: 5,
      avatar: 'SI'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      role: 'Web Developer',
      company: 'Freelancer',
      content: 'Development kit yang disediakan sangat membantu dalam mengembangkan project client. Dokumentasinya juga lengkap.',
      rating: 5,
      avatar: 'BS'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testimoni dari para profesional yang telah menggunakan produk kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card">
              <div className="card-content">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary-500" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
