// "use client";

// import Image from "next/image";
// import { X } from "lucide-react";
// import { useState } from "react";
// import Link from "next/link";

// export function HeroBanner() {
//   const [isVisible, setIsVisible] = useState(true);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//         onClick={() => setIsVisible(false)}
//       />

//       <div className="relative w-full md:max-w-lg h-[500px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
//         <button
//           onClick={() => setIsVisible(false)}
//           className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm transition-colors border border-white/20"
//           aria-label="Close banner"
//         >
//           <X className="w-5 h-5 text-white" />
//         </button>

//         <Image
//           src="/assets/flash-sale.jpeg"
//           alt="flash-sale"
//           fill
//           className="object-cover "
//           priority
//         />

//         {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" /> */}

//         {/* <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-center z-10">
//           <Link href="/shop">
//             <button className="px-6 py-2.5 bg-primary hover:bg-primary/80 text-black font-semibold text-sm uppercase tracking-wider rounded-full transition-all transform hover:scale-105 shadow-md">
//               Buy Now
//             </button>
//           </Link>
//         </div> */}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();

      target.setHours(13, 0, 0, 0);

      if (now > target) {
        target.setDate(target.getDate() + 1);
      } else {
        target.setDate(target.getDate() + 1); 
      }

      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setIsVisible(false);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  if (!isVisible || !hasMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsVisible(false)}
      />

      <div className="relative w-full md:max-w-lg h-[550px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/10 hover:bg-red-600/90 text-white backdrop-blur-md transition-all border border-white/10 shadow-lg group"
          aria-label="Close banner"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        <div className="relative w-full flex-1  sm:min-h-[500px]">
          <Image
            src="/assets/flash-sale.jpeg"
            alt="Murang'a Seal Flash Sale"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="absolute top-0 left-0 right-0 pt-6 pb-6 px-6 z-20 flex flex-col items-center">
            
          <div className="mb-2 flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm">
            <span>Offer Ends In</span>
          </div>

          <div className="flex items-center gap-4 text-white">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-md  flex items-center justify-center text-lg font-bold shadow-lg">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-xs text-gray-400 mt-1 font-medium">HRS</span>
            </div>
            
            <span className="text-lg font-bold text-primary pb-4">:</span>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-md  flex items-center justify-center text-lg font-bold shadow-lg">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-xs text-gray-400 mt-1 font-medium">MIN</span>
            </div>

            <span className="text-lg font-bold text-primary pb-4">:</span>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-red-600/90 border border-red-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-red-900/50">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-xs text-red-400 mt-1 font-medium">SEC</span>
            </div>
          </div>
          
          {/* Optional CTA if you want it back later */}
           {/* <Link href="/shop" className="mt-6 w-full">
            <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-wider rounded-lg shadow-lg transition-transform active:scale-95">
              Shop Now
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}