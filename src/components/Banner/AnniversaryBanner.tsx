"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type BannerProps = {
  variant?: "strip" | "floating";
};

export default function AnniversaryBanner({ variant = "strip" }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  const containerClasses =
    variant === "strip"
      ? "w-full"
      : "z-50 mx-4 md:mx-auto max-w-6xl mb-12";

  return (
    <div
      className={`
        relative transform transition-all duration-500 ease-in-out
        ${isClosing ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        ${containerClasses}
      `}
    >
      <div className="relative w-full max-h-[100px] md:max-h-[100px] flex justify-center items-center overflow-hidden">
        
        <div className="w-full h-1/2">
          <Image
            src="/assets/anniversary-banner.png"
            alt="Anniversary Celebration"
            width={500} 
            height={200}
            className="w-full h-1/2 object-contain pointer-events-none"
            priority
          />
        </div>
        <button
          onClick={handleClose}
          className="
            absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 z-30
            p-1.5 md:p-2 
            rounded-full 
            bg-white/20 hover:bg-white/40 
            backdrop-blur-md
            text-black/60 hover:text-black 
            transition-all duration-200
            shadow-sm
          "
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}