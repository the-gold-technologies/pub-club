"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PageLoader from "@/components/layout/PageLoader";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Download,
  Phone,
  Mail,
  Award,
  Flame,
  GlassWater,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});

gsap.registerPlugin(ScrollTrigger);

// Custom Christmas Vector Icons
const SleighIcon = () => (
  <svg
    className="w-4 h-4 text-[#475DB1] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10c0-2.5 2-4.5 4.5-4.5H15c2.5 0 4.5 2 4.5 4.5v2c0 2-1.5 3.5-3.5 3.5H5.5C3.5 15.5 2 14 2 12v-2z M2 15.5h20 M4 15.5v3a2 2 0 002 2h12a2 2 0 002-2v-3"
    />
  </svg>
);

const ReindeerIcon = () => (
  <svg
    className="w-4 h-4 text-[#475DB1] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v6 M12 6l-3-3 M12 8l-2-2 M12 6l3-3 M12 8l2-2 M12 10c0 3 2 5 5 5h2 M12 10c0 3-2 5-5 5H7 M9 15v5 M15 15v5"
    />
  </svg>
);

const SantaHatIcon = () => (
  <svg
    className="w-4 h-4 text-red-500 inline-block shrink-0 animate-bounce"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
    style={{ animationDuration: "3s" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3a2 2 0 100 4 2 2 0 000-4z M12 7c-3.5 0-7 3-7 7v1c0 1 1 2 2 2h10c1 0 2-1 2-2v-1c0-4-3.5-7-7-7z M4 18h16a2 2 0 012 2v1H2v-1a2 2 0 012-2z"
    />
  </svg>
);

const HollyIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-600 inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12c-2-2-4-1-6 0 1 2 3 3 6 0z M12 12c2-2 4-1 6 0-1 2-3 3-6 0z M12 12c-1 3-3 4-4 6 2-1 3-3 4-6z M12 12c1 3 3 4 4 6-2-1-3-3-4-6z M12 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

const GiftIcon = () => (
  <svg
    className="w-5 h-5 text-[#475DB1] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 12v8H4v-8M22 7H2v5h20V7z M12 7V4a2 2 0 00-2-2H8a2 2 0 00-2 2v3 M12 7V4a2 2 0 012-2h2a2 2 0 012 2v3 M12 22V7"
    />
  </svg>
);

const menus = [
  {
    title: "Festive Party Menu",
    subtitle: "Corporate Events & Gatherings",
    description:
      "Our Festive Menu Is Here! Book Your Table and Enjoy Holiday Favorites! Don’t forget if you book your Christmas Party before the end of October 2025 you will receive a £20 voucher to use towards your booking. Minimum of 8 people dining and booking made before end of October 2025.",
    link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Festive-Christmas-Menu.pdf",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-celebration-2.webp",
    highlights: [
      "Smoked Salmon Starter",
      "Traditional Roast Turkey",
      "Spiced Plum Pudding",
    ],
  },
  {
    title: "Christmas Day Menu",
    subtitle: "The Main Event on December 25th",
    description:
      "Indulge in our Special Christmas Menu: From Turkey to Truffles! Why Cook on Christmas Day when we can do it for you? Book your Christmas Lunch with us here at Seven Stars instead.",
    link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Christmas-Day-Menu.pdf",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/25-dec.webp",
    highlights: [
      "Pan-Seared Scallops",
      "Aged Beef Wellington",
      "Decadent Chocolate Delice",
    ],
  },
  {
    title: "Children's Festive Menu",
    subtitle: "Special Treats for Younger Guests",
    description:
      "To make Christmas extra special for families, we’ve prepared a dedicated children’s menu — light, delicious, and perfect for younger guests.",
    link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Childrens-Christmas-Menu-2.pdf",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/children-christmas.webp",
    highlights: [
      "Mini Roast Turkey Dinner",
      "Festive Mac & Cheese",
      "Ice Cream Sundae",
    ],
  },
];

const dishes = [
  {
    name: "Festive Starters",
    tagline: "Begin the Celebration",
    description:
      "A selection of beautiful, chef-prepared seasonal appetizers to kick off your Christmas meal.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish1.webp",
  },
  {
    name: "Traditional Mains",
    tagline: "The Heart of Christmas",
    description:
      "Hearty, classic holiday main courses prepared using the finest locally sourced ingredients.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish2.webp",
  },
  {
    name: "Decadent Desserts",
    tagline: "A Sweet Finale",
    description:
      "Indulgent treats and festive showstoppers to end your celebration on a sweet note.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish3.webp",
  },
  {
    name: "Festive Canapés",
    tagline: "Perfect for Parties",
    description:
      "Bite-sized delights crafted to complement your festive drinks and social gatherings.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish4.webp",
  },
  {
    name: "Gourmet Selections",
    tagline: "Chef's Handcrafted Specialties",
    description:
      "Unique, seasonal creations highlighting the best of winter game and local produce.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish5.webp",
  },
  {
    name: "Festive Roast Sides",
    tagline: "The Perfect Accompaniments",
    description:
      "Crispy roast potatoes, honey-glazed root veg, and all the classic trimmings.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish6.webp",
  },
  {
    name: "Artisan Cheeseboard",
    tagline: "Savory Indulgence",
    description:
      "A curated selection of British cheeses served with crackers, seasonal chutney, and grapes.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish7.webp",
  },
  {
    name: "Holiday Treats",
    tagline: "Festive Sweet Treats",
    description:
      "Homemade mince pies, truffles, and warm festive cookies served alongside your coffee.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish8.webp",
  },
];

export default function ChristmasPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const santaRef = useRef<HTMLDivElement>(null);

  // Carousel State for Dishes
  const [activeDishIdx, setActiveDishIdx] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const dishContentRef = useRef<HTMLDivElement>(null);
  const slideDirectionRef = useRef<"next" | "prev">("next");

  // Tab State for Menus
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  // Autoplay effect for dishes carousel
  useEffect(() => {
    if (loading || isAutoplayPaused) return;

    const interval = setInterval(() => {
      slideDirectionRef.current = "next";
      const nextIdx = (activeDishIdx + 1) % dishes.length;
      // Animate out first, then set index
      if (dishContentRef.current) {
        gsap.to(dishContentRef.current, {
          opacity: 0,
          x: -35,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setActiveDishIdx(nextIdx);
          },
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activeDishIdx, loading, isAutoplayPaused]);

  const handleMenuTabChange = (idx: number) => {
    if (idx === activeMenuTab || !menuContentRef.current) return;

    // Animate out
    gsap.to(menuContentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveMenuTab(idx);
      },
    });
  };

  const handleDishChange = (newIdx: number) => {
    if (newIdx === activeDishIdx || !dishContentRef.current) return;

    // Determine direction based on index diff
    if (newIdx > activeDishIdx) {
      slideDirectionRef.current = "next";
    } else {
      slideDirectionRef.current = "prev";
    }

    const outX = slideDirectionRef.current === "next" ? -35 : 35;

    // Animate out
    gsap.to(dishContentRef.current, {
      opacity: 0,
      x: outX,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveDishIdx(newIdx);
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const updateIndicator = () => {
      if (!tabsRef.current || !indicatorRef.current) return;
      const activeTabEl = tabsRef.current.children[
        activeMenuTab + 1
      ] as HTMLElement; // +1 to account for the absolute span at index 0
      if (activeTabEl) {
        gsap.to(indicatorRef.current, {
          left: activeTabEl.offsetLeft,
          width: activeTabEl.offsetWidth,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    // Quick delay to ensure initial element layout is calculated properly
    const layoutTimer = setTimeout(updateIndicator, 50);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(layoutTimer);
    };
  }, [activeMenuTab, loading]);

  // Animate Menu Tab details in
  useEffect(() => {
    if (loading || !menuContentRef.current) return;

    gsap.fromTo(
      menuContentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeMenuTab, loading]);

  // Animate Dish details in (slides right-to-left or left-to-right)
  useEffect(() => {
    if (loading || !dishContentRef.current) return;

    const inX = slideDirectionRef.current === "next" ? 35 : -35;

    gsap.fromTo(
      dishContentRef.current,
      { opacity: 0, x: inX },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeDishIdx, loading]);

  useEffect(() => {
    if (loading) return;

    // Initialize smooth scrolling using Lenis locally on this page
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize GSAP ticker frame updates with Lenis
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Parallax Background for Hero
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Parallax effect on Santa image
      if (santaRef.current && heroRef.current) {
        gsap.to(santaRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero Animations
      gsap.fromTo(
        ".christmas-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".christmas-hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 },
      );
      gsap.fromTo(
        ".christmas-hero-cta",
        {
          opacity: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.7,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.7,
        },
      );

      // Section reveal animations
      const revealElements = gsap.utils.toArray(".reveal-section");
      revealElements.forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, [loading]);

  const nextDish = () => {
    const nextIdx = (activeDishIdx + 1) % dishes.length;
    handleDishChange(nextIdx);
  };

  const prevDish = () => {
    const prevIdx = (activeDishIdx - 1 + dishes.length) % dishes.length;
    handleDishChange(prevIdx);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#faf9f6] text-neutral-800 overflow-x-hidden"
    >
      <PageLoader isLoading={loading} />
      <Navbar />

      {/* SECTION 1: HERO SECTION - Custom Full-Backdrop split layout */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A192F] py-16 sm:py-24">
        {/* Background Image */}
        <div ref={heroBgRef} className="absolute inset-0 z-0">
          <Image
            src="/christmas-hero.png"
            alt="Cozy Christmas interior at Seven Stars"
            fill
            className="object-cover object-center opacity-90"
            priority
          />
          {/* Layer of brand color tint overlay on top of background image */}
          <div className="absolute inset-0 bg-[#0A192F]/50 mix-blend-multiply z-10" />
          {/* Readability Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/70 via-transparent to-[#0A192F]/90 z-10" />
        </div>

        {/* Content Layer floating on top */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text and CTAs */}
            <div className="lg:col-span-7 space-y-6 lg:text-left text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8fa2f4]/30 bg-[#8fa2f4]/10 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#8fa2f4] w-fit lg:mx-0 mx-auto animate-pulse">
                <span>❄</span> Festive Season 2026
              </div>

              <h1 className="christmas-hero-title text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Celebrate
                <span className="italic font-light text-[#8fa2f4]">
                  Christmas
                </span>{" "}
                <br />
                at Seven Stars
              </h1>

              <div className="w-16 h-px bg-white/20 lg:mx-0 mx-auto" />

              <p className="christmas-hero-desc text-base sm:text-lg text-slate-300 font-serif font-light leading-relaxed max-w-lg lg:mx-0 mx-auto">
                Step into the warmth of our decorated countryside pub in Marsh
                Baldon, Oxford. Savor award-winning festive menus, cozy up next
                to glowing fireplaces, and celebrate the season in style.
              </p>

              <div className="christmas-hero-cta flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                <a
                  href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-widest text-xs font-bold rounded-full transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Reserve Your Table
                </a>
                <a
                  href="#menus"
                  className="px-8 py-4 border border-white/40 text-white hover:bg-white/10 uppercase tracking-widest text-xs font-bold rounded-full transition-all text-center"
                >
                  Discover Menus
                </a>
              </div>
            </div>

            {/* Right Column: Santa Claus Standalone Picture with Floating Glowing Snow Star */}
            <div ref={santaRef} className="lg:col-span-5 flex justify-center lg:justify-end relative py-8">
              {/* Single glowing snow star (snowflake) next to Santa */}
              <div className="absolute top-[10%] right-[-5%] z-30 text-white/90 animate-pulse pointer-events-none">
                <Snowflake className="w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>

              {/* Standalone Santa image - no card border/background/vignette */}
              <div className="relative w-full max-w-[340px] aspect-[4/5] group flex items-center justify-center z-20 rounded-3xl  overflow-hidden">
                <Image
                  src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-santaclaus.webp"
                  alt="Santa Claus at Seven Stars"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-700 ease-out"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative snowflakes and lines at the bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center gap-2 px-8 opacity-60">
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
            <div className="h-[1px] bg-white/10 flex-grow" />
            <div className="flex gap-3 text-[#8fa2f4] items-center">
              <Snowflake
                className="w-3.5 h-3.5 animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <Snowflake className="w-4 h-4 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.35em] font-serif font-light text-white/80">
                Seven Stars Christmas
              </span>
              <Snowflake className="w-4 h-4 animate-pulse" />
              <Snowflake
                className="w-3.5 h-3.5 animate-spin"
                style={{ animationDuration: "20s" }}
              />
            </div>
            <div className="h-[1px] bg-white/10 flex-grow" />
          </div>
        </div>
      </section>

      {/* SECTION 2A: INTRO & WHY CHOOSE US (Light background) */}
      <section className="reveal-section py-24 bg-[#FDFBF7] border-b border-black/5 relative overflow-hidden">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Intro Copy */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center gap-2">
                Warmth & Festive Cheer <ReindeerIcon />
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
                Celebrate Christmas at <br />
                <span className="italic font-light text-[#475DB1]">
                  Seven Stars in Marsh Baldon!
                </span>
              </h2>
              <div className="w-16 h-[1px] bg-[#475DB1] opacity-50" />

              <p className="text-lg text-neutral-600 leading-relaxed font-serif font-light">
                Are you looking for the perfect place to celebrate Christmas
                with your loved ones? Seven Stars located in Marsh Baldon,
                Oxford, is here to make your Christmas Day magical!
              </p>

              <div className="space-y-4 pt-4">
                <h3 className="text-sm tracking-wider uppercase font-bold text-[#475DB1] flex items-center gap-2">
                  <HollyIcon /> Why Choose Seven Stars:
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600 font-serif font-light">
                  <li className="flex gap-3 items-start">
                    <span className="text-[#475DB1] font-bold mt-0.5">✓</span>
                    <span>
                      Cosy Pub with beautiful Christmas décor, spreading warmth
                      and festive cheer.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-[#475DB1] font-bold mt-0.5">✓</span>
                    <span>
                      Savor festive Christmas dishes prepared by our chefs for
                      the occasion.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-[#475DB1] font-bold mt-0.5">✓</span>
                    <span>
                      Our Pub serves wine, cocktails, and seasonal drinks to
                      enhance Christmas joy.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Santa Claus Image Showcase */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
              <Image
                src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-santaclaus.webp"
                alt="Santa Claus at Seven Stars"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[4000ms] ease-out"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2B: SPECIAL FEATURES & INCENTIVES (Dark background for color breakage) */}
      <section className="reveal-section py-20 bg-[#0a192f] text-white border-y border-white/5 relative overflow-hidden">
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(71,93,177,0.15),transparent_60%)]" />
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Special features */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.4em] text-[#8fa2f4] uppercase font-bold flex items-center gap-2">
                Exclusive Experiences <GiftIcon />
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white leading-tight">
                Special Christmas <br />
                <span className="italic font-light text-[#8fa2f4]">
                  Party Features
                </span>
              </h2>
              <div className="w-12 h-[1px] bg-[#8fa2f4] opacity-50" />

              <ul className="space-y-4 text-base text-slate-300 font-serif font-light pt-2">
                <li className="flex gap-3 items-start">
                  <span className="text-[#8fa2f4] font-bold mt-0.5">✦</span>
                  <span>
                    Special Seating arrangements tailored for families and group
                    bookings.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#8fa2f4] font-bold mt-0.5">✦</span>
                  <span>
                    Elegant options for Private Celebrations and large
                    corporate/friend gatherings.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#8fa2f4] font-bold mt-0.5">✦</span>
                  <span>
                    Book Before October to secure a £20 Voucher reward.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column: Early Booking Card & CTA */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6 shadow-xl">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-[#8fa2f4]/15 text-[#8fa2f4] text-[10px] font-bold uppercase tracking-widest">
                  Early Booking Reward
                </div>
                <h3 className="text-xl font-serif text-white">
                  Secure a{" "}
                  <span className="text-[#8fa2f4] italic font-semibold">
                    £20 Voucher
                  </span>
                </h3>
                <p
                  className="text-sm text-slate-300 font-serif font-light leading-relaxed"
                  style={{ color: "#cbd5e1" }}
                >
                  Book your party of 8 or more before the end of October to
                  receive a thank-you voucher redeemable in the New Year.
                </p>
                <div
                  className="text-[10px] text-slate-400 italic"
                  style={{ color: "#94a3b8" }}
                >
                  *Terms & Conditions apply.
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <p
                  className="text-xs text-slate-400 font-serif font-light"
                  style={{ color: "#94a3b8" }}
                >
                  Tables are filling fast – don&apos;t miss your chance to make
                  this Christmas unforgettable!
                </p>
                <a
                  href="https://sevenstarsatmarshbaldon.co.uk/book-a-table/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-md hover:shadow-lg text-center"
                >
                  Book your Christmas Party Now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FESTIVE MENUS SHOWCASE (Tabbed View with Food Imagery) */}
      <section
        id="menus"
        className="reveal-section py-24 bg-[#faf9f6] relative overflow-hidden"
      >
        {/* Large Christmas Bell Outline on the left (Top) */}
        <div className="absolute left-[-50px] lg:left-4 top-2 w-[320px] h-[320px] opacity-[0.12] text-[#475DB1] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M50 30C45 20 30 20 38 32C42 38 48 34 50 34C52 34 58 38 62 32C70 20 55 20 50 30Z" />
            <circle cx="50" cy="32" r="3" fill="currentColor" />
            <path d="M47 34C40 42 35 55 38 60" />
            <path d="M53 34C60 42 65 55 62 60" />
            <path d="M50 34C40 34 34 44 34 56C34 68 24 74 24 74H76C76 74 66 68 66 56C66 44 60 34 50 34Z" />
            <circle cx="50" cy="78" r="5" fill="currentColor" />
            <path d="M26 71C35 73 65 73 74 71" />
          </svg>
        </div>

        {/* Large Santa Claus Outline on the right (Bottom) */}
        <div className="absolute right-[-50px] lg:right-4 bottom-12 w-[320px] h-[320px] opacity-[0.12] text-[#475DB1] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <circle cx="50" cy="15" r="4" fill="none" />
            <path d="M50 19C42 19 32 25 32 36H68C68 25 58 19 50 19Z" />
            <rect x="28" y="36" width="44" height="6" rx="3" />
            <circle cx="43" cy="48" r="1.5" fill="currentColor" />
            <circle cx="57" cy="48" r="1.5" fill="currentColor" />
            <path d="M39 44C41 43 43 44 44 45" />
            <path d="M61 44C59 43 57 44 56 45" />
            <path
              d="M50 49C52 49 53 51 51 52C50 53 48 53 47 52C45 51 47 49 50 49Z"
              fill="currentColor"
            />
            <path
              d="M50 54C46 54 42 52 38 55C42 57 46 56 50 55C54 56 58 57 62 55C58 52 54 54 50 54Z"
              fill="currentColor"
            />
            <path d="M28 42C24 55 30 75 50 82C70 75 76 55 72 42C68 45 68 49 68 52C68 66 60 74 50 74C40 74 32 66 32 52C32 49 32 45 28 42Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold block">
              Culinary Delights
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900">
              Download Our{" "}
              <span className="italic font-light text-[#475DB1]">
                Festive Menus
              </span>
            </h2>
            <div className="w-12 h-[1px] bg-[#475DB1] opacity-50 mx-auto mt-4" />
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center border-b border-black/5 mb-12">
            <div
              ref={tabsRef}
              className="flex gap-4 sm:gap-8 overflow-x-auto pb-px relative"
            >
              {/* Sliding Indicator */}
              <span
                ref={indicatorRef}
                className="absolute bottom-0 h-[2px] bg-[#475DB1] rounded-full z-10 pointer-events-none"
                style={{ left: 0, width: 0 }}
              />
              {menus.map((menu, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMenuTabChange(idx)}
                  className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap cursor-pointer relative flex items-center gap-2 ${
                    activeMenuTab === idx
                      ? "text-[#475DB1] font-extrabold"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {idx === 0 && <SleighIcon />}
                  {idx === 1 && <ReindeerIcon />}
                  {idx === 2 && <SantaHatIcon />}
                  {menu.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content panel */}
          <div className="bg-[#FDFBF7] border border-black/5 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            {/* Natural paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div
              ref={menuContentRef}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
            >
              {/* Menu Details */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] uppercase font-bold text-[#475DB1] tracking-widest flex items-center gap-2">
                  {activeMenuTab === 0 && <SleighIcon />}
                  {activeMenuTab === 1 && <ReindeerIcon />}
                  {activeMenuTab === 2 && <SantaHatIcon />}
                  {menus[activeMenuTab].subtitle}
                </span>
                <h3 className="text-3xl font-serif text-neutral-950">
                  {menus[activeMenuTab].title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-serif font-light">
                  {menus[activeMenuTab].description}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Menu Highlights Include:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700 font-serif font-light">
                    {menus[activeMenuTab].highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#475DB1] opacity-70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href={menus[activeMenuTab].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-widest text-[10px] font-bold rounded-full transition-all"
                  >
                    <Download size={14} /> Download PDF Menu <SleighIcon />
                  </a>
                </div>
              </div>

              {/* Menu Cover Image */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[300px] sm:h-[350px] shadow-md">
                <Image
                  src={menus[activeMenuTab].image}
                  alt={menus[activeMenuTab].title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2C: TRANSITION BANNER (Make This Christmas Unforgettable - Dark Theme) */}
      <section className="reveal-section py-24 bg-[#0A192F] text-white relative overflow-hidden">
        {/* Soft decorative floating snowflakes and borders */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-white rounded-full translate-x-1/2 translate-y-1/2" />
          <div
            className="absolute top-1/4 right-12 animate-pulse"
            style={{ animationDuration: "6s" }}
          >
            <Snowflake className="w-20 h-20 text-white" />
          </div>
          <div
            className="absolute bottom-1/4 left-12 animate-pulse"
            style={{ animationDuration: "8s" }}
          >
            <Snowflake className="w-16 h-16 text-white" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mb-2">
            <HollyIcon />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white leading-tight">
            Make This Christmas <br className="sm:hidden" />
            <span className="italic font-light text-[#8fa2f4]">
              Unforgettable at Seven Stars
            </span>
          </h2>
          <div className="w-20 h-[1px] bg-white/40 mx-auto" />
          <p className="text-lg sm:text-xl text-white/95 font-serif font-light leading-relaxed max-w-3xl mx-auto">
            Step into the festive spirit at our cosy pub in Marsh Baldon,
            Oxford. Whether you’re planning an intimate family lunch or a lively
            Christmas party with friends, Seven Stars is the perfect place to
            celebrate. With glowing décor, hearty festive dishes, and seasonal
            drinks, we’ll make sure your Christmas gathering is full of warmth,
            laughter, and cheer.
          </p>
        </div>
      </section>

      {/* SECTION 5: SPECIAL DISHES CAROUSEL */}
      <section className="reveal-section py-24 bg-[#FDFBF7] border-t border-black/5 relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold block">
                Visual Feast
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900 flex items-center gap-3">
                Our Christmas{" "}
                <span className="italic font-light text-[#475DB1]">
                  Special Dishes
                </span>
                <HollyIcon />
                <Snowflake
                  className="w-5 h-5 text-[#475DB1] animate-spin"
                  style={{ animationDuration: "12s" }}
                />
              </h2>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevDish}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#475DB1] hover:border-[#475DB1] transition-all cursor-pointer shadow-sm"
                title="Previous Dish"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextDish}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#475DB1] hover:border-[#475DB1] transition-all cursor-pointer shadow-sm"
                title="Next Dish"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dish Detail Carousel Item */}
          <div
            className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-sm overflow-hidden relative"
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
          >
            <div
              ref={dishContentRef}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Image Side */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] shadow-inner">
                <Image
                  src={dishes[activeDishIdx].image}
                  alt={dishes[activeDishIdx].name}
                  fill
                  className="object-cover transition-opacity duration-500 ease-in-out"
                />
              </div>

              {/* Description Side */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[10px] uppercase font-bold text-[#475DB1] tracking-widest flex items-center gap-2">
                  {activeDishIdx === 0 && <SleighIcon />}
                  {activeDishIdx === 1 && <ReindeerIcon />}
                  {activeDishIdx === 2 && <SantaHatIcon />}
                  {dishes[activeDishIdx].tagline}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight transition-all duration-300">
                  {dishes[activeDishIdx].name}
                </h3>
                <div className="w-12 h-[1px] bg-[#475DB1]/30" />
                <p className="text-base text-neutral-600 leading-relaxed font-serif font-light">
                  {dishes[activeDishIdx].description}
                </p>

                {/* Stots/Indicators */}
                <div className="flex gap-2.5 pt-4">
                  {dishes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDishChange(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeDishIdx === idx
                          ? "w-8 bg-[#475DB1]"
                          : "w-1.5 bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact & Reservatons Block */}
      <section className="reveal-section py-20 bg-[#FDFBF7] border-t border-black/5 relative overflow-hidden">
        {/* Large Christmas Bell Outline on the left (Top) */}
        <div className="absolute left-[-50px] lg:left-4 -top-4 w-[320px] h-[320px] opacity-[0.12] text-[#475DB1] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M50 30C45 20 30 20 38 32C42 38 48 34 50 34C52 34 58 38 62 32C70 20 55 20 50 30Z" />
            <circle cx="50" cy="32" r="3" fill="currentColor" />
            <path d="M47 34C40 42 35 55 38 60" />
            <path d="M53 34C60 42 65 55 62 60" />
            <path d="M50 34C40 34 34 44 34 56C34 68 24 74 24 74H76C76 74 66 68 66 56C66 44 60 34 50 34Z" />
            <circle cx="50" cy="78" r="5" fill="currentColor" />
            <path d="M26 71C35 73 65 73 74 71" />
          </svg>
        </div>

        {/* Large Santa Claus Outline on the right (Bottom) */}
        <div className="absolute right-[-50px] lg:right-4 -bottom-3 w-[320px] h-[320px] opacity-[0.12] text-[#475DB1] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <circle cx="50" cy="15" r="4" fill="none" />
            <path d="M50 19C42 19 32 25 32 36H68C68 25 58 19 50 19Z" />
            <rect x="28" y="36" width="44" height="6" rx="3" />
            <circle cx="43" cy="48" r="1.5" fill="currentColor" />
            <circle cx="57" cy="48" r="1.5" fill="currentColor" />
            <path d="M39 44C41 43 43 44 44 45" />
            <path d="M61 44C59 43 57 44 56 45" />
            <path
              d="M50 49C52 49 53 51 51 52C50 53 48 53 47 52C45 51 47 49 50 49Z"
              fill="currentColor"
            />
            <path
              d="M50 54C46 54 42 52 38 55C42 57 46 56 50 55C54 56 58 57 62 55C58 52 54 54 50 54Z"
              fill="currentColor"
            />
            <path d="M28 42C24 55 30 75 50 82C70 75 76 55 72 42C68 45 68 49 68 52C68 66 60 74 50 74C40 74 32 66 32 52C32 49 32 45 28 42Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight leading-none">
            Reserve Your Place at the <br className="hidden sm:inline" />
            <span className="italic font-light text-[#475DB1]">
              Christmas Table
            </span>
          </h2>
          <p className="text-base text-neutral-500 font-serif font-light max-w-xl mx-auto leading-relaxed">
            Tables fill up very fast during the Christmas season. Reserve your
            lunch or party early to avoid missing out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 text-neutral-700">
            <a
              href="tel:01865343337"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#475DB1] transition-colors"
            >
              <Phone size={14} className="text-[#475DB1]" /> 01865 343337
            </a>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <a
              href="mailto:info@sevenstarsatmb.co.uk"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#475DB1] transition-colors"
            >
              <Mail size={14} className="text-[#475DB1]" />{" "}
              info@sevenstarsatmb.co.uk
            </a>
          </div>

          <div className="pt-4">
            <a
              href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-[#475DB1] hover:bg-[#475DB1]/90 uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Book Table Online
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
