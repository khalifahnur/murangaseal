"use client";

import { useState, useEffect } from 'react';
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function NewsWidget({ news }: { news: any }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = news?.slice(0, 4) || [];

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!news || news.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).toUpperCase();
  };

  return (
    <section className="relative w-full flex flex-col md:block md:h-[80vh] md:min-h-[750px] bg-white md:bg-black overflow-hidden">
      {slides.map((slide:any, index:any) => (
        <div 
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-[60vh] md:h-full transition-opacity duration-1000 ${
            index === activeSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          <div className="absolute inset-0 bg-pattern-diagonal opacity-30 z-10 pointer-events-none" />
          
          {slide.cloudinaryUrl ? (
            <CldImage
              src={slide.cloudinaryUrl}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 100vw"
              quality="auto:best"
              format="auto"
              className="object-cover object-top transition-transform duration-[10000ms] ease-out z-0 
                
              "
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900 z-0" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/70 to-transparent z-10 pointer-events-none" />
        </div>
      ))}
      
      <div 
        className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[300px] bg-pattern-red-dots opacity-40 z-10 pointer-events-none" 
        style={{ maskImage: 'linear-gradient(to top right, black, transparent)' }} 
      />
      
      <div className="relative z-20 w-full md:absolute md:inset-0 md:mx-auto md:px-6 lg:px-24 md:pb-12 flex flex-col md:flex-row md:items-end h-full mt-[50vh] md:mt-0">
        <div className="bg-white md:bg-transparent text-gray-900 md:text-white px-8 py-10 md:p-0 md:mt-0 relative z-20 mx-4 md:mx-0 w-[calc(100%-2rem)] md:w-1/2 mb-0 md:mb-12 shadow-xl md:shadow-none">
          
          <div className="text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 transition-all duration-500">
            {slides[activeSlide].category || 'CLUB NEWS'}
          </div>
          
          <Link href={`/news/${slides[activeSlide].slug}`} className="block group">
            <h1 className="text-[32px] md:text-3xl lg:text-4xl font-bold uppercase leading-[1.05] md:leading-[1] tracking-tighter mb-4 md:mb-6 transition-all duration-500 group-hover:text-gray-300 line-clamp-4">
              {slides[activeSlide].title}
            </h1>
          </Link>

          <div className="text-xs md:text-sm font-semibold tracking-wider text-gray-500 md:text-gray-300 transition-all duration-500">
            {formatDate(slides[activeSlide].publishDate)}
          </div>
          

          <div className="hidden md:flex space-x-6 mt-16">
            <div className="flex flex-row items-end space-x-6">
              {slides.map((slide:any, index:any) => (
                <div 
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className={`flex flex-col cursor-pointer transition-opacity ${
                    index === activeSlide ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className="text-white text-xl font-bold mb-2">0{index + 1}</span>
                  <div 
                    className={`h-[3px] transition-all duration-500 ${
                      index === activeSlide ? 'w-32 bg-primary' : 'w-12 bg-white'
                    }`} 
                  />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}