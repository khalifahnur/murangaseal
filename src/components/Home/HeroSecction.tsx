import { getPayloadClient } from "@/lib/payloadClient";
import News from "./News";

export default async function HeroSection() {
  const payload = await getPayloadClient();

  const { docs: news } = await payload.find({
    collection: "news",
    sort: "-publishDate",
    limit: 3,
    depth: 1,
  });

  if (!news || news.length === 0) {
    // return <div className="py-20 text-center">No news yet. Stay tuned!</div>;
    return null;
  }

  return <News news={news} />;
}
