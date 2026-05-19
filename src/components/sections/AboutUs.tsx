"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutUsProps {
  data?: any;
}

export default function AboutUs({ data = {} }: AboutUsProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image: slides in from left with clip-path wipe
      gsap.fromTo(
        ".about-image",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Heading block: slide up
      gsap.fromTo(
        ".about-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      // Paragraphs: stagger up
      gsap.fromTo(
        ".about-para",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-para",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // CTA link: fade + line expand
      gsap.fromTo(
        ".about-cta",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: ".about-cta",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      ref={ref}
      id="about"
      className="py-24 bg-primary-50/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-image order-2 lg:order-1 relative h-[600px] w-full rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-primary-100/20 group-hover:bg-transparent transition-colors z-10 duration-700" />
            {data.image && (
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                priority
              />
            )}<div className="absolute inset-4 border border-primary-600/20 z-20 pointer-events-none rounded-2xl" />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="about-heading flex flex-col gap-3 pb-8 border-b border-black/5">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                <span className="font-serif text-2xl text-black/10 leading-none">
                  {data.sectionNumber}
                </span>
                <span className="w-6 h-[1px] bg-[#475DB1]"></span>
                {data.upperTag}
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-black leading-tight tracking-tight">
                {data.headingLabel} <br />
                <em className="not-italic text-[#475DB1] font-light">
                  {data.headingItalicHighlight}
                </em>
              </h3>
            </div>

            {Array.isArray(data.paragraphs) && data.paragraphs.map((para: string, idx: number) => (
              <p key={idx} className="about-para text-neutral-600 leading-relaxed font-light text-lg">
                {para}
              </p>
            ))}

            <div className="pt-2">
              <a
                href={data.ctaUrl}
                className="about-cta inline-flex items-center text-[#475DB1] hover:text-primary-700 uppercase tracking-widest text-sm group"
              >
                <span className="mr-4">{data.ctaLabel}</span>
                <span className="w-12 h-[1px] bg-primary-600/30 transition-all group-hover:w-16 group-hover:bg-primary-600"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
