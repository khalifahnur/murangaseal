"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

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
  { id: 1, txt: "NEWS", link: "/#latest", sectionId: "latest" },
  { id: 2, txt: "MATCHES", link: "/#watch", sectionId: "watch" },
  { id: 3, txt: "MEN'S TEAM", link: "/team", sectionId: null },
  { id: 4, txt: "SHOP", link: "/#shop", sectionId: "shop" },
  { id: 5, txt: "CLUB", link: "/club", sectionId: null },
];

export default function Header() {
  const [isUpperNavVisible, setIsUpperNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("latest");
  const router = useRouter();

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - lastScrollY) > 5) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsUpperNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsUpperNavVisible(true);
      }

      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    }

    updateActiveSection(currentScrollY);
  }, [lastScrollY]);

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

        if (scrollY >= elementTop - buffer && scrollY < elementBottom - buffer) {
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
      const headerHeight = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 50);
    window.addEventListener("scroll", debouncedScroll, { passive: true });

    updateActiveSection(window.scrollY);

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [handleScroll, updateActiveSection]);

  const handleLinkClick = (sectionId: string | null, link?: string) => {
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      if (sectionId) {
        smoothScrollToSection(sectionId);
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
    link: typeof bottomLinks[0]
  ) => {
    e.preventDefault();
    if (link.sectionId) {
      smoothScrollToSection(link.sectionId);
    } else {
      router.push(link.link);
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 z-100 mozillaheadline">
        <div
          className={`bg-linear-to-b from-[#0a0c1b] to-black text-white border-t-8 border-primary transition-all duration-300 ease-in-out transform ${
            isUpperNavVisible
              ? "max-h-20 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-full"
          }`}
          style={{ willChange: "transform, opacity, max-height" }}
        >
          <div className="px-4 py-2 flex items-center justify-end">
            <div className="flex items-center gap-2">
              {upperLinks.map((itm, idx) => (
                <React.Fragment key={itm.id}>
                  <Link
                    href={itm.link}
                    className="relative group overflow-hidden px-4 py-2 transition-all duration-300 hover:skew-x-2"
                    target="_blank"
                  >
                    <span className="relative z-10 text-white group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                      {itm.txt}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 h-0 bg-gray-900 group-hover:h-full transition-all duration-300 ease-out"></div>
                  </Link>
                  {idx < upperLinks.length - 1 && (
                    <span className="text-white/60 text-sm">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`bg-white shadow-md transition-all duration-300 ${
            isScrolled ? "shadow-lg bg-white/95 backdrop-blur-sm" : "shadow-md"
          }`}
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/" className="shrink-0">
              <Image
                src="/assets/mseal-logo.png"
                alt="Muranga Seals"
                width={1000}
                height={800}
                className="h-13 md:h-24 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {bottomLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleDesktopLinkClick(e, item)}
                  className={`relative font-bold py-2 transition-all duration-300 group ${
                    activeSection === item.sectionId
                      ? "text-primary border-b-2 border-primary"
                      : "text-black hover:text-primary"
                  }`}
                >
                  <span className="relative z-10">{item.txt}</span>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                      activeSection === item.sectionId
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-black font-semibold text-sm">
                  In partnership with
                </span>
                <Image
                  src="/assets/sp-logo.jpg"
                  width={80}
                  height={80}
                  alt="sp Logo"
                  className="h-8 w-auto transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            <button
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none z-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 mt-1.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 mt-1.5 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-101 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`lg:hidden fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl transition-transform duration-500 ease-in-out z-102 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end p-6 border-b border-gray-200">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-black"
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

          <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
            {bottomLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.sectionId, item.link)}
                className={`block text-lg font-bold w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 border-l-4 ${
                  activeSection === item.sectionId
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-transparent text-black hover:border-primary"
                } hover:pl-6`}
              >
                {item.txt}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/sp-logo.jpg"
                width={60}
                height={60}
                alt="sp Logo"
                className="h-10 w-auto"
              />
              <div>
                <p className="text-sm font-semibold text-black">
                  In partnership with
                </p>
                <p className="text-xs text-gray-600">Official Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}