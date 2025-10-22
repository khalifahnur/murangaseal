import React from 'react'
import Header from './Home/HeaderSection'
import HeroSection from './Home/HeroSecction'
import FixturesSection from './Home/FixturesSection';
import { Footer } from './Home/Footer';
import PartnershipSection from './Home/PartnershipSection';
import MembershipBanner from './Home/MembershipBanner';
import StoreSection from './Home/StoreSection';

export default function Container() {


  return (
    <div>
        <Header />
        <main>
          <HeroSection />
          <FixturesSection />
          <StoreSection />
          <MembershipBanner />
          <PartnershipSection />
          
        </main>
        <Footer />
    </div>
  )
}
