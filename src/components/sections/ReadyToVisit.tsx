"use client";

import Image from "next/image";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToVisit() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Cinematic staggered entrance matching Hero style
      tl.fromTo(
        ".cta-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          ".cta-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".cta-desc",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ".cta-btns",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power3.out" },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[600px] md:h-[600px] flex items-center overflow-hidden bg-[#0a192f]"
    >
      {/* Cinematic Background matching Hero logic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/cta-background.jpg"
          alt="Atmospheric Seven Stars"
          fill
          className="object-cover brightness-[0.8] contrast-[1.1] scale-105"
        />

        {/* Hero-style Cinematic Persistent Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Symmetrical readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-black/30" />

          {/* Radial spotlight effect centered */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>
      </div>

      {/* Content Container - Center Aligned as requested */}
      <div className="relative z-20 w-full  px-6 sm:px-12 lg:px-24 flex flex-col items-end text-center">
        <div ref={contentRef} className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <span className="cta-label block text-[9px] tracking-[0.7em] text-white/50 uppercase font-bold">
              WE SAVED YOU A SEAT
            </span>
            <h2 className="cta-title text-5xl md:text-5xl font-serif text-white tracking-tight leading-[1.1]">
              Reservation for Your <br />
              <em className="italic font-light text-white">
                {" "}
                Perfect Dining Experience
              </em>
            </h2>
            <div className="cta-desc w-24 h-[1px] bg-white/20 mx-auto" />
            <p className="cta-desc text-lg md:text-lg text-white/90 font-light max-w-xl mx-auto leading-relaxed">
              Experience the perfect blend of village warmth and gourmet
              excellence. Our tables are ready, and our kitchen is heating up.
            </p>
          </div>

          {/* CTA Buttons - Reduced Size */}
          <div className="cta-btns flex flex-col sm:flex-row items-center justify-center gap-6 ">
            <a
              href="#contact"
              className="group flex items-center gap-3 px-6 py-4 bg-[#475DB1] text-white uppercase tracking-[0.2em] text-[10px] font-bold transition-all rounded-full hover:bg-[#475DB1]/90 shadow-[0_10px_40px_rgba(71,93,177,0.3)] hover:scale-105 active:scale-95"
            >
              <Calendar size={16} />
              Plan Your Visit
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-2"
              />
            </a>
            <a
              href="tel:+441865343337"
              className="group flex items-center gap-3 px-6 py-4 border border-white/20 text-white/80 uppercase tracking-[0.2em] text-[10px] font-bold transition-all rounded-full hover:bg-white/5 hover:text-white"
            >
              <Phone size={16} />
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Boutique Border Overlay matching site language */}
      <div className="absolute inset-10 border border-white/5 rounded-[3rem] pointer-events-none hidden lg:block z-30" />
    </section>
  );
}
