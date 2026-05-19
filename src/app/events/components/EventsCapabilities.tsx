"use client";

import Image from "next/image";
import { PartyPopper, Music, Warehouse } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventsCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section ref={containerRef} className="py-24 bg-white">
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
  );
}
