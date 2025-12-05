"use client"
import { CldImage } from "next-cloudinary";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TechnicalTeamGrid ({ technical }:any) {
  return (
    <section className="py-16 px-6 mozillaheadline">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technical Team
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {technical.map((member:any) => (
            <Link
              key={member.id}
              href={`/team/technical-team/${member.slug}`}
              className="group block transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="aspect-w-3 aspect-h-4 relative h-64 bg-gray-200">
                  {/* <Image
                    src={member.mugshot}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
                            crop="fill"
                            
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA..."
                          />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    {member.name}
                  </h3>
                  {member.nickname && (
                    <p className="text-xs text-amber-600 font-medium italic">
                      &ldquo;{member.nickname}&rdquo;
                    </p>
                  )}
                  {member.role && (
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                      {member.role}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};