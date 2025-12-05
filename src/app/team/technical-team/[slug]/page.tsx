import { getPayload } from "payload";
import config from "@payload-config";
import Header from "@/components/Home/HeaderSection";
import { Footer } from "@/components/Home/Footer";
import TechnicalBio from "@/components/Team/TechnicalBio";

interface TechnicalMember {
  name: string;
  firstName?: string;
  lastName?: string;
  mugshot?: string;
  nickname?: string;
  height?: number;
  previousClub?: string;
  roleModel?: string;
  funFacts?: { fact: string }[];
  role?: string;         
}
/* eslint-disable @typescript-eslint/no-explicit-any */
function sanitizeMember(raw: any): TechnicalMember {
  return {
    name: raw.name ?? "Unknown",
    firstName: raw.firstName,
    lastName: raw.lastName,
    mugshot: raw.mugshot ?? undefined,
    nickname: raw.nickname ?? undefined,
    height: raw.height ?? undefined,
    previousClub: raw.previousClub ?? undefined,
    roleModel: raw.roleModel ?? undefined,
    funFacts: raw.funFacts?.map((f: any) => ({ fact: f.fact ?? "" })) ?? undefined,
    role: raw.role ?? undefined,
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "technical",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });

  const rawMember = result.docs[0];

  if (!rawMember) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-2xl">
        Technical member not found
      </div>
    );
  }

  const member: TechnicalMember = sanitizeMember(rawMember);

  return (
    <>
      <Header />
      <TechnicalBio member={member} />
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "technical",
    limit: 1000,
  });
/* eslint-disable @typescript-eslint/no-explicit-any */
  return docs.map((doc: any) => ({
    slug: doc.slug as string,
  }));
}