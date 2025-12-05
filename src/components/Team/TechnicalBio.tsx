"use client";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface FunFact {
  fact: string;
}

interface TechnicalMemberBio {
  name: string;
  firstName?: string;
  lastName?: string;
  mugshot?: string;
  nickname?: string;
  height?: number;
  previousClub?: string;
  roleModel?: string;
  funFacts?: FunFact[];
  role?: string;
}

interface TechnicalBioProps {
  member: TechnicalMemberBio;
}

const TechnicalBio: FC<TechnicalBioProps> = ({ member }) => {
  const displayName = member.nickname
    ? `${member.name} "${member.nickname}"`
    : member.name;

  return (
    <section className="py-16 px-6 mozillaheadline">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            {member.mugshot ? (
              <div className="relative aspect-w-3 aspect-h-4 rounded-2xl overflow-hidden shadow-2xl">
                {/* <Image
                  src={member.mugshot}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                /> */}
                <CldImage
                  width={800}
                  height={600}
                  src={member.mugshot}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality="auto:good"
                  format="auto"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA..."
                />
              </div>
            ) : (
              <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-96" />
            )}

            {member.role && (
              <div className="mt-6 text-center">
                <span className="inline-block px-6 py-3 bg-amber-600 text-white font-bold rounded-full text-lg uppercase tracking-wider">
                  {member.role}
                </span>
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-10">
            <header>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {displayName}
              </h1>
              {member.nickname && (
                <p className="text-2xl text-amber-600 italic mt-2">
                  Known as “{member.nickname}”
                </p>
              )}
            </header>

            <div className="grid grid-cols-2 gap-6 text-lg">
              {member.height && (
                <div>
                  <span className="font-semibold text-gray-600">Height:</span>
                  <p className="text-gray-900">{member.height} cm</p>
                </div>
              )}
              {member.previousClub && (
                <div>
                  <span className="font-semibold text-gray-600">
                    Previous Club/Role:
                  </span>
                  <p className="text-gray-900">{member.previousClub}</p>
                </div>
              )}
              {member.roleModel && (
                <div className="col-span-2">
                  <span className="font-semibold text-gray-600">
                    Role Model:
                  </span>
                  <p className="text-gray-900 italic">“{member.roleModel}”</p>
                </div>
              )}
            </div>

            {member.funFacts && member.funFacts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Fun Facts
                </h2>
                <ul className="space-y-4">
                  {member.funFacts.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 bg-white p-5 rounded-lg shadow-md"
                    >
                      <span className="text-3xl text-amber-600">★</span>
                      <span className="text-gray-800 text-lg leading-relaxed">
                        {item.fact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalBio;
