"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  { id: 1, txt: "NEWS", link: "/", sectionId: "latest" },
  { id: 2, txt: "MATCHES", link: "/", sectionId: "watch" },
  {
    id: 3,
    txt: "SQUAD",
    link: "/team",
    sectionId: null,
    hasMegaMenu: true,
  },
  { id: 4, txt: "SHOP", link: "/", sectionId: "shop" },
  { id: 5, txt: "CLUB", link: "/club", sectionId: null },
];

const mensTeamMegaMenu = {
  columns: [
    {
      title: "Mens",
      items: [
        { name: "Men's First Team", link: "/team" },
        { name: "Youth", link: "/#" },
      ],
    },

    {
      title: "Women's Football",
      items: [
        { name: "Women's First Team", link: "/#" },
        // {
        //   name: "Women's Team Coaching Staff",
        //   link: "/team/womens-coaching-staff",
        // },
      ],
    },
        {
      title: "Coaching Staff",
      items: [
        { name: "Men's Coaching Staff", link: "/team/technical-team" },
        // {
        //   name: "Academy Coaching Staff",
        //   link: "/#",
        // },
      ],
    },
  ],
  // featuredPlayers: [
  //   {
  //     name: "Wachira",
  //     position: "MF",
  //     image: "/assets/players/soucek.jpg",
  //     link: "/#",
  //   },
  //   {
  //     name: "Michael",
  //     position: "FW",
  //     captain: true,
  //     image: "/assets/players/bowen.jpg",
  //     link: "/#",
  //   },
  // ],
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
    wait: number
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
    link: (typeof bottomLinks)[0]
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
                  className="h-14 md:h-24 md:w-auto transition-transform duration-300 hover:scale-105"
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
          className="fixed left-0 right-0 bg-white shadow-2xl border-t-4 border-primary z-40 mozillaheadline"
          style={{ top: isUpperNavVisible ? "128px" : "80px" }}
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 grid grid-cols-3 gap-8">
                {mensTeamMegaMenu.columns.map((column, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">
                      {column.title}
                    </h3>
                    <ul className="space-y-3">
                      {column.items.map((menuItem, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            href={menuItem.link}
                            className="text-gray-700 hover:text-primary transition-colors duration-200 text-sm font-medium block py-1"
                            onClick={() => setIsMegaMenuOpen(false)}
                          >
                            {menuItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* <div className="col-span-4 border-l border-gray-200 pl-8">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">
                  Featured Players
                </h3>
                <div className="space-y-4">
                  {mensTeamMegaMenu.featuredPlayers.map((player, index) => (
                    <Link
                      key={index}
                      href={player.link}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      onClick={() => setIsMegaMenuOpen(false)}
                    >
                      <div className="w-12 h-12 bg-linear-to-br from-primary to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                            {player.name}
                          </span>
                          {player.captain && (
                            <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                              Captain
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-xs">
                          {player.position}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}

      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-40 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`lg:hidden fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl transition-transform duration-500 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end p-4 border-b border-gray-200">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-black"
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

          <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
            {bottomLinks.map((item) => (
              <div key={item.id}>
                {item.hasMegaMenu ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleLinkClick(item.sectionId, item.link)}
                      className={`block text-base font-bold w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition-all duration-300 border-l-4 ${
                        isHomePage && activeSection === item.sectionId
                          ? "border-primary text-primary"
                          : "border-transparent text-black hover:border-primary"
                      } hover:pl-5`}
                    >
                      {item.txt}
                    </button>
                    <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                      {mensTeamMegaMenu.columns.map((column, index) => (
                        <div key={index}>
                          <h4 className="font-semibold text-gray-700 text-sm mt-3 mb-2">
                            {column.title}
                          </h4>
                          {column.items.map((menuItem, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={menuItem.link}
                              className="block text-sm text-gray-600 py-1 px-3 rounded hover:bg-gray-100 hover:text-primary transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {menuItem.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleLinkClick(item.sectionId, item.link)}
                    className={`block text-base font-bold w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition-all duration-300 border-l-4 ${
                      isHomePage && activeSection === item.sectionId
                        ? "border-primary bg-blue-50 text-primary"
                        : "border-transparent text-black hover:border-primary"
                    } hover:pl-5`}
                  >
                    {item.txt}
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src="/assets/sp-logo.jpg"
                  width={80}
                  height={80}
                  alt="sp Logo"
                  className="h-8 w-auto transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-black">
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
