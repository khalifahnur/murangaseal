"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import Image from "next/image";

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
      className="group relative flex flex-col bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full border border-gray-100"
    >
      <div className="absolute top-3 right-3 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg border border-gray-200">
          <span className="text-lg md:text-xl font-black text-gray-900">{player.number}</span>
        </div>
      </div>
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-linear-to-b from-gray-100 to-gray-300">
        <CldImage
          width={800}
          height={1000}
          src={player.image}
          alt={`${player.firstName} ${player.lastName}`}
          crop="fill"
          gravity="face"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality="auto:good"
          format="auto"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 md:p-5 flex flex-col justify-end flex-1 bg-white relative z-10">
        
        <div className="flex flex-wrap items-center gap-2 mb-2 min-h-[24px]">
  {player.captain && (
    <Image 
      src="/assets/captain-band.png" 
      alt="Captain" 
      width={80}   
      height={40}  
      className="h-6 w-auto object-contain" 
    />
  )}
  
  {player.loaned && player.loanFrom && (
    <span className="text-[10px] md:text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200 font-medium">
      Loan
    </span>
  )}
</div>

        <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-none mb-1">
          {player.lastName}
        </h3>
        <p className="text-sm md:text-base text-gray-500 font-medium">{player.firstName}</p>
      
        <div className="w-8 h-1 bg-primary mt-3 mb-2 rounded-full" />
        
        <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">
          {player.position}
        </p>
      </div>
    </Link>
  );

  const PositionSection = ({ title, players }: { title: string; players: Player[] }) => {
    if (players.length === 0) return null;

    return (
      <section className="py-8 md:py-12 border-b border-gray-100 last:border-0">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              {title}
            </h2>
            <div className="h-1.5 w-full max-w-[100px] bg-linear-to-r from-yellow-500 to-black rounded-full" />
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 mozillaheadline" id="mens-team">
      <div className="pt-10 md:pt-20 pb-20">
        <PositionSection title="Goalkeepers" players={grouped.goalkeepers} />
        <PositionSection title="Defenders" players={grouped.defenders} />
        <PositionSection title="Midfielders" players={grouped.midfielders} />
        <PositionSection title="Forwards" players={grouped.forwards} />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';