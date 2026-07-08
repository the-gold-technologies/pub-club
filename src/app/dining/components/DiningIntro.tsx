"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChefHat, Flame } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";

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
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                {data.introTagline}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                {data.introHeadingPart1} <br />
                <em className="text-[#475DB1] font-light italic text-5xl md:text-7xl">
                  {data.introHeadingItalic}
                </em>{" "}
                {data.introHeadingPart2}
              </h2>
            </div>

            <div className="space-y-6 text-xl text-slate-600 font-light leading-relaxed">
              <p>{parseMarkdownLinks(data.introDesc1)}</p>
              <p className="text-lg">{parseMarkdownLinks(data.introDesc2)}</p>
            </div>

            <div className="pt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                <ChefHat size={18} className="text-[#475DB1]" />
                <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                  {data.introFeature1}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                <Flame size={18} className="text-[#475DB1]" />
                <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                  {data.introFeature2}
                </span>
              </div>
            </div>
          </div>

          <div className="reveal-section relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
            {data.introImage && (
              <Image
                src={data.introImage}
                alt="Exquisite Dish"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
