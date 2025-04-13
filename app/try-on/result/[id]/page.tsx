"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, Share2 } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"

export default function TryOnResultPage() {
  const params = useParams()
  const router = useRouter()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching result from backend
    const fetchResult = () => {
      try {
        const savedTryOns = JSON.parse(localStorage.getItem("tryOns") || "[]")
        const foundResult = savedTryOns.find((item) => item.id === params.id)

        if (foundResult) {
          setResult(foundResult)
        } else {
          // Result not found, redirect to try-on page
          router.push("/try-on")
        }
      } catch (error) {
        console.error("Error fetching result:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [params.id, router])

  const handleDownload = () => {
    // In a real app, this would download the actual image
    const link = document.createElement("a")
    link.href = result.resultImage
    link.download = `try-on-${params.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = () => {
    // In a real app, this would implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: "My Virtual Try-On",
        text: "Check out my virtual try-on!",
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Result not found</h1>
        <p className="mb-6">The try-on result you're looking for doesn't exist or has expired.</p>
        <Button onClick={() => router.push("/try-on")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="outline" onClick={() => router.push("/try-on")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Try-On
      </Button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Virtual Try-On Result</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-gray-200">
                <Image src={result.userImage || "/placeholder.svg"} alt="Your Photo" fill className="object-cover" />
              </div>
              <p className="text-center text-gray-500">Your Original Photo</p>
            </div>

            <div className="space-y-4">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={result.resultImage || "/placeholder.svg"}
                  alt="Try-On Result"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-gray-500">AI-Generated Try-On Result</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download Image
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
