"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MenuIntro({ data = {} }: { data?: any }) {
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
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center reveal-section space-y-8">
        <p className="text-2xl md:text-3xl text-slate-900 font-serif leading-relaxed italic">
          &quot;{data.quote}&quot;
        </p>
        <div className="w-16 h-px bg-[#475DB1] mx-auto" />
        <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
          {data.subtext}
        </p>
      </div>
    </section>
  );
}
