import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Home/HeaderSection";
import { Footer } from "@/components/Home/Footer";
import { RichText } from "@/components/RichText";

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
  if (!article) notFound();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 mozillheadline">
        {article.cloudinaryUrl && (
          <div className="relative w-full h-[40vh] overflow-hidden">
            <Image
              src={article.cloudinaryUrl}
              alt={article.title}
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/70" />
          </div>
        )}
        <div className="h-2 bg-linear-to-r from-black via-gray-700 to-black" />
        <article className="container mx-auto px-4 max-w-7xl -mt-32 mb-10 relative z-10">
          <div className="bg-white shadow-2xl p-8 md:p-12">
            <div className="flex items-center justify-between pb-4 mb-6 border-b-4 border-black">
              <time className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                {new Date(article.publishDate).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-serif text-gray-900 border-l-8 border-black pl-6">
              {article.title}
            </h1>

            {article.excerpt && (
              <div className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-serif italic border-l-4 border-gray-300 pl-6 py-2">
                {article.excerpt}
              </div>
            )}

            <div className="flex items-center gap-2 mb-8">
              <div className="h-px bg-gray-300 flex-1" />
              <div className="w-2 h-2 bg-black rotate-45" />
              <div className="h-px bg-gray-300 flex-1" />
            </div>
            <RichText content={article.content} />
          </div>

          <div className="h-2 bg-linear-to-r from-black via-gray-700 to-black" />
        </article>
      </div>
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