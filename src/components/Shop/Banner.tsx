"use client";
import Link from 'next/link';
import React, { useState } from 'react';

interface MerchandiseBannerProps {
  linkUrl?: string;
}

const MerchandiseBanner: React.FC<MerchandiseBannerProps> = ({ 
  linkUrl = "https://murangaseal.co.ke/shop" 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-blue-100 text-gray-950 px-4 py-3 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center text-sm sm:text-base pr-8 sm:pr-0">
        
        <p className="font-medium">
          Hurry! Get up to <span className="font-bold">20% OFF</span> on every merchandise.
        </p>

        <Link
          href={linkUrl}
          target='_blank'
          className="mt-2 sm:mt-0 sm:ml-4 inline-flex items-center justify-center px-4 py-1 text-xs font-bold text-gray-950 uppercase transition-colors duration-200 transform bg-primary rounded-full hover:bg-primary/50 focus:outline-none focus:ring focus:ring-gray-950 focus:ring-opacity-80"
        >
          Join Now
        </Link>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-950 hover:text-gray-100 focus:outline-none rounded-full hover:bg-gray-950 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
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

export default MerchandiseBanner;