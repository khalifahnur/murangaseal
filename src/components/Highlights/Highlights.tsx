"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Play, X, Clock } from "lucide-react";
import { CldImage } from "next-cloudinary";

interface Highlight {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  createdAt: string;
  type?: string;
  score?: string;
  teams?: string;
  youtubeUrl: string;
  featured?: boolean;
}

interface HighlightWithTime extends Highlight {
  timestamp: string;
}


const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};


export default function Highlights({
  featured,
  sidebar,
}: {
  featured: Highlight;
  sidebar: Highlight[];
}) {
  const withTime = (item: Highlight): HighlightWithTime => ({
    ...item,
    timestamp: formatDistanceToNow(new Date(item.createdAt), {
      addSuffix: true,
    }),
  });

  const featuredItem = withTime(featured);
  const sidebarItems = sidebar.map(withTime);

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#111111]">
      <div className="container mx-auto">
        <div className="flex items-center mb-10">
          <div className="w-12 h-[4px] bg-primary mr-4" />
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
            MATCH HIGHLIGHTS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <FeaturedHighlights item={featuredItem} />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-3 mb-2">
              Most Recent
            </h3>

            <div className="flex flex-col gap-4">
              {sidebarItems.map((item) => (
                <PastHighlights key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedHighlights({ item }: { item: HighlightWithTime }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoId = getYouTubeId(item.youtubeUrl);

  return (
    <>
      <div className="group cursor-pointer flex flex-col h-full">
        <div
          className="relative overflow-hidden shadow-2xl w-full aspect-video bg-black rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <CldImage
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            sizes="(max-width: 1024px) 100vw, 66vw"
            quality="auto:best"
            format="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300">
              <Play size={28} fill="white" className="text-white ml-1" />
            </div>
          </div>
          {item.duration && (
            <div className="absolute bottom-4 right-4 bg-black/90 px-3 py-1.5 text-white text-xs font-bold tracking-wider rounded">
              {item.duration}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-xs font-bold tracking-widest mb-3">
            <span className="text-primary uppercase">
              {item.teams || "HIGHLIGHTS"}
            </span>
            <span className="text-gray-400">{item.timestamp}</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold uppercase text-white leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
        </div>
      </div>

      {isModalOpen && videoId && (
        <VideoModal item={item} videoId={videoId} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

function PastHighlights({ item }: { item: HighlightWithTime }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoId = getYouTubeId(item.youtubeUrl);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer flex gap-4 p-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
      >
        <div className="relative shrink-0 w-[40%] max-w-[160px] aspect-video overflow-hidden rounded shadow-lg bg-black">
          <CldImage
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500  opacity-80 group-hover:opacity-100"
            sizes="(max-width: 640px) 40vw, 160px"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg scale-90 transition-transform duration-300">
              <Play size={16} fill="white" className="text-white ml-0.5" />
            </div>
          </div>

          {item.duration && (
            <div className="absolute bottom-1.5 right-1.5 bg-black/90 px-1.5 py-0.5 text-[10px] font-bold text-white rounded">
              {item.duration}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          {item.score && (
            <span className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
              {item.score}
            </span>
          )}

          <h4 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
            {item.title}
          </h4>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-bold uppercase tracking-wide">
            <Clock className="w-3 h-3" />
            {item.timestamp}
          </div>
        </div>
      </div>

      {isModalOpen && videoId && (
        <VideoModal item={item} videoId={videoId} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

function VideoModal({ item, videoId, onClose }: { item: HighlightWithTime, videoId: string, onClose: () => void }) {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
  }

  const handleClose = () => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white transition-opacity"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-gray-800">
          <h3 className="text-sm font-bold uppercase text-white tracking-wide truncate pr-4">
            {item.title}
          </h3>
          <button
            onClick={handleClose}
            className="bg-white/10 hover:bg-primary hover:text-white rounded-full p-2 text-gray-300 transition-colors duration-300"
          >
            <X size={20} />
          </button>
        </div>
        <div className="relative aspect-video bg-black w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}