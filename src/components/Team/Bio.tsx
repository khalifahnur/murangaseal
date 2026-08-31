"use client";

import React from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { Star } from "lucide-react";

interface FunFact {
  fact: string;
}

interface PlayerBio {
  jerseyNumber: string | number;
  name: string;
  firstName?: string;
  lastName?: string;
  mugshot?: string;
  age?: number;
  height?: number;
  position: string;
  captain?: boolean;
  loaned?: boolean;
  loanFrom?: string;
  previousClub?: string;
  roleModel?: string;
  funFacts?: FunFact[];
}

const BRAND_RED = "#D4121E";

export default function PlayerProfile({ playerBio }: { playerBio: PlayerBio }) {
  const nameParts = playerBio.name.trim().split(" ");
  const fallbackFirstName = nameParts.length > 1 ? nameParts[0] : "";
  const fallbackLastName = nameParts.length > 1 ? nameParts.slice(-1)[0] : playerBio.name;

  const firstName = playerBio.firstName || fallbackFirstName;
  const lastName = playerBio.lastName || fallbackLastName;

  return (
    <main className="w-full bg-white flex flex-col min-h-screen">
      <section
        className="bg-primary relative w-full flex flex-col items-center overflow-hidden pt-[120px] md:pt-[160px]"
        // style={{ backgroundColor: BRAND_RED }}
      >
        <div className="absolute inset-0 pointer-events-none bg-diagonal-dots" style={{ zIndex: 0 }}>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center w-full max-w-6xl">
          <div className="absolute top-0 right-4 md:right-8 flex flex-col items-end gap-3 z-30">
            {playerBio.captain && (
              <Image
                src="/assets/captain-band.png"
                alt="Captain"
                width={80}
                height={40}
                className="h-8 w-auto object-contain drop-shadow-md"
              />
            )}
            {playerBio.loaned && playerBio.loanFrom && (
              <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg uppercase tracking-wider">
                Loan: {playerBio.loanFrom}
              </span>
            )}
          </div>

          <div className="w-full flex items-center justify-between text-white mb-2 md:mb-6 mt-8 md:mt-0">
            <span className="text-3xl md:text-[42px] font-normal tracking-widest uppercase">
              {firstName}
            </span>
            <div className="flex-1 h-px bg-white/60 mx-6 md:mx-10 mt-1 md:mt-2"></div>
            <span className="text-3xl md:text-[42px] font-normal">
              {playerBio.jerseyNumber}
            </span>
          </div>

          <div className="relative w-full flex justify-center items-end mt-4 md:mt-10 min-h-[300px] md:min-h-[500px]">
            <h1
              className="absolute bottom-0 md:bottom-100 z-0 select-none text-center w-full text-white font-serif tracking-tighter uppercase"
              style={{ fontSize: "clamp(100px, 12vw, 320px)", lineHeight: "0.8" }}
            >
              {lastName}
            </h1>

            {/* Player Image */}
            <div
              className="relative z-10 w-full max-w-[320px] md:max-w-[500px] flex justify-center"
              style={{ height: "clamp(350px, 60vw, 650px)" }}
            >
              {playerBio.mugshot ? (
                <CldImage
                  src={playerBio.mugshot}
                  alt={`${firstName} ${lastName}`}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 320px, 500px"
                  quality="auto:best"
                  format="auto"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center rounded-t-full backdrop-blur-sm">
                  <span className="text-white/50 text-xl uppercase tracking-widest font-bold">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom subtle fading line */}
        <div className="absolute bottom-16 md:bottom-24 w-full max-w-6xl h-px bg-white/20 z-0 hidden md:block"></div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 w-full max-w-5xl mx-auto px-4 -mt-8 md:-mt-12 mb-16 md:mb-24">
        <div className="bg-[#f4f4f4] shadow-xl flex flex-wrap justify-between items-center py-6 px-4 md:py-10 md:px-12 rounded-sm border-b-4 border-gray-200">
          
          {/* AGE */}
          <div className="w-1/2 md:w-1/4 py-4 md:py-0 flex flex-col items-center justify-center md:border-r border-gray-300">
            <span className="text-[11px] md:text-sm text-gray-500 font-bold tracking-widest mb-2 md:mb-3 uppercase">
              Age
            </span>
            <span className="text-lg md:text-2xl font-black text-gray-900 uppercase">
              {playerBio.age || "-"}
            </span>
          </div>

          {/* POSITION */}
          <div className="w-1/2 md:w-1/4 py-4 md:py-0 flex flex-col items-center justify-center md:border-r border-gray-300">
            <span className="text-[11px] md:text-sm text-gray-500 font-bold tracking-widest mb-2 md:mb-3 uppercase">
              Position
            </span>
            <span className="text-lg md:text-2xl font-black text-gray-900 capitalize">
              {playerBio.position || "-"}
            </span>
          </div>

          {/* HEIGHT */}
          <div className="w-1/2 md:w-1/4 py-4 md:py-0 flex flex-col items-center justify-center md:border-r border-gray-300">
            <span className="text-[11px] md:text-sm text-gray-500 font-bold tracking-widest mb-2 md:mb-3 uppercase">
              Height
            </span>
            <span className="text-lg md:text-2xl font-black text-gray-900 lowercase">
              {playerBio.height ? `${playerBio.height} cm` : "-"}
            </span>
          </div>

          {/* PREVIOUS CLUB */}
          <div className="w-1/2 md:w-1/4 py-4 md:py-0 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] md:text-sm text-gray-500 font-bold tracking-widest mb-2 md:mb-3 uppercase">
              Prev. Club
            </span>
            <span className="text-sm md:text-lg font-black text-gray-900 uppercase px-2 line-clamp-2">
              {playerBio.previousClub || "N/A"}
            </span>
          </div>
        </div>
      </section>

      {/* Bio / Fun Facts Section */}
      <section className="max-w-[900px] mx-auto px-6 pb-32 w-full">
        <div className="space-y-12">
          
          {playerBio.roleModel && (
            <div className="text-center">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Role Model
              </h3>
              <p className="text-2xl md:text-[32px] text-[#d31120] font-medium leading-normal">
                "{playerBio.roleModel}"
              </p>
            </div>
          )}

          {playerBio.funFacts && playerBio.funFacts.length > 0 && (
            <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
              <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
                <span className="w-8 h-1 bg-[#d31120] inline-block rounded-full"></span>
                Fun Facts
              </h3>
              <ul className="space-y-6">
                {playerBio.funFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <Star className="w-6 h-6 text-gray-300 group-hover:text-yellow-400 transition-colors shrink-0 mt-1" fill="currentColor" />
                    <span className="flex-1 text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                      {fact.fact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
        </div>
      </section>
    </main>
  );
}