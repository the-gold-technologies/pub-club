"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChefHat, Flame } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DiningIntroProps {
  data?: any;
}

export default function DiningIntro({ data = {} }: DiningIntroProps) {
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
    <section ref={containerRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-section space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                {data.introTagline || "The Craft"}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                {data.introHeadingPart1 || "Serious food,"} <br />
                <em className="text-[#475DB1] font-light italic text-5xl md:text-7xl">
                  {data.introHeadingItalic || "unfussy"}
                </em>{" "}
                {data.introHeadingPart2 || "hospitality."}
              </h2>
            </div>

            <div className="space-y-6 text-xl text-slate-600 font-light leading-relaxed">
              <p>
                {data.introDesc1 || "The combination of relaxed, unfussy hospitality with genuinely high-quality food is what sets us apart. We believe the best meals are served without pretension but with immense skill."}
              </p>
              <p className="text-lg">
                {data.introDesc2 || "Every plate reflects our dedication to sourcing the finest local ingredients and treating them with the respect they deserve."}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                <ChefHat size={18} className="text-[#475DB1]" />
                <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                  {data.introFeature1 || "Expert Chefs"}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                <Flame size={18} className="text-[#475DB1]" />
                <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                  {data.introFeature2 || "Fresh Flavors"}
                </span>
              </div>
            </div>
          </div>

          <div className="reveal-section relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
            <Image
              src={data.introImage || "/images/assets/SEVEN_STARS_2026_02_09-0112.jpg"}
              alt="Exquisite Dish"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
