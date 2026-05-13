"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Users,
  Flame,
  Sun,
  PartyPopper,
  Music,
  Tent,
  Warehouse,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Data for Upcoming Events
const upcomingEvents = [
  {
    id: 1,
    title: "Mother's Day Lunch",
    date: "March 30th",
    time: "Set Luncheon",
    description:
      "Treat Mum to a special day out with our exclusive 2 or 3 Course Set Luncheon. Enjoy our seasonal menus crafted by the head chef for the perfect family gathering.",
    pricing: "ADULTS £28.95 / £33.95 | CHILDREN £17.95 / £21.95",
    highlight: "GLASS OF PROSECCO FOR MOMS",
    contactInfo: "01865 343337 | info@sevenstarsatmb.co.uk",
    image: "/images/481171001_957353706531406_1040071741557670337_nlow.png",
    category: "Special Occasion",
  },
  {
    id: 2,
    title: "Mother's Day Family Luncheon",
    date: "March 30th",
    time: "Afternoon Table",
    description:
      "Join us at Seven Stars at Marsh Baldon for an exquisite 2 or 3 Course Set Luncheon celebrating mothers. Includes a complimentary glass of Prosecco for moms alongside seasonal culinary highlights.",
    pricing: "ADULTS £28.95 / £33.95 | CHILDREN £17.95 / £21.95",
    highlight: "GLASS OF PROSECCO FOR MOMS",
    contactInfo: "01865 343337 | info@sevenstarsatmb.co.uk",
    image: "/images/481171001_957353706531406_1040071741557670337_nlow.webp",
    category: "Family Dining",
  },

  {
    id: 3,
    title: "Indian Culinary Showcase & Banquet",
    date: "Upcoming Tasting",
    time: "Evening Experience",
    description:
      "Experience a quintessential collection of authentic Indian flavours, from spiced plant-based soya and rich paneer delicacies to traditional staple preparations crafted with aromatic heritage spices.",
    pricing: "Tasting Menu & Pairings Available upon Request",
    highlight: "Authentic Heritage Indian Recipes",
    contactInfo: "Book via Info Desk or Call Directly",
    image: "/images/481983309_18036627329600436_7680148243878380970_nlow.webp",
    category: "Culinary Tasting",
  },
];

