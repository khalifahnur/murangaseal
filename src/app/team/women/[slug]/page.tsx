import { getPayload } from "payload";
import config from "@payload-config";
import Bio from "@/components/Team/Bio";
import Header from "@/components/Home/HeaderSection";
import { Footer } from "@/components/Home/Footer";

interface PlayerBio {
  jerseyNumber: string | number;
  name: string;
  firstName?: string;
  lastName?: string;
  mugshot?: string;
  age?: number;
  height?: number;
  position: string;
  captain?: boolean;
  loaned?: boolean;
  loanFrom?: string;
  previousClub?: string;
  roleModel?: string;
  funFacts?: { fact: string }[];
}

  /* eslint-disable @typescript-eslint/no-explicit-any */
function sanitizePlayer(player: any): PlayerBio {
  return {
    jerseyNumber: player.jerseyNumber ?? "",
    name: player.name ?? "Unknown Player",
    firstName: player.firstName ?? undefined,
    lastName: player.lastName ?? undefined,
    mugshot: player.mugshot || undefined,
    age: player.age || undefined,
    height: player.height || undefined,
    position: player.position ?? "N/A",
    captain: !!player.captain,
    loaned: !!player.loaned,
    loanFrom: player.loanFrom ?? undefined,
    previousClub: player.previousClub ?? undefined,
    roleModel: player.roleModel ?? undefined,
    funFacts: player.funFacts?.length
      ? player.funFacts.map((f: any) => ({ fact: f.fact ?? "" }))
      : undefined,
  };
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function page({ params }: Props) {
  const { slug } = await params;

  const payload = await getPayload({ config });
  const player = await payload.find({
    collection: "women",
    where: { slug: { equals: slug } },
    depth: 1,
  });

  const rawPlayer = player.docs[0];

  if (!rawPlayer) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-2xl">
        Bio coming soon
      </div>
    );
  }

  const playerBio: PlayerBio = sanitizePlayer(rawPlayer);

  return (
    <>
      <Header />
      <Bio playerBio={playerBio} />
      <Footer />
    </>
  );
}

  /* eslint-disable @typescript-eslint/no-explicit-any */
export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "women",
    limit: 1000,
  });

  return docs.map((p: any) => ({
    slug: p.slug as string,
  }));
}