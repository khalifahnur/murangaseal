import React from 'react'
import Header from './Home/HeaderSection'
import HeroSection from './Home/HeroSecction'
import { Footer } from './Home/Footer';
import PartnershipSection from './Home/PartnershipSection';
import MembershipBanner from './Home/MembershipBanner';
import StoreSection from './Home/StoreSection';
import LatestNews from './News/LatestNews';
import MatchContainer from './Match/MatchContainer';
import { HeroBanner } from './Banner';

export default function Container() {


  return (
    <>
        <Header />
        
        <main className="relative">
          <HeroBanner />
          <HeroSection />
          <LatestNews />
          <MatchContainer />
          <MembershipBanner />
          <StoreSection /> 
          <PartnershipSection />
          
        </main>
        <Footer />
    </>
  )
}