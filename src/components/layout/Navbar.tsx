"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { User, Calendar, Menu } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-700 ${isScrolled ? "h-14" : "h-16"}`}
        >
          {/* Logo */}
          <div className="nav-logo flex-shrink-0 flex items-center w-1/4">
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
              {["About", "Dining", "Events", "Menu", "Gallery"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: CTA + Icons */}
          <div className="nav-icons flex items-center justify-end space-x-3 w-1/4">
            {/* Book Table — slides in on scroll */}
            <div
              className={`transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center overflow-hidden ${
                isScrolled
                  ? "max-w-[200px] opacity-100 mr-3 translate-x-0"
                  : "max-w-0 opacity-0 mr-0 translate-x-12 pointer-events-none"
              }`}
            >
              <Link
                href="#contact"
                className="hidden sm:flex px-6 py-2.5 text-sm font-medium rounded-full bg-[#475DB1] text-white hover:bg-[#475DB1]/90 shadow-[0_0_15px_rgba(202,158,90,0.2)] hover:shadow-[0_0_20px_rgba(202,158,90,0.4)] whitespace-nowrap transition-all duration-300"
              >
                Book Table
              </Link>
            </div>

            {/* Icon buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center">
                <User size={18} />
              </button>
              <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center">
                <Calendar size={18} />
              </button>
              <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors duration-300 flex items-center justify-center lg:hidden">
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
