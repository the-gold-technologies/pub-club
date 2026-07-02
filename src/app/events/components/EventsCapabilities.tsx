"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";

gsap.registerPlugin(ScrollTrigger);

interface CapabilityData {
  title: string;
  description: string;
  image: string;
  iconName: string;
}

interface EventsCapabilitiesProps {
  data?: {
    upperTag?: string;
    heading?: string;
    headingHighlight?: string;
    capabilities?: CapabilityData[];
  };
}

export default function EventsCapabilities({ data = {} }: EventsCapabilitiesProps) {
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

  const capabilities = Array.isArray(data?.capabilities) ? data.capabilities : [];

  if (capabilities.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-section">
          {data.upperTag && (
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium block mb-4">
              {data.upperTag}
            </span>
          )}
          {(data.heading || data.headingHighlight) && (
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              {data.heading} <br />
              {data.headingHighlight && (
                <em className="text-[#475DB1] font-light">
                  {data.headingHighlight}
                </em>
              )}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((card, idx) => {
            // Dynamically resolve lucide icon or fallback to PartyPopper
            const Icon = (LucideIcons as any)[card.iconName] || LucideIcons.PartyPopper;
            return (
              <div
                key={idx}
                className="reveal-section relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white min-h-[380px] flex flex-col justify-between"
              >
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-serif mb-4">{card.title}</h3>
                    <p className="text-white/90 font-light leading-relaxed">
                      {parseMarkdownLinks(card.description)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
