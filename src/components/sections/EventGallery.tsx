"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const eventImages = [
  { src: "/images/gallery/event-1.jpg", alt: "Event Highlights" },
  { src: "/images/gallery/event-2.jpg", alt: "Vibrant Atmosphere" },
  {
    src: "/images/gallery/event-celebration.jpg",
    alt: "Main Celebration",
  },
  { src: "/images/gallery/event-4.jpg", alt: "Gathering Details" },
  { src: "/images/gallery/event-5.jpg", alt: "Evening Glow" },
];

export default function EventGallery() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-title",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".gallery-photo-wrapper",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-container",
            start: "top 75%",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 bg-[#0a192f] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title Section */}
        <div className="gallery-title mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.5em] text-primary-400 uppercase font-medium">
            Events & Celebrations
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-none">
            Perfect For{" "}
            <em className="not-italic text-primary-400 font-light">
              Every Moment
            </em>
          </h2>
        </div>

        {/* Gallery Layout - Matching User Image */}
        <div className="gallery-container grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          {/* Left Column: 2 small images stacked */}
          <div className="md:col-span-1 flex flex-col gap-6 order-2 md:order-1">
            <div className="gallery-photo-wrapper group relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 shadow-2xl transition-all duration-500 hover:z-10">
              <Image
                src={eventImages[0].src}
                alt={eventImages[0].alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            </div>
            <div className="gallery-photo-wrapper group relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 shadow-2xl transition-all duration-500 hover:z-10">
              <Image
                src={eventImages[1].src}
                alt={eventImages[1].alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            </div>
          </div>

          {/* Center Column: 1 large tall image */}
          <div className="md:col-span-3 h-full order-1 md:order-2">
            <div className="gallery-photo-wrapper group relative h-[450px] md:h-[650px] w-full rounded-3xl overflow-hidden bg-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-500">
              <Image
                src={eventImages[2].src}
                alt={eventImages[2].alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: 2 small images stacked */}
          <div className="md:col-span-1 flex flex-col gap-6 order-3">
            <div className="gallery-photo-wrapper group relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 shadow-2xl transition-all duration-500 hover:z-10">
              <Image
                src={eventImages[3].src}
                alt={eventImages[3].alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            </div>
            <div className="gallery-photo-wrapper group relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 shadow-2xl transition-all duration-500 hover:z-10">
              <Image
                src={eventImages[4].src}
                alt={eventImages[4].alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-600/5 -z-10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
