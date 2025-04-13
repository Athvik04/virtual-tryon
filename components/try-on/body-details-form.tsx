"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BodyDetailsForm({ value, onChange }) {
  const handleChange = (field, fieldValue) => {
    onChange({
      ...value,
      [field]: fieldValue,
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Body Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="e.g., 175"
            value={value.height}
            onChange={(e) => handleChange("height", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="e.g., 70"
            value={value.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Size</Label>
        <RadioGroup
          value={value.size}
          onValueChange={(size) => handleChange("size", size)}
          className="flex flex-wrap gap-4"
        >
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <RadioGroupItem value={size} id={`size-${size}`} />
              <Label htmlFor={`size-${size}`}>{size}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <textarea
          id="notes"
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Any specific details about your body type or fit preferences..."
          value={value.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
    </div>
  )
}
