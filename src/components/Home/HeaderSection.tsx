"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const teamsData = [
  {
    id: "men",
    title: "MEN",
    tag: "FIRST",
    image: "/players/men-cpt.png",
    color: "bg-[#d54f1b]",
    link: "/team",
  },
  {
    id: "b-team",
    title: "B TEAM",
    tag: "B TEAM",
    image: "#",
    color: "bg-[#b5121b]",
    link: "/#",
  },
  {
    id: "women",
    title: "WOMEN",
    tag: "FIRST",
    image: "/players/women-cpt.png",
    color: "bg-[#cc101f]",
    link: "/team/women",
  },
];

export default function Header() {
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileTeamsOpen, setMobileTeamsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const location = usePathname();
  const isHomePage = location === "/";

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) return;

      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 50);

      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsTeamsOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const isTransparent =
    isHomePage && isAtTop && !isHovered && !isTeamsOpen && !isMobileMenuOpen;
  const textColor = isTransparent ? "text-white" : "text-gray-900";

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-transform duration-300 bodyfont ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex relative bg-primary text-gray-300 text-[12px] font-medium tracking-wide py-2.5 px-4 md:px-8 justify-between items-center ">
        <div className="flex space-x-6">
        </div>
        <div className="flex space-x-4 ml-auto">
          <a
            href="https://www.murangaseal.co.ke"
            className="hover:text-black transition-colors text-[#ffff]"
          >
            MEMBERSHIP
          </a>
          <span className="text-white">|</span>
          <a
            href="https://tickets.murangaseal.co.ke"
            className="hover:text-black transition-colors text-[#ffff]"
          >
            TICKET
          </a>
          <span className="text-white">|</span>
          <a
            href="/shop"
            className="hover:text-black transition-colors text-[#fff]"
          >
            SHOP
          </a>
        </div>
      </div>

      <div
        className={`relative px-4 md:px-8 h-20 md:h-[120px] md:gap-10 w-full transition-colors duration-300 z-10 flex md:block items-center justify-between ${isTransparent ? "bg-transparent" : "bg-white shadow-md"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:-top-10 md:translate-y-0 w-16 h-16 md:w-[115px] md:h-[115px] flex items-center justify-center z-999">
          <Link href="/" onClick={() => setIsTeamsOpen(false)}>
            <img
              src="/assets/mseal-logo.png"
              alt="Brentford FC Logo"
              className={`w-full h-full object-contain filter transition-all duration-300 ${!isTransparent ? "drop-shadow-none" : "drop-shadow-lg"}`}
            />
          </Link>
        </div>

        <nav className="hidden pt-5 md:flex absolute bottom-0 left-0 w-full justify-center space-x-10 items-end z-20 pointer-events-none">
          <div className="flex space-x-10 items-end pointer-events-auto">
            <a
              href="/news"
              className={`text-[15px] font-bold tracking-wider ${textColor} hover:text-primary transition-colors pb-6 border-b-4 border-transparent`}
            >
              LATEST
            </a>
            <a
              href="/highlights"
              className={`text-[15px] font-bold tracking-wider ${textColor} hover:text-primary transition-colors pb-6 border-b-4 border-transparent`}
            >
              VIDEO
            </a>
            <a
              href="/#match"
              className={`text-[15px] font-bold tracking-wider ${textColor} hover:text-primary transition-colors pb-6 border-b-4 border-transparent`}
            >
              FIXTURES & RESULTS
            </a>
            <div
              className={`relative cursor-pointer group flex flex-col justify-end pb-6 border-b-4 ${isTeamsOpen ? "border-primary" : "border-transparent hover:border-primary"}`}
              onMouseEnter={() => setIsTeamsOpen(true)}
              onMouseLeave={() => setIsTeamsOpen(false)}
            >
              <span
                className={`text-[15px] font-bold tracking-wider transition-colors ${textColor} ${isTeamsOpen ? "text-primary" : "group-hover:text-primary"}`}
              >
                TEAMS
              </span>
            </div>
            <a
              href="https://tickets.murangaseal.co.ke"
              className={`text-[15px] font-bold tracking-wider ${textColor} hover:text-primary transition-colors pb-6 border-b-4 border-transparent`}
            >
              TICKETS
            </a>

            <Link
              href="/shop"
              className={`text-[15px] font-bold tracking-wider ${textColor} hover:text-primary transition-colors pb-6 border-b-4 border-transparent`}
            >
              SHOP
            </Link>
            <a
              href="/club"
              className={`text-[15px] font-bold tracking-wider ${textColor} hover:text-primary transition-colors pb-6 border-b-4 border-transparent`}
            >
              CLUB
            </a>
          </div>
        </nav>

        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 md:right-8 md:bottom-0 md:top-auto md:translate-y-0 md:pb-5 flex items-end space-x-4 md:space-x-6 transition-colors ${textColor} z-20`}
        >
          <button
            className="md:hidden hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`hidden md:block absolute top-full left-0 w-full overflow-hidden transition-all duration-300 origin-top z-0 ${isTeamsOpen ? "max-h-[600px] opacity-100 shadow-xl" : "max-h-0 opacity-0"}`}
        onMouseEnter={() => setIsTeamsOpen(true)}
        onMouseLeave={() => setIsTeamsOpen(false)}
      >
        <div
          className="absolute inset-0 pointer-events-none bg-diagonal-dots"
          style={{ zIndex: 0 }}
        >
          
        </div>
        <div className="w-full flex h-112.5">
          <div className="flex-1 flex px-8 py-8 space-x-6 ">
            {teamsData.map((team) => (
              <Link
                href={team.link}
                key={team.id}
                className="relative flex-1 group overflow-hidden cursor-pointer shadow-2xl block aspect-3/4 md:aspect-3/4 bg-gradient-to-t from-black/10 via-black to-transparent"
                onClick={() => setIsTeamsOpen(false)}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out">
                  <img
                    src={team.image}
                    alt={team.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="absolute inset-0  z-10 pointer-events-none" />

                {team.tag && (
                  <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white text-[11px] font-semibold tracking-[0.4em] uppercase z-20 [writing-mode:vertical-rl] rotate-180">
                    {team.tag}
                  </div>
                )}

                <div className="absolute bottom-8 w-full flex justify-center z-20">
                  <span className="text-white text-5xl md:text-[64px] font-medium tracking-wide uppercase drop-shadow-lg">
                    {team.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="w-[300px]  p-8 flex flex-col justify-center   z-999">
            <h3 className="text-white font-bold text-xl mb-6">MORE TEAMS</h3>
            <ul className="space-y-6">
              <li>
                <Link
                  href="/team/technical-team"
                  onClick={() => setIsTeamsOpen(false)}
                  className="text-white hover:black/10 transition-colors text-lg flex items-center justify-between group"
                >
                  Coaching Staff{" "}
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-white"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  onClick={() => setIsTeamsOpen(false)}
                  className="text-white hover:black/10 transition-colors text-lg flex items-center justify-between group"
                >
                  About Mseal Women{" "}
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-white"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#111111] overflow-y-auto transition-all duration-300 origin-top z-40 flex flex-col ${isMobileMenuOpen ? "max-h-screen opacity-100 border-t border-white/10 shadow-2xl" : "max-h-0 opacity-0"}`}
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col p-6 space-y-6 text-white text-lg font-bold tracking-wider">
          <a href="/news" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            LATEST
          </a>
          <a
            href="/highlights"
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            VIDEO
          </a>
          <a href="/#match" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            FIXTURES & RESULTS
          </a>

          <div className="flex flex-col border-y border-white/10 py-4 my-2">
            <button
              className="flex items-center justify-between hover:text-primary text-left transition-colors"
              onClick={() => setMobileTeamsOpen(!mobileTeamsOpen)}
            >
              <span>TEAMS</span>
              <ChevronRight
                className={`transition-transform duration-300 ${mobileTeamsOpen ? "rotate-90" : ""}`}
              />
            </button>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ${mobileTeamsOpen ? "max-h-[500px] mt-4 space-y-4" : "max-h-0"}`}
            >
              {teamsData.map((team) => (
                <Link
                  href={team.link}
                  key={team.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="pl-4 text-gray-400 hover:text-white transition-colors text-base"
                >
                  {team.title}
                </Link>
              ))}
              <Link
                href="/team/technical-team"
                onClick={() => setIsMobileMenuOpen(false)}
                className="pl-4 text-gray-400 hover:text-white transition-colors text-base"
              >
                COACHING STAFF
              </Link>
              
              <Link
                href="/#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="pl-4 text-gray-400 hover:text-white transition-colors text-base"
              >
                WOMEN'S TEAM
              </Link>
            </div>
          </div>

          <a
            href="https://tickets.murangaseal.co.ke/"
            className="hover:text-primary transition-colors"
          >
            TICKETS
          </a>
          <a href="/club" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            CLUB
          </a>
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-primary transition-colors"
          >
            SHOP
          </Link>
        </div>

        <div className="mt-auto flex flex-col items-center justify-center pb-12 pt-6">
          <h3 className="text-lg font-bold mb-4 text-primary">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { icon: 'https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000', label: "Facebook", href: "https://www.facebook.com/murangaseal", color: "hover:bg-blue-600" },
              { icon: 'https://img.icons8.com/?size=100&id=118638&format=png&color=000000', label: "TikTok", href: "https://www.tiktok.com/@murangaseal?_t=ZM-8zTSB0E1Axk&_r=1", color: "hover:bg-white" },
              { icon: 'https://img.icons8.com/?size=100&id=32323&format=png&color=000000', label: "Instagram", href: "https://www.instagram.com/murangaseal/", color: "hover:bg-pink-600" },
              { icon: 'https://img.icons8.com/?size=100&id=19318&format=png&color=000000', label: "YouTube", href: "https://www.youtube.com/@Murangaseal", color: "hover:bg-red-600" },
              { icon: 'https://img.icons8.com/?size=100&id=wCo0O5X01IHO&format=png&color=000000', label: "X", href: "https://x.com/murangaseal", color: "hover:bg-white" }
            ].map((social, index) => {
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-white ${social.color} transition-colors duration-300 group`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.label} 
                    width={24} 
                    height={24} 
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  );
}