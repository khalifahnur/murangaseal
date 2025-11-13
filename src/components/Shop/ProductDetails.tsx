"use client";

import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  features: string[];
  specs: Array<{ label: string; value: string }>;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductDetailsModal({
  isOpen,
  onClose,
  product,
}: ProductDetailsModalProps) {
  if (!isOpen || !product) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-full transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <section className="flex items-center justify-between pb-6 border-b border-border">
              <div>
                <div className="text-3xl font-bold mb-2">{product.price}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <span className="font-semibold">{product.rating}/5</span>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold">Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {product.specs.map((spec, index) => (
                  <div key={index} className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      {spec.label}
                    </p>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
