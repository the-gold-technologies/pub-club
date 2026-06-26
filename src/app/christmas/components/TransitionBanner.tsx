"use client";

import React from "react";
import { Snowflake } from "lucide-react";
import { HangingOrnamentsTransition } from "./HangingOrnaments";
import { HollyIcon } from "./Icons";

export const TransitionBanner = () => {
  return (
    <section className="reveal-section py-24 bg-[#0A192F] text-white relative overflow-hidden">
      <HangingOrnamentsTransition />
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
          <span className="italic font-light text-[#D4AF37]">
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
  );
};
