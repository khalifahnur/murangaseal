import Container from "@/components/About/Container";
// import { Footer } from "@/components/Home/Footer";
import Header from "@/components/Home/HeaderSection";
import React from "react";

export default function page() {
  return (
    <div>
      <Header />
      <main>
        <Container />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
