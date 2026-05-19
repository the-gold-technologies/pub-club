"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Car,
  Sun,
  Flame,
  Beer,
  Home,
  Music,
  CloudRain,
  Users,
  Heart,
  Utensils,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  Car,
  Sun,
  Flame,
  Beer,
  Home,
  Music,
  CloudRain,
  Users,
  Heart,
  Utensils,
};

function InfoIconComponent(name: string) {
  return iconMap[name] || HelpIcon;
}

function HelpIcon(props: any) {
  return <Sun {...props} />;
}

export default function AboutAmenities({ data }: { data: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const amenities = Array.isArray(data.amenities)
    ? data.amenities.map((item: any) => ({
        icon: iconMap[item.icon] || InfoIconComponent(item.icon),
        label: item.label,
      }))
    : [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".amenity-card",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".amenities-grid",
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-section">
          <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium">
            {data.amenitiesTag}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif text-slate-900">
            {data.amenitiesHeading}
          </h2>
        </div>

        <div className="amenities-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {amenities.map((item: any, index: number) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="amenity-card group p-6 bg-white rounded-2xl border border-slate-200/50 hover:border-[#475DB1]/30 hover:shadow-xl hover:shadow-[#475DB1]/5 transition-all duration-500 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#475DB1]/10 group-hover:text-[#475DB1] transition-colors duration-500">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
