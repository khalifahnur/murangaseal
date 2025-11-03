import React from 'react'
import Header from './Home/HeaderSection'
import HeroSection from './Home/HeroSecction'
import FixturesSection from './Home/FixturesSection';
import { Footer } from './Home/Footer';
import PartnershipSection from './Home/PartnershipSection';
import MembershipBanner from './Home/MembershipBanner';
import StoreSection from './Home/StoreSection';
import LatestNews from './News/LatestNews';

export default function Container() {


  return (
    <>
        <Header />
        <main className="relative">
          <HeroSection />
          <LatestNews />
          <FixturesSection />
          <MembershipBanner />
          <StoreSection /> 
          <PartnershipSection />
          
        </main>
        <Footer />
    </>
  )
}