// Data for Past Archive Events Marquee
const oldEvents = [
  {
    src: "/images/481171001_957353706531406_1040071741557670337_nlow.png",
    name: "Mother's Day Classic Luncheon",
  },
  {
    src: "/images/481171001_957353706531406_1040071741557670337_nlow.webp",
    name: "Mother's Day Reserve Banquet",
  },
  {
    src: "/images/481171001_957353706531406_1040071741557670337_nlow (1).webp",
    name: "Mother's Day Set Luncheon",
  },
  {
    src: "/images/481983309_18036627329600436_7680148243878380970_nlow.webp",
    name: "Indian Heritage Tasting Gathering",
  },
  {
    src: "/images/481171001_957353706531406_1040071741557670337_nlow.png",
    name: "Spring Classic Gathering",
  },
  {
    src: "/images/481983309_18036627329600436_7680148243878380970_nlow.webp",
    name: "Heritage Spices Showcase Banquet",
  },
];

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // State to track which event is main (index 0) and which are side items (index 1 and 2)
  const [displayIndices, setDisplayIndices] = useState([0, 1, 2]);

  const handleSwap = (clickedPosition: number) => {
    setDisplayIndices((prev) => {
      const newIndices = [...prev];
      const temp = newIndices[0];
      newIndices[0] = newIndices[clickedPosition];
      newIndices[clickedPosition] = temp;
      return newIndices;
    });
  };

  const mainItem = upcomingEvents[displayIndices[0]];
  const smallItem1 = upcomingEvents[displayIndices[1]];
  const smallItem2 = upcomingEvents[displayIndices[2]];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      if (bgRef.current && heroRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero content stagger
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Section reveal animations
      const sections = gsap.utils.toArray(".reveal-section");
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <section
        ref={heroRef}
        className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src="/images/gallery/event-celebration.jpg"
            alt="Events at Seven Stars"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        </div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7">
              <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-[#475DB1]" />
                <span className="block text-[#475DB1] uppercase tracking-[0.4em] text-[10px] font-bold">
                  Memorable Occasions
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                Events & <br />
                <span className="italic font-light text-[#475DB1]">
                  Celebrations
                </span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <div className="hero-reveal border-l border-white/20 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic">
                  &quot;From intimate gatherings in our historic bar to grand
                  celebrations in the garden, we host moments that matter.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIFIED CREATIVE OCCASIONS & ARCHIVE SHOWCASE */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Ambient Decorative Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#475DB1]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#475DB1]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Unified Section Header */}
          <div className="reveal-section text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-[#475DB1]" />
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold">
                Seven Stars Calendar
              </span>
              <span className="w-12 h-px bg-[#475DB1]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-slate-900 tracking-tight leading-none">
              Upcoming{" "}
              <em className="text-[#475DB1] font-light not-italic">&</em> Past
              Occasions
            </h2>
            <p className="text-lg text-slate-500 font-light mt-4 max-w-2xl mx-auto">
              Experience the vibrant tapestry of Seven Stars. Join us for
              upcoming featured dining events or explore captured moments from
              our historic archives.
            </p>
          </div>

          {/* THE CREATIVE LEFT-RIGHT EDITORIAL SUITE */}
          <div className="mb-24">
            {/* Featured Items - Asymmetric Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
              {/* Main Large Item */}
              <div className="reveal-section lg:col-span-7 space-y-6">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl group bg-slate-50/50">
                  <div className="absolute inset-0">
                    <Image
                      src={mainItem.image}
                      alt={mainItem.title}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-8 left-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <span className="text-[10px] tracking-widest uppercase mb-1 block">
                      {mainItem.category}
                    </span>
                    <p className="text-xl font-serif italic">
                      {mainItem.highlight || "Memorable moments at Seven Stars"}
                    </p>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 text-center p-1">
                    <span className="font-serif text-xs font-bold text-[#475DB1] leading-tight">
                      {mainItem.date}
                    </span>
                  </div>
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-serif text-slate-900 mb-3">
                    {mainItem.title}
                  </h3>
                  <p className="text-base text-slate-600 font-light leading-relaxed">
                    {mainItem.description}
                  </p>
                </div>
              </div>

              {/* Secondary Column */}
              <div className="lg:col-span-5 flex flex-col justify-center gap-12">
                {/* Small Item 1 */}
                <div
                  className="reveal-section group cursor-pointer"
                  onClick={() => handleSwap(1)}
                >
                  <div className="flex gap-6 items-center">
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl bg-slate-50/50">
                      <Image
                        src={smallItem1.image}
                        alt={smallItem1.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] tracking-widest text-[#475DB1] font-bold uppercase">
                        {smallItem1.date}
                      </span>
                      <h3 className="text-xl font-serif text-slate-900 group-hover:text-[#475DB1] transition-colors">
                        {smallItem1.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-light line-clamp-2">
                        {smallItem1.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Small Item 2 */}
                <div
                  className="reveal-section group cursor-pointer"
                  onClick={() => handleSwap(2)}
                >
                  <div className="flex gap-6 items-center">
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl bg-slate-50/50">
                      <Image
                        src={smallItem2.image}
                        alt={smallItem2.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] tracking-widest text-[#475DB1] font-bold uppercase">
                        {smallItem2.date}
                      </span>
                      <h3 className="text-xl font-serif text-slate-900 group-hover:text-[#475DB1] transition-colors">
                        {smallItem2.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-light line-clamp-2">
                        {smallItem2.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explore CTA */}
                <div className="reveal-section pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-5 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#475DB1] flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
                      <ArrowRight size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-900">
                        Request Table
                      </span>
                      <span className="block text-[10px] text-slate-400 font-light">
                        Inquire about our upcoming occasions
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* PART 3: CONTINUOUS ARCHIVE VAULT SLIDE (Integrated directly into the section flow) */}
          <div className="reveal-section pt-6 border-t border-slate-200/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 px-2">
              <div>
                <span className="text-[9px] tracking-widest text-[#475DB1] uppercase font-bold block">
                  Historic Archive
                </span>
                <h3 className="text-2xl font-serif text-slate-900 tracking-tight">
                  Moments From Our Vault
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-light italic max-w-sm">
                Hover over any archived photograph below to reveal the signature
                occasion name.
              </p>
            </div>

            <div className="relative w-full overflow-hidden flex flex-col gap-6">
              <div className="flex w-max animate-events-marquee hover:[animation-play-state:paused] items-center gap-6 py-2">
                {[...Array(2)].map((_, loopIdx) => (
                  <div key={loopIdx} className="flex gap-6 items-center">
                    {oldEvents.map((ev, idx) => (
                      <div
                        key={`${loopIdx}-${idx}`}
                        className="relative w-64 md:w-72 h-72 md:h-96 rounded-2xl overflow-hidden group cursor-pointer border border-slate-200/80 shadow-md hover:shadow-xl shrink-0 transition-all duration-300 bg-slate-50/20"
                      >
                        <Image
                          src={ev.src}
                          alt={ev.name}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 w-full text-left">
                            <span className="text-[8px] tracking-widest text-[#475DB1] uppercase font-bold block mb-1">
                              Archive Feature
                            </span>
                            <h4 className="text-white font-serif text-base leading-snug">
                              {ev.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes eventsMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-events-marquee {
            animation: eventsMarquee 40s linear infinite;
          }
        `}</style>
      </section>

      {/* Introduction - The Indoor Space */}
      {/* <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                  Indoor Gatherings
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                  Classic, comfortable <br />
                  <em className="text-[#475DB1] font-light italic">
                    atmospheres.
                  </em>
                </h2>
              </div>

              <div className="space-y-6 text-xl text-slate-600 font-light leading-relaxed">
                <p>
                  Step through the door and into a space that feels both classic
                  and comfortable. The main bar and dining area seats 76 guests,
                  warmed in winter by an open fireplace and alive in summer with
                  light.
                </p>
              </div>

              <div className="pt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                  <Users size={18} className="text-[#475DB1]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                    Seats 76
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                  <Flame size={18} className="text-[#475DB1]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                    Open Fireplace
                  </span>
                </div>
              </div>
            </div>

            <div className="reveal-section relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/gallery/gallery-25.jpg"
                alt="Main Bar Atmosphere"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* The Garden - The Outdoor Space */}
      {/* <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section lg:order-2 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                  The Garden
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                  One of the finest <br />
                  <em className="text-[#475DB1] font-light italic">
                    beer gardens.
                  </em>
                </h2>
              </div>

              <div className="space-y-6 text-xl text-slate-600 font-light leading-relaxed">
                <p>
                  Step outside and you&apos;ll discover one of the finest beer
                  gardens in the county. The perfect space for 120 to 150
                  guests, ideal for slow summer afternoons and grand
                  celebrations.
                </p>
              </div>

              <div className="pt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100">
                  <Sun size={18} className="text-[#475DB1]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                    150 Capacity
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100">
                  <Tent size={18} className="text-[#475DB1]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                    Outdoor Bar
                  </span>
                </div>
              </div>
            </div>

            <div className="reveal-section lg:order-1 relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/assets/SEVEN_STARS_2026_02_09-0072.jpg"
                alt="Beer Garden"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* What We Host Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/event-celebration.jpg"
                alt="Event Hosting and Celebrations"
                fill
                className="object-cover"
              />
            </div>

            <div className="reveal-section space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium">
                  Occasions
                </span>
                <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                  What We{" "}
                  <em className="text-[#475DB1] font-light italic">Host</em>
                </h2>
                <p className="text-xl text-white/70 font-light">
                  Perfect For..
                </p>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  "Birthday parties & milestone celebrations",
                  "Family get-togethers & reunion dinners",
                  "Corporate lunches & team away days",
                  "Wedding receptions & pre-wedding celebrations",
                  "Summer BBQ parties",
                  "Christmas parties & NYE celebrations",
                  "Community events & fundraisers",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#475DB1] shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-lg font-light text-white/90 leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Special Highlights Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-section">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium block mb-4">
              Our Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
              From Intimate to <br />
              <em className="text-[#475DB1] font-light">Grand Occasions</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-section relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white">
              <Image
                src="/images/gallery/gallery-3.jpg"
                alt="Celebrations"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                    <PartyPopper size={32} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Celebrations</h3>
                  <p className="text-white/90 font-light leading-relaxed">
                    Birthdays, anniversaries, and family reunions find their
                    perfect home in our versatile spaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal-section relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white">
              <Image
                src="/images/gallery/gallery-4.jpg"
                alt="Live Events"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                    <Music size={32} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Live Events</h3>
                  <p className="text-white/90 font-light leading-relaxed">
                    Our garden and bar often come alive with live acoustic sets
                    and community performances.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal-section relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white">
              <Image
                src="/images/gallery/gallery-8.jpg"
                alt="The Private Barn"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                    <Warehouse size={32} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">The Private Barn</h3>
                  <p className="text-white/90 font-light leading-relaxed">
                    Our signature private space for up to 40 guests, offering an
                    exclusive feel for your most special moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
