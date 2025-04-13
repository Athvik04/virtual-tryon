import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import HowItWorks from "@/components/how-it-works"
import LoadingSpinner from "@/components/loading-spinner"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProducts />
      </Suspense>

      <HowItWorks />

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Try It Yourself?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your photo, choose your favorite clothing items, and see how they look on you in seconds.
          </p>
          <Link
            href="/try-on"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
