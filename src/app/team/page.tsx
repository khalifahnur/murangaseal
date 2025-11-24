import { Footer } from "@/components/Home/Footer";
import Header from "@/components/Home/HeaderSection";
import PartnershipSection from "@/components/Home/PartnershipSection";
import Container from "@/components/Team/Container";
import { getPayloadClient } from "@/lib/payloadClient";
import React from "react";

export default async function page() {
  const payload = await getPayloadClient();

  const { docs: players } = await payload.find({
    collection: "players",
  });

  if (!players || players.length === 0) {
    return <div className="py-20 text-center">No Players yet. Stay tuned!</div>;
  }
  return (
    <div>
      <Header />
      <main>
        <Container data={players}/>
        <PartnershipSection />
      </main>
      <Footer />
    </div>
  );
}
