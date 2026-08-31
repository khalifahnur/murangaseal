import type { Metadata } from "next";
import { Geist, Geist_Mono,Mozilla_Headline,Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ReactLenis } from 'lenis/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mozillaHeadline = Mozilla_Headline ({
  variable: '--font-mozilla_headline',
  subsets: ['latin'],
});

const bodyFont = Barlow_Condensed  ({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "Murang’a Seal Football Club | Official Website",
    template: "%s | Murang’a Seal FC", 
  },
  description:
    "Official website of Murang’a Seal FC — Proudly representing Murang’a County in the FKF Premier League. Latest news, fixtures, results, tickets, shop, and squad updates.",
  keywords: [
    "Murang’a Seal FC",
    "Murang’a Seal",
    "FKF Premier League",
    "Kenyan football",
    "Murang’a County football",
    "Seal Army",
    "Kenya Premier League",
    "Murang’a Stadium",
    "Kenyan soccer",
  ],
  authors: [{ name: "Murang’a Seal FC" }],
  creator: "Murang’a Seal Football Club",
  publisher: "Murang’a Seal FC",
  metadataBase: new URL("https://www.murangaseal.com"),
  alternates: {
    canonical: "https://www.murangaseal.com",
  },
  openGraph: {
    title: "Murang’a Seal Football Club | Official Website",
    url: "https://www.murangaseal.com",
    siteName: "Murang’a Seal FC",
    description:
      "Home of the Seals — FKF Premier League club from Murang’a. News, matches, tickets, merchandise and more.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Murang’a Seal FC – Pride of Murang’a",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murang’a Seal FC | Official",
    description: "Pride of Murang’a | FKF Premier League | Passion. Pride. Performance.",
    images: ["/twitter-home.jpg"],
    site: "@MurangaSealFC", 
    creator: "@MurangaSealFC",
  },
  verification: {
    google: "aYC4kPgtb1ooNBlHlaNzEc2XlpmkNbcQZ7FwKNpuMaU",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
   <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Murang’a Seal FC",
              url: "https://www.murangaseal.com",
              logo: "https://www.murangaseal.com/favicon.ico",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mozillaHeadline.variable} ${bodyFont.variable} antialiased`}
      >
        <ReactLenis root>
        {children}
        </ReactLenis>
      </body>
    </html>
  );
}
