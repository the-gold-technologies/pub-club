"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ContactPopupModal from "@/components/sections/ContactPopupModal";

interface OutdoorSeatingProps {
  data?: any;
}

export default function OutdoorSeating({ data = {} }: OutdoorSeatingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasNavigateUrl = data.outdoorCtaLink && data.outdoorCtaLink.trim() !== "" && data.outdoorCtaLink !== "#";

  const outdoorImages = Array.isArray(data.outdoorImages) && data.outdoorImages.length > 0
    ? data.outdoorImages
    : data.outdoorImage
      ? [data.outdoorImage]
      : [];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (outdoorImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % outdoorImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [outdoorImages.length]);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image slider with half-pill shape */}
          <div className="relative w-full lg:w-[60%] h-[330px] md:h-[450px] rounded-r-full overflow-hidden shadow-2xl bg-slate-950 group">
            {outdoorImages.map((src: string, i: number) => (
              <div
                key={src}
                style={{ transitionDuration: "2000ms" }}
                className={`absolute inset-0 transition-all ease-in-out ${
                  i === currentIdx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Outdoor Seating Image ${i + 1}`}
                  fill
                  style={{ transitionDuration: "4000ms" }}
                  className="object-cover group-hover:scale-110 transition-transform ease-out"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20 pointer-events-none" />

            {outdoorImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
                {outdoorImages.map((_: any, i: number) => (
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
          </div>

          {/* Content */}
          <div className="w-full lg:w-[40%] space-y-8">
            <h2 className="text-7xl font-serif text-slate-900 tracking-tighter leading-none">
              {data.outdoorHeading} <br />
              <span className="text-[#475DB1]">{data.outdoorHeadingItalic}</span>
            </h2>
            <p className="text-neutral-600 font-light leading-relaxed max-w-md">
              {data.outdoorDesc}
            </p>
            {hasNavigateUrl ? (
              <Link
                href={data.outdoorCtaLink}
                className="inline-block border border-black px-10 py-3.5 text-[12px] uppercase tracking-widest font-bold hover:bg-[#475DB1] hover:border-[#475DB1] hover:text-white transition-all rounded-full"
              >
                {data.outdoorCtaText}
              </Link>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block border border-black px-10 py-3.5 text-[12px] uppercase tracking-widest font-bold hover:bg-[#475DB1] hover:border-[#475DB1] hover:text-white transition-all rounded-full"
              >
                {data.outdoorCtaText}
              </button>
            )}

            {/* Pagination/Scroll Indicators */}
            <div className="pt-4">
              <div className="w-24 h-1 bg-[#475DB1] rounded-sm" />
            </div>
          </div>
        </div>
      </div>
      <ContactPopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
