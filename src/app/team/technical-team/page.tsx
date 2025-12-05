import React from "react";
import { Footer } from "@/components/Home/Footer";
import Header from "@/components/Home/HeaderSection";
import PartnershipSection from "@/components/Home/PartnershipSection";
import { getPayloadClient } from "@/lib/payloadClient";
import TechnicalTeamGrid from "@/components/Team/TechnicalTeamGrid";
import config from "@payload-config";
import { getPayload } from "payload";

export default async function page() {
  const payload = await getPayloadClient();

  const { docs: technical } = await payload.find({
    collection: "technical",
    limit: 100,
    depth: 1,
  });

  if (!technical || technical.length === 0) {
    return (
      <div className="py-20 text-center text-xl">
        No technical team members added yet. Stay tuned!
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <TechnicalTeamGrid technical={technical} />

        <PartnershipSection />
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "technical",
    limit: 100,
  });
  return docs;
}