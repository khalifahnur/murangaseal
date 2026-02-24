"use client";
import React, { useState } from "react";
import Header from "../Home/HeaderSection";
import { Footer } from "../Home/Footer";
import { formatDistanceToNow } from "date-fns";
import PastHighlights from "./PastHighlights";
import AllVideos from "./AllVideos";

interface Highlight {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  createdAt: string;
  type: string;
  score?: string;
  teams: string;
  youtubeUrl: string;
  featured?: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function AllHighlights({highlights}: {highlights:Highlight[]}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const withTime = (item: Highlight) => ({
    ...item,
    timestamp: formatDistanceToNow(new Date(item.createdAt), {
      addSuffix: true,
    }),
  });

  const videos = highlights.map(withTime);

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
                All{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-gray-600">
                  Highlights
                </span>
              </h2>
            </div>

            <div className="text-gray-500 font-medium text-sm">
              Showing {highlights?.length || 0} Videos
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos?.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <AllVideos
                  item={item}
                  isHovered={hoveredCard === item.id}
                />
              </div>
            ))}
          </div>

          {(!videos || videos.length === 0) && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No videos found.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
