import React from 'react';

const milestones = [
  { 
    year: '2016', 
    title: 'Foundation Year', 
    description: 'Muranga Seal FC was established with a vision to promote football excellence in Muranga County. A group of passionate football enthusiasts came together to create something special for the community.',
    category: 'Foundation'
  },
  { 
    year: '2016', 
    title: 'First Trophy', 
    description: 'Won the Muranga County League Championship, marking our arrival on the regional football scene. This historic victory proved that dedication and teamwork can overcome any obstacle.',
    category: 'Achievement'
  },
  { 
    year: '2018', 
    title: 'National Entry', 
    description: 'Gained promotion to the National Super League, competing at a higher level. Our players showcased exceptional skill and determination, earning recognition across Kenya.',
    category: 'Milestone'
  },
  { 
    year: '2020', 
    title: 'Youth Academy Launch', 
    description: 'Launched our comprehensive youth development program to nurture local talent and build future stars. Investing in the next generation became our core priority.',
    category: 'Development'
  },
  { 
    year: '2023', 
    title: 'Modern Era Begins', 
    description: 'Invested in state-of-the-art facilities and professional coaching staff. New training grounds and equipment transformed how we prepare our players for excellence.',
    category: 'Infrastructure'
  },
  { 
    year: 'PRESENT', 
    title: 'Today', 
    description: 'Competing at the highest level while maintaining our commitment to community development. Today, we stand proud as a beacon of hope and excellence in Kenyan football.',
    category: 'Present Day'
  },
];

export default function ClubHistory() {
  return (
    <main className="w-full bg-white flex flex-col min-h-screen pt-[100px] md:pt-[140px] bodyfont">
      <section className="relative w-full flex flex-col justify-center overflow-hidden bg-primary py-24 md:py-32 px-6">
        <div className="absolute inset-0 bg-diagonal-dots opacity-80 pointer-events-none" />
        
        <div className="container mx-auto relative z-10 max-w-6xl">
          <div className="text-white text-sm md:text-base font-bold tracking-widest uppercase mb-4 md:mb-6">
            EST. 2016 &bull; MURANGA COUNTY
          </div>
          <h1 className="text-white text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter uppercase leading-[0.9] mb-8">
            MURANGA<br />SEAL FC
          </h1>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-white/90">
            <span className="text-lg md:text-xl font-bold tracking-widest uppercase">The Official Chronicle</span>
            <div className="hidden md:block h-[2px] w-16 bg-white/50"></div>
            <span className="text-lg md:text-xl font-bold tracking-widest uppercase">A Decade of Excellence</span>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-32 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-5xl md:flex gap-16 items-start">
           <div className="md:w-1/3 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                Our Journey<br />Through Time
              </h2>
           </div>
           <div className="md:w-2/3">
              <p className="text-2xl md:text-3xl text-primary font-medium leading-snug mb-8">
                From humble beginnings in Muranga County to becoming one of Kenya's most respected football institutions, Muranga Seal FC (Mseal) has written a remarkable story of perseverance, excellence, and community spirit.
              </p>
              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
                What started as a dream in 2016 has blossomed into a movement that inspires thousands across the nation. A story of dedication, unity, and unwavering commitment to excellence.
              </p>
           </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-32 px-6 bg-[#f9f9f9]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col space-y-20 md:space-y-32">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex flex-col md:flex-row w-full group">
                <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-12 md:text-right flex flex-col md:items-end justify-start pt-2">
                  <div className="text-7xl md:text-[90px] font-black text-primary tracking-tighter leading-none mb-3">
                    {m.year}
                  </div>
                  <div className="text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase">
                    {m.category}
                  </div>
                </div>
          
                <div className="hidden md:block w-[2px] bg-gray-200 group-hover:bg-primary transition-colors duration-500 relative">
                   <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f9f9f9] border-[3px] border-gray-200 group-hover:border-primary rounded-full transition-colors duration-500"></div>
                </div>
                <div className="w-full md:w-2/3 md:pl-12 pt-2 md:pt-4">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 mb-6 group-hover:text-primary transition-colors duration-300">
                    {m.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-[#111111] text-white py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-red-dots opacity-20 pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-primary">
            The Journey Continues
          </h3>
          <p className="text-xl md:text-[22px] text-gray-300 font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
            As we look to the future, Muranga Seal FC remains committed to excellence, community development, and nurturing the next generation of football talent. Our story is far from over — in fact, the best chapters are yet to be written.
          </p>
          <div className="w-24 h-[3px] bg-primary mx-auto"></div>
        </div>
      </section>
    </main>
  );
}
