import { getPayload } from "payload";
import config from "@payload-config";
import Header from "@/components/Home/HeaderSection";
import { Footer } from "@/components/Home/Footer";

import Article from "@/components/News/Article";
import PartnershipSection from "@/components/Home/PartnershipSection";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "news",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const article = docs[0];
  if (!article) return <div className="py-20 text-center">No news yet. Stay tuned!</div>;;

  return (
    <>
      <Header />
        <Article article={article}/>
        <PartnershipSection />
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "news",
    limit: 100,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return docs
    .filter((article: any) => article.slug && typeof article.slug === "string")
    .map((article: any) => ({
      slug: article.slug,
    }));
}