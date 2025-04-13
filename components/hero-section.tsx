import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Virtual Try-On Experience Powered by AI
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              See how clothes look on you before you buy. Upload your photo, select items, and our AI will create a
              realistic preview in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/try-on"
                className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Try It Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Virtual Try-On Demo"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="AI Generated Result"
                width={150}
                height={150}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
