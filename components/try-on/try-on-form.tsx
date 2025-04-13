"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploader from "./image-uploader"
import ClothingSelector from "./clothing-selector"
import BodyDetailsForm from "./body-details-form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function TryOnForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    userImage: null,
    selectedClothing: null,
    bodyDetails: {
      height: "",
      weight: "",
      size: "M",
    },
  })

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to backend
    try {
      // In a real app, this would be an actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store data in localStorage to simulate backend storage
      const resultId = Date.now().toString()
      const tryOnData = {
        id: resultId,
        userImage: formData.userImage,
        selectedClothing: formData.selectedClothing,
        bodyDetails: formData.bodyDetails,
        resultImage: "/placeholder.svg?height=600&width=400", // Simulated result
        createdAt: new Date().toISOString(),
      }

      // Store in localStorage
      const savedTryOns = JSON.parse(localStorage.getItem("tryOns") || "[]")
      savedTryOns.push(tryOnData)
      localStorage.setItem("tryOns", JSON.stringify(savedTryOns))

      // Navigate to results page
      router.push(`/try-on/result/${resultId}`)
    } catch (error) {
      console.error("Error processing try-on:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between mb-8">
          <div
            className={`flex-1 text-center pb-2 border-b-2 ${
              step === 1 ? "border-black font-medium" : "border-gray-200"
            }`}
          >
            1. Upload Photo
          </div>
          <div
            className={`flex-1 text-center pb-2 border-b-2 ${
              step === 2 ? "border-black font-medium" : "border-gray-200"
            }`}
          >
            2. Select Clothing
          </div>
          <div
            className={`flex-1 text-center pb-2 border-b-2 ${
              step === 3 ? "border-black font-medium" : "border-gray-200"
            }`}
          >
            3. Body Details
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <ImageUploader value={formData.userImage} onChange={(image) => updateFormData("userImage", image)} />
          )}

          {step === 2 && (
            <ClothingSelector
              value={formData.selectedClothing}
              onChange={(clothing) => updateFormData("selectedClothing", clothing)}
            />
          )}

          {step === 3 && (
            <BodyDetailsForm
              value={formData.bodyDetails}
              onChange={(details) => updateFormData("bodyDetails", details)}
            />
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !formData.userImage) || (step === 2 && !formData.selectedClothing)}
                className="ml-auto"
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading} className="ml-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Generate Try-On"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
