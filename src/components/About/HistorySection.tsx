import React from 'react';
import { Calendar, Award, TrendingUp, Users } from 'lucide-react';

export default function HistorySection() {
  const milestones = [
    { 
      year: '2014', 
      title: 'Foundation Year', 
      description: 'Muranga Seal FC was established with a vision to promote football excellence in Muranga County. A group of passionate football enthusiasts came together to create something special for the community.',
      image: '🏛️',
      category: 'Foundation'
    },
    { 
      year: '2016', 
      title: 'First Trophy', 
      description: 'Won the Muranga County League Championship, marking our arrival on the regional football scene. This historic victory proved that dedication and teamwork can overcome any obstacle.',
      image: '🏆',
      category: 'Achievement'
    },
    { 
      year: '2018', 
      title: 'National Entry', 
      description: 'Gained promotion to the National Super League, competing at a higher level. Our players showcased exceptional skill and determination, earning recognition across Kenya.',
      image: '🎯',
      category: 'Milestone'
    },
    { 
      year: '2020', 
      title: 'Youth Academy Launch', 
      description: 'Launched our comprehensive youth development program to nurture local talent and build future stars. Investing in the next generation became our core priority.',
      image: '⚽',
      category: 'Development'
    },
    { 
      year: '2023', 
      title: 'Modern Era Begins', 
      description: 'Invested in state-of-the-art facilities and professional coaching staff. New training grounds and equipment transformed how we prepare our players for excellence.',
      image: '🏟️',
      category: 'Infrastructure'
    },
    { 
      year: '', 
      title: 'Present Day', 
      description: 'Competing at the highest level while maintaining our commitment to community development. Today, we stand proud as a beacon of hope and excellence in Kenyan football.',
      image: '⭐',
      category: 'Today'
    },
  ];

  return (
    <div className="w-full bg-amber-50">
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-3 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-serif">Est. 2014</span>
          </div>
          <div className="text-center">
            <div className="font-serif text-xs uppercase tracking-widest text-amber-400">Special Edition</div>
          </div>
          <div className="text-sm font-serif">Mseal</div>
        </div>
      </div>

      <div className="bg-white border-b-4 border-slate-900 py-8">
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-serif text-sm uppercase tracking-widest text-amber-600 mb-2">
            The Official Chronicle
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            MURANGA SEAL FC
          </h1>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-600 font-serif">
            <span>Volume X</span>
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
            <span>A Decade of Excellence</span>
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
            <span>2014 - </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white py-4 border-y-2 border-amber-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">
              Our Journey Through Time
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white shadow-2xl">
          <div className="p-8 md:p-12 border-l-4 border-amber-500">
            <div className="max-w-4xl">
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-800 first-letter:text-7xl first-letter:font-bold first-letter:text-amber-600 first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                From humble beginnings in Muranga County to becoming one of Kenya&apos;s most respected football institutions, 
                Muranga Seal FC (Mseal) has written a remarkable story of perseverance, excellence, and community spirit. 
                What started as a dream in 2014 has blossomed into a movement that inspires thousands across the nation.
              </p>
              <div className="mt-6 pt-6 border-t-2 border-amber-200 flex items-center gap-4 text-sm text-slate-600 font-serif italic">
                <Users className="w-5 h-5" />
                <span>A story of dedication, unity, and unwavering commitment to excellence</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-linear-to-br from-amber-50 to-white">
            <div className="grid gap-12">
              {milestones.map((milestone, index) => (
                <article 
                  key={index}
                  className={`relative ${index % 2 === 0 ? '' : 'md:ml-auto'} max-w-4xl`}
                >
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden border-l-8 border-amber-500 hover:shadow-2xl transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-48 bg-linear-to-br from-slate-900 to-slate-800 text-white p-8 flex flex-col items-center justify-center text-center relative">
                        <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {milestone.category}
                        </div>
                        <div className="text-7xl mb-3">{milestone.image}</div>
                        <div className="text-5xl font-serif font-bold mb-2">{milestone.year}</div>
                        <div className="w-16 h-1 bg-amber-500 rounded"></div>
                      </div>
                      <div className="flex-1 p-8">
                        <div className="mb-4">
                          <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                            {milestone.title}
                          </h3>
                          <div className="w-20 h-1 bg-amber-500"></div>
                        </div>
                        
                        <p className="font-serif text-lg text-slate-700 leading-relaxed mb-4">
                          {milestone.description}
                        </p>

                        <div className="flex items-center gap-2 text-amber-600">
                          <div className="w-8 h-0.5 bg-amber-600"></div>
                          <TrendingUp className="w-4 h-4" />
                          <div className="w-8 h-0.5 bg-amber-600"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < milestones.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 -bottom-12 transform -translate-x-1/2 z-10">
                      <div className="w-1 h-12 bg-linear-to-b from-amber-500 to-transparent"></div>
                      <div className="w-3 h-3 bg-amber-500 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 bg-slate-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-4 text-amber-400">
                  <div className="w-12 h-0.5 bg-amber-400"></div>
                  <Award className="w-8 h-8" />
                  <div className="w-12 h-0.5 bg-amber-400"></div>
                </div>
              </div>
              
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                The Journey Continues
              </h3>
              
              <p className="font-serif text-xl text-slate-300 leading-relaxed mb-8">
                As we look to the future, Muranga Seal FC remains committed to excellence, 
                community development, and nurturing the next generation of football talent. 
                Our story is far from over - in fact, the best chapters are yet to be written.
              </p>

            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white py-8 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-serif text-sm text-slate-400 mb-2">
            © 2014 Muranga Seal Football Club
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-serif">
            <span>Muranga County</span>
            <span>•</span>
            <span>Kenya</span>
            <span>•</span>
            <span>Est. 2014</span>
          </div>
        </div>
      </div>
    </div>
  );
}