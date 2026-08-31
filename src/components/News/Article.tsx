"use client"

import { CldImage } from 'next-cloudinary';
import { RichText } from '../RichText';




interface ArticleData {
  title: string;
  slug: string;
  cloudinaryUrl: string;
  publishDate: string; 
  excerpt?: string | null; 
  /* eslint-disable @typescript-eslint/no-explicit-any */
  content: any;
}

interface ArticleProps {
  article: ArticleData;
}

export default function Article({ article }: ArticleProps) { 

  return (
    <main className="pt-[80px] md:pt-[100px] w-full overflow-x-hidden bg-white">
      <section className="flex flex-col md:flex-row w-full min-h-[600px] lg:min-h-[700px]">
        <div className="w-full md:w-1/2 bg-primary relative flex flex-col justify-center p-8 md:p-12 lg:p-20 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-red-dots opacity-90 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-start h-full pt-10">
            <div className="text-white font-bold tracking-widest text-xs md:text-sm mb-6 uppercase flex space-x-2">
              <span className="opacity-70">{new Date(article.publishDate).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
            
            <h1 className="text-white text-[40px] md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase mb-6 drop-shadow-sm">
              {article.title}
            </h1>
            
            {/* <p className="text-white/95 text-lg md:text-xl font-medium leading-snug mb-16 max-w-[90%]">
              Brentford Under-18s fell to defeat in their U18 Premier League Cup group D opener as they lost 2-0 to Burnley on the road at Barnfield Training Centre on Tuesday afternoon
            </p>
             */}
            
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-[400px] md:h-auto relative">
            <CldImage
            src={article.cloudinaryUrl}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            quality="auto"
            format="auto"
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </section>

      <article className="w-full relative bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <div className="relative mb-12">
            <div className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+2rem)] w-[50vw] h-[3px] bg-[#d31120]"></div>
            
            <div className="text-[#d31120] text-xs font-black tracking-widest uppercase">
              WRITTEN BY MSEAL FOOTBALL CLUB
            </div>
          </div>
          
          <p className="text-[22px] md:text-[26px] text-[#d31120] font-medium leading-snug mb-12">
            {article.title}
          </p>

          <div className="space-y-8 text-gray-700 text-lg md:text-[19px] leading-relaxed font-medium">
           <RichText content={article.content} />
          </div>
        </div>
      </article>


      <article className="w-full relative bg-white">



          <div className="space-y-6 text-gray-700 text-base md:text-lg font-medium">
          <div className="w-full h-px bg-gray-200 mt-20 mb-12"></div>

          

        </div>
      </article>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
