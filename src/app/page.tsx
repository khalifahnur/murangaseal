import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Murang’a Seal Football Club | Official Website",
  description:
    "Welcome to the official home of Murang’a Seal FC — a proud Kenyan football club competing in the SportPesa Premier League, dedicated to excellence, community, and developing top-tier talent.",
  openGraph: {
    title: "Murang’a Seal FC | Official Website",
    description:
      "Discover Murang’a Seal Football Club — rising stars of Kenyan football. Follow our journey, matches, players, and community impact in the FKF Premier League.",
    url: "https://www.murangaseal.com",
    siteName: "Murang’a Seal FC",
    type: "website",
  },
};

export default function Home() {
  return (
    <Container />
  );
}

export const dynamic = 'force-dynamic';
