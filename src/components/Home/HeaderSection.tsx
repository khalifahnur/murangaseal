"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import MembershipBanner from "./MembershipBannerHeader";

const upperLinks = [
  {
    id: 1,
    txt: "Membership",
    link: "https://www.murangaseal.co.ke",
  },
  {
    id: 2,
    txt: "Tickets",
    link: "https://tickets.murangaseal.co.ke",
  },
  {
    id: 3,
    txt: "Shop",
    link: "https://www.murangaseal.co.ke/shop",
  },
];

const bottomLinks = [
  { id: 1, txt: "NEWS", link: "/", sectionId: "latest", hasSubMenu: true },
  {
    id: 2,
    txt: "FIXTURES & RESULTS",
    link: "/",
    sectionId: "match",
    hasSubMenu: true,
  },
  {
    id: 3,
    txt: "SQUAD",
    link: "/team",
    sectionId: null,
    hasMegaMenu: true,
  },
  { id: 4, txt: "SHOP", link: "/", sectionId: "shop", hasSubMenu: true },
  { id: 5, txt: "CLUB", link: "/club", sectionId: null, hasSubMenu: true },
];

const socialLinks = [
  { icon: "X", link: "#" }, // Placeholder for X (Twitter) icon
  { icon: "IG", link: "#" }, // Placeholder for Instagram icon
  { icon: "YT", link: "#" }, // Placeholder for YouTube icon
  { icon: "FB", link: "#" }, // Placeholder for Facebook icon
  { icon: "TT", link: "#" }, // Placeholder for TikTok icon
  { icon: "SC", link: "#" }, // Placeholder for Snapchat icon
  { icon: "LI", link: "#" }, // Placeholder for LinkedIn icon
  { icon: "WA", link: "#" }, // Placeholder for WhatsApp icon
];

// 2. Main Navigation Data
// Added 'hasSubMenu' to render the chevron arrow '>' like in the image
// const bottomLinks = [
//   { id: 1, txt: "LATEST NEWS", link: "/", sectionId: "latest", hasSubMenu: true },
//   { id: 2, txt: "TICKETS", link: "/", sectionId: "tickets", hasSubMenu: true },
//   { id: 3, txt: "MATCHES", link: "/", sectionId: "match", hasSubMenu: true },
//   { id: 4, txt: "WEST HAM TV", link: "/", sectionId: "tv", hasSubMenu: true },
//   {
//     id: 5,
//     txt: "TEAMS",
//     link: "/team",
//     sectionId: null,
//     hasMegaMenu: true // This triggers the accordion
//   },
//   { id: 6, txt: "UP TO 40% OFF KIT", link: "/", sectionId: "shop", highlight: true },
//   { id: 7, txt: "HOSPITALITY", link: "/club", sectionId: null, hasSubMenu: true },
//   { id: 8, txt: "THE CLUB", link: "/club", sectionId: null, hasSubMenu: true },
//   { id: 9, txt: "FANS", link: "/fans", sectionId: null, hasSubMenu: true },
// ];

const mensTeamMegaMenu = {
  columns: [
    {
      title: "Teams",
      items: [
        { name: "Men's First Team", link: "/team" },
        { name: "Women's First Team", link: "/#" },
        { name: "Youth", link: "/#" },
      ],
    },
    {
      title: "Staff",
      items: [{ name: "Men's Coaching Staff", link: "/team/technical-team" }],
    },
  ],
  promo: {
    title: "Mseal Membership",
    image: "/assets/MsealCard.png",
    link: "https://murangaseal.co.ke",
    priceText:
      "Why Join?\n Become part of the Seal family. Direct support to the team and exclusive community access.",
    footerText: "Join Now",
  },
};

