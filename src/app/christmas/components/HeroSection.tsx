"use client";

import React from "react";
import Image from "next/image";
import { HangingOrnamentsHero } from "./HangingOrnaments";
import { Snowflake } from "lucide-react";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
  heroBgRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection = ({ heroRef, heroBgRef }: HeroSectionProps) => {
  return (
    <section
      ref={heroRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0A192F] py-16 sm:py-24"
    >
      {/* Hanging Ornaments */}
      <HangingOrnamentsHero />

      {/* Background Image */}
      <div ref={heroBgRef} className="absolute inset-0 z-0">
        <Image
          src="/christmas-pub-hero.png"
          alt="Bright Christmas pub celebration"
          fill
          className="object-cover object-center opacity-100"
          priority
        />
        {/* Darker gradient overlay, stronger on the left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/85 via-[#0A192F]/50 to-[#0A192F]/20 z-10" />
      </div>

      {/* Content Layer floating on top */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text and CTAs */}
          <div className="lg:col-span-7 space-y-6 lg:text-left text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#E6C653] w-fit lg:mx-0 mx-auto animate-pulse">
              <span>❄</span> Festive Season 2026
            </div>

            <h1 className="christmas-hero-title text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Celebrate
              <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                {" "}
                Christmas{" "}
              </span>{" "}
              <br />
              at Seven Stars
            </h1>

            <div className="w-16 h-px bg-white/20 lg:mx-0 mx-auto" />

            <p className="christmas-hero-desc text-base sm:text-lg text-slate-200 font-serif font-light leading-relaxed max-w-lg lg:mx-0 mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Step into the warmth of our decorated countryside pub in Marsh
              Baldon, Oxford. Savor award-winning festive menus, cozy up next
              to glowing fireplaces, and celebrate the season in style.
            </p>

            <div className="christmas-hero-cta flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <a
                href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#B91C1C] hover:bg-[#990000] text-white uppercase tracking-widest text-xs font-bold rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.4)] hover:shadow-xl text-center"
              >
                Reserve Your Table
              </a>
              <a
                href="#menus"
                className="px-8 py-4 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/10 uppercase tracking-widest text-xs font-bold rounded-full transition-all text-center"
              >
                Discover Menus
              </a>
            </div>
          </div>

          {/* Right Column: Santa Claus Standalone Picture with Floating Glowing Snow Star */}
        </div>
      </div>

      {/* Decorative snowflakes and lines at the bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center gap-2 px-8 opacity-60">
        <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
          <div className="h-[1px] bg-white/10 flex-grow" />
          <div className="flex gap-3 text-[#D4AF37] items-center">
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
  );
};
