"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";

function StaffCard({ member }: { member: any }) {
  const parts = member.name ? member.name.trim().split(" ") : [""];
  const lastName = parts.length > 1 ? parts.pop() : parts[0];
  const firstName = parts.length > 1 ? parts.join(" ") : "";

  return (
    <Link
      href={`/team/technical-team/${member.slug}`}
      className="relative flex flex-col overflow-hidden group cursor-pointer border-l border-white/55 shrink-0
                 w-[85vw] sm:w-[300px] lg:w-[350px]
                 min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]"
    >
      <div className="relative px-6 transition-transform duration-500 group-hover:-translate-y-2 z-10 pt-9">
        <div className="text-white font-bold uppercase drop-shadow-md tracking-[0.09em] text-[1rem] sm:text-[1.1rem] lg:text-[1.2rem] leading-none mb-1">
          {firstName}
        </div>
        <div className="text-white font-bold uppercase drop-shadow-md tracking-[-0.01em] text-[2.25rem] sm:text-[2.75rem] lg:text-[3.4rem] leading-[0.95] mb-3">
          {lastName}
        </div>
        <div className="text-white/60 font-medium uppercase drop-shadow-lg tracking-[-0.02em] text-2xl sm:text-3xl lg:text-4xl leading-[0.85] break-words max-w-[80%]">
          {member.role}
        </div>
        {member.nickname && (
          <div className="text-black font-bold tracking-widest text-sm mt-3 uppercase drop-shadow-md">
            "{member.nickname}"
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-end justify-center pointer-events-none z-20 h-[55%] sm:h-[58%] lg:h-[60%]">
        <CldImage
          width={600}
          height={800}
          src={member.mugshot}
          alt={member.name}
          className="w-full h-full object-cover object-top duration-700 transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 85vw, 350px"
          quality="auto:best"
          format="auto"
        />
      </div>
    </Link>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TechnicalTeamGrid({ technical }: { technical: any[] }) {
  if (!technical || technical.length === 0) return null;

  const headCoachIndex = technical.findIndex((m: any) => 
    m.role?.toLowerCase().includes("head coach")
  );
  
  const headCoach = headCoachIndex !== -1 ? technical[headCoachIndex] : technical[0];
  const otherStaff = headCoachIndex !== -1 
    ? technical.filter((_, i) => i !== headCoachIndex) 
    : technical.slice(1);

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden mt-10 bg-primary pb-20 bodyfont">
      <div className="absolute inset-0 pointer-events-none bg-diagonal-dots" style={{ zIndex: 0 }} />
        
        

      <div className="relative flex flex-col items-center px-4" style={{ zIndex: 10, paddingTop: '100px', paddingBottom: '60px' }}>
      </div>
      <div className="relative flex-1 w-full z-10 px-4 md:px-8">
        {headCoach && (
          <div className="flex justify-center w-full mb-8 md:mb-12">
            <StaffCard member={headCoach} />
          </div>
        )}

        {otherStaff.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-7xl mx-auto">
            {otherStaff.map((staff: any) => (
              <StaffCard key={staff.id} member={staff} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}