"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { CldImage } from "next-cloudinary";

interface NewsCardItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  timestamp: string;
  type?: string;
  score?: string;
  teams?: string;
  youtubeUrl: string;
}

interface NewsCardProps {
  item: NewsCardItem;
  isHovered?: boolean;
}

export default function PastHighlights({ item, isHovered }: NewsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoId = item.youtubeUrl.match(/(?:v=|\/embed\/|youtu\.be\/)([^&\n?#]+)/)?.[1];

  return (
    <>
      <div className="group cursor-pointer">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="relative overflow-hidden rounded-xl flex-1 w-full">
            <div className="relative aspect-video overflow-hidden rounded-sm">
              <CldImage
                src={item.thumbnail}
                alt={item.title}
                fill
                className={`object-cover transition-transform duration-700 ease-out ${
                  isHovered ? "scale-105" : ""
                }`}
                sizes="(max-width: 768px) 100vw, 600px"
                quality="auto"
                format="auto"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {item.duration && (
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md rounded-sm px-3 py-1.5 text-white text-sm font-medium border border-white/20">
                  {item.duration}
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full p-5 shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-500 hover:rotate-12"
                  aria-label="Play video"
                >
                  <Play size={28} fill="white" className="text-white ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 min-w-0">
            <h4 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-3">
              {item.score && <span className="text-yellow-400 mr-2">{item.score}</span>}
              {item.title}
            </h4>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              {item.timestamp}
            </p>
          </div>
        </div>
      </div>

      {/* YouTube Modal */}
      {isModalOpen && videoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-300 hover:scale-110"
            >
              <X size={24} />
            </button>

            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6 bg-linear-to-b from-gray-900 to-black">
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{item.duration || "Unknown"}</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}