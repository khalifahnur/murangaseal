"use client";

import { Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FeaturedNewsProps {
  item: {
    id: number;
    title: string;
    thumbnail: string;
    duration: string;
    timestamp: string;
    type?: string;
    score?: string;
    teams?: string;
    videoUrl?: string;
  };
}

export default function FeaturedNews({ item }: FeaturedNewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className=" mozillaheadline group cursor-pointer">
        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          <Image
            src={item.thumbnail || "/placeholder.svg"}
            alt={item.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            width={1000}
            height={800}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* {item.score && (
          <div className="absolute top-4 left-4 bg-primary rounded-lg px-4 py-3 backdrop-blur-sm">
            <div className="text-white font-bold text-lg">{item.type}</div>
            <div className="text-white font-black text-2xl">{item.score}</div>
          </div>
        )} */}

          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded px-2.5 py-1.5 text-white text-xs font-semibold">
            {item.duration}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={openModal}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full p-5 shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-500 hover:rotate-12"
              aria-label="Play video"
            >
              <Play size={28} fill="white" className="text-white ml-1" />
            </button>
          </div>
          <div className="absolute bottom-4 right-4 text-white/80 text-sm font-medium backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full">
            {item.timestamp}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
          {item.teams && (
            <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">
              {item.teams}
            </p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-300 hover:scale-110"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="relative aspect-video bg-black">
              {item.videoUrl ? (
                <video
                  controls
                  controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
                  autoPlay
                  className="w-full h-full object-contain custom-video-controls"
                  poster={item.thumbnail}
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Play size={64} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video not available</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-linear-to-b from-gray-900 to-black">
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{item.duration}</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
