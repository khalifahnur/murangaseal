// "use client";

// import { useState } from "react";
// import { Play, X, Clock } from "lucide-react";
// import { CldImage } from "next-cloudinary";

// interface NewsCardItem {
//   id: string;
//   title: string;
//   thumbnail: string;
//   duration?: string;
//   timestamp: string;
//   type?: string;
//   score?: string;
//   teams?: string;
//   youtubeUrl: string;
// }

// interface NewsCardProps {
//   item: NewsCardItem;
//   isHovered?: boolean;
// }

// export default function AllVideos({ item, isHovered }: NewsCardProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const getYouTubeId = (url: string) => {
//     if (!url) return null;
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   const videoId = getYouTubeId(item.youtubeUrl);

//   // Function to toggle modal and handle body scroll
//   const toggleModal = (state: boolean) => {
//     setIsModalOpen(state);
//     if (typeof window !== "undefined") {
//       document.body.style.overflow = state ? "hidden" : "auto";
//     }
//   };

//   return (
//     <>
//       <div 
//         onClick={() => toggleModal(true)}
//         className="group cursor-pointer bg-transparent rounded-xl transition-all duration-300 hover:bg-white/5 p-2 -mx-2 mozillaheadline"
//       >
//         <div className="flex flex-row items-start gap-4">

//           <div className="relative shrink-0 w-[40%] sm:w-40 lg:w-[180px] overflow-hidden rounded-lg shadow-lg">
//             <div className="relative aspect-video w-full">
//               <CldImage
//                 src={item.thumbnail}
//                 alt={item.title}
//                 fill
//                 className={`object-cover transition-transform duration-700 ease-out ${
//                   isHovered ? "scale-110" : "scale-100"
//                 }`}
//                 sizes="(max-width: 640px) 40vw, 180px"
//               />
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
//                   <Play size={16} fill="white" className="text-white ml-0.5" />
//                 </div>
//               </div>

//               {item.duration && (
//                 <div className="absolute bottom-1 right-1 bg-black/80 rounded px-1.5 py-0.5 text-[10px] font-bold text-white">
//                   {item.duration}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
//             {item.score && (
//                 <span className="text-xs font-black text-primary mb-1 uppercase tracking-wider">
//                   {item.score}
//                 </span>
//             )}
            
//             <h4 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
//               {item.title}
//             </h4>
            
//             <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
//                <Clock className="w-3 h-3" />
//                {item.timestamp}
//             </div>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && videoId && (
//         <div
//           className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
//           onClick={() => toggleModal(false)}
//         >
//           <div
//             className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between p-4 bg-gray-900/50 border-b border-gray-800">
//                <h3 className="text-sm font-bold text-white truncate pr-4 hidden sm:block">
//                   {item.title}
//                </h3>
//                <span className="sm:hidden text-xs text-primary font-bold uppercase">Now Playing</span>

//                <button
//                 onClick={() => toggleModal(false)}
//                 className="bg-white/10 hover:bg-red-600/80 hover:text-white rounded-full p-2 text-gray-300 transition-all duration-300 ml-auto"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="relative aspect-video bg-black">
//               <iframe
//                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
//                 title={item.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="absolute inset-0 w-full h-full"
//               />
//             </div>
            
//             <div className="p-4 bg-gray-900">
//               <div className="flex justify-between text-xs text-gray-400">
//                   <span>Duration: {item.duration}</span>
//                   <span>{item.timestamp}</span>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { Play, X, Clock } from "lucide-react";
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

export default function AllVideos({ item, isHovered }: NewsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(item.youtubeUrl);

  const toggleModal = (state: boolean) => {
    setIsModalOpen(state);
    if (typeof window !== "undefined") {
      document.body.style.overflow = state ? "hidden" : "auto";
    }
  };

  return (
    <>
    
      <div 
        onClick={() => toggleModal(true)}
        className="group cursor-pointer flex flex-col gap-3 w-full transition-all duration-300 mozillaheadline"
      >
        {/* Thumbnail Section */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md bg-gray-900">
          <CldImage
            src={item.thumbnail}
            alt={item.title}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300">
            <div className="bg-primary backdrop-blur-sm rounded-full p-3 border border-white/20 shadow-xl scale-90 group-hover:scale-100 transition-all duration-300">
              <Play size={20} fill="white" className="text-gray-900 ml-1" />
            </div>
          </div>

          {item.duration && (
            <div className="absolute bottom-1.5 right-1.5 bg-black/80 rounded px-1.5 py-0.5 text-[11px] font-semibold text-white tracking-wide">
              {item.duration}
            </div>
          )}
        </div>

        <div className="flex flex-row gap-3 items-start px-1">
          
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="text-[15px] sm:text-base font-semibold text-gray-950 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-1">
              {item.title}
            </h4>
            
            <div className="flex flex-col text-[13px] text-gray-400 font-medium">
              {item.score && (
                <span className="hover:text-white transition-colors">
                  {item.score}
                </span>
              )}
              <div className="flex items-center gap-1.5 mt-0.5">
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && videoId && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => toggleModal(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-gray-900/50 border-b border-gray-800">
               <h3 className="text-sm font-bold text-white truncate pr-4 hidden sm:block">
                  {item.title}
               </h3>
               <span className="sm:hidden text-xs text-primary font-bold uppercase">Now Playing</span>

               <button
                onClick={() => toggleModal(false)}
                className="bg-white/10 hover:bg-red-600/80 hover:text-white rounded-full p-2 text-gray-300 transition-all duration-300 ml-auto"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            
            <div className="p-4 bg-gray-900">
              <div className="flex justify-between text-xs text-gray-400">
                  <span>Duration: {item.duration}</span>
                  <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}