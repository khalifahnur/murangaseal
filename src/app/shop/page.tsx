import { Footer } from '@/components/Home/Footer'
import Header from '@/components/Home/HeaderSection'
import ProductPage from '@/components/Shop/Container'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Official Shop | Murang’a Seal FC",
  description:
    "Shop the latest Murang’a Seal FC jerseys, training wear, scarves, caps, and exclusive merchandise, and fan gear. Wear the Pride of Murang’a!",
  alternates: {
    canonical: "https://www.murangaseal.com/shop",
  },
  openGraph: {
    title: "Official Murang’a Seal FC Shop | Jerseys & Merchandise",
    description:
      "Get your official home, away, and third kits. Support the Seals in style with authentic club merchandise delivered across Kenya.",
    url: "https://www.murangaseal.com/shop",
    siteName: "Murang’a Seal FC",
  },
}

export default function page() {
  return (

    <>
    <Header />
    <ProductPage />
    <Footer />
    </>
  )
}
