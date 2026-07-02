"use client"

import React from "react";
import { RichText } from "@/components/RichText";
import { CldImage } from "next-cloudinary";

// 1. Define the shape of the actual article data
interface ArticleData {
  title: string;
  slug: string;
  cloudinaryUrl: string;
  publishDate: string; // JSON serializes dates as strings
  excerpt?: string | null; // Optional because it's not required in Payload
  /* eslint-disable @typescript-eslint/no-explicit-any */
  content: any; // Payload RichText returns an object, not a string
}

// 2. Define the shape of the component's props
interface ArticleProps {
  article: ArticleData;
}

// 3. Now destructuring { article } matches the ArticleProps interface
export default function Article({ article }: ArticleProps) {
  return (
    <div className="min-h-screen bg-gray-50 mozillheadline">
      {article.cloudinaryUrl && (
        <div className="relative w-full h-[40vh] overflow-hidden">
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
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/70" />
        </div>
      )}
      <div className="h-2 bg-linear-to-r from-black via-gray-700 to-black" />
      <article className="container mx-auto px-4 max-w-7xl -mt-32 mb-10 relative z-10">
        <div className="bg-white shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-between pb-4 mb-6 border-b-4 border-black">
            <time className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              {new Date(article.publishDate).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-serif text-gray-900 border-l-8 border-black pl-6">
            {article.title}
          </h1>

          {article.excerpt && (
            <div className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-serif italic border-l-4 border-gray-300 pl-6 py-2">
              {article.excerpt}
            </div>
          )}

          <div className="flex items-center gap-2 mb-8">
            <div className="h-px bg-gray-300 flex-1" />
            <div className="w-2 h-2 bg-black rotate-45" />
            <div className="h-px bg-gray-300 flex-1" />
          </div>
          
          {/* RichText expects the object format from Payload */}
          <RichText content={article.content} />
        </div>

        <div className="h-2 bg-linear-to-r from-black via-gray-700 to-black" />
      </article>
    </div>
  );
}