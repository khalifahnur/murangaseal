import { getPayloadClient } from "@/lib/payloadClient";
import Highlights from "./Highlights";

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
    limit: 10,
    depth: 0,
  });

  if (!docs.length) {
    return null
  }

  const cleanDocs = docs.map(sanitizeHighlight);

  const featured = cleanDocs.find((h) => h.featured) || cleanDocs[0];
  const sidebar = cleanDocs.filter((h) => h.id !== featured.id);

  return (
    <section className="w-full bg-linear-to-b from-[#0a0c1b] to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Latest Highlights
          </h2>
          <div className="w-16 h-1.5 bg-primary rounded-full"></div>
        </div>

        <Highlights featured={featured} sidebar={sidebar} />
      </div>
    </section>
  );
}

export const dynamic = "force-dynamic";
