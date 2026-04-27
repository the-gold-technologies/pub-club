'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PartyPopper, Users, Building2, FlameKindling, MapPin, Gift, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const eventItems = [
  { icon: PartyPopper, title: "Birthday parties & milestone celebrations" },
  { icon: MapPin, title: "Wedding receptions & pre-wedding celebrations" },
  { icon: Building2, title: "Corporate lunches & team away days" },
  { icon: Users, title: "Family get-togethers & reunion dinners" },
  { icon: FlameKindling, title: "Summer BBQ parties" },
  { icon: Gift, title: "Christmas parties & New Year's Eve celebrations" },
  { icon: Star, title: "Community events & fundraisers" },
];

export default function Events() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image: clip-path wipe from left
      gsap.fromTo(
        ".events-image",
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".events-image",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );

      // Heading: slide from right
      gsap.fromTo(
        ".events-heading",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".events-heading",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      // List items: stagger fade + slide
      gsap.fromTo(
        ".events-list-item",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".events-list-item",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      // CTA button
      gsap.fromTo(
        ".events-cta",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".events-cta",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="events" className="py-24 bg-dark-990 relative overflow-hidden">
      
      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 -right-20 text-[12rem] font-serif text-dark-900/20 select-none pointer-events-none hidden lg:block">
        GATHER
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="events-image order-2 lg:order-1 relative h-[600px] w-full rounded-3xl overflow-hidden group border border-dark-800 p-2">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-transparent transition-colors z-10 duration-700" />
              <Image
                src="/images/event_venue.png"
                alt="Private event at Seven Stars"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="events-heading flex flex-col gap-3 pb-8 border-b border-dark-800/60">
              <span className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-medium flex items-center gap-3">
                <span className="font-serif text-2xl text-dark-700 leading-none">
                  03
                </span>
                <span className="w-6 h-[1px] bg-gold-600/50"></span>
                Events & Celebrations
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                Perfect For{" "}
                <em className="not-italic italic text-gold-500 font-light">
                  Every Moment
                </em>
              </h3>
            </div>

            <p className="text-dark-200 leading-relaxed font-light text-lg">
              The Seven Stars is a gathering place for the whole community and
              the perfect venue for your private celebrations.
            </p>

            <ul className="space-y-4 pt-4 pb-8">
              {eventItems.map((item, i) => (
                <li key={i} className="events-list-item flex items-center text-dark-100 group">
                  <div className="w-8 h-8 rounded-full bg-gold-900/20 flex items-center justify-center mr-4 group-hover:bg-gold-600 group-hover:text-dark-990 transition-all duration-300">
                    <item.icon size={14} className="text-gold-500 group-hover:text-current" />
                  </div>
                  <span className="font-light tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="events-cta inline-block px-10 py-4 bg-gold-600 hover:bg-gold-500 text-dark-990 uppercase tracking-[0.2em] text-xs font-bold transition-all rounded-full shadow-[0_10px_30px_rgba(202,158,90,0.2)] hover:shadow-[0_15px_40px_rgba(202,158,90,0.4)]"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
