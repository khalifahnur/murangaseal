"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
export default function AllNews({ news }: any) {
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric", 
      year: "numeric"
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <section className="relative w-full py-12 md:py-20 px-4 md:px-6 lg:px-8 grow mozillaheadline">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-200 pb-6">
            <div>
              <h2 className="text-lg md:text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                All <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-gray-600">News</span>
              </h2>
            </div>

            <div className="text-gray-500 font-medium text-sm">
              Showing {news?.length || 0} Articles
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {news?.map((item: NewsItem) => (
              <Link href={`/news/${item.slug}`} key={item.id} className="group h-full">
                <div className="
                  relative flex flex-col h-full bg-white rounded-sm overflow-hidden 
                   transition-all duration-300 
                  border border-gray-100 hover:-translate-y-1
                ">
                  
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${item.cloudinaryUrl || "/assets/placeholder.jpg"}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border-l-4 border-primary">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
                        {formatDate(item.publishDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col grow p-6">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 grow">
                      {item.excerpt || "Click to read the full story and view gallery..."}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                        Read Article
                      </span>
                      <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </Link>
            ))}
          </div>

          {(!news || news.length === 0) && (
             <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No news articles found.</p>
             </div>
          )}
          
        </div>
      </section>
      <Footer />
    </div>
  );
}