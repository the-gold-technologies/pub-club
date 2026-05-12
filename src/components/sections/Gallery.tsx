"use client";

import Image from "next/image";
import { Camera, Link } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Compact set of real files (cycled) so the repo ships fewer unique large JPEGs. */
const GALLERY_SRC_CYCLE = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/amenities/barn.jpg",
  "/images/gallery/gallery-6.jpg",
  "/images/gallery/gallery-8.jpg",
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/event-celebration.jpg",
  "/images/gallery/gallery-25.jpg",
] as const;

const GALLERY_ALT_CYCLE = [
  "Authentic Pub Atmosphere",
  "Vibrant Main Bar",
  "Traditional Pub Character",
  "Restaurant Interior Detail",
  "Atmospheric Interiors",
  "Gourmet Dining Setup",
  "Blue Exterior Charm",
  "Premium Gastro Food",
  "Historic Pub Facade",
  "Premium Beverage Selection",
  "Cozy Fireside Seating",
  "Vintage Pub Decor",
] as const;

const images = [
  ...Array.from({ length: 36 }, (_, i) => ({
    src: GALLERY_SRC_CYCLE[i % GALLERY_SRC_CYCLE.length],
    alt: GALLERY_ALT_CYCLE[i % GALLERY_ALT_CYCLE.length],
  })),
  {
    src: "/images/gallery/event-celebration.jpg",
    alt: "Special Event Celebration",
  },
  {
    src: "/images/gallery/gallery-8.jpg",
    alt: "Atmospheric Dining",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header: slide up
      gsap.fromTo(
        ".gallery-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-header",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      // Gallery Items entrance
      gsap.fromTo(
        ".gallery-item",
        { y: 50, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.03, // Even faster stagger for massive collection
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-marquee-container",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="gallery"
      className="py-24 bg-[#0a192f] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gallery-header mb-16 flex items-end justify-between border-b border-white/10 pb-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-primary-400 uppercase font-medium flex items-center gap-3">
              <span className="font-serif text-2xl text-primary-800 leading-none">
                04
              </span>
              <span className="w-6 h-[1px] bg-primary-400/30"></span>
              Visual Journey
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight mb-6">
              Our{" "}
              <em className="not-italic  text-primary-400 font-light">
                Gallery
              </em>
            </h3>
            <p className="text-primary-100/70 leading-relaxed font-light text-lg max-w-2xl">
              A comprehensive look into the Seven Stars. Explore our historic
              architecture, vibrant interiors, and the premium gastro experience
              across our entire curated collection.
            </p>
          </div>
          <a
            href="/gallery"
            className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-primary-400/60"
          >
            <Camera size={24} strokeWidth={1.2} />
          </a>
        </div>
      </div>

      {/* Auto-scrolling Marquee Gallery */}
      <div className="gallery-marquee-container relative w-full overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex w-max animate-marquee-massive items-center gap-4 hover:[animation-play-state:paused] px-4"
        >
          {[...Array(2)].map((_, listIdx) => (
            <div key={listIdx} className="flex gap-4 items-center">
              {images.map((img, i) => (
                <div
                  key={`${listIdx}-${i}`}
                  className="gallery-item relative w-[280px] md:w-[350px] h-80 rounded-2xl overflow-hidden group cursor-pointer border border-primary-500/20 shadow-xl"
                >
                  <div className="absolute inset-0 bg-primary-900/40 group-hover:bg-primary-900/10 transition-colors z-10 duration-500" />
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-white font-serif text-lg tracking-wider border-b border-primary-400/50 pb-2 inline-block">
                      {img.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-massive {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-massive {
          animation: marquee-massive 140s linear infinite;
        }
      `}</style>
    </section>
  );
}
