import TryOnForm from "@/components/try-on/try-on-form"

export default function TryOnPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Virtual Try-On</h1>
      <div className="max-w-4xl mx-auto">
        <TryOnForm />
      </div>
    </div>
  )
}
