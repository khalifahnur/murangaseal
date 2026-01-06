import React from 'react'
import Header from './Home/HeaderSection'
import HeroSection from './Home/HeroSecction'
import { Footer } from './Home/Footer';
import PartnershipSection from './Home/PartnershipSection';
import MembershipBanner from './Home/MembershipBanner';
import StoreSection from './Home/StoreSection';
//import LatestNews from './News/LatestNews';
import MatchContainer from './Match/MatchContainer';
import HightlightsContainer from './Highlights/HighlightsContainer';
//import MerchandiseBanner from './Shop/Banner';
import VoteMatchBanner from './Potm/Banner';
import { HeroBanner } from './Banner';

export default function Container() {


  return (
    <>
        <Header />
        {/* <MerchandiseBanner /> */}
        <VoteMatchBanner />
        
        <main className="relative">
          <HeroBanner />
          <HeroSection />
          {/* <LatestNews /> */}
          <HightlightsContainer />
          <MatchContainer />
          <MembershipBanner />
          <StoreSection /> 
          <PartnershipSection />
          
        </main>
        <Footer />
    </>
  )
}