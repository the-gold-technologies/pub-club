"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PageLoader from "@/components/layout/PageLoader";
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

export default function ChristmasPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Carousel State for Dishes
  const [activeDishIdx, setActiveDishIdx] = useState(0);

  // Tab State for Menus
  const [activeMenuTab, setActiveMenuTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
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
        { opacity: 0, scale: 0.95 },
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

    return () => ctx.revert();
  }, [loading]);

  const menus = [
    {
      title: "Festive Party Menu",
      subtitle: "Corporate Events & Gatherings",
      description:
        "Savor the holiday spirit with classic favourites. Ideal for friends, families, and larger work celebrations.",
      link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Festive-Christmas-Menu.pdf",
      image: "/dish-wellington.png",
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
        "An exceptional, chef-curated banquet. Let us cook while you indulge in gourmet meats, truffles, and fine wine.",
      link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Christmas-Day-Menu.pdf",
      image: "/dish-turkey.png",
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
        "A delightful, child-friendly feast crafted to make the holidays magical and tasty for the little ones.",
      link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Childrens-Christmas-Menu-2.pdf",
      image: "/dish-pudding.png",
      highlights: [
        "Mini Roast Turkey Dinner",
        "Festive Mac & Cheese",
        "Ice Cream Sundae",
      ],
    },
  ];

  const dishes = [
    {
      name: "Gourmet Beef Wellington",
      tagline: "Pastry-wrapped Excellence",
      description:
        "Tender aged beef tenderloin coated with rich mushroom Duxelles, wrapped in delicate Parma ham and golden, flaky puff pastry, served with red wine jus.",
      image: "/dish-wellington.png",
    },
    {
      name: "Traditional Roast Turkey",
      tagline: "A Festive Feast Classic",
      description:
        "Perfectly roasted, herb-infused local turkey served with golden roast potatoes, honey-glazed parsnips, pigs in blankets, and rich homemade cranberry gravy.",
      image: "/dish-turkey.png",
    },
    {
      name: "Flaming Christmas Pudding",
      tagline: "Spectacular Dessert Showstopper",
      description:
        "Rich, spiced holiday pudding bursting with dark dried fruits and brandy, served flaming at your table with premium whipped brandy butter.",
      image: "/dish-pudding.png",
    },
  ];

  const nextDish = () => {
    setActiveDishIdx((prev) => (prev + 1) % dishes.length);
  };

  const prevDish = () => {
    setActiveDishIdx((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#faf9f6] text-neutral-800 overflow-x-hidden"
    >
      <PageLoader isLoading={loading} />
      <Navbar />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/christmas-hero.png"
            alt="Cozy Christmas interior at Seven Stars"
            fill
            className="object-cover opacity-75 contrast-[1.05]"
            priority
          />
          {/* Main photographic dark overlay for high text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40" />
          {/* Seamless blend into the page's light cream background at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-[#faf9f6]/10 to-transparent h-1/2 bottom-0 top-auto z-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs uppercase tracking-[0.25em] font-medium text-white mb-6 animate-pulse">
            <Snowflake className="w-4 h-4 text-blue-200" /> Christmas 2026 at
            Seven Stars
          </div>
          <h1 className="christmas-hero-title text-4xl sm:text-6xl md:text-8xl font-serif text-white tracking-tight leading-[1.02] drop-shadow-xl mb-8">
            A Magical{" "}
            <span className="italic font-light text-[#475DB1]">Christmas</span>
          </h1>
          <p className="christmas-hero-desc text-lg sm:text-xl md:text-2xl text-stone-100 font-serif font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Step into the warmth of our decorated countryside pub in Marsh
            Baldon, Oxford. Unforgettable menus, glowing fireplaces, and festive
            cheer.
          </p>
          <div className="christmas-hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-lg hover:shadow-xl text-center"
            >
              Book Your Table
            </a>
            <a
              href="#menus"
              className="w-full sm:w-auto px-8 py-4 border border-white/60 text-white hover:bg-white/10 uppercase tracking-widest text-xs font-bold rounded-full transition-all text-center"
            >
              Discover Menus
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: FESTIVE ATMOSPHERE (Intro with Split Layout & Images) */}
      <section className="reveal-section py-24 bg-[#FDFBF7] border-b border-black/5 relative overflow-hidden">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Elegant Copy */}
            <div className="lg:col-span-5 space-y-8">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold block">
                Warmth & Hospitality
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.1]">
                Cosy Pub, <br />
                <span className="italic font-light text-[#475DB1]">
                  Brilliant Food
                </span>
              </h2>
              <div className="w-16 h-[1px] bg-[#475DB1] opacity-50" />
              <p className="text-lg text-neutral-600 leading-relaxed font-serif font-light">
                Whether you’re planning an intimate family lunch or a lively
                Christmas party with friends, Seven Stars is the perfect place
                to celebrate.
              </p>
              <p className="text-base text-neutral-500 leading-relaxed font-serif font-light">
                With glowing candles, rustic decor, beautiful Christmas wreaths,
                and seasonal drinks, we make sure your Christmas gathering is
                full of laughter, warmth, and cheer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#475DB1]/5 flex items-center justify-center text-[#475DB1]">
                    <Flame size={18} />
                  </div>
                  <span className="text-xs tracking-wider uppercase font-bold text-neutral-800">
                    Glowing Fireplaces
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#475DB1]/5 flex items-center justify-center text-[#475DB1]">
                    <GlassWater size={18} />
                  </div>
                  <span className="text-xs tracking-wider uppercase font-bold text-neutral-800">
                    Seasonal Drinks
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Image Grid Showcase */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-stretch">
              <div className="col-span-8 relative rounded-3xl overflow-hidden shadow-lg h-[400px]">
                <Image
                  src="/christmas-hero.png"
                  alt="Christmas dinner table"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[4000ms] ease-out"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="relative flex-1 rounded-2xl overflow-hidden shadow-md min-h-[190px]">
                  <Image
                    src="/dish-wellington.png"
                    alt="Beef Wellington Close-up"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative flex-1 rounded-2xl overflow-hidden shadow-md min-h-[190px]">
                  <Image
                    src="/dish-turkey.png"
                    alt="Roast Turkey Platter"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EARLY BOOKING OFFER (Incentive Page Banner) */}
      <section className="reveal-section py-20 bg-[#eef2ff] border-y border-[#475DB1]/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(71,93,177,0.03),transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#475DB1]/10 text-[#475DB1] text-xs font-bold uppercase tracking-widest">
            Christmas Party Incentive
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-neutral-900 leading-tight">
            Book Early to Receive a <br className="hidden sm:inline" />
            <span className="italic font-light text-[#475DB1]">
              £20 Thank-You Voucher
            </span>
          </h2>
          <p className="text-lg text-neutral-600 font-serif font-light max-w-2xl mx-auto leading-relaxed">
            Reserve your party space before the end of{" "}
            <strong className="text-neutral-900 font-bold">October 2026</strong>{" "}
            for a party of 8 or more dining, and receive a £20 voucher to redeem
            in the New Year.
          </p>
          <div className="text-[10px] text-neutral-400 uppercase tracking-widest max-w-md mx-auto">
            *Terms and conditions apply. Vouchers are valid for dining in
            January and February 2027.
          </div>
          <div className="pt-4">
            <a
              href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Secure Table Now
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: FESTIVE MENUS SHOWCASE (Tabbed View with Food Imagery) */}
      <section id="menus" className="reveal-section py-24 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-px">
              {menus.map((menu, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMenuTab(idx)}
                  className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer relative ${
                    activeMenuTab === idx
                      ? "text-[#475DB1] font-extrabold"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {menu.title}
                  {activeMenuTab === idx && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#475DB1] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content panel */}
          <div className="bg-[#FDFBF7] border border-black/5 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            {/* Natural paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Menu Details */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] uppercase font-bold text-[#475DB1] tracking-widest">
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
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white uppercase tracking-widest text-[10px] font-bold rounded-full transition-all"
                  >
                    <Download size={14} /> Download PDF Menu
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
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900">
                Our Christmas{" "}
                <span className="italic font-light text-[#475DB1]">
                  Special Dishes
                </span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-sm">
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
              <span className="text-[10px] uppercase font-bold text-[#475DB1] tracking-widest">
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
                    onClick={() => setActiveDishIdx(idx)}
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
      </section>

      {/* Footer Contact & Reservatons Block */}
      <section className="reveal-section py-20 bg-[#FDFBF7] border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
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
