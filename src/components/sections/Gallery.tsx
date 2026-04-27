"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);

  const images = [
    { src: "/images/hero_pub.png", alt: "Interior ambience" },
    { src: "/images/dining_plate.png", alt: "Dining experience" },
    { src: "/images/event_venue.png", alt: "Events and celebrations" },
    { src: "/images/outdoor_seating.png", alt: "Outdoor seating" },
  ];

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

      // Images: stagger pop-in with scale + fade (like cards being placed on a table)
      gsap.fromTo(
        ".gallery-item",
        { y: 50, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-item",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="gallery" className="py-24 bg-dark-990 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gallery-header mb-16 flex items-end justify-between border-b border-dark-800/60 pb-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-medium flex items-center gap-3">
              <span className="font-serif text-2xl text-dark-700 leading-none">
                04
              </span>
              <span className="w-6 h-[1px] bg-gold-600/50"></span>
              Visual Journey
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight mb-6">
              Our{" "}
              <em className="not-italic italic text-gold-500 font-light">
                Gallery
              </em>
            </h3>
            <p className="text-dark-200 leading-relaxed font-light text-lg max-w-2xl">
              Check out our countryside charm, cosy interiors, a roaring
              fireplace and one of the finest beer gardens in Oxfordshire.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-dark-700 text-gold-600/60">
            <Camera size={24} strokeWidth={1.2} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery-item relative h-80 rounded-2xl overflow-hidden group cursor-pointer ${i === 2 || i === 3 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="absolute inset-0 bg-dark-900/60 group-hover:bg-dark-900/20 transition-colors z-10 duration-500" />
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-serif text-lg tracking-wider border-b border-gold-500/50 pb-2 inline-block">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
