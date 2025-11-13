"use client"

import { useState } from "react"
import FeaturedNews from "./FeaturedNews"
import NewsCard from "./NewsCard"


export default function LatestNews() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const newsItems = [
    {
      id: 1,
      title: "GOALS |  2-1 MURANGA SEAL VS KCB",
      thumbnail: "/assets/thumbnails/highlight_thumbnail.jpg",
      duration: "1:20",
      timestamp: "14 hours ago",
      type: "GOALS",
      score: "2-1",
      teams: "MURANGA SEAL VS KCB",
      videoUrl:'/assets/videos/highlights.mp4',
      featured: true,
    },
    {
      id: 2,
      title: "Match Reaction",
      thumbnail: "/assets/thumbnails/interview_1.jpg",
      duration: "1:13",
      timestamp: "15 hours ago",
      videoUrl:'/assets/videos/interview-1.mp4',
      type: "REACTION",
    },
    {
      id: 3,
      title: "Match Reaction",
      thumbnail: "/assets/thumbnails/interview_2.jpg",
      duration: "0:41",
      timestamp: "14 hours ago",
      videoUrl:'/assets/videos/interview-2.mp4',
      type: "REACTION",
    },
  ]

  const featuredItem = newsItems[0]
  const sidebarItems = newsItems.slice(1)

  return (
    <section className=" mozillaheadline w-full bg-linear-to-b from-[#0a0c1b] to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Latest Highlights</h2>
          <div className="w-16 h-1.5 bg-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedNews item={featuredItem} />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Most Recent</h3>
            {sidebarItems.map((item) => (
              <div key={item.id} onMouseEnter={() => setHoveredCard(item.id)} onMouseLeave={() => setHoveredCard(null)}>
                <NewsCard item={item} isHovered={hoveredCard === item.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
