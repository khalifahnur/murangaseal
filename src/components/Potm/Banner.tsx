"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

interface VoteMatchBannerProps {
  linkUrl?: string;
}

const VoteMatchBanner: React.FC<VoteMatchBannerProps> = ({ 
  linkUrl = "/vote/player-of-the-month", 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gray-900 text-white px-4 py-3 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left pr-8 sm:pr-0">
        
        <div className="relative w-12 h-12 shrink-0">
           
          <Image 
            src={'/assets/potm/potm.jpg'} 
            alt="Player of the Month" 
            width={120}
            height={60}
            //className=" object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-300 uppercase tracking-wide">
            December Nominees
          </p>
          <p className="font-bold text-sm sm:text-base">
            Who was your <span className="text-primary">Player of the Month?</span>
          </p>
        </div>

        <Link
          href={linkUrl}
          target='_blank'
          className="mt-2 sm:mt-0 inline-flex items-center justify-center px-6 py-2 text-xs font-bold text-gray-900 uppercase transition-all duration-200 transform bg-primary rounded-full hover:bg-primary/50 hover:scale-105 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Vote Now
        </Link>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
        className="absolute right-2 top-2 sm:top-1/2 sm:-translate-y-1/2 p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default VoteMatchBanner;