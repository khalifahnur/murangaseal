"use client";
import players from '@/lib/Players';
import React, { useState } from 'react';

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

interface ClubConfig {
  name: string;
  primaryColor: string;
  accentColor: string;
}

export default function Container() {
  const [activeTab, setActiveTab] = useState<string>('men');
  
  const clubConfig: ClubConfig = {
    name: "Mseal FC",
    primaryColor: "rgb(0, 24, 168)",
    accentColor: "rgb(251, 176, 64)",
  };

  const tabs: string[] = ['Men','U21', 'U18'];

  const PlayerCard = ({ player }: { player: Player }) => (
    <a
      href={`/teams/men/${player.firstName.toLowerCase()}${player.lastName.toLowerCase()}`}
      className="flex flex-col overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
      style={{ minHeight: '525px' }}
    >
      <div className="relative flex-1 overflow-hidden bg-primary" >
        <img
          //src={player.image}
          src={'https://img.icons8.com/ios-filled/50/user.png'}
          alt={`${player.firstName} ${player.lastName}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col bg-white mozillaheadline" style={{ maxHeight: '147px' }}>
        {player.captain && (
          <div className="relative z-20 w-full h-10 pl-6 -mt-10 text-white flex items-center bg-primary" >
            <svg width="24" height="24" viewBox="0 0 24 24" className="mr-2" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <p className="text-xs uppercase tracking-wide">Captain</p>
          </div>
        )}
        
        {player.loaned && (
          <div className="w-full h-10 pl-6 -mt-10 bg-gray-100 text-gray-700 flex items-center">
            <p className="text-xs">Loaned in: {player.loanFrom}</p>
          </div>
        )}

        
        <div className="z-20 flex flex-col grow bg-white justify-between p-6">
          <div className="absolute z-10 text-5xl font-bold top-6 left-6 text-gray-100">
            {player.number}
          </div>

          <div>
            <h3 className="flex flex-col justify-start font-sans">
              {player.firstName && (
                <span className="text-base text-gray-500">
                  {player.firstName}
                </span>
              )}
              <span className={`text-2xl font-bold text-black ${player.firstName ? 'mb-4' : 'mt-6 mb-4'}`}>
                {player.lastName}
              </span>
            </h3>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 uppercase tracking-widest w-56 leading-4">
                {player.position}
              </div>
              <div 
                className="w-10 h-8 bg-gray-200"
                style={{ 
                  backgroundImage: `url(/assets/kenya.svg)`,
                  backgroundSize: 'cover'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );

  const PositionSection = ({ title, players }: PositionSectionProps) => (
    <section className="flex flex-col py-2 mx-auto">
      <div className="container flex flex-col items-start justify-between w-full mx-auto px-4 lg:px-8">
        <h2 className="w-full mb-6 font-bold text-3xl md:text-4xl uppercase text-left">
          {title}
        </h2>
      </div>
      
      <div className="w-full mx-auto container px-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {players.map((player: Player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 mozillaheadline" id='mens-team'>
      <div 
        className="relative flex flex-col justify-end w-full px-0 overflow-hidden h-40 text-white bg-primary"
        
      >
        <div className="z-40 w-full mx-auto my-4 px-4 uppercase container">
          <h1 className="text-4xl md:text-5xl font-bold">Teams</h1>
        </div>
      </div>

      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-8 pt-3">
            {tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`relative py-2 pb-4 font-bold text-lg tracking-tight text-center transition border-b-2 cursor-pointer ${
                  activeTab === tab.toLowerCase()
                    ? 'border-current opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-80'
                }`}
                style={{
                  borderBottomColor: activeTab === tab.toLowerCase() ? clubConfig.accentColor : 'transparent'
                }}
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8">
        <PositionSection title="Goalkeeper" players={players.goalkeepers} />
        <PositionSection title="Defender" players={players.defenders} />
        <PositionSection title="Midfielder" players={players.midfielders} />
        <PositionSection title="Forward" players={players.forwards} />
      </div>
    </div>
  );
}