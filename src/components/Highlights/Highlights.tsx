"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import FeaturedHighlights from "./FeaturedHighlight";
import PastHighlights from "./PastHighlights";

interface Highlight {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  createdAt: string;
  type: string;
  score?: string;
  teams: string;
  youtubeUrl: string;
  featured?: boolean;
}

export default function Highlights({
  featured,
  sidebar,
}: {
  featured: Highlight;
  sidebar: Highlight[];
}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const withTime = (item: Highlight) => ({
    ...item,
    timestamp: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }),
  });

  const featuredItem = withTime(featured);
  const sidebarItems = sidebar.map(withTime);

  return (
    <section className="w-full py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <FeaturedHighlights item={featuredItem} />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2 mb-2">
              Most Recent
            </h3>
            
            <div className="flex flex-col gap-5">
              {sidebarItems.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <PastHighlights item={item} isHovered={hoveredCard === item.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}