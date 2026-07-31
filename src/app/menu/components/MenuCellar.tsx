"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Beer, Wine, GlassWater, Coffee } from "lucide-react";
import { parseMarkdownLinks } from "@/utils/text";

gsap.registerPlugin(ScrollTrigger);

export default function MenuCellar({ data = {} }: { data?: any }) {
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
  }, [data]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-[#0a192f] text-white overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-10">
        {data.backgroundImage && (
          <Image
            src={data.backgroundImage}
            alt=""
            aria-hidden="true"
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-section space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-primary-400 uppercase font-bold">
                {data.tagline}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                {data.heading} <br />
                <em className="text-primary-400 font-light italic">
                  {data.headingHighlight}
                </em>
              </h2>
            </div>

            <p className="text-xl text-primary-100/70 font-light leading-relaxed">
              {parseMarkdownLinks(data.description)}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Beer className="text-primary-400" />
                <span className="text-sm tracking-widest uppercase font-bold">
                  {data.drinksList?.[0] || "Local Ales"}
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Wine className="text-primary-400" />
                <span className="text-sm tracking-widest uppercase font-bold">
                  {data.drinksList?.[1] || "Fine Wines"}
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <GlassWater className="text-primary-400" />
                <span className="text-sm tracking-widest uppercase font-bold">
                  {data.drinksList?.[2] || "Lagers & Ciders"}
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Coffee className="text-primary-400" />
                <span className="text-sm tracking-widest uppercase font-bold">
                  {data.drinksList?.[3] || "Soft Drinks"}
                </span>
              </div>
            </div>
          </div>

          <div className="reveal-section relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
            {data.sideImage && (
              <Image
                src={data.sideImage}
                alt="Local Ales"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
