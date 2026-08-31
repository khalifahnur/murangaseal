import React from "react";
import Header from "../Home/HeaderSection";
import { Footer } from "../Home/Footer";
import ClubHistory from "./HistorySection";
import PartnershipSection from "../Home/PartnershipSection";

export default function Container() {


  return (
    <>
    <Header />
    <ClubHistory />
    <PartnershipSection />
    <Footer />
    </>
  );
}
