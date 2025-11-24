"use client";

import { Star } from "lucide-react";
import { CldImage } from "next-cloudinary";
import React from "react";

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

export default function Bio({ playerBio }: { playerBio: PlayerBio }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white mozillaheadline">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bg.jpg')`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto px-4 py-12 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-h-[400px] lg:max-h-[500px]">
            <div className="lg:text-left">
              <div className="text-[180px] sm:text-[250px] lg:text-[320px] font-black italic drop-shadow-2xl opacity-90">
                {playerBio.jerseyNumber}
              </div>
            </div>

            <div className="relative lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-xl aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                {playerBio.mugshot ? (
                  <CldImage
                    width={1200}
                    height={1600}
                    src={playerBio.mugshot}
                    alt={`${playerBio.firstName || ""} ${playerBio.lastName || playerBio.name}`}
                    className="w-full h-full object-cover"
                    //sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 800px"
                    quality="auto:best"
                    format="auto"
                    crop="fill"
                    gravity="face"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">No image</span>
                  </div>
                )}
              </div>

              <div className="absolute -right-8 lg:left-50 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden md:block">
                <h1 className="text-5xl lg:text-6xl font-black tracking-tight drop-shadow-2xl whitespace-nowrap ">
                  {playerBio.name}
                </h1>
              </div>
              <h1 className="absolute -top-15 left-20 text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-2xl md:hidden">
                {playerBio.name}
              </h1>
            </div>
          </div>

          <div className="md:mt-12 lg:mt-0 w-1/2 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 bg-black/60 backdrop-blur-md border-t border-white/10">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-wrap justify-center lg:justify-start gap-12 text-center lg:text-left">
                {playerBio.age && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Age</p>
                    <p className="text-4xl font-black mt-1">{playerBio.age}</p>
                  </div>
                )}
                {playerBio.height && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Height</p>
                    <p className="text-4xl font-black mt-1">{playerBio.height} cm</p>
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Position</p>
                  <p className="text-4xl font-black mt-1">{playerBio.position}</p>
                </div>
              </div>
            </div>
          </div>

          {playerBio.captain && (
            <div className="absolute top-8 left-8 bg-yellow-400 text-black px-6 py-3 rounded-full font-black text-lg shadow-lg z-10">
              Captain
            </div>
          )}
          {playerBio.loaned && (
            <div className="absolute top-8 right-8 bg-blue-600 text-white px-5 py-3 rounded-full font-bold text-sm shadow-lg z-10">
              On Loan from {playerBio.loanFrom}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white text-gray-900 rounded-2xl shadow-2xl p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 border-b-4 border-gray-600 pb-4 inline-block">
            Player Profile
          </h2>

          <div className="space-y-6 text-lg">
            {playerBio.previousClub && (
              <div>
                <span className="font-bold text-gray-700">Previous Club:</span>{" "}
                <span>{playerBio.previousClub}</span>
              </div>
            )}

            {playerBio.roleModel && (
              <div>
                <span className="font-bold text-gray-700">Role Model:</span>{" "}
                <span>{playerBio.roleModel}</span>
              </div>
            )}

            {playerBio.funFacts && playerBio.funFacts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-3xl font-bold mb-6 text-gray-700">Fun Facts</h3>
                <ul className="space-y-4">
                  {playerBio.funFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Star />
                      <span className="flex-1 leading-relaxed">{fact.fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}