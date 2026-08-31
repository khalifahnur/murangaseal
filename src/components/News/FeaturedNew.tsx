"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  category?: string; 
  featuredImage?: {
    filename: string;
    alt?: string;
  };
  cloudinaryUrl: string;
  publishDate: string;
}

export default function FeaturedNew({ news }: any) {
  if (!news || news.length === 0) return null;

  const latest = news[0];
  const sidebar = news.slice(1, 7);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const year = d.getFullYear().toString().substring(2);
    return `${day} ${month} '${year}`;
  };

  return (
    <section className="bg-[#f0f0f0] bg-pattern pt-32 pb-20 relative z-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center mb-8">
          <div className="w-12 h-[4px] bg-primary mr-4" />
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#4a0d14]">
            FEATURED NEWS
          </h2>
        </div>
        <Link
          href={`/news/${latest.slug}`}
          className="relative block w-full mb-12 h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group cursor-pointer shadow-2xl"
        >
          <div className="absolute inset-0 w-full h-full">
            <CldImage
              src={latest.cloudinaryUrl}
              alt={latest.title}
              fill
              sizes="(max-width: 1024px) 100vw, 100vw"
              quality="auto:best"
              format="auto"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
          <div className="absolute left-0 top-0 bottom-0 w-full md:w-3/4 lg:w-2/3 p-8 md:p-16 flex flex-col justify-center z-20">
            <div className="flex space-x-4 text-[11px] font-bold tracking-widest mb-4">
              <span className="text-primary uppercase">
                {latest.category || "THE LONG READ"}
              </span>
              <span className="text-gray-300">
                {formatDate(latest.publishDate)}
              </span>
            </div>
            
            <h3 className="text-3xl md:text-5xl lg:text-[54px] font-bold uppercase text-white leading-[1.1] tracking-tight mb-6 line-clamp-4">
              {latest.title}
            </h3>
            
            <p className="text-gray-200 font-medium text-sm md:text-base hidden md:block max-w-xl line-clamp-2">
              {latest.excerpt || latest.title}
            </p>
          </div>
        </Link>

        <div className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-5 md:mx-0 scrollbar-hide">
          {sidebar.map((item: NewsItem) => (
            <Link
              href={`/news/${item.slug}`}
              key={item.id}
              className="flex-none w-[85vw] sm:w-[320px] md:w-[340px] h-[400px] snap-start bg-white flex flex-col group cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-6 md:p-8 flex-1 flex flex-col bg-white z-10">
                <div className="flex space-x-3 text-[10px] font-bold tracking-widest mb-4">
                  <span className="text-primary uppercase">
                    {item.category || "STADIUM GUIDE"}
                  </span>
                  <span className="text-gray-400">
                    {formatDate(item.publishDate)}
                  </span>
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-[#4a0d14] leading-snug group-hover:text-primary transition-colors line-clamp-4">
                  {item.title}
                </h4>
              </div>
              
              <div className="h-[180px] w-full overflow-hidden relative">
                <CldImage
                  src={item.cloudinaryUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  quality="auto"
                  format="auto"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}