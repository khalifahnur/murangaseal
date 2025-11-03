import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MembershipBanner() {
  return (
    <div className="bg-linear-to-b from-[#0a0c1b] to-black flex items-center justify-center py-6 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-4xl lg:max-w-6xl bg-white/90 border-b-4 border-primary shadow-2xl overflow-hidden ">
        <div className="relative overflow-hidden bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 min-h-[120px] sm:min-h-[160px] md:min-h-[192px] flex items-center justify-center px-4 sm:px-8">
          <Image 
            src="/assets/Team/mseal-team-photo.jpg" 
            fill 
            className="w-full h-full object-cover opacity-40" 
            alt="Muranga Seals Team" 
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
          />
          
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/40 to-black/20"></div>
          
          {/* Mobile Layout - Stacked */}
          <div className="lg:hidden relative z-10 w-full flex flex-col items-center justify-center gap-3 py-4">
            <span className="text-lg sm:text-xl font-extrabold bg-black/70 px-3 py-1 rounded text-white">
              FOREVER MSEAL
            </span>
            
            <span className="text-xl sm:text-2xl font-extrabold bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-center leading-tight">
              2025/26 MEMBERSHIP
            </span>
            
            <span className="text-base sm:text-lg font-bold text-yellow-300 animate-pulse">
              ON SALE NOW
            </span>
            
            <Link 
              href={'https://www.murangaseal.co.ke'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 bg-linear-to-r from-primary to-gray-900 text-white font-bold py-2 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              BUY NOW
            </Link>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:flex relative z-10 w-full items-center justify-between">
            <div className="flex flex-col items-start space-y-3">
              <span className="text-2xl xl:text-3xl font-extrabold bg-black/60 px-4 py-2 rounded-lg text-white">
                FOREVER MSEAL
              </span>
              
              <span className="text-3xl xl:text-4xl font-extrabold bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                2025/26 MEMBERSHIP
              </span>
              
              <span className="text-xl xl:text-2xl font-bold text-yellow-300 animate-pulse">
                ON SALE NOW
              </span>
            </div>

            <Link 
              href={'https://www.murangaseal.co.ke'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-linear-to-r from-primary to-gray-900 text-white font-bold py-3 px-8 rounded-tl-2xl rounded-br-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}