"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageUploader({ value, onChange }) {
  const fileInputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(value)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Create a preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onChange(url)
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // In a real app, you would implement a camera UI here
      // For this example, we'll just simulate it by opening the file picker
      fileInputRef.current?.click()
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Could not access camera. Please check permissions or use file upload instead.")
    }
  }

  const clearImage = () => {
    setPreviewUrl(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Upload Your Photo</h3>

      {previewUrl ? (
        <div className="relative w-full max-w-md mx-auto">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
            <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-md mx-auto">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">Drag and drop your image here, or click to select a file</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <Button type="button" variant="outline" onClick={handleCameraCapture}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Supported formats: JPG, PNG. Max size: 5MB</p>
        </div>
      )}
    </div>
  )
}
