// import React from "react";
// import { Footer } from "@/components/Home/Footer";
// import Header from "@/components/Home/HeaderSection";
// import PartnershipSection from "@/components/Home/PartnershipSection";
// import Container from "@/components/Team/Container";
// import { getPayloadClient } from "@/lib/payloadClient";
// import { Metadata } from "next";
// import { getPayload } from "payload";
// import config from "@payload-config";


// export const metadata: Metadata = {
//   title: "Squad 2025/26 | Murang’a Seal Football Club",
//   description:
//     "Meet the full Murang’a Seal FC squad — goalkeepers, defenders, midfielders, and forwards competing in the FKF Premier League. Player profiles, stats, and photos.",
//   alternates: {
//     canonical: "https://www.murangaseal.com/team",
//   },
//   openGraph: {
//     title: "Murang’a Seal FC Squad 2025/26 | Meet the Players",
//     description:
//       "Discover the stars of Murang’a Seal FC — from experienced leaders to exciting young talents pushing for glory in Kenyan football.",
//     url: "https://www.murangaseal.com/team",
//     siteName: "Murang’a Seal FC",
//   },
// }

// export default async function page() {
//   const payload = await getPayloadClient();

//   const { docs: players } = await payload.find({
//     collection: "players",
//     limit:100,
//     depth:2
//   });

//   if (!players || players.length === 0) {
//     return <div className="py-20 text-center">No Players yet. Stay tuned!</div>;
//   }
//   return (
//     <div>
//       <Header />
//       <main>
//         <Container data={players}/>
//         <PartnershipSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export async function generateStaticParams() {
//   const payload = await getPayload({ config });

//   const { docs } = await payload.find({
//     collection: "players",
//     limit: 100,
//     depth:2
//   });
//   return docs;
// }

import React from "react";
import { Footer } from "@/components/Home/Footer";
import Header from "@/components/Home/HeaderSection";
import PartnershipSection from "@/components/Home/PartnershipSection";
import Container from "@/components/Team/Container";
import { getPayloadClient } from "@/lib/payloadClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Squad 2025/26 | Murang'a Seal Football Club",
  description: "Meet the full Murang'a Seal FC squad...",
  alternates: {
    canonical: "https://www.murangaseal.com/team",
  },
  openGraph: {
    title: "Murang'a Seal FC Squad 2025/26 | Meet the Players",
    description: "Discover the stars of Murang'a Seal FC...",
    url: "https://www.murangaseal.com/team",
    siteName: "Murang'a Seal FC",
  },
};

export const revalidate = 60;

export default async function TeamPage() {
  const payload = await getPayloadClient();

  const { docs: players } = await payload.find({
    collection: "players",
    limit: 100,
    depth: 2,
  });

  if (!players || players.length === 0) {
    return <div className="py-20 text-center">No Players yet. Stay tuned!</div>;
  }

  return (
    <>
      <Header />
        <Container data={players} />
        <PartnershipSection />
      <Footer />
    </>
  );
}
