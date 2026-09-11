import { getPayloadClient } from "@/lib/payloadClient";
import FeaturedNew from "../News/FeaturedNew";


export default async function FeaturedNews() {
  const payload = await getPayloadClient();

  const { docs: news } = await payload.find({
    collection: "news",
    sort: "-publishDate",
    limit: 5,
    depth: 1,
  });

  if (!news || news.length === 0) {
    return null;
  }

  return <FeaturedNew news={news} />;
}

export const dynamic = 'force-dynamic';