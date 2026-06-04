"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Contact, Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCMSStore } from "@/store/useCMSStore";
import gsap from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { navLinks, fetchNavLinks } = useCMSStore();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch dynamic CMS navigation
  useEffect(() => {
    fetchNavLinks().catch(console.error);
  }, [fetchNavLinks]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const items = Array.isArray(navLinks)
    ? navLinks.map((link) => ({
        name: link.title,
        href: link.link,
        dropdown: link.dropdown
          ? link.dropdown.map((sub) => ({ name: sub.title, href: sub.link }))
          : undefined,
      }))
    : [];

  // GSAP entrance — synced with Hero curtain (1s delay so curtain lifts first)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".nav-logo", { opacity: 0, y: -24 });
      gsap.set(".nav-pill", { opacity: 0, y: -18, scale: 0.94 });
      gsap.set(".nav-icons", { opacity: 0, y: -18 });

      gsap
        .timeline({ delay: 1.1, defaults: { ease: "power3.out" } })
        .to(".nav-logo", { opacity: 1, y: 0, duration: 0.7 })
        .to(
          ".nav-pill",
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          "-=0.4",
        )
        .to(".nav-icons", { opacity: 1, y: 0, duration: 0.55 }, "-=0.35");
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out bg-transparent border-b border-transparent ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-700 ${isScrolled ? "h-14" : "h-16"}`}
        >
          {/* Logo */}
          <div className="nav-logo flex-shrink-0 flex items-center w-auto lg:w-1/4">
            <Link href="/" className="w-36">
              <img
                src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2023/06/FINAL-SEVEN-STARS-GREY-BACKGROUND-2023-trimmed.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          {/* Desktop Pill Nav */}
          <div className="nav-pill hidden lg:flex flex-1 justify-center">
            <div className="flex items-center p-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500">
              {items.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href || "#"}
                      className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300 flex items-center"
                    >
                      {item.name}
                      <svg
                        className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:rotate-180"
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
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-56">
                      <div className="py-2 bg-[#0a192f]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href || "#"}
                            className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Right: CTA + Icons */}
          <div className="nav-icons flex items-center justify-end space-x-3 w-auto lg:w-1/4">
            {/* Book Table — slides in on scroll */}
            <div
              className={`transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center overflow-hidden ${
                isScrolled
                  ? "max-w-[200px] opacity-100 mr-3 translate-x-0"
                  : "max-w-0 opacity-0 mr-0 translate-x-12 pointer-events-none"
              }`}
            >
              <Link
                href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
                className="hidden sm:flex px-6 py-2.5 text-sm font-medium rounded-full bg-[#475DB1] text-white hover:bg-[#475DB1]/90 shadow-[0_0_15px_rgba(202,158,90,0.2)] hover:shadow-[0_0_20px_rgba(202,158,90,0.4)] whitespace-nowrap transition-all duration-300"
              >
                Book Table
              </Link>
            </div>

            {/* Icon buttons */}
            <div className="flex items-center space-x-2">
              <Link
                href={"/contact"}
                className="relative group p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center"
              >
                <Contact size={18} />
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-sm shadow-lg">
                  Contact Us
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center lg:hidden"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-label="Close menu"
          onClick={closeMobileMenu}
        />
        <div
          id="mobile-nav-menu"
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#0a192f]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col pt-24 px-6 pb-8 overflow-y-auto transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {items.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="border-b border-white/5">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown((current) =>
                        current === item.name ? null : item.name,
                      )
                    }
                    className="w-full flex items-center justify-between py-4 text-base font-medium text-gray-200 hover:text-white transition-colors"
                    aria-expanded={openDropdown === item.name}
                  >
                    {item.name}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdown === item.name
                        ? "max-h-48 opacity-100 pb-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href || "#"}
                        onClick={closeMobileMenu}
                        className="block py-2.5 pl-4 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  onClick={closeMobileMenu}
                  className="py-4 text-base font-medium text-gray-200 hover:text-white border-b border-white/5 transition-colors"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          <Link
            href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
            onClick={closeMobileMenu}
            className="mt-8 px-6 py-3 text-center text-sm font-medium rounded-full bg-[#475DB1] text-white hover:bg-[#475DB1]/90 transition-colors"
          >
            Book Table
          </Link>
        </div>
      </div>
    </nav>
  );
}
