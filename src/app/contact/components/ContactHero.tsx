"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero({ data = {} }: { data?: any }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      if (bgRef.current && heroRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero animations
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      ref={heroRef}
      className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-950"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
        {data.backgroundImage && (
          <Image
            src={data.backgroundImage}
            alt="The Seven Stars Exterior"
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
        <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
          <div className="w-12 h-px bg-[#475DB1]" />
          <span className="block text-[#475DB1] uppercase tracking-[0.4em] text-[10px] font-bold">
            {data.tagline}
          </span>
        </div>
        <h1 className="hero-reveal text-5xl md:text-7xl font-serif text-white tracking-tighter leading-[0.9]">
          {data.headingPart1}{" "}
          <span className="italic font-light text-[#475DB1]">
            {data.headingItalicHighlight}
          </span>
        </h1>
      </div>
    </section>
  );
}
