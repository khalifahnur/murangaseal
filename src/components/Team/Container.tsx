"use client";
import players from '@/lib/Players';
import Image from 'next/image';
import React from 'react';

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  number: string;
  position: string;
  image: string;
  captain?: boolean;
  loaned?: boolean;
  loanFrom?: string;
}

interface PositionSectionProps {
  title: string;
  players: Player[];
}

// interface ClubConfig {
//   name: string;
//   primaryColor: string;
//   accentColor: string;
// }

export default function Container() {
  // const [activeTab, setActiveTab] = useState<string>('men');
  
  // const clubConfig: ClubConfig = {
  //   name: "Mseal FC",
  //   primaryColor: "rgb(0, 24, 168)",
  //   accentColor: "rgb(251, 176, 64)",
  // };

  // const tabs: string[] = ['Men','U21', 'U18'];

  const PlayerCard = ({ player }: { player: Player }) => (
    <a
      href={`/teams/men/${player.firstName.toLowerCase()}${player.lastName.toLowerCase()}`}
      className="flex flex-col overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative"
      style={{ minHeight: '400px' }}
    >
      {/* Player Number - Positioned like West Ham */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-gray-900">
            {player.number}
          </span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden bg-linear-to-b from-gray-100 to-gray-200" style={{ minHeight: '280px' }}>
        <Image
          src={'https://img.icons8.com/ios-filled/50/user.png'}
          alt={`${player.firstName} ${player.lastName}`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          width={400}
          height={280}
          style={{ objectPosition: 'top' }}
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="bg-white p-6 border-t border-gray-100">
        <div className="space-y-2">
          {player.captain && (
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-yellow-600" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">Captain</span>
            </div>
          )}

          {/* Loan Status */}
          {player.loaned && (
            <div className="mb-2">
              <p className="text-xs text-gray-600 font-medium">Loaned in: {player.loanFrom}</p>
            </div>
          )}

          {/* Player Name - Bold and clean */}
          <h3 className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900 leading-tight">
              {player.lastName}
            </span>
            {player.firstName && (
              <span className="text-lg text-gray-600 mt-1">
                {player.firstName}
              </span>
            )}
          </h3>

          {/* Position - Prominent like West Ham */}
          <div className="pt-2">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              {player.position}
            </span>
          </div>
        </div>
      </div>
    </a>
  );

  const PositionSection = ({ title, players }: PositionSectionProps) => (
    <section className="py-8 mx-auto">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header - Exactly like West Ham */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-tight mb-2">
            {title}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-primary to-gray-500"></div>
        </div>
        
        {/* Players Grid - Responsive and clean */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {players.map((player: Player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen mozillaheadline" id='mens-team'>
      {/* Optional: Team Selection Tabs */}
      {/* <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-8 pt-6 pb-2">
            {tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`relative py-2 pb-4 font-bold text-lg tracking-tight text-center transition-all duration-300 cursor-pointer ${
                  activeTab === tab.toLowerCase()
                    ? 'text-gray-900 opacity-100'
                    : 'text-gray-500 opacity-70 hover:opacity-90 hover:text-gray-700'
                }`}
              >
                <span className="relative">
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Team Sections */}
      <div className="py-8">
        <PositionSection title="Goalkeepers" players={players.goalkeepers} />
        <PositionSection title="Defenders" players={players.defenders} />
        <PositionSection title="Midfielders" players={players.midfielders} />
        <PositionSection title="Forwards" players={players.forwards} />
      </div>
    </div>
  );
}