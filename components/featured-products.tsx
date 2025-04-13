import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Classic White Shirt",
    category: "Shirts",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Black Denim Jeans",
    category: "Pants",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    category: "Dresses",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Casual Blazer",
    category: "Jackets",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/catalog" className="inline-flex items-center text-black font-medium hover:underline">
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
