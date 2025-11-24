import React from "react";
import { getPayloadClient } from "@/lib/payloadClient";
import AllNews from "@/components/News/AllNews";
import { getPayload } from "payload";
import config from "@payload-config";

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

