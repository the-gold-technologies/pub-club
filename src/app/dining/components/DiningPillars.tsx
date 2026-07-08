"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Utensils, Sparkles, Clock, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";

gsap.registerPlugin(ScrollTrigger);

interface DiningPillarsProps {
  data?: any;
}

export default function DiningPillars({ data = {} }: DiningPillarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const pillars = data.pillars || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".reveal-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-section",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Feature cards stagger
      gsap.fromTo(
        ".feature-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [pillars, data]);

  if (!pillars || pillars.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 reveal-section">
          <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold block mb-4">
            {data.upperTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
            {data.heading} <br />
            <em className="text-[#475DB1] font-light">{data.headingHighlight}</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 features-grid">
          {pillars.map((item: any, idx: number) => {
            const icons = [<Utensils size={28} key={1} />, <Sparkles size={28} key={2} />, <Clock size={28} key={3} />];
            return (
              <div key={idx} className="feature-card relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white min-h-[480px]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                      {icons[idx % 3]}
                    </div>
                    <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                    <p className="text-white/90 font-light leading-relaxed mb-6">
                      {parseMarkdownLinks(item.description || item.desc)}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {item.bullet1 && (
                      <li className="flex items-center gap-2 text-sm text-white/80 italic">
                        <ChevronRight size={14} className="text-white/60" /> {item.bullet1}
                      </li>
                    )}
                    {item.bullet2 && (
                      <li className="flex items-center gap-2 text-sm text-white/80 italic">
                        <ChevronRight size={14} className="text-white/60" /> {item.bullet2}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
