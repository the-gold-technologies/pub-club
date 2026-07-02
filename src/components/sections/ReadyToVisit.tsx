"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactPopupModal from "./ContactPopupModal";
import { parseMarkdownLinks } from "@/utils/text";

gsap.registerPlugin(ScrollTrigger);

interface ReadyToVisitProps {
  data?: any;
}

export default function ReadyToVisit({ data = {} }: ReadyToVisitProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".cta-content-stagger",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 px-12 max-[650px]:px-8 overflow-hidden"
    >
      <div className="absolute top-[10%] right-[3%] w-[320px] h-[320px] opacity-[0.4] pointer-events-none hidden lg:block transition-opacity duration-700 hover:opacity-100">
        {data.image1 && (
          <Image
            src={data.image1}
            alt=""
            fill
            className="object-cover rounded-[3rem] shadow-2xl rotate-[6deg]"
          />
        )}
      </div>
      <div className="absolute bottom-[10%] left-[3%] w-[350px] h-[350px] opacity-[0.4] pointer-events-none hidden xl:block transition-opacity duration-700 hover:opacity-1">
        {data.image2 && (
          <Image
            src={data.image2}
            alt=""
            fill
            className="object-cover rounded-[3rem] shadow-2xl rotate-[-5deg]"
          />
        )}
      </div>

      <div
        ref={cardRef}
        className="relative  mx-auto rounded-[4rem] overflow-hidden   flex flex-col items-center justify-center text-center p-12 max-[650px]:p-6
         group  border border-black/[0.06]"
      >
        {/* Content - Hyper-precise match of screenshot composition */}
        <div className="relative z-10 max-w-4xl py-6 max-[650px]:py-3">
          <div className="space-y-4 max-[650px]:space-y-2">
            <div className="">
              <span className="cta-content-stagger block text-[9px] tracking-[0.6em] text-[#5B6DC8] uppercase font-black font-sans">
                {data.upperTag}
              </span>
              <h2 className="text-[4.2rem] max-[650px]:mt-4 max-[650px]:text-3xl text-black tracking-tighter font-normal font-sans font-extrabold">
                {data.heading}
              </h2>
            </div>

            <div className="cta-content-stagger space-y-1 max-[650px]:space-y-0 max-[650px]:mt-1">
              {Array.isArray(data.lines) &&
                data.lines.map((line: string, i: number) => (
                  <p
                    key={i}
                    className="text-xl md:text-2xl text-neutral-700 font-light leading-relaxed font-sans tracking-tight"
                  >
                    {parseMarkdownLinks(line)}
                  </p>
                ))}
            </div>

            {/* CTA Buttons - Matching Screenshot Icons and Layout */}
            <div className="cta-content-stagger flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
              {data.bookUrl &&
              data.bookUrl.trim() !== "" &&
              data.bookUrl !== "#" ? (
                <Link
                  href={data.bookUrl}
                  className="group flex items-center gap-3 px-8 py-5 max-[650px]:py-4 bg-[#475DB1] text-white uppercase tracking-[0.3em] text-[10px] font-black transition-all rounded-full hover:bg-[#5B6DC8]/90 active:scale-95 font-sans cursor-pointer"
                >
                  <Calendar size={16} className="opacity-90" />
                  {data.bookLabel}
                </Link>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-3 px-8 py-5 max-[650px]:py-4 bg-[#475DB1] text-white uppercase tracking-[0.3em] text-[10px] font-black transition-all rounded-full hover:bg-[#5B6DC8]/90 active:scale-95 font-sans cursor-pointer"
                >
                  <Calendar size={16} className="opacity-90" />
                  {data.bookLabel}
                </button>
              )}

              <a
                href={
                  data.phoneUrl
                    ? data.phoneUrl.startsWith("tel:")
                      ? data.phoneUrl
                      : `tel:${data.phoneUrl.replace(/\s+/g, "")}`
                    : "#"
                }
                className="group flex items-center gap-3 px-8 py-5 max-[650px]:py-4 border border-neutral-300 text-neutral-800 uppercase tracking-[0.3em] text-[10px] font-black transition-all rounded-full hover:bg-neutral-50 active:scale-95 font-sans"
              >
                <Phone size={16} className="opacity-70" />
                {data.phoneLabel}
              </a>
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
