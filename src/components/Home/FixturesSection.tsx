
import { Fixture } from '@/types/Fixture';
import FixtureCard from './FixtureCard';

const fixtures: Fixture[] = [
  {
    id: '1',
    date: 'Sun 20 Oct',
    time: '7:30 PM',
    category: 'MEN',
    homeTeam: 'Tottenham Hotspur',
    venue: 'Hill Dickinson Stadium',
    ticketUrl: '#',
    premiumTicketUrl: '#'
  },
  {
    id: '2',
    date: 'Sun 2 Nov',
    time: '3:00 PM',
    category: 'WOMEN',
    homeTeam: 'Aston Villa',
    venue: 'Villa Park',
    ticketUrl: '#'
  },
  {
    id: '3',
    date: 'Tue 21 Oct',
    time: '9:45 PM',
    category: 'MEN',
    homeTeam: 'Newcastle United',
    awayTeam: 'Brackley Town',
    venue: 'St. James Park',
    ticketUrl: '#'
  }
];

export default function FixturesSection() {
  return (
    <section className=" mozillaheadline min-h-80vh bg-linear-to-b from-[#0a0c1b] to-black text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id='watch'>
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            UPCOMING FIXTURES
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Fixtures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        </div>

        {/* Additional Info */}
        {/* <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Don't miss out on the action. Secure your seats today!
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              View All Fixtures
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Season Tickets
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}