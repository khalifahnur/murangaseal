"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";
import { JERSEYS_DATA } from "@/components/Shop/Jersey";
import Image from "next/image";
import BuyGoods from "@/components/Shop/BuyGoods";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function JerseyDetail({ params }: PageProps) {
  const resolvedId = use(params);
  const jersey = JERSEYS_DATA[resolvedId.id];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(jersey?.colors[0]);

  if (!jersey) {
    return (
      <main className="bg-background text-foreground min-h-screen flex items-center justify-center mozillaheadline">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Apparel Not Found</h1>
          <Link href="/shop" className="text-gray-950 hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const images = [jersey.image, ...(jersey.additionalImages || [])];

  return (
    <main className="bg-background text-foreground mozillaheadline">
      <div className="max-w-7xl  px-4 py-4 text-sm text-muted-foreground flex items-center gap-2">
        <Link
          href="/shop"
          className="hover:text-foreground transition flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{jersey.name}</span>
      </div>

      <div className="mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-row gap-4">
            {images.length > 1 && (
              <div className="flex flex-col gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-accent"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${jersey.name} ${index}`}
                      className="w-full h-full object-cover"
                      width={1000}
                      height={800}
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="relative overflow-hidden rounded-lg aspect-square">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={jersey.name}
                className="w-full h-full object-cover"
                width={1000}
                height={800}
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                    {jersey.category}
                  </p>
                  <h1 className="text-xl md:text-5xl font-bold leading-tight text-balance">
                    {jersey.name}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-accent"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({jersey.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="border-t border-b border-border py-6">
              <div className="flex items-end gap-4 mb-4">
                <div className="text-xl md:text-5xl font-bold">
                  Ksh.{jersey.price}
                </div>
                {/* <div className="text-xl text-muted-foreground line-through">
                  ${jersey.originalPrice}
                </div> */}
                {/* <div className="ml-auto bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {jersey.discount}% OFF
                </div> */}
              </div>

              <div className="space-y-4">
                <BuyGoods />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="grid grid-cols-6 gap-3">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 border rounded-lg font-semibold transition text-sm ${
                        selectedSize === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Color: {selectedColor}
                </label>
                <div className="flex gap-3">
                  {jersey.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative group ${
                        selectedColor === color
                          ? "ring-2 ring-accent rounded-full"
                          : ""
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full border-2 group-hover:border-accent transition"
                        style={{
                          backgroundColor:
                            color === "Black"
                              ? "#000000"
                              : color === "White"
                              ? "#ffffff"
                              : color === "Navy"
                              ? "#001f3f"
                              : color === "Red"
                              ? "#e74c3c"
                              : color === "Blue"
                              ? "#0066cc"
                              : color === "Gray"
                              ? "#999999"
                              : color === "Beige"
                              ? "#f5f5dc"
                              : color === "Gold"
                              ? "#ffd700"
                              : color === "Charcoal"
                              ? "#36454f"
                              : color === "Cream"
                              ? "#fffdd0"
                              : "#cccccc",
                          borderColor:
                            selectedColor === color ? "transparent" : "#d4d4d4",
                        }}
                        title={color}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12 px-4 border-t border-border">
          <div>
            <h3 className="font-semibold text-lg mb-2">About {jersey.name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {jersey.description}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Key Features</h3>
            <ul className="space-y-3">
              {jersey.features.map((feature: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Specifications</h3>
            <div className="space-y-4">
              {jersey.specifications &&
                Object.entries(jersey.specifications as Record<string, string | number>).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 pb-3 border-b border-border"
                  >
                    <span className="text-muted-foreground capitalize">
                      {key}
                    </span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
