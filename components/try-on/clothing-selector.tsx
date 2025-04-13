"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Mock clothing data
const clothingItems = {
  shirts: [
    {
      id: "shirt1",
      name: "Classic White Shirt",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["white", "blue", "black"],
    },
    {
      id: "shirt2",
      name: "Casual T-Shirt",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["gray", "red", "green"],
    },
    {
      id: "shirt3",
      name: "Formal Shirt",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["white", "light-blue", "pink"],
    },
  ],
  pants: [
    {
      id: "pants1",
      name: "Slim Fit Jeans",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["blue", "black", "gray"],
    },
    {
      id: "pants2",
      name: "Chino Pants",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["beige", "navy", "olive"],
    },
    {
      id: "pants3",
      name: "Dress Pants",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["black", "gray", "navy"],
    },
  ],
  dresses: [
    {
      id: "dress1",
      name: "Summer Dress",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["floral", "blue", "red"],
    },
    {
      id: "dress2",
      name: "Evening Gown",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["black", "red", "silver"],
    },
    {
      id: "dress3",
      name: "Casual Dress",
      image: "/placeholder.svg?height=200&width=200",
      colors: ["green", "yellow", "pink"],
    },
  ],
}

const colorMap = {
  white: "bg-white border border-gray-200",
  blue: "bg-blue-500",
  black: "bg-black",
  gray: "bg-gray-500",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  pink: "bg-pink-500",
  "light-blue": "bg-blue-300",
  beige: "bg-yellow-100",
  navy: "bg-blue-900",
  olive: "bg-olive-500",
  silver: "bg-gray-300",
  floral: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300",
}

export default function ClothingSelector({ value, onChange }) {
  const [selectedCategory, setSelectedCategory] = useState("shirts")
  const [selectedItem, setSelectedItem] = useState(value?.id || null)
  const [selectedColor, setSelectedColor] = useState(value?.color || null)

  const handleItemSelect = (item) => {
    setSelectedItem(item.id)
    setSelectedColor(item.colors[0])
    onChange({
      id: item.id,
      name: item.name,
      image: item.image,
      color: item.colors[0],
      category: selectedCategory,
    })
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color)
    onChange({
      ...value,
      color: color,
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Select Clothing</h3>

      <Tabs defaultValue="shirts" onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shirts">Shirts</TabsTrigger>
          <TabsTrigger value="pants">Pants</TabsTrigger>
          <TabsTrigger value="dresses">Dresses</TabsTrigger>
        </TabsList>

        {Object.keys(clothingItems).map((category) => (
          <TabsContent key={category} value={category}>
            <RadioGroup
              value={selectedItem}
              onValueChange={(id) => {
                const item = clothingItems[category].find((item) => item.id === id)
                if (item) handleItemSelect(item)
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
            >
              {clothingItems[category].map((item) => (
                <div key={item.id} className="relative">
                  <RadioGroupItem value={item.id} id={item.id} className="sr-only" />
                  <Label
                    htmlFor={item.id}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer ${
                      selectedItem === item.id ? "border-black" : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <div className="relative h-40 w-40 mb-3">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
        ))}
      </Tabs>

      {selectedItem && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Select Color:</h4>
          <div className="flex space-x-3">
            {clothingItems[selectedCategory]
              .find((item) => item.id === selectedItem)
              ?.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full ${colorMap[color]} ${
                    selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                  }`}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
