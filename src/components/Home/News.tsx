"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  featuredImage?: {
    filename: string;
    alt?: string;
  };
  cloudinaryUrl?: string;
  publishDate: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function NewsWidget({ news }: any) {
  if (!news || news.length === 0) return null;

  const latest = news[0];
  const sidebar = news.slice(1, 5);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      className="relative w-full py-12 px-4 md:px-6 lg:px-8 bg-neutral-50 mozillaheadline"
      id="latest"
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/bg.jpg')`,
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-8">
            <Link href={`/news/${latest.slug}`} className="group block h-full">
              <div className="relative h-[450px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-xl shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${latest.cloudinaryUrl}')` }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                  <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-primary rounded-sm shadow-md">
                    Featured
                  </span>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] tracking-tight mb-4 group-hover:text-gray-200 transition-colors">
                    {latest.title}
                  </h3>

                  <div className="flex items-center gap-6 text-gray-300 text-sm font-medium">
                    <span className="flex items-center gap-2">
                      {formatDate(latest.publishDate)}
                    </span>
                    <span className="flex items-center gap-1 text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="lg:col-span-3 xl:col-span-4 flex flex-col gap-4">
            <div
              className="
              flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4
              md:grid md:grid-cols-2 md:gap-4 md:pb-0 md:mx-0 md:px-0
              lg:flex lg:flex-col lg:h-full lg:gap-4
            "
            >
              {sidebar.map((item: NewsItem) => (
                <Link
                  href={`/news/${item.slug}`}
                  key={item.id}
                  className="
                    relative shrink-0 snap-center w-[85vw] md:w-auto
                    group overflow-hidden bg-white border border-gray-100
                    transition-all duration-300 hover:-translate-y-1
                  "
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative h-48 md:h-40 lg:w-1/3 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url('${item.cloudinaryUrl}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors lg:hidden" />
                    </div>
                    <div className="p-4 flex flex-col justify-center lg:w-2/3">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {formatDate(item.publishDate)}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <div className="mt-3 flex items-center text-xs font-bold text-primary uppercase tracking-wide opacity-0 lg:opacity-100 lg:group-hover:translate-x-2 lg:transition-transform lg:duration-300">
                        Read More <ChevronRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end w-full border-t border-gray-200 pt-6">
          <Link
            href="/news"
            className="
      group flex items-center gap-3
      text-gray-500 font-bold uppercase tracking-widest text-sm
      hover:text-primary transition-colors duration-300
    "
          >
            More News
            <span
              className="
      flex items-center justify-center w-8 h-8 
      rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white
      transition-all duration-300
    "
            >
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
