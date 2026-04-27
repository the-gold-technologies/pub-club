'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car, Sun, Flame, Beer, Warehouse, Music, Tent } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { 
    id: 'garden', 
    name: "Beer Garden", 
    icon: Sun, 
    img: "/images/amenities/garden.png",
    span: "lg:col-span-2 lg:row-span-2",
    desc: "Sprawling outdoor space for 150 guests."
  },
  { 
    id: 'barn', 
    name: "Private Barn", 
    icon: Warehouse, 
    img: "/images/amenities/barn.png",
    span: "lg:col-span-2 lg:row-span-1",
    desc: "Intimate venue for up to 40 guests."
  },
  { 
    id: 'fireplace', 
    name: "Open Fireplace", 
    icon: Flame, 
    img: "/images/amenities/fireplace.png",
    span: "lg:col-span-1 lg:row-span-1",
    desc: "Cosy warmth for winter days."
  },
  { 
    id: 'ales', 
    name: "Local Ales", 
    icon: Beer, 
    img: "/images/amenities/ales.png",
    span: "lg:col-span-1 lg:row-span-1",
    desc: "Crafted by regional producers."
  },
  { 
    id: 'parking', 
    name: "Free Parking", 
    icon: Car, 
    img: "/images/amenities/parking.png",
    span: "lg:col-span-1 lg:row-span-1",
    desc: "Easy access for all visitors."
  },
  { 
    id: 'music', 
    name: "Live Music", 
    icon: Music, 
    img: "/images/amenities/music.png",
    span: "lg:col-span-1 lg:row-span-1",
    desc: "Weekly events & community vibes."
  },
  { 
    id: 'space', 
    name: "Covered Space", 
    icon: Tent, 
    img: "/images/amenities/covered_space.png",
    span: "lg:col-span-2 lg:row-span-1",
    desc: "Weather-proof outdoor dining area."
  },
];

export default function Amenities() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.amenities-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.amenities-header', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );

      // Bento cards entrance
      gsap.fromTo('.bento-card',
        { y: 30, opacity: 0, scale: 0.98 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: { trigger: '.amenities-bento', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="amenities" className="py-24 bg-dark-990 relative border-t border-dark-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="amenities-header mb-16 flex flex-col items-center text-center">
          <span className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-medium mb-4">Comfort & Convenience</span>
          <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
            Our <em className="not-italic italic text-gold-500 font-light">Amenities</em>
          </h3>
        </div>

        <div className="amenities-bento grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {amenities.map((item, i) => (
            <div 
              key={i} 
              className={`bento-card group relative rounded-3xl overflow-hidden border border-dark-800 transition-all duration-700 hover:border-gold-500/50 ${item.span}`}
            >
              {/* Background Image (if any) */}
              {item.img ? (
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={item.img} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-990 via-dark-990/40 to-transparent z-10" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-dark-950 z-0" />
              )}

              {/* Content */}
              <div className="relative z-20 h-full p-8 flex flex-col justify-end">
                <div className="mb-4 w-10 h-10 rounded-xl bg-dark-900/80 backdrop-blur-md border border-white/5 flex items-center justify-center group-hover:bg-gold-600 group-hover:text-dark-990 transition-all duration-500">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-medium text-white mb-1 group-hover:text-gold-500 transition-colors duration-500">{item.name}</h4>
                <p className="text-xs text-dark-300 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  {item.desc}
                </p>
              </div>

              {/* Decorative corner light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
