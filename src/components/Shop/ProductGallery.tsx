"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductGallery() {
  const [mainImageIndex, setMainImageIndex] = useState(0)

  const images = [
    "/athletic-jersey-front-view.jpg",
    "/athletic-jersey-back-view.jpg",
    "/athletic-jersey-detail-stitching.jpg",
    "/athletic-jersey-fabric-texture.jpg",
  ]

  const handlePrevious = () => {
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square group">
        <Image
          src={images[mainImageIndex] || "/placeholder.svg"}
          alt="Product main view"
          fill
          className="object-cover"
        />
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImageIndex(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
              index === mainImageIndex ? "border-primary" : "border-border hover:border-primary"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Product view ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
