"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DiningQuoteProps {
  data?: any;
}

export default function DiningQuote({ data = {} }: DiningQuoteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section ref={containerRef} className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]">
        {data.backgroundImage && (
          <Image
            src={data.backgroundImage}
            alt="Atmosphere"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center reveal-section relative z-10">
        <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight italic font-light whitespace-pre-line">
          &quot;{data.quotePart1}{" "}
          <span className="text-[#475DB1] not-italic">{data.quoteHighlight}</span>
          &quot;
        </h3>
      </div>
    </section>
  );
}
