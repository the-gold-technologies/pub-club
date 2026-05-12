"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
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

      {/* Introduction - The Indoor Space */}
      <section className="py-24 md:py-32 bg-white">
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
      </section>

      {/* The Garden - The Outdoor Space */}
      <section className="py-24 md:py-32 bg-slate-50">
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
      </section>

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
                    Birthdays, anniversaries, and family reunions find their perfect
                    home in our versatile spaces.
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
                    Our garden and bar often come alive with live acoustic sets and
                    community performances.
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
