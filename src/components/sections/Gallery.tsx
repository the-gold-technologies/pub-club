"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "/images/gallery/gallery-1.jpg", alt: "Authentic Pub Atmosphere" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Vibrant Main Bar" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Traditional Pub Character" },
  { src: "/images/gallery/dining-new.png", alt: "Elegant Dining Experience" },
  { src: "/images/amenities/barn-new.png", alt: "Atmospheric Interiors" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Gourmet Dining Setup" },
  { src: "/images/gallery/gallery-7.jpg", alt: "Cozy Bookshelf Nook" },
  { src: "/images/gallery/gallery-8.jpg", alt: "Blue Exterior Charm" },
  { src: "/images/gallery/gallery-9.jpg", alt: "Sunday Roast Specialty" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Premium Gastro Food" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Historic Pub Facade" },
  { src: "/images/gallery/gallery-12.jpg", alt: "Warm Evening Glow" },
  { src: "/images/gallery/gallery-13.jpg", alt: "Community Gathering Space" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Intimate Dining Corner" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Gastro Pub Excellence" },
  { src: "/images/gallery/gallery-16.jpg", alt: "Countryside Welcome" },
  { src: "/images/gallery/gallery-17.jpg", alt: "Traditional Oak Beams" },
  { src: "/images/gallery/gallery-18.jpg", alt: "Premium Beverage Selection" },
  { src: "/images/gallery/gallery-19.jpg", alt: "Summer Garden Vibes" },
  { src: "/images/gallery/gallery-20.jpg", alt: "Seven Stars Hospitality" },
  { src: "/images/gallery/gallery-21.jpg", alt: "Rustic Dining Charm" },
  { src: "/images/gallery/gallery-22.jpg", alt: "Cozy Fireside Seating" },
  { src: "/images/gallery/gallery-23.jpg", alt: "Artisan Kitchen Details" },
  { src: "/images/gallery/gallery-24.jpg", alt: "Elegant Table Settings" },
  { src: "/images/gallery/gallery-25.jpg", alt: "Vintage Pub Decor" },
  { src: "/images/gallery/gallery-26.jpg", alt: "Historic Beams & Brick" },
  { src: "/images/gallery/gallery-27.jpg", alt: "Local Ale Heritage" },
  { src: "/images/gallery/gallery-28.jpg", alt: "Sun-drenched Interiors" },
  { src: "/images/gallery/gallery-29.jpg", alt: "Warm Wood Textures" },
  { src: "/images/gallery/gallery-30.jpg", alt: "Gastro Excellence" },
  { src: "/images/gallery/gallery-31.jpg", alt: "Village Landmark" },
  { src: "/images/gallery/gallery-32.jpg", alt: "Inviting Main Entry" },
  { src: "/images/gallery/gallery-33.jpg", alt: "Premium Dining Hall" },
  { src: "/images/gallery/gallery-34.jpg", alt: "Traditional Pub Heart" },
  { src: "/images/gallery/gallery-35.jpg", alt: "Seven Stars Experience" },
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
    <section ref={ref} id="gallery" className="py-24 bg-[#0a192f] relative overflow-hidden">
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
              <em className="not-italic italic text-primary-400 font-light">
                Gallery
              </em>
            </h3>
            <p className="text-primary-100/70 leading-relaxed font-light text-lg max-w-2xl">
              A comprehensive look into the Seven Stars. Explore our historic architecture, 
              vibrant interiors, and the premium gastro experience across our entire curated collection.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-primary-400/60">
            <Camera size={24} strokeWidth={1.2} />
          </div>
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
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-massive {
          animation: marquee-massive 140s linear infinite;
        }
      `}</style>
    </section>
  );
}
