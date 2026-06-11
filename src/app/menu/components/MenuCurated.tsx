"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MenuCurated({ data = {} }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuCategories = Array.isArray(data.menuCategories)
    ? data.menuCategories
    : [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".reveal-section");
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (menuCategories.length < 5) return null;

  return (
    <section ref={containerRef} className="py-32 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-section">
          <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#475DB1]" />
            {data.upperTag}
            <span className="w-8 h-px bg-[#475DB1]" />
          </span>
          <h2 className="text-5xl md:text-6xl font-serif mt-6 text-slate-900">
            {data.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
          {/* 1. Starters: Wide Card */}
          <div className="md:col-span-2 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section">
            {menuCategories[0]?.image && (
              <Image
                src={menuCategories[0].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={menuCategories[0].title}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
              <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold mb-2">
                01
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
                {menuCategories[0].title}
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 font-light">
                {menuCategories[0].items?.map((item: string) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#475DB1]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Pub Classics: Tall Card */}
          <div className="md:col-span-1 md:row-span-2 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section">
            {menuCategories[1]?.image && (
              <Image
                src={menuCategories[1].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={menuCategories[1].title}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20 transition-opacity duration-500" />
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
              <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold">
                02
              </span>
              <div>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
                  {menuCategories[1].title}
                </h3>
                <div className="flex flex-col gap-4 text-white/80 font-light">
                  {menuCategories[1].items?.map((item: string) => (
                    <span
                      key={item}
                      className="flex items-center gap-3 border-b border-white/20 pb-3 last:border-0"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Mains: Square Card */}
          <div className="md:col-span-1 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section">
            {menuCategories[2]?.image && (
              <Image
                src={menuCategories[2].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={menuCategories[2].title}
              />
            )}
            <div className="absolute inset-0 bg-[#475DB1]/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
              <span className="text-white/80 uppercase tracking-widest text-[10px] font-bold mb-2">
                03
              </span>
              <h3 className="text-3xl font-serif text-white mb-4">
                {menuCategories[2].title}
              </h3>
              <div className="flex flex-col gap-2 text-white/90 font-light text-sm">
                {menuCategories[2].items?.slice(0, 2).map((item: string) => (
                  <span key={item}>{item}</span>
                ))}
                <span className="text-white/60 italic">+ More</span>
              </div>
            </div>
          </div>

          {/* 4. Sunday Roast: Square Card */}
          <div className="md:col-span-1 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section bg-slate-900">
            <div className="absolute inset-0 opacity-40">
              {menuCategories[3]?.image && (
                <Image
                  src={menuCategories[3].image}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={menuCategories[3].title}
                />
              )}
            </div>
            <div className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center z-10">
              <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold mb-4">
                04
              </span>
              <h3 className="text-4xl font-serif text-white mb-6">
                {menuCategories[3].title}
              </h3>
              <p className="text-white/70 italic font-light text-sm mb-6">
                {menuCategories[3].description}
              </p>
              <div className="flex flex-col gap-2 text-white/90 font-light">
                {menuCategories[3].items?.map((item: string) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Desserts: Wide Banner Bottom */}
          <div className="md:col-span-3 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section h-[400px]">
            {menuCategories[4]?.image && (
              <Image
                src={menuCategories[4].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 object-center"
                alt={menuCategories[4].title}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-center z-10 w-full md:w-1/2">
              <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold mb-2">
                05
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
                {menuCategories[4].title}
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 font-light">
                {menuCategories[4].items?.map((item: string) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#475DB1]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