export default function Header() {
  const [isUpperNavVisible, setIsUpperNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("latest");
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const handleMegaMenuEnter = () => {
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    setIsMegaMenuOpen(false);
  };

  const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    wait: number,
  ) => {
    let timeout: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsUpperNavVisible(false);
        setIsMegaMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsUpperNavVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    }

    if (isHomePage) {
      updateActiveSection(currentScrollY);
    }
  }, [lastScrollY, isHomePage]);

  const updateActiveSection = useCallback((scrollY: number) => {
    const sections = bottomLinks
      .filter((link) => link.sectionId !== null)
      .map((link) => link.sectionId as string);
    const buffer = 150;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;

        if (
          scrollY >= elementTop - buffer &&
          scrollY < elementBottom - buffer
        ) {
          setActiveSection(sectionId);
          return;
        }
      }
    }

    setActiveSection("");
  }, []);

  const smoothScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navigateToHomeSection = (sectionId: string) => {
    if (pathname === "/") {
      smoothScrollToSection(sectionId);
    } else {
      router.push("/");
      setTimeout(() => {
        const checkElement = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            smoothScrollToSection(sectionId);
          } else {
            setTimeout(checkElement, 100);
          }
        };
        checkElement();
      }, 100);
    }
  };

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 50);
    window.addEventListener("scroll", debouncedScroll, { passive: true });

    if (isHomePage) {
      updateActiveSection(window.scrollY);
    }

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [handleScroll, updateActiveSection, isHomePage]);

  const handleLinkClick = (sectionId: string | null, link: string) => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);

    setTimeout(() => {
      if (sectionId && isHomePage) {
        smoothScrollToSection(sectionId);
      } else if (sectionId && !isHomePage) {
        navigateToHomeSection(sectionId);
      } else if (link) {
        router.push(link);
      }
    }, 100);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleDesktopLinkClick = (
    e: React.MouseEvent,
    link: (typeof bottomLinks)[0],
  ) => {
    e.preventDefault();

    if (link.hasMegaMenu) {
      return;
    }

    if (link.sectionId && isHomePage) {
      smoothScrollToSection(link.sectionId);
    } else if (link.sectionId && !isHomePage) {
      navigateToHomeSection(link.sectionId);
    } else {
      router.push(link.link);
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 z-50 mozillaheadline">
        <div
          className="bg-linear-to-b from-[#0a0c1b] to-black text-white border-t-8 border-primary transition-all duration-500 ease-in-out transform ${
 opacity-100 translate-y-0"
        >
          <div className="px-4 py-1 flex items-center justify-end">
            <div className="flex items-center gap-2">
              {upperLinks.map((itm, idx) => (
                <React.Fragment key={itm.id}>
                  <Link
                    href={itm.link}
                    className="relative group overflow-hidden px-3 py-1 transition-all duration-300 hover:skew-x-2"
                    target="_blank"
                  >
                    <span className="relative z-10 text-white group-hover:text-primary transition-colors duration-300 text-xs font-medium">
                      {itm.txt}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 h-0 bg-gray-900 group-hover:h-full transition-all duration-300 ease-out"></div>
                  </Link>
                  {idx < upperLinks.length - 1 && (
                    <span className="text-white/60 text-xs">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md transition-all duration-500 ease-in-out">
          <div className="px-2 md:px-4 py-2 flex items-center justify-between">
            <Link href="/" className="shrink-0">
              <div className="h-10 w-15 md:h-16 md:w-32 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                <Image
                  src="/assets/mseal-logo.png"
                  alt="Muranga Seals"
                  width={1000}
                  height={800}
                  className="md:h-24 md:w-auto transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {bottomLinks.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={
                    item.hasMegaMenu ? handleMegaMenuEnter : undefined
                  }
                >
                  <button
                    onClick={(e) => handleDesktopLinkClick(e, item)}
                    className={`relative font-bold py-2 px-1 transition-all duration-300 group text-sm ${
                      isHomePage && activeSection === item.sectionId
                        ? "text-primary"
                        : "text-black hover:text-primary"
                    } ${
                      isMegaMenuOpen && item.hasMegaMenu ? "text-primary" : ""
                    }`}
                  >
                    <span className="relative z-10">{item.txt}</span>
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                        (isHomePage && activeSection === item.sectionId) ||
                        (isMegaMenuOpen && item.hasMegaMenu)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></div>
                  </button>
                </div>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-black font-semibold text-xs">
                  In partnership with
                </span>
                <div>
                  <Image
                    src="/assets/sp-logo.jpg"
                    width={80}
                    height={80}
                    alt="sp Logo"
                    className="w-auto transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <button
              className="lg:hidden flex flex-col justify-center items-center w-7 h-7 relative focus:outline-none z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {isMegaMenuOpen && (
        <div
          className="fixed left-0 right-0 bg- z-40 mozillaheadline bg-neutral-50"
          style={{ top: isUpperNavVisible ? "128px" : "80px" }}
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="h-1 bg-primary w-full shadow-md"></div>
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url('/assets/bg.jpg')`,
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
            }}
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="col-span-1 md:col-span-4 flex flex-col space-y-6">
                {mensTeamMegaMenu.columns.map((column, index) => (
                  <div key={index}>
                    <ul className="space-y-4">
                      {column.items.map((menuItem, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            href={menuItem.link}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="text-gray-950 hover:text-primary/20 text-base font-medium block transition-all duration-200 hover:translate-x-1"
                          >
                            {menuItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {mensTeamMegaMenu.promo && (
                <div className="col-span-1 md:col-span-8 flex justify-end">
                  <Link
                    href={mensTeamMegaMenu.promo.link}
                    className="group block relative w-full max-w-2xl"
                    onClick={() => setIsMegaMenuOpen(false)}
                  >
                    <div className="relative overflow-hidden rounded-md  h-[400px]">
                      <Image
                        src={mensTeamMegaMenu.promo.image}
                        alt="Murang'a Seals Membership Card"
                        width={600}
                        height={500}
                        className="object-fill rounded-2xl"
                        priority
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                      <div className="absolute bottom-6 left-6 text-white">
                        <pre className=" text-sm  leading-none uppercase">
                          {mensTeamMegaMenu.promo.priceText}
                        </pre>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-gray-950 text-lg font-bold group-hover:underline decoration-[#d4af37] underline-offset-4">
                        {mensTeamMegaMenu.promo.footerText}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-gray-950 overflow-hidden mozillaheadline ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between p-6">
            <div className="w-22 h-22 relative">
              <Image
                src="/assets/mseal-logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-6 py-4 space-y-4">
            {bottomLinks.map((item) => (
              <div key={item.id}>
                {item.hasMegaMenu ? (
                  <div className="group">
                    <button className="flex items-center justify-between w-full text-left py-1 group">
                      <span className="text-2xl font-extrabold text-white uppercase tracking-tight leading-none">
                        {item.txt}
                      </span>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="mt-4 ml-2 pl-4 border-l-2 border-white/20 space-y-4">
                      {mensTeamMegaMenu?.columns.map((column, index) => (
                        <div key={index}>
                          <h4 className="font-bold text-white/60 text-sm uppercase tracking-wider mb-2">
                            {column.title}
                          </h4>
                          <ul className="space-y-2">
                            {column.items.map((menuItem, itemIndex) => (
                              <li key={itemIndex}>
                                <Link
                                  href={menuItem.link}
                                  className="block text-xl font-bold text-white hover:text-[#d4af37] transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {menuItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleLinkClick(item.sectionId, item.link)}
                    className="flex items-center justify-between w-full text-left py-1 group"
                  >
                    <span className="text-4xl font-extrabold uppercase tracking-tight leading-none text-white">
                      {item.txt}
                    </span>
                    {(item.hasSubMenu || item.sectionId === null) && (
                      <svg
                        className="w-5 h-5 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto px-6 py-8 relative">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-linear-to-tl from-black/20 to-transparent pointer-events-none"></div>

            <p className="text-xs font-bold text-white uppercase mb-4 text-center tracking-widest">
              Follow Muranga Seal Football Club
            </p>

            <div className="flex space-x-4 items-center justify-center">
              {[
                {
                  icon: "https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000",
                  label: "Facebook",
                  href: "https://www.facebook.com/murangaseal",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: "https://img.icons8.com/?size=100&id=118638&format=png&color=000000",
                  label: "TikTok",
                  href: "https://www.tiktok.com/@murangaseal?_t=ZM-8zTSB0E1Axk&_r=1",
                  color: "hover:bg-white",
                },
                {
                  icon: "https://img.icons8.com/?size=100&id=32323&format=png&color=000000",
                  label: "Instagram",
                  href: "https://www.instagram.com/murangaseal/",
                  color: "hover:bg-pink-600",
                },
                {
                  icon: "https://img.icons8.com/?size=100&id=19318&format=png&color=000000",
                  label: "YouTube",
                  href: "https://www.youtube.com/@Murangaseal",
                  color: "hover:bg-red-600",
                },
                {
                  icon: "https://img.icons8.com/?size=100&id=wCo0O5X01IHO&format=png&color=000000",
                  label: "X",
                  href: "https://x.com/murangaseal",
                  color: "hover:bg-white",
                },
              ].map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-white ${social.color} transition-colors duration-300`}
                    //whileHover={{ scale: 1.1 }}
                    //whileTap={{ scale: 0.95 }}
                    target="_blank"
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={30}
                      height={30}
                    />
                  </a>
                );
              })}
            </div>

            <div className="flex justify-center mt-8 opacity-80">
              {/* <Image
                  src="/assets/sp-logo.jpg"
                  width={60}
                  height={60}
                  alt="sp Logo"
                  className="h-6 w-auto grayscale invert brightness-200"
                /> */}

              <div className="flex items-center gap-2">
                <div>
                  <p className="text-xs text-white">Official Partner</p>
                </div>
                <div>
                  <Image
                    src="/assets/sp-logo.jpg"
                    width={80}
                    height={80}
                    alt="sp Logo"
                    className="h-8 w-auto transition-transform duration-300 hover:scale-105 grayscale invert brightness-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
