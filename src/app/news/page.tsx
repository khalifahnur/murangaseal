import React from "react";
import { getPayloadClient } from "@/lib/payloadClient";
import AllNews from "@/components/News/AllNews";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";

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

export default async function page() {
  const payload = await getPayloadClient();

  const { docs: news } = await payload.find({
    collection: "news",
    // where: { status: { equals: "published" } },
    sort: "-publishDate",
  });

  if (!news || news.length === 0) {
    return <div className="py-20 text-center">No news yet. Stay tuned!</div>;
  }
  return <AllNews news={news} />;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "news",
    limit: 100,
  });
  return docs;
}

