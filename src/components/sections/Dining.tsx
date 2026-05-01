"use client";

import Image from "next/image";
import { UtensilsCrossed, Leaf, Trophy, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Dining() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        ".dining-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dining-header",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      // Text items
      gsap.fromTo(
        ".dining-text-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".dining-text-item",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Feature Tiles
      gsap.fromTo(
        ".dining-feature-tile",
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".dining-feature-tiles",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Stats
      gsap.fromTo(
        ".dining-stat",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".dining-stat",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Image
      gsap.fromTo(
        ".dining-image",
        { x: 60, opacity: 0, scale: 1.05 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dining-image",
            start: "top 78%",
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
      id="dining"
      className="py-24 bg-neutral-50 relative border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dining-header mb-20 flex items-end justify-between border-b border-black/5 pb-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
              <span className="font-serif text-2xl text-black/10 leading-none">
                02
              </span>
              <span className="w-6 h-[1px] bg-[#475DB1]"></span>
              Food Tales
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-black leading-tight tracking-tight">
              The{" "}
              <em className="not-italic  text-[#475DB1] font-light">Dining</em>{" "}
              Experience
            </h3>
          </div>
          <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-black/5 text-[#475DB1]">
            <UtensilsCrossed size={24} strokeWidth={1.2} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="space-y-8 md:space-y-10">
              <p className="dining-text-item text-neutral-600 leading-relaxed font-light text-xl italic border-l-4 border-primary-600/20 pl-8">
                &quot;Our kitchen works with fresh, carefully sourced
                ingredients to craft heartening dishes that become the season to
                bond together.&quot;
              </p>
              <div className="space-y-6 md:space-y-8">
                <p className="dining-text-item text-neutral-600 leading-relaxed font-light text-lg">
                  At their heart, our dishes are rooted in British pub tradition
                  but we love to bring in Middle Eastern, European and South Asian
                  influences that keep things interesting.
                </p>
                <p className="dining-text-item text-neutral-600 leading-relaxed font-light text-lg">
                  There&apos;s always something to look forward to with
                  scrumptious open sandwiches, wholesome cheese boards and
                  mouthwatering orange and cognac crème brulée.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/5">
              <div className="dining-stat">
                <p className="font-serif text-[#475DB1] text-3xl mb-1">76</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Indoor Capacity
                </p>
              </div>
              <div className="dining-stat">
                <p className="font-serif text-[#475DB1] text-3xl mb-1">150</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Garden Capacity
                </p>
              </div>
            </div>
          </div>

          <div className="dining-image relative h-[600px] w-full rounded-3xl overflow-hidden group border border-black/5 p-2 bg-primary-50">
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-sm">
              <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors z-10 duration-700" />
              <Image
                src="/images/gallery/food-gourmet.jpg"
                alt="Gourmet dish at Seven Stars"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <p className="text-white font-serif text-2xl italic mb-2">
                  Proper Food
                </p>
                <p className="text-xs text-primary-100/80 uppercase tracking-[0.3em]">
                  Honouring British Pub Tradition
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
