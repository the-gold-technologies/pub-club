"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";
import ContactPopupModal from "@/components/sections/ContactPopupModal";

gsap.registerPlugin(ScrollTrigger);

export default function UpcomingEvents({ data = {} }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const events = Array.isArray(data.upcomingEvents) ? data.upcomingEvents : [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [displayIndices, setDisplayIndices] = useState<number[]>(() =>
    Array.from({ length: events.length }, (_, i) => i),
  );

  useEffect(() => {
    setDisplayIndices(Array.from({ length: events.length }, (_, i) => i));
  }, [events.length]);

  const handleSwap = (clickedPosition: number) => {
    setDisplayIndices((prev) => {
      const newIndices = [...prev];
      const temp = newIndices[0];
      newIndices[0] = newIndices[clickedPosition];
      newIndices[clickedPosition] = temp;
      return newIndices;
    });
  };

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

  if (events.length === 0) return null;

  const mainItem = events[displayIndices[0] ?? 0] || events[0];

  return (
    <section
      ref={containerRef}
      className="pt-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#475DB1]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#475DB1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-section text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-[#475DB1]" />
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold">
              {data.upperTag}
            </span>
            <span className="w-12 h-px bg-[#475DB1]" />
          </div>
          <h2
            className="text-5xl md:text-7xl font-serif text-slate-900 tracking-tight leading-none"
            dangerouslySetInnerHTML={{
              __html:
                data.heading?.replace(
                  "&",
                  '<em class="text-[#475DB1] font-light not-italic">&</em>',
                ) || "",
            }}
          />
          <p className="text-lg text-slate-500 font-light mt-4 max-w-2xl mx-auto">
            {parseMarkdownLinks(data.description)}
          </p>
        </div>

        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="reveal-section lg:col-span-7 space-y-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl group bg-slate-50/50">
                <div className="absolute inset-0">
                  {mainItem?.image && (
                    <Image
                      src={mainItem.image}
                      alt={mainItem.title || ""}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-8 left-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <span className="text-[10px] tracking-widest uppercase mb-1 block">
                    {mainItem?.category}
                  </span>
                  <p className="text-xl font-serif italic">
                    {mainItem?.highlight}
                  </p>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 text-center p-1">
                  <span className="font-serif text-xs font-bold text-[#475DB1] leading-tight">
                    {mainItem?.date}
                  </span>
                </div>
              </div>
              <div className="max-w-2xl">
                <h3 className="text-3xl font-serif text-slate-900 mb-3">
                  {mainItem?.title}
                </h3>
                <p className="text-base text-slate-600 font-light leading-relaxed">
                  {parseMarkdownLinks(mainItem?.description)}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[420px]">
              <div
                className="space-y-8 overflow-y-auto max-h-[350px] no-scrollbar pr-2"
                data-lenis-prevent
              >
                {displayIndices.slice(1).map((idx, pos) => {
                  const item = events[idx];
                  if (!item) return null;
                  return (
                    <div
                      key={idx}
                      className="reveal-section group cursor-pointer"
                      onClick={() => handleSwap(pos + 1)}
                    >
                      <div className="flex gap-6 items-center">
                        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl bg-slate-50/50">
                          {item.image && (
                            <Image
                              src={item.image || ""}
                              alt={item.title || ""}
                              fill
                              className="object-contain group-hover:scale-110 transition-transform duration-700"
                            />
                          )}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] tracking-widest text-[#475DB1] font-bold uppercase">
                            {item.date}
                          </span>
                          <h3 className="text-xl font-serif text-slate-900 group-hover:text-[#475DB1] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-light line-clamp-2">
                            {parseMarkdownLinks(item.description)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="reveal-section pt-6 mt-6 border-t border-slate-100/80">
                {(() => {
                  const ctaText = data.ctaText || "";
                  const ctaSubtitle = data.ctaSubtitle || "";
                  const ctaLink = data.ctaLink || "";
                  const hasNavigateUrl =
                    ctaLink.trim() !== "" && ctaLink !== "#";

                  return hasNavigateUrl ? (
                    <Link
                      href={ctaLink}
                      className="inline-flex items-center gap-5 group"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#475DB1] flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
                        <ArrowRight size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-900">
                          {ctaText}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-light">
                          {ctaSubtitle}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-5 group text-left cursor-pointer focus:outline-none"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#475DB1] flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
                        <ArrowRight size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-900">
                          {ctaText}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-light">
                          {ctaSubtitle}
                        </span>
                      </div>
                    </button>
                  );
                })()}
              </div>

              <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
      <ContactPopupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
