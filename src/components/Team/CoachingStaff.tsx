"use client";
import React from "react";
import Image from "next/image";

const staff = [
  {
    name: "Osborne Monday",
    role: "Head Coach",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    name: "Dennis Odhiambo",
    role: "Trainer",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    name: "Peter Mwaura",
    role: "Goalkeeper Coach",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    name: "Marcus Jairo",
    role: "Fitness Coach",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    name: "David Muigai",
    role: "Kit Manager",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    name: "Elizabeth Njoki",
    role: "Physiotherapist",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    name: "Audrey Maria",
    role: "Welfare Officer",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    name: "Kevin Oyim",
    role: "Team Manager",
    image: "https://img.icons8.com/ios-filled/100/user.png",
  },
];

const CoachingStaff: React.FC = () => {
  return (
    <section className="py-12 mozillaheadline">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Technical Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {staff.map((member, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative rounded-xl"
              style={{ minHeight: "400px" }}
            >
              {/* Image section */}
              <div
                className="relative flex-1 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200"
                style={{ minHeight: "280px" }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={280}
                  style={{ objectPosition: "top" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Info section */}
              <div className="bg-white p-6 border-t border-gray-100 flex flex-col justify-end flex-none">
                <h3 className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900 leading-tight">
                    {member.name}
                  </span>
                  <span className="text-sm font-medium text-gray-600 mt-1 uppercase tracking-wide">
                    {member.role}
                  </span>
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachingStaff;
