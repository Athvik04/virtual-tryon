import { Camera, Shirt, Sparkles, Download } from "lucide-react"

const steps = [
  {
    icon: <Camera className="h-8 w-8" />,
    title: "Upload Your Photo",
    description: "Take a picture or upload one from your gallery.",
  },
  {
    icon: <Shirt className="h-8 w-8" />,
    title: "Choose Clothing",
    description: "Browse our catalog and select items you want to try on.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "AI Magic",
    description: "Our AI technology creates a realistic virtual try-on image.",
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: "Save & Share",
    description: "Download your virtual try-on image or share it with friends.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
