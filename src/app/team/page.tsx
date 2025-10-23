
import { Footer } from '@/components/Home/Footer'
import Header from '@/components/Home/HeaderSection'
import PartnershipSection from '@/components/Home/PartnershipSection'
import Container from '@/components/Team/Container'
import React from 'react'

export default function page() {
  return (
    <div>
        <Header />
        <main>
            <Container />
            <PartnershipSection />
        </main>
        <Footer />
    </div>
  )
}
