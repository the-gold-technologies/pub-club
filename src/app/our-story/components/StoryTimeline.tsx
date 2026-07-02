"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";

gsap.registerPlugin(ScrollTrigger);

export default function StoryTimeline({ data }: { data: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for the timeline cards
      gsap.fromTo(
        gsap.utils.toArray(".gsap-step-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-step-card",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Scroll-driven animation for the connector lines between grid items
      gsap.utils.toArray(".gsap-connector").forEach((line: any) => {
        const isVertical = line.classList.contains("w-[3px]");
        gsap.fromTo(
          line,
          { scaleX: isVertical ? 1 : 0, scaleY: isVertical ? 0 : 1 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
      <section ref={containerRef} className="py-16 sm:py-24 bg-white relative opacity-99 select-none overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16 lg:gap-y-20 relative pt-8 sm:pt-12">
            {data.map((step: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className={`gsap-step-card relative group flex flex-col h-full ${step.gridClass}`}
                >
                  {/* Connectors container */}
                  {step.lines?.mobile === "down" && (
                    <div className="block md:hidden absolute -bottom-12 left-1/2 w-[3px] h-12 bg-[#475DB1] origin-top gsap-connector z-0" />
                  )}

                  {step.lines?.tablet === "right" && (
                    <div className="hidden md:block lg:hidden absolute top-1/2 -right-8 w-8 h-[3px] bg-[#475DB1] origin-left gsap-connector z-0" />
                  )}
                  {step.lines?.tablet === "left" && (
                    <div className="hidden md:block lg:hidden absolute top-1/2 -left-8 w-8 h-[3px] bg-[#475DB1] origin-right gsap-connector z-0" />
                  )}
                  {step.lines?.tablet === "down" && (
                    <div className="hidden md:block lg:hidden absolute top-full left-1/2 w-[3px] h-16 bg-[#475DB1] origin-top gsap-connector z-0" />
                  )}
                  {step.lines?.tablet === "down-right" && (
                    <>
                      <div className="hidden md:block lg:hidden absolute top-full left-1/2 w-[3px] h-8 bg-[#475DB1] origin-top gsap-connector z-0" />
                      <div className="hidden md:block lg:hidden absolute top-[calc(100%+2rem)] left-1/2 w-[calc(50%+1rem)] h-[3px] bg-[#475DB1] origin-left gsap-connector z-0" />
                      <div className="hidden md:block lg:hidden absolute top-[calc(100%+2rem)] -right-4 w-[3px] h-8 bg-[#475DB1] origin-top gsap-connector z-0" />
                    </>
                  )}

                  {step.lines?.desktop === "right" && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-[3px] bg-[#475DB1] origin-left gsap-connector z-0" />
                  )}
                  {step.lines?.desktop === "left" && (
                    <div className="hidden lg:block absolute top-1/2 -left-8 w-8 h-[3px] bg-[#475DB1] origin-right gsap-connector z-0" />
                  )}
                  {step.lines?.desktop === "down-left" && (
                    <>
                      <div className="hidden lg:block absolute top-full right-1/2 w-[3px] h-10 bg-[#475DB1] origin-top gsap-connector z-0" />
                      <div className="hidden lg:block absolute top-[calc(100%+2.5rem)] right-1/2 w-[calc(50%+1rem)] h-[3px] bg-[#475DB1] origin-right gsap-connector z-0" />
                      <div className="hidden lg:block absolute top-[calc(100%+2.5rem)] -left-4 w-[3px] h-10 bg-[#475DB1] origin-top gsap-connector z-0" />
                    </>
                  )}

                  {/* Actual Card Container */}
                  <div className="w-full relative z-10 flex-grow flex flex-col">
                    {/* Badge */}
                    <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center z-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 rounded-full bg-[#475DB1]/10 scale-110 sm:scale-125 animate-pulse duration-1000" />
                      <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-blue-50 shadow-inner" />
                      <div className="absolute inset-2 sm:inset-3 rounded-full bg-white shadow-md border border-blue-100 flex items-center justify-center text-[#475DB1]">
                        <span className="font-serif text-lg font-bold leading-none">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Main Card Body */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-lg group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-500 border border-slate-100/80 group-hover:border-transparent text-left relative overflow-hidden flex-grow flex flex-col pt-10 sm:pt-12">
                      <div className="relative z-30 flex-grow flex flex-col">
                        <div className="text-[10px] font-mono font-bold text-[#475DB1] uppercase tracking-widest mb-2">
                          {step.subtitle}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif text-slate-900 tracking-tight mb-3 group-hover:text-[#475DB1] transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-normal flex-grow">
                          {parseMarkdownLinks(step.desc)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}
