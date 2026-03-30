import React from 'react'
import Header from './Home/HeaderSection'
import HeroSection from './Home/HeroSecction'
import { Footer } from './Home/Footer';
import PartnershipSection from './Home/PartnershipSection';
import MembershipBanner from './Home/MembershipBanner';
import StoreSection from './Home/StoreSection';
import MatchContainer from './Match/MatchContainer';
import HightlightsContainer from './Highlights/HighlightsContainer';
import AnniversaryBanner from './Banner/AnniversaryBanner';

export default function Container() {


  return (
    <>
        <Header />
        <main className="relative">
          <AnniversaryBanner />
          <HeroSection />
          <HightlightsContainer />
          <MatchContainer />  
          <StoreSection /> 
          <MembershipBanner />
          <PartnershipSection />
        </main>
        <Footer />
    </>
  )
}