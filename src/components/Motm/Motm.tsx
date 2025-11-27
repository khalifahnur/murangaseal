"use client";

import { CldImage } from "next-cloudinary";
import { useState, useOptimistic, useEffect } from "react";

type Player = {
  id: string;
  name: string;
};

type Match = {
  id: string;
  //title: string;
  votingOpen?: boolean | null | undefined;
  players: Player[];
};

export function MOTMVoting({ match }: { match: Match }) {
  const [selected, setSelected] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);
  const [optimisticVotes, addOptimisticVote] = useOptimistic(
    {} as Record<string, number>,
    (state, playerId: string) => ({
      ...state,
      [playerId]: (state[playerId] || 0) + 1,
    })
  );

  const [results, setResults] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/match-results/${match.id}`)
      .then((r) => r.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  }, [match.id]);

  const handleVote = async () => {
    addOptimisticVote(selected);

    const res = await fetch("/api/vote-motm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId: match.id, playerId: selected }),
    });

    if (res.ok) {
      setHasVoted(true);
      setResults((prev) => ({
        ...prev,
        [selected]: (prev[selected] || 0) + 1,
      }));
    } else {
      const err = await res.json();
      alert(err.error || "Failed to vote");
    }
  };

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  if (!match.votingOpen) {
    return (
      <div className="bg-gray-100 p-8 rounded-lg text-center mozillaheadline">
        <h2 className="text-2xl font-bold mb-4">Voting Closed</h2>
        <Results
          results={results}
          players={match.players}
          totalVotes={totalVotes}
        />
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center mozillaheadline">
        <h2 className="text-2xl font-bold text-green-800">
          Thank you for voting!
        </h2>
        <Results
          results={results}
          players={match.players}
          totalVotes={totalVotes}
        />
      </div>
    );
  }

  return (
<div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 mozillaheadline">
  <div className="bg-linear-to-r from-primary to-gray-950 px-8 py-6 text-white">
    <h2 className="text-3xl font-bold tracking-tight">Man of the Match</h2>
    <p className="text-blue-100 mt-1">Who impressed you the most?</p>
  </div>

  <div className="p-8 space-y-5">
    {/* eslint-disable @typescript-eslint/no-explicit-any  */}
    {match.players.map((player: any) => {
      const isSelected = selected === player.id;
      const playerVotes = results[player.id] || 0;
      const percentage = totalVotes > 0 ? ((playerVotes / totalVotes) * 100).toFixed(1) : 0;

      return (
        <label
          key={player.id}
          className={`
            relative flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer
            ${isSelected 
              ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-100' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex items-center space-x-5">
            <input
              type="radio"
              name="motm"
              value={player.id}
              checked={isSelected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <div>
              <div className="font-semibold text-lg text-gray-900">
                {player.name}
              </div>
              {player.team && (
                <div className="text-sm text-gray-500">{player.team}</div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
              <CldImage
                width={160}
                height={160}
                src={player.mugshot || 'placeholder-player_v2'}
                alt={player.name}
                className="w-full h-full object-cover"
                quality="auto:best"
                format="auto"
                crop="thumb"
                gravity="face"
                loading="lazy"
              />
            </div>

            {totalVotes > 0 && (
              <div className="absolute -top-2 -right-2 bg-linear-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {percentage}%
              </div>
            )}
          </div>

          {totalVotes > 0 && (
            <div
              className="absolute inset-0 rounded-xl bg-linear-to-r from-primary to-gray-950 opacity-10 pointer-events-none"
              style={{ width: `${percentage}%` }}
            />
          )}
        </label>
      );
    })}
  </div>

  <div className="px-8 pb-8">
    <button
      onClick={handleVote}
      disabled={!selected || hasVoted}
      className={`
        w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform
        ${selected && !hasVoted
          ? 'bg-linear-to-r from-primary to-gray-900 text-white shadow-xl hover:shadow-2xl hover:scale-105'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }
      `}
    >
      {hasVoted ? 'Thank You for Voting!' : 'Cast Your Vote'}
    </button>

    {hasVoted && (
      <div className="mt-6 text-center">
        <p className="text-green-600 font-semibold text-lg">
          Your vote has been recorded!
        </p>
      </div>
    )}
  </div>

  {totalVotes > 0 && (
    <div className="bg-gray-50 border-t border-gray-200 px-8 py-6">
      <h3 className="font-bold text-xl text-gray-800 mb-5 flex items-center justify-between">
        <span>Live Results</span>
        <span className="text-3xl font-black text-gray-900">{totalVotes}</span>
      </h3>
      <div className="space-y-4">
        {/* eslint-disable @typescript-eslint/no-explicit-any  */}
        {Object.entries(results)
          .sort(([, a]: any, [, b]: any) => b - a)
          .map(([playerId, count]: any) => {
            const player = match.players.find((p: any) => p.id === playerId);
            if (!player) return null;
            const percentage = ((count / totalVotes) * 100).toFixed(1);

            return (
              <div key={playerId} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">{player.name}</span>
                    <span className="text-sm font-bold text-gray-600">
                      {count} vote{count !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary to-gray-950 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm font-bold text-gray-900">{percentage}%</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )}
</div>
  );
}

{/* eslint-disable @typescript-eslint/no-explicit-any  */}
function Results({ results, players, totalVotes }: any) {
  const sorted = Object.entries(results)
    .sort(([, a]: any, [, b]: any) => b - a)
    .map(([playerId, count]: any) => ({
      player: players.find((p: any) => p.id === playerId),
      count,
      percentage: totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0,
    }));

  return (
    <div className="space-y-3">
      {sorted.map(({ player, count, percentage }) => (
        <div key={player.id} className="flex items-center justify-between">
          <span className="font-medium">{player.name}</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{count} votes</span>
            <div className="w-48 bg-gray-200 rounded-full h-8">
              <div
                className="bg-primary h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
                style={{ width: `${percentage}%` }}
              >
                {percentage}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
