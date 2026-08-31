import { Fixture } from "@/types/Fixture";
import FixtureCard from "./FixtureCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
const FixtureRow = ({ title, fixtures }: { title: string; fixtures: any[] }) => {
  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-8 items-center">
        <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-2 uppercase">
          {title}
        </h2>
        <div className="w-16 h-1.5 bg-primary rounded-full"></div>
      </div>

      {fixtures && fixtures.length > 0 ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:mx-0">
          {fixtures.map((fixture: Fixture) => (
            <div
              key={fixture.id}
              className="min-w-[85vw] sm:min-w-[350px] snap-center md:min-w-0"
            >
              <FixtureCard fixture={fixture} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-12 flex items-center justify-center bg-gray-50/50 rounded-2xl border border-gray-100">
          <p className="text-gray-500 font-medium">No upcoming fixtures currently scheduled.</p>
        </div>
      )}
    </div>
  );
};

export default function FixturesSection({ menFixtures, wslFixtures }: any) {
  return (
    <section
      className="bodyfont min-h-80vh bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      id="match"
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section: Men */}
        <FixtureRow title="Men's Upcoming Fixtures" fixtures={menFixtures} />
        
        {/* Bottom Section: WSL */}
        <FixtureRow title="Women's Upcoming Fixtures" fixtures={wslFixtures} />
      </div>
    </section>
  );
}