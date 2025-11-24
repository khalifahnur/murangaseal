import Container from "@/components/About/Container";
import Header from "@/components/Home/HeaderSection";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Murang’a Seal Football Club",
  description:
    "Learn about Murang’a Seal FC — a rising Kenyan Premier League club from Murang’a County. Discover our history, vision, values, community impact, and journey from grassroots to the top flight of Kenyan football.",
  openGraph: {
    title: "About Murang’a Seal FC | Our Story, Vision & Values",
    description:
      "From humble beginnings in Murang’a to competing in the SPortPesa Premier League — get to know the heart, soul, and ambition behind Murang’a Seal Football Club.",
    url: "https://www.murangaseal.com/about",
  },
};

export default function page() {
  return (
    <div>
      <Header />
      <main>
        <Container />
      </main>
    </div>
  );
}
