import { Fixture } from "@/types/Fixture";
import Image from "next/image";
import Link from "next/link";

interface FixtureCardProps {
  fixture: Fixture;
}

export default function FixtureCard({ fixture }: FixtureCardProps) {
  return (
    <div className="bg-white shadow-md overflow-hidden  duration-300">
      <div className="bg-gray-950 px-4 py-3">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold text-sm">
            SportPesa League
          </span>
          <span className="text-white font-bold text-sm">
            {fixture.date} {fixture.time}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-row justify-between">
          <div>
            <div className="mb-4"></div>

            {/* Teams */}
            <div className="mb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {fixture.homeTeam}
              </h3>
              {fixture.awayTeam && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">vs</span>
                  <h3 className="font-bold text-lg text-gray-900">
                    {fixture.awayTeam}
                  </h3>
                </div>
              )}
            </div>

            <div className="flex items-center text-gray-600 text-sm mb-6">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {fixture.venue}
            </div>
          </div>
          <Image
            src={fixture.opponentLogo}
            alt={fixture.awayTeam}
            width={100}
            height={50}
            className="h-13 md:h-24 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {fixture.homeTeam == "Muranga Seal" && (
          <div className="flex space-x-3">
            <Link
              href={fixture.ticketUrl}
              target="_blank"
              className="flex-1 bg-primary items-center text-center hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Buy tickets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
