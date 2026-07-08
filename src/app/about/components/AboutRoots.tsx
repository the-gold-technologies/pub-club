"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Users, Heart, Utensils } from "lucide-react";
import { parseMarkdownLinks } from "@/utils/text";

export default function AboutRoots({ data }: { data: any }) {
  const rootsImages = Array.isArray(data.rootsImages) && data.rootsImages.length > 0
    ? data.rootsImages
    : data.rootsImage
      ? [data.rootsImage]
      : [];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (rootsImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % rootsImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [rootsImages.length]);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-section space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                {data.rootsTag}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                {data.rootsHeading}{" "}
                <em className="text-[#475DB1] font-light">
                  {data.rootsHeadingItalic}
                </em>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
              <p>{parseMarkdownLinks(data.rootsDesc1)}</p>
              <p>{parseMarkdownLinks(data.rootsDesc2)}</p>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                  <Users size={20} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  {data.pillar1}
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                  <Heart size={20} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  {data.pillar2}
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                  <Utensils size={20} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  {data.pillar3}
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-section relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group bg-slate-950">
            {rootsImages.map((src: string, i: number) => (
              <div
                key={src}
                style={{ transitionDuration: "2000ms" }}
                className={`absolute inset-0 transition-all ease-in-out ${
                  i === currentIdx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Community Spirit ${i + 1}`}
                  fill
                  style={{ transitionDuration: "4000ms" }}
                  className="object-cover group-hover:scale-110 transition-transform ease-out"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-20 pointer-events-none" />
            
            {rootsImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
                {rootsImages.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                      i === currentIdx ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {data.rootsQuote && (
              <div className="absolute bottom-16 left-8 right-8 text-center text-white z-30 pointer-events-none">
                <p className="font-serif text-2xl italic leading-snug drop-shadow-md">
                  {parseMarkdownLinks(data.rootsQuote)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
