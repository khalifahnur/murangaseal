"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />

      <div className="relative w-full md:max-w-lg h-[500px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm transition-colors border border-white/20"
          aria-label="Close banner"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <Image
          src="/assets/preorder-banner.jpeg"
          alt="Preorder Banner"
          fill
          className="object-cover"
          priority
        />

        {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" /> */}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-center z-10">
          <Link href="/shop">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary/80 text-black font-semibold text-sm uppercase tracking-wider rounded-full transition-all transform hover:scale-105 shadow-md">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}