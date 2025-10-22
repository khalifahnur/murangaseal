import type { Metadata } from "next";
import { Geist, Geist_Mono,Mozilla_Headline } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Muranga Seal Football CLub",
  description: "Official | Muranga Seal FC ",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mozillaHeadline.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
