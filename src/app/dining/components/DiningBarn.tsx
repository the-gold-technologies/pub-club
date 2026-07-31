"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Users, GlassWater } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";

gsap.registerPlugin(ScrollTrigger);

interface DiningBarnProps {
  data?: any;
}

export default function DiningBarn({ data = {} }: DiningBarnProps) {
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
    <section ref={containerRef} className="py-24 md:py-32 bg-[#0A192F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-section order-2 lg:order-1 relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
            {data.barnImage && (
              <Image
                src={data.barnImage}
                alt={data.barnHeading}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          <div className="reveal-section order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                {data.barnTagline}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                {data.barnHeading} <em className="text-[#475DB1] font-light italic">{data.barnHeadingItalic}</em>
              </h2>
            </div>

            <p className="text-xl text-slate-300 font-light leading-relaxed">
              {parseMarkdownLinks(data.barnDesc)}
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-5">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-[#475DB1]">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-1">
                    {data.capacityTitle}
                  </h3>
                  <p className="text-slate-400 font-light text-sm">
                    {parseMarkdownLinks(data.capacityDesc)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-[#475DB1]">
                  <GlassWater size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-1">
                    {data.beerTentTitle}
                  </h3>
                  <p className="text-slate-400 font-light text-sm">
                    {parseMarkdownLinks(data.beerTentDesc)}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="/contact"
                className="inline-block text-center px-8 py-4 bg-[#475DB1] text-white rounded-full uppercase tracking-widest text-xs font-bold hover:bg-[#475DB1]/90 transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                {data.barnCtaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
