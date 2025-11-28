'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

interface Player {
  id: string;
  name: string;
  mugshot: string;
}

type PlayerRelation = string | (Player & { id: string });

interface MonthDataFromPayload {
  id: string;
  monthYear: string;
  isActive: boolean;
  candidates: PlayerRelation[];
  voteCounts?: Record<string, number>;
  totalVotes?: number;
  winner?: PlayerRelation | null;
}

interface CleanPlayer extends Player {
  votes?: number;
  pct?: number;
}

interface POTMPageProps {
  monthData: MonthDataFromPayload;
  isAdmin: boolean;
}

export function POTMPage({ monthData, isAdmin }: POTMPageProps) {
  const [selected, setSelected] = useState<string>('');
  const [voted, setVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleVote = async () => {
    if (!selected || isLoading) return;

    setIsLoading(true); 

    try {
      const res = await fetch('/api/vote-potm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthId: monthData.id,
          playerId: selected,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setVoted(true);
        alert(data.message || "Thank you for voting!");
      } else {
        alert(data.message || "Already Voted!");
      }
    } catch (error) {
      console.error('Vote failed:', error);
      alert('Network error. Check your connection and try again.');
    } finally {
      setIsLoading(false); 
    }
  };

  const candidates: CleanPlayer[] = monthData.candidates.map((c) => {
    if (typeof c === 'string') {
      return { id: c, name: 'Loading...', mugshot: 'placeholder' };
    }
    return {
      id: c.id,
      name: c.name,
      mugshot: c.mugshot,
    };
  });

  const candidatesWithStats = isAdmin && monthData.voteCounts && monthData.totalVotes
    ? candidates
        .map((player) => {
          const votes = monthData.voteCounts![player.id] || 0;
          const pct = Number(((votes / monthData.totalVotes!) * 100).toFixed(1));
          return { ...player, votes, pct };
        })
        .sort((a, b) => b.votes - a.votes)
    : candidates;

  const leader = isAdmin && candidatesWithStats.length > 0 ? candidatesWithStats[0] : null;
  const displayCandidates = isAdmin ? candidatesWithStats : candidates;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-xl font-black text-center mb-4">Player of the Month</h1>

      <p className="text-xl text-center text-gray-600 mb-12">
        {new Date(monthData.monthYear + '-01').toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </p>

      {isAdmin && leader && leader.votes! > 0 && (
        <div className="text-center mb-12 bg-yellow-50 border-2 border-primary rounded-3xl py-8 shadow-lg">
          <p className="text-xl font-bold">{leader.name} is leading!</p>
          <p className="text-lg mt-2">{leader.votes} votes • {leader.pct}%</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {displayCandidates.map((player) => (
          <label
            key={player.id}
            className={`
              block p-8 rounded-3xl border-4 cursor-pointer transition-all text-center
              ${selected === player.id ? 'border-primary shadow-2xl scale-105' : 'border-gray-300'}
              ${isAdmin && player.votes === leader?.votes ? 'ring-4 ring-primary' : ''}
            `}
          >
            <input
              type="radio"
              name="potm"
              value={player.id}
              className="sr-only"
              onChange={() => setSelected(player.id)}
              disabled={voted || isLoading || !monthData.isActive}
            />

            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 ring-1 ring-white shadow-sm">
              <CldImage
                width={300}
                height={300}
                src={player.mugshot}
                alt={player.name}
                //crop="thumb"
                gravity="center"
                className="object-cover"
              />
            </div>

            <h3 className="text-xl font-bold">{player.name}</h3>

            {isAdmin && player.votes !== undefined && (
              <>
                <p className="text-xl font-black text-primary my-4">{player.votes}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-primary to-gray-950 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${player.pct}%` }}
                  />
                </div>
                <p className="text-right font-bold text-lg mt-2">{player.pct}%</p>
              </>
            )}
          </label>
        ))}
      </div>

      {monthData.isActive && (
        <button
          onClick={handleVote}
          disabled={!selected || voted || isLoading}
          className={`
            mt-12 w-full max-w-2xl mx-auto block py-2 rounded-2xl font-black text-lg
            transition-all duration-300 relative overflow-hidden
            ${!selected || voted || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-linear-to-r from-primary to-gray-950  hover:primary/50 text-white shadow-2xl'
            }
          `}
        >
          <span className={isLoading ? 'opacity-0' : 'block'}>
            {voted ? 'Thank You!' : 'Vote Now'}
          </span>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      )}
      {isAdmin && (
        <p className="text-center mt-8 text-sm text-gray-500">
          Admin view – live results visible only to you
        </p>
      )}
    </div>
  );
}