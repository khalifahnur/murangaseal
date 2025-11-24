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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <FeaturedHighlights item={featuredItem} />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
          Most Recent
        </h3>
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
  );
}