"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  category: string
  title: string
  image?: string
}

const carouselItems: CarouselItem[] = [
  {
    category: "INTERVIEWS",
    title: "Still more to come from Joseph Irungu",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop",
  },
  {
    category: "MATCH REACTION",
    title: "Victor Haki reveals why he – not Joseph Irungu – took surprise free-kick",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop",
  },
  {
    category: "ANALYSIS",
    title: "Why Joseph Irungu was your POTM against APS Bomet",
    image: "https://images.unsplash.com/photo-1522778526097-a358bd6f0c69?w=1200&h=800&fit=crop",
  },
]

const sidebarItems = [
  {
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    title: "WATCH: Erick Ongiri New Contract Interview",
    category: "VIDEO",
  },
  {
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
    title: "Dennis Odhiambo On Mseal wins",
    category: "Men",
    time: "1 day ago",
  },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="relative w-full  py-8 px-4 mozillaheadline" id="latest">
        <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/assets/bg.jpg')`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-lg">
            <div className="relative h-[500px] lg:h-[600px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${carouselItems[currentIndex]?.image || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop"}')`,
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-white bg-blue-600 rounded uppercase">
                    {carouselItems[currentIndex]?.category || "Featured"}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {carouselItems[currentIndex]?.title || "Dewsbury-Hall On City"}
                  </h1>
                </div>

                <div className="flex gap-2 mt-6">
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1 rounded-full transition-all ${
                        index === currentIndex ? "bg-blue-500 w-8" : "bg-white/40 w-6"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
                  }}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
                  }}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg h-[237px] lg:h-[290px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-2">
                    {item.time && (
                      <div className="flex items-center gap-2 text-xs text-white/80">
                        <span className="font-semibold">{item.category}</span>
                        <span>|</span>
                        <span>{item.time}</span>
                      </div>
                    )}
                    {!item.time && (
                      <span className="inline-block px-2 py-1 text-xs font-bold tracking-wider text-white bg-red-600 rounded uppercase">
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}