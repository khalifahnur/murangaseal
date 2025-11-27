import { getPayload } from "payload";
import config from "@payload-config";
import { MOTMVoting } from "@/components/Motm/Motm";
import Header from "@/components/Home/HeaderSection";
import { Footer } from "@/components/Home/Footer";
import PartnershipSection from "@/components/Home/PartnershipSection";

export const revalidate = 10;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MOTMPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "matches",
    where: { slug: { equals: slug } },
    depth: 2,
  });

  const match = result.docs[0] || null;

  if (!match) return <div>Vote not found</div>;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mozillaheadline">
        <h1 className="text-4xl font-bold mb-2">{match.matchTitle}</h1>
        <p className="text-gray-600 mb-8">
          {new Date(match.matchDate).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {!match.votingOpen && match.winner && (
          <div className="mb-8 p-6 bg-green-100 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-800">
              Winner Announced!
            </h2>
            {/* eslint-disable @typescript-eslint/no-explicit-any  */}
            <p className="text-3xl mt-2">
              {(match.winner as any)?.name} is Man of the Match!
            </p>
          </div>
        )}
      {/* eslint-disable @typescript-eslint/no-explicit-any  */}
        <MOTMVoting match={match as any} />
      </div>
      <PartnershipSection />
      <Footer />
    </>
  );
}
