"use client";
import React from "react";

import Link from "next/link";
// import { useState } from "react";

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
export default function News({ news }: any) {
  //const [currentIndex, setCurrentIndex] = useState(0);

  const latest = news[0];
  const sidebar = news.slice(1);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <section
        className="relative w-full py-8 px-4 mozillaheadline"
        id="latest"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/assets/bg.jpg')`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-lg">
              <Link href={`/news/${latest.slug}`}>
                <div className="relative h-[500px] lg:h-[600px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${latest.cloudinaryUrl}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-white bg-primary rounded uppercase">
                      LATEST NEWS
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-2">
                      {latest.title}
                    </h1>
                    <p className="text-white/80 text-sm mt-2">
                      {formatDate(latest.publishDate)}
                    </p>
                  </div>
                </div>
              </Link>

              {/* <div className="flex gap-2 mt-4 justify-center">
                {news.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 rounded-full transition-all ${
                      i === currentIndex ? "bg-blue-500 w-8" : "bg-white/40 w-6"
                    }`}
                  />
                ))}
              </div> */}
            </div>

            <div className="space-y-6">
              {sidebar.map((item: NewsItem) => (
                <Link href={`/news/${item.slug}`} key={item.id}>
                  <div className="relative group cursor-pointer overflow-hidden rounded-lg h-[237px] lg:h-[290px] mt-2">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${item.cloudinaryUrl}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-sm font-bold text-white leading-snug mt-2">
                        {item.title}
                      </h3>
                      <span className="inline-block px-2 py-5 text-xs font-bold tracking-wider text-white uppercase">
                        {formatDate(item.publishDate)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {news.length > 2 && (
        <div className="flex justify-end px-30 pb-3">
          <Link href="/news">
            <button className="bg-primary text-white text-sm px-6 py-2 rounded-full hover:bg-gray-900 hover:text-white transition-colors cursor-pointer">
              View more
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
