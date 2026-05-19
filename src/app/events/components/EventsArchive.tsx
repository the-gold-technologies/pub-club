"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventsArchive({ data = {} }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const oldEvents = Array.isArray(data.oldEvents) ? data.oldEvents : [];

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

  if (oldEvents.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="pb-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-section pt-6 border-t border-slate-200/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 px-2">
            <div>
              <span className="text-[9px] tracking-widest text-[#475DB1] uppercase font-bold block">
                {data.title}
              </span>
              <h3 className="text-2xl font-serif text-slate-900 tracking-tight">
                {data.subtitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-light italic max-w-sm">
              {data.description}
            </p>
          </div>

          <div className="relative w-full overflow-hidden flex flex-col gap-6">
            <div className="flex w-max animate-events-marquee hover:[animation-play-state:paused] items-center gap-6 py-2">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex gap-6 items-center">
                  {oldEvents.map((ev: any, idx: number) => (
                    <div
                      key={`${loopIdx}-${idx}`}
                      className="relative w-64 md:w-72 h-72 md:h-96 rounded-2xl overflow-hidden group cursor-pointer border border-slate-200/80 shadow-md hover:shadow-xl shrink-0 transition-all duration-300 bg-slate-50/20"
                    >
                      {ev.src && (
                        <Image
                          src={ev.src}
                          alt={ev.name || ""}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                        <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 w-full text-left">
                          <span className="text-[8px] tracking-widest text-[#475DB1] uppercase font-bold block mb-1">
                            Archive Feature
                          </span>
                          <h4 className="text-white font-serif text-base leading-snug">
                            {ev.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes eventsMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-events-marquee {
          animation: eventsMarquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
