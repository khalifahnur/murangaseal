"use client";

import React from "react";
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

export default function Container({ data }: ContainerProps) {
  const playersArray = data || [];

  const transformed: Player[] = playersArray.map(normalizePlayer);

  const grouped = {
    goalkeepers: transformed.filter((p) => p.positionGroup === "goalkeepers"),
    defenders: transformed.filter((p) => p.positionGroup === "defenders"),
    midfielders: transformed.filter((p) => p.positionGroup === "midfielders"),
    forwards: transformed.filter((p) => p.positionGroup === "forwards"),
  };

  const PlayerCard = ({ player }: { player: Player }) => (
    <Link
      href={`/team/${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}`}
      className="flex flex-col overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative rounded-xl shadow-md hover:shadow-xl"
      style={{ minHeight: "420px" }}
    >
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center shadow-xl border border-gray-200">
          <span className="text-2xl font-black text-gray-900">{player.number}</span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden bg-linear-to-b from-gray-100 to-gray-200">
        <CldImage
          width={800}
          height={600}
          src={player.image}
          alt={`${player.firstName} ${player.lastName}`}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality="auto:good"
          format="auto"
          crop="fill"
          gravity="face"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA..."
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Info */}
      <div className="p-6 bg-transparent">
        {player.captain && (
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Captain</span>
          </div>
        )}

        {player.loaned && player.loanFrom && (
          <p className="text-xs text-gray-600 mb-2">On loan from {player.loanFrom}</p>
        )}

        <h3 className="text-2xl font-black text-gray-900 leading-tight">
          {player.lastName}
        </h3>
        <p className="text-lg text-gray-600">{player.firstName}</p>
        <p className="mt-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {player.position}
        </p>
      </div>
    </Link>
  );

  const PositionSection = ({ title, players }: { title: string; players: Player[] }) => {
    if (players.length === 0) return null;

    return (
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4">
            {title}
          </h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-primary to-gray-900 mb-10" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white mozillaheadline" id="mens-team">
      <div className="bg-white -mt-10 pt-20">
        <PositionSection title="Goalkeepers" players={grouped.goalkeepers} />
        <PositionSection title="Defenders" players={grouped.defenders} />
        <PositionSection title="Midfielders" players={grouped.midfielders} />
        <PositionSection title="Forwards" players={grouped.forwards} />
      </div>
    </div>
  );
}