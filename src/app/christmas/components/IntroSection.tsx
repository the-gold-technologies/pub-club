"use client";

import React from "react";
import Image from "next/image";
import { ReindeerIcon, HollyIcon } from "./Icons";

export const IntroSection = () => {
  return (
    <section className="reveal-section py-24 bg-[#FDFBF7] border-b border-black/5 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Intro Copy */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase font-bold flex items-center gap-2">
              Warmth & Festive Cheer <ReindeerIcon />
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
              Celebrate Christmas at <br />
              <span className="italic font-light text-[#B91C1C]">
                Seven Stars in Marsh Baldon!
              </span>
            </h2>
            <div className="w-16 h-[1px] bg-[#B91C1C] opacity-50" />

            <p className="text-lg text-neutral-600 leading-relaxed font-serif font-light">
              Are you looking for the perfect place to celebrate Christmas
              with your loved ones? Seven Stars located in Marsh Baldon,
              Oxford, is here to make your Christmas Day magical!
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm tracking-wider uppercase font-bold text-[#B91C1C] flex items-center gap-2">
                <HollyIcon /> Why Choose Seven Stars:
              </h3>
              <ul className="space-y-3 text-sm text-neutral-600 font-serif font-light">
                <li className="flex gap-3 items-start">
                  <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                  <span>
                    Cosy Pub with beautiful Christmas décor, spreading warmth
                    and festive cheer.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                  <span>
                    Savor festive Christmas dishes prepared by our chefs for
                    the occasion.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
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
  );
};
