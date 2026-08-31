"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface Player {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  number: string;
  position: string;
  image: string;
  captain: boolean;
  loaned: boolean;
  loanFrom?: string;
  positionGroup: string;
}

interface RawPlayer {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  jerseyNumber: string | number;
  position: string;
  mugshot?: string | null;
  captain?: boolean | null;
  loaned?: boolean | null;
  loanFrom?: string | null;
  positionGroup: string;
}

interface ContainerProps {
  data: RawPlayer[];
}

function normalizePlayer(p: RawPlayer): Player {
  const fullName = p.name.trim();
  const nameParts = fullName.split(" ");
  const lastNameFromName = nameParts.length > 1 ? nameParts.slice(-1)[0] : fullName;
  const firstNameFromName = nameParts.length > 1 ? nameParts[0] : "";

  return {
    id: p.id,
    name: fullName,
    firstName: p.firstName?.trim() || firstNameFromName || "Player",
    lastName: p.lastName?.trim() || lastNameFromName || "Unknown",
    number: String(p.jerseyNumber),
    position: p.position || "N/A",
    image: p.mugshot || "placeholder-player",
    captain: !!p.captain,
    loaned: !!p.loaned,
    loanFrom: p.loanFrom || undefined,
    positionGroup: p.positionGroup || "uncategorized",
  };
}

const tabs = ['GOALKEEPERS', 'DEFENDERS', 'MIDFIELDERS', 'FORWARDS'];
const BRAND_RED = '#D4121E';

function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      href={`/team/${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}`}
      className="player-card snap-center flex-none relative flex flex-col overflow-hidden group cursor-pointer"
    >
      <div className="relative px-6 transition-transform duration-500 group-hover:-translate-y-2" style={{ zIndex: 10, paddingTop: '2.25rem' }}>
        <div className="text-white font-bold uppercase player-firstname drop-shadow-md" style={{ letterSpacing: '0.09em' }}>
          {player.firstName}
        </div>
        <div className="text-white font-bold uppercase player-lastname drop-shadow-md" style={{ letterSpacing: '-0.01em' }}>
          {player.lastName}
        </div>
        <div className="text-white font-medium player-number drop-shadow-lg" style={{ letterSpacing: '-0.04em' }}>
          {player.number}
        </div>
      </div>

      <div
        className="player-photo absolute bottom-0 left-0 w-full flex items-end justify-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <CldImage
          width={600}
          height={800}
          src={player.image}
          alt={`${player.firstName} ${player.lastName}`}
          className="w-full h-full object-cover object-top duration-700"
          sizes="(max-width: 640px) 85vw, 350px"
          quality="auto:best"
          format="auto"
        />
      </div>
    </Link>
  );
}

export default function MensTeam({ data }: ContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('DEFENDERS');
  const playersArray = data || [];
  const transformed: Player[] = playersArray.map(normalizePlayer);

  const filteredPlayers = transformed.filter(
    (p) => p.positionGroup.toUpperCase() === activeTab
  );

  // With three copies rendered [clone][real][clone], the "real" copy always
  // starts at DOM index filteredPlayers.length.
  const scrollToCard = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.children[index];
      if (card) {
        card.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(filteredPlayers.length, 'smooth');
    }, 50);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let settleTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const setWidth = el.scrollWidth / 3;
        if (!setWidth) return;

        if (el.scrollLeft < setWidth) {
          const prevBehavior = el.style.scrollBehavior;
          el.style.scrollBehavior = 'auto';
          el.scrollLeft += setWidth;
          el.style.scrollBehavior = prevBehavior;
        } else if (el.scrollLeft >= setWidth * 2) {
          const prevBehavior = el.style.scrollBehavior;
          el.style.scrollBehavior = 'auto';
          el.scrollLeft -= setWidth;
          el.style.scrollBehavior = prevBehavior;
        }
      }, 150);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      clearTimeout(settleTimer);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth > 768 ? 350 : current.clientWidth * 0.82;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main
      className="relative min-h-screen flex flex-col overflow-hidden mt-10 bg-primary bodyfont"
      style={{  paddingBottom: '5rem' }}
    >
      <div className="absolute inset-0 pointer-events-none bg-diagonal-dots" style={{ zIndex: 0 }}>
        <div
        //   style={{
        //     position: 'absolute',
        //     inset: 0,
        //     clipPath: 'polygon(18% 0%, 42% 0%, 12% 100%, -12% 100%)',
        //     background: 'rgba(255,255,255,0.05)',
        //   }}
        // />
        // <div
        //   style={{
        //     position: 'absolute',
        //     inset: 0,
        //     clipPath: 'polygon(62% 0%, 100% 0%, 100% 55%, 40% 100%, 16% 100%)',
        //     background: 'rgba(0,0,0,0.08)',
        //   }}
        // />
        // <div
        //   style={{
        //     position: 'absolute',
        //     inset: 0,
        //     backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.5px)',
        //     backgroundSize: '9px 9px',
        //   }}
        />
      </div>

      <div className="relative flex flex-col items-center px-4" style={{ zIndex: 10, paddingTop: '140px' }}>
        

        <div className="relative w-full max-w-4xl flex justify-center items-center mt-8 mb-10 md:mt-10 md:mb-12">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 md:-left-2 z-30 text-white transition-opacity hover:opacity-70 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          <div className="no-scrollbar flex gap-6 md:gap-12 overflow-x-auto whitespace-nowrap px-10 md:px-14">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-sm md:text-base font-bold uppercase pb-2 transition-colors cursor-pointer"
                  style={{
                    letterSpacing: '0.12em',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                    borderBottom: isActive ? '2px solid #ffffff' : '2px solid transparent',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 md:-right-2 z-30 text-white transition-opacity hover:opacity-70 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 w-full" style={{ zIndex: 10 }}>
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth md:justify-center h-full items-center"
        >
          {/* Three copies [clone][real][clone] so either chevron can keep
              advancing past an end and the wrap-around effect above lands
              back in the real copy without a visible jump. */}
          {filteredPlayers.map((player) => (
            <PlayerCard key={`pre-${player.id}`} player={player} />
          ))}
          {filteredPlayers.map((player) => (
            <PlayerCard key={`main-${player.id}`} player={player} />
          ))}
          {filteredPlayers.map((player) => (
            <PlayerCard key={`post-${player.id}`} player={player} />
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .player-card {
          width: 82vw;
          min-height: 500px;
          border-left: 1px solid rgba(255, 255, 255, 0.55);
        }
        .player-firstname { font-size: 1rem; margin-bottom: 2px; line-height: 1; }
        .player-lastname { font-size: 2.25rem; line-height: 0.95; margin-bottom: 12px; }
        .player-number { font-size: 6.5rem; line-height: 0.72; }
        .player-photo { height: 55%; }

        @media (min-width: 640px) {
          .player-card { width: 300px; min-height: 580px; }
          .player-firstname { font-size: 1.1rem; }
          .player-lastname { font-size: 1.75rem; }
          .player-number { font-size: 8.5rem; }
          .player-photo { height: 58%; }
        }
        @media (min-width: 1024px) {
          .player-card { width: 350px; min-height: 640px; }
          .player-firstname { font-size: 1.2rem; }
          .player-lastname { font-size: 3.1rem; }
          .player-number { font-size: 9rem; }
          .player-photo { height: 60%; }
        }
      `}</style>
    </main>
  );
}

export const dynamic = "force-dynamic";