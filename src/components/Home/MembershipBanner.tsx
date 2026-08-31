import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

export default function MembershipBanner() {
  return (
    <section className="w-full py-4 px-4 md:px-6 mozillaheadline">
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden group bg-black flex flex-col md:flex-row">
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-6 md:px-10 md:py-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
                <span className="text-[10px] md:text-xs font-bold text-primary tracking-widest uppercase">
                  Forever MSeal
                </span>
              </div>
              <span className="hidden md:block text-gray-400 text-xs">|</span>
              <span className="text-gray-300 text-xs md:text-sm font-medium">
                Join the family today.
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter leading-tight drop-shadow-md">
              2026/27{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-500">
                MEMBERSHIP
              </span>
            </h2>
          </div>

          <div className="shrink-0 mt-2 md:mt-0">
            <Link
              href="https://www.murangaseal.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-block"
            >
              <button
                className="
                relative overflow-hidden bg-primary text-white 
                font-black uppercase tracking-wider italic 
                py-2.5 px-8 md:py-3 md:px-10
                rounded-none -skew-x-12 
                hover:bg-white hover:text-black 
                transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]
              "
              >
                <div className="skew-x-12 flex items-center gap-2 text-sm md:text-base">
                  Join Now{" "}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </div>
              </button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-linear-to-r from-primary via-black to-primary z-20" />
      </div>
    </section>
  );
}