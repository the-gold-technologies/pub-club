"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Sunday Roasts",
    images: [
      "/images/gallery/feature-roast-v3-1.jpg",
      "/images/gallery/feature-roast-v3-2.jpg",
      "/images/gallery/feature-roast-v3-3.jpg",
    ],
    description: "The ultimate British tradition, perfected with local meats.",
  },
  {
    title: "Pub Classics",
    images: [
      "/images/gallery/feature-classic-v3-1.jpg",
      "/images/gallery/feature-classic-v3-2.jpg",
      "/images/gallery/feature-classic-v3-3.jpg",
    ],
    description: "Time-honored favorites with a sophisticated gourmet twist.",
  },
  {
    title: "Seasonal Specials",
    images: [
      "/images/gallery/feature-special-v3-1.jpg",
      "/images/gallery/feature-special-v3-2.jpg",
      "/images/gallery/feature-special-v3-3.jpg",
    ],
    description: "Fresh, local ingredients inspired by the changing seasons.",
  },
];

function FeatureTile({ feature, index }: { feature: any; index: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % feature.images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(
      (prev) => (prev - 1 + feature.images.length) % feature.images.length,
    );
  };

  return (
    <div className="feature-tile group relative h-[450px] md:h-[650px] w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
      {/* Images Slider */}
      {feature.images.map((img: string, i: number) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <Image
            src={img}
            alt={`${feature.title} ${i + 1}`}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      ))}

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#475DB1] transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#475DB1] transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10">
        <div className="space-y-4">
          <div className="w-12 h-[2px] bg-[#61A5FA] transform origin-left transition-transform duration-700 group-hover:scale-x-150" />
          <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-none">
            {feature.title}
          </h3>
          <p className="text-white/70 font-light text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Pagination Dots - Restored at the bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {feature.images.map((_: any, i: number) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === activeIndex ? "w-6 bg-[#475DB1]" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Boutique Border Overlay */}
      <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none group-hover:inset-6 group-hover:border-white/20 transition-all duration-700" />
    </div>
  );
}

export default function FeatureTiles() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".feature-tile",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feature-tiles-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a192f] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching reference image style */}
        <div className="feature-header text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-none">
            Discover Our{" "}
            <em className="italic font-light text-[#61A5FA]">Pub Traditions</em>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-white/10" />
            <p className="text-primary-100/40 uppercase tracking-[0.4em] text-[10px] font-bold">
              Boutique Gastro Experience
            </p>
            <div className="w-12 h-[1px] bg-white/10" />
          </div>
        </div>

        <div className="feature-tiles-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureTile key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
