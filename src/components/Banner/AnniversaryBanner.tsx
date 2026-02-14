"use client";
import React, { useEffect, useState } from "react";
import { Shield, Trophy, X } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";

type BannerProps = {
  variant?: "strip" | "floating";
};

export default function AnniversaryBanner({ variant = "strip" }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  if (!isVisible) return null;

  const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={`
        transform transition-all duration-500 ease-in-out mozillaheadline 
        ${isClosing ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        ${variant === "strip" ? "relative w-full border-b border-yellow-500" : "relative z-50 -mt-6 mx-4 md:mx-auto max-w-5xl mb-12 rounded-2xl shadow-xl ring-4 ring-white/50"}
      `}
      style={{
        backgroundColor: "#FACC15",
        backgroundImage: bgPattern,
      }}
    >
      {variant === "strip" && (
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
          <Image
            src="/assets/anniversary.png"
            alt="Muranga Seals"
            width={500}
            height={400}
            className="md:h-32 md:w-auto absolute -left-5 -bottom-10 w-25 h-25 text-black"
          />
        </div>
      )}

      {mounted && showConfetti && isVisible && (
        <div className="fixed inset-0 pointer-events-none z-999">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={180}
            tweenDuration={4200}
            gravity={0.18}
            colors={["#FACC15", "#111827", "#ffffff", "#eab308", "#ca8a04"]}
          />
        </div>
      )}

      <div
        className={`
        flex flex-row md:items-center justify-between gap-4 relative z-10
        ${variant === "strip" ? "max-w-7xl mx-auto md:px-4 py-3 px-6 lg:px-8" : "p-4 md:p-6"}
      `}
      >
        <div className="flex items-center gap-4 md:text-center text-left">
          <div>
            <p className="font-bold text-black text-sm md:text-lg leading-tight">
              Murang'a Seal FC{" "}
              <span className="text-yellow-800 text-sm md:text-lg">
                celebrates 10 Years
              </span>
            </p>
            <p className="text-sm md:text-lg text-black/80 ">
              A decade of passion, pride & football excellence — thank you,
              SealNation!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3  justify-center">
          {/* <a
            href="#"
            className="bg-black text-yellow-400 px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-md w-full sm:w-auto text-center whitespace-nowrap"
          >
            
          </a> */}
          <button
            onClick={handleClose}
            className="text-black/60 hover:text-black p-2 rounded-full hover:bg-black/5 transition"
            aria-label="Dismiss banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
