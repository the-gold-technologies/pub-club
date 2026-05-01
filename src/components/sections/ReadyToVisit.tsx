"use client";

import Image from "next/image";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToVisit() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 px-12  overflow-hidden">
      <div className="absolute top-[10%] right-[3%] w-[320px] h-[320px] opacity-[0.4] pointer-events-none hidden lg:block transition-opacity duration-700 hover:opacity-100">
        <Image
          src="/images/gallery/food-gourmet.jpg"
          alt=""
          fill
          className="object-cover rounded-[3rem] shadow-2xl rotate-[6deg]"
        />
      </div>
      <div className="absolute bottom-[10%] left-[3%] w-[350px] h-[350px] opacity-[0.4] pointer-events-none hidden xl:block transition-opacity duration-700 hover:opacity-1">
        <Image
          src="/images/gallery/cta-background.jpg"
          alt=""
          fill
          className="object-cover rounded-[3rem] shadow-2xl rotate-[-5deg]"
        />
      </div>

      <div
        ref={cardRef}
        className="relative  mx-auto rounded-[4rem] overflow-hidden   flex flex-col items-center justify-center text-center p-12  group  border border-black/[0.06]"
      >
        {/* Content - Hyper-precise match of screenshot composition */}
        <div className="relative z-10 max-w-4xl py-6">
          <div className="space-y-4">
            <div className="">
              <span className="cta-content-stagger block text-[9px] tracking-[0.6em] text-[#5B6DC8] uppercase font-black font-sans">
                PLAN YOUR VISIT
              </span>
              <h2 className="text-[4.2rem] text-black tracking-tighter font-normal">
                <span className="font-sans font-extrabold">Ready to </span>
                <em className="font-serif italic font-extralight text-[#5B6DC8]">
                  Visit?
                </em>
              </h2>
            </div>

            <div className="cta-content-stagger space-y-1">
              <p className="text-xl md:text-2xl text-neutral-700 font-light leading-relaxed font-sans tracking-tight">
                Book online or give us a call.
              </p>
              <p className="text-xl md:text-2xl text-neutral-700 font-light leading-relaxed font-sans tracking-tight">
                We&apos;d love to see you.
              </p>
            </div>

            {/* CTA Buttons - Matching Screenshot Icons and Layout */}
            <div className="cta-content-stagger flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
              <a
                href="#contact"
                className="group flex items-center gap-3 px-8 py-5 bg-[#475DB1] text-white uppercase tracking-[0.3em] text-[10px] font-black transition-all rounded-full hover:bg-[#5B6DC8]/90  active:scale-95 font-sans"
              >
                <Calendar size={16} className="opacity-90" />
                Book a Table
              </a>

              <a
                href="tel:+441865343337"
                className="group flex items-center gap-3 px-8 py-5 border border-neutral-300 text-neutral-800 uppercase tracking-[0.3em] text-[10px] font-black transition-all rounded-full hover:bg-neutral-50 active:scale-95 font-sans"
              >
                <Phone size={16} className="opacity-70" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
