"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeHost({ data = {} }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.isArray(data.items) ? data.items : [];

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
      className="py-24 bg-slate-900 text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-section relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
            {data.image && (
              <Image
                src={data.image}
                alt={data.heading || "What We Host"}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="reveal-section space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium">
                {data.tagline}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                {data.heading?.replace("Host", "")}
                <em className="text-[#475DB1] font-light italic">Host</em>
              </h2>
              <p className="text-xl text-white/70 font-light">{data.subtext}</p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {items.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#475DB1] shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-lg font-light text-white/90 leading-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
