import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategorySection from '@/components/home/CategorySection'
import TestimonialSection from '@/components/home/TestimonialSection'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <TestimonialSection />
      <CTASection />
    </div>
  )
}
