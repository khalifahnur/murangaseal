import { getPayloadClient } from "@/lib/payloadClient";
import Highlights from "./Highlights";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CleanHighlight {
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

/* eslint-disable @typescript-eslint/no-explicit-any */
function sanitizeHighlight(h: any): CleanHighlight {
  return {
    id: h.id,
    title: h.title ?? "Untitled",
    thumbnail: h.thumbnail ?? "/placeholder.jpg",
    duration: h.duration || undefined,
    createdAt: h.createdAt,
    type: h.type,
    score: h.score || undefined,
    teams: h.teams,
    youtubeUrl: h.youtubeUrl,
    featured: h.featured || false,
  };
}

export default async function HightlightsContainer() {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "highlights",
    sort: "-createdAt",
    limit: 4,
    depth: 1,
  });

  if (!docs.length) {
    return null;
  }

  const cleanDocs = docs.map(sanitizeHighlight);

  const featured = cleanDocs.find((h) => h.featured) || cleanDocs[0];
  const sidebar = cleanDocs.filter((h) => h.id !== featured.id);

  return (
    <section className="w-full  py-12 px-4">
      <Highlights featured={featured} sidebar={sidebar} />

      <div className="mt-2 flex justify-end">
        <Link
          href="/highlights"
          className="
      group flex items-center gap-3
      text-gray-500 font-bold uppercase tracking-widest text-sm
      hover:text-primary transition-colors duration-300
    "
        >
          More Videos
          <span
            className="
      flex items-center justify-center w-8 h-8 
      rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white
      transition-all duration-300
    "
          >
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}

export const dynamic = "force-dynamic";
