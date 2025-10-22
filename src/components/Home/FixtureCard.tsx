import { Fixture } from "@/types/Fixture";


interface FixtureCardProps {
  fixture: Fixture;
}

export default function FixtureCard({ fixture }: FixtureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold text-sm">Upcoming Match</span>
          <span className="text-white font-bold text-sm">{fixture.date} {fixture.time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            fixture.category === 'MEN' 
              ? 'bg-blue-100 text-blue-800' 
              : fixture.category === 'WOMEN' 
              ? 'bg-pink-100 text-pink-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {fixture.category}
          </span>
        </div>

        {/* Teams */}
        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{fixture.homeTeam}</h3>
          {fixture.awayTeam && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">vs</span>
              <h3 className="font-bold text-lg text-gray-900">{fixture.awayTeam}</h3>
            </div>
          )}
        </div>

        {/* Venue */}
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {fixture.venue}
        </div>

        {/* Ticket Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
            Buy tickets
          </button>
          {fixture.premiumTicketUrl && (
            <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
              Buy Premium
            </button>
          )}
        </div>
      </div>
    </div>
  );
}