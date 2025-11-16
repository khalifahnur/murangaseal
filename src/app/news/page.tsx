import React from "react";
import { getPayloadClient } from "@/lib/payloadClient";
import AllNews from "@/components/News/AllNews";

export default async function page() {
  const payload = await getPayloadClient();

  const { docs: news } = await payload.find({
    collection: "news",
    // where: { status: { equals: "published" } },
    sort: "-publishDate",
    limit: 3,
    depth: 1,
  });

  // If no news, fallback
  if (!news || news.length === 0) {
    return <div className="py-20 text-center">No news yet. Stay tuned!</div>;
  }
  return <AllNews news={news} />;
}


