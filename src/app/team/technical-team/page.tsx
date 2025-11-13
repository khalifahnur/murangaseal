import { Footer } from "@/components/Home/Footer";
import Header from "@/components/Home/HeaderSection";
import PartnershipSection from "@/components/Home/PartnershipSection";
import CoachingStaff from "@/components/Team/CoachingStaff";
// import CoachingCardShowcase from "@/components/Team/FutCard";
import React from "react";

export default function page() {
  return (
    <div>
      <Header />
      <main>
        <CoachingStaff />
        {/* <CoachingCardShowcase /> */}
        <PartnershipSection />
      </main>
      <Footer />
    </div>
  );
}
