"use client";
import React from "react";
import Link from "next/link";
import Header from "../Home/HeaderSection";
import { Footer } from "../Home/Footer";

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
export default function AllNews({ news }:any) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric",
    });
  };


  return (
    <>
    <Header />
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

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">ALL NEWS</h2>
          <div className="w-16 h-1.5 bg-primary rounded-full"></div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item: NewsItem) => (
              <Link href={`/news/${item.slug}`} key={item.id}>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-[350px] flex flex-col">
                  {/* Image Section - 3/4 */}
                  <div className="relative h-3/4 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: 
                           `url(${item.cloudinaryUrl})`,
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-white bg-gray-950 rounded uppercase">
                        {formatDate(item.publishDate)}
                      </span>
                    </div>
                  </div>

                  <div className="h-1/4 p-4 flex items-center bg-white">
                    <h3 className="text-sm md:text-xl font-bold text-gray-900 leading-tight line-clamp-2 underline">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}