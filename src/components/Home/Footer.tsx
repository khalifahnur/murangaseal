"use client"

import type React from "react"

import { MapPin, Mail, Phone, ArrowRight, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion,Variants } from "framer-motion"
import Image from "next/image"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants:Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  return (

    
    <footer className="mozillaheadline relative bg-linear-to-b from-[#0a0c1b] to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="h-1 w-full bg-primary"></div>

      <div className="container mx-auto px-4 py-10">
        <motion.div
          className="grid gap-12 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <div className="mb-2">
              <Image
                src="/assets/mseal-logo.png"
                alt="Muranga Seal FC Logo"
                width={180}
                height={60}
                className="mb-2"
              />
              <p className="text-gray-400 mb-4">
                The Pride of Muranga - Established 2018. We are more than a football club; we are a community united by
                passion.
              </p>
            </div>

            <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Membership", href: "https://www.murangaseal.co.ke" },
                { name: "Tickets", href: "https://tickets.murangaseal.co.ke" },
                { name: "Shop", href: "https://www.murangaseal.co.ke/shop" },
                { name: "Match", href: "/#watch" },
                { name: "Club", href: "/club" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-primary">Contact Information</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                <div>
                  <p className="text-gray-300">Email:</p>
                  <a
                    href="mailto:info@murangaseal.com"
                    className="text-white hover:text-primary transition-colors duration-300"
                  >
                    info@murangaseal.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                <div>
                  <p className="text-gray-300">Phone:</p>
                  <a
                    href="tel:+254712633130"
                    className="text-white hover:text-primary transition-colors duration-300"
                  >
                    +254 7126 3313 0
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                
                <div>
                  <p className="text-gray-300">Stadium:</p>
                  <p className="text-white">Sportpesa Arena, Muranga County, Kenya</p>
                </div>
              </li>
            </ul>

            <div className="relative h-32 rounded-lg overflow-hidden border border-gray-800">
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link
                  href="https://maps.app.goo.gl/mitKTfx57SQme1uNA"
                  target="_blank"
                  className="px-3 py-1.5 bg-primary text-black text-sm font-medium rounded-full hover:bg-primary/40 transition-colors duration-300"
                >
                  Get Directions
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: 'https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000', label: "Facebook", href: "https://www.facebook.com/murangaseal", color: "hover:bg-blue-600" },
                { icon: 'https://img.icons8.com/?size=100&id=118638&format=png&color=000000', label: "TikTok", href: "https://www.tiktok.com/@murangaseal?_t=ZM-8zTSB0E1Axk&_r=1", color: "hover:bg-white" },
                { icon: 'https://img.icons8.com/?size=100&id=32323&format=png&color=000000', label: "Instagram", href: "https://www.instagram.com/murangaseal/", color: "hover:bg-pink-600" },
                { icon: 'https://img.icons8.com/?size=100&id=19318&format=png&color=000000', label: "YouTube", href: "https://www.youtube.com/@Murangaseal", color: "hover:bg-red-600" },
                {icon:'https://img.icons8.com/?size=100&id=wCo0O5X01IHO&format=png&color=000000',label:"X",href:"https://x.com/murangaseal",color: "hover:bg-white"}
                
              ].map((social, index) => {
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-white ${social.color} transition-colors duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                  >
                    <Image src={social.icon} alt={social.label} width={30} height={30} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-primary">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news, match updates, and exclusive offers!
            </p>

            <form onSubmit={handleSubscribe} className="mb-8">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 pl-4 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                  aria-label="Subscribe"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              {isSubscribed && (
                <motion.p
                  className="mt-2 text-green-400 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>

              {/* playstore links  */}
            {/* <h3 className="text-lg font-bold mb-4 text-[#fae115]">Download Our App</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Download on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Get it on</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </a>
            </div> */}
          </motion.div>
        </motion.div>

        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Murang&apos;a Seal FC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              
              <Link href="/" className="hover:text-primary transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}