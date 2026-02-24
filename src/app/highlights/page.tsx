import { getPayloadClient } from "@/lib/payloadClient";
import AllNews from "@/components/News/AllNews";
import type { Metadata } from "next";
import AllHighlights from "@/components/Highlights/AllHighlights";

export const metadata: Metadata = {
  title: "Latest News | Murang’a Seal Football Club",
  description:
    "Stay updated with the latest news, match reports, player interviews, transfer updates, and behind-the-scenes stories from Murang’a Seal FC — your trusted source for everything Seal!",
  alternates: {
    canonical: "https://www.murangaseal.com/news",
  },
  openGraph: {
    title: "Latest News | Murang’a Seal FC",
    description:
      "Breaking news, match highlights, press releases, and exclusive stories from Murang’a Seal Football Club in the FKF Premier League.",
    url: "https://www.murangaseal.com/news",
    siteName: "Murang’a Seal FC",
  },
}

export const revalidate = 60;

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

export default async function page() {
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

  return <AllHighlights highlights={cleanDocs} />;
}

