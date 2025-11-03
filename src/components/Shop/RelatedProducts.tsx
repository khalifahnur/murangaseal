"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import ProductDetailsModal from "./ProductDetails"


export default function RelatedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  const products = [
    {
      id: 1,
      name: "Athlete Shorts",
      price: "$79",
      rating: 4.8,
      image: "/athletic-shorts.png",
      description: "Premium athletic shorts designed for maximum comfort and performance during any activity.",
      features: [
        "Moisture-wicking fabric",
        "Elastic waistband with drawstring",
        "Multiple pockets for storage",
        "Breathable mesh lining",
        "Lightweight and flexible",
        "Available in multiple colors",
      ],
      specs: [
        { label: "Material", value: "92% Polyester, 8% Spandex" },
        { label: "Care", value: "Machine wash warm" },
        { label: "Fit Type", value: "Athletic" },
        { label: "Inseam Length", value: "Various options" },
      ],
    },
    {
      id: 2,
      name: "Performance Socks",
      price: "$29",
      rating: 4.9,
      image: "/athletic-socks.jpg",
      description: "Engineered performance socks with superior cushioning and moisture management technology.",
      features: [
        "Advanced cushioning system",
        "Arch support technology",
        "Moisture-wicking fibers",
        "Blister prevention zones",
        "Odor-resistant treatment",
        "Pack of 3 pairs",
      ],
      specs: [
        { label: "Material", value: "75% Polyester, 25% Nylon" },
        { label: "Care", value: "Machine wash cold" },
        { label: "Fit Type", value: "Crew" },
        { label: "Pack Size", value: "3 pairs" },
      ],
    },
    {
      id: 3,
      name: "Sports Cap",
      price: "$39",
      rating: 4.7,
      image: "/sports-cap.jpg",
      description: "Stylish and functional sports cap perfect for outdoor activities and casual wear.",
      features: [
        "Adjustable back strap",
        "UV protection",
        "Breathable mesh panels",
        "Curved bill design",
        "One size fits most",
        "Multiple color options",
      ],
      specs: [
        { label: "Material", value: "100% Polyester" },
        { label: "Closure", value: "Adjustable strap" },
        { label: "Style", value: "Baseball cap" },
        { label: "UV Protection", value: "UPF 50+" },
      ],
    },
    {
      id: 4,
      name: "Training Jacket",
      price: "$149",
      rating: 4.9,
      image: "/training-jacket.jpg",
      description:
        "Premium training jacket with advanced weather protection and ergonomic design for intense workouts.",
      features: [
        "Water-resistant outer layer",
        "Thermal insulation",
        "Ventilation panels",
        "Multiple pockets",
        "Reflective details for visibility",
        "Zippered sleeves",
      ],
      specs: [
        { label: "Material", value: "Shell: 100% Polyester" },
        { label: "Care", value: "Machine wash cold" },
        { label: "Fit Type", value: "Performance fit" },
        { label: "Weather Resistant", value: "Water-resistant" },
      ],
    },
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-12">You Might Also Like</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-accent transition">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold">{product.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-accent" />
                  <span className="text-sm text-muted-foreground">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
