"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReadyToVisit from "@/components/sections/ReadyToVisit";
import { ChevronRight, Beer, Wine, Coffee, GlassWater } from "lucide-react";
import Menu from "./components/Menu";

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
  {
    title: "Starters",
    description: "Perfect beginnings for your culinary journey.",
    items: ["Crispy Squid", "Seasonal Soup", "Chicken Liver Parfait"],
    image: "/images/gallery/feature-classic-1.jpg",
    caption: "Honouring the classics with fresh, quality ingredients.",
  },
  {
    title: "Pub Classics",
    description: "Time-honored favorites done properly.",
    items: ["Fish & Chips", "Classic Cheeseburger", "Steak & Ale Pie"],
    image: "/images/assets/SEVEN_STARS_2026_02_09-0112.jpg",
    caption: "British pub classics done properly.",
  },
  {
    title: "Mains",
    description: "Hearty and inspired signature dishes.",
    items: ["Pan-Seared Salmon", "Lamb Shank", "Wild Mushroom Risotto"],
    image: "/images/assets/SEVEN_STARS_2026_02_09-0074.jpg",
    caption: "Occasional inspired detours into global flavors.",
  },
  {
    title: "Sunday Roast",
    description: "Served every Sunday 12:00 – 18:00.",
    items: ["Roast Beef", "Roast Pork Belly", "Nut Roast"],
    image: "/images/menu/SEVEN_STARS_2026_02_09-129.jpg",
    caption: "Frankly, not to be missed.",
  },
  {
    title: "Desserts",
    description: "Sweet finales to complete your meal.",
    items: ["Sticky Toffee Pudding", "Apple Crumble", "Chocolate Brownie"],
    image: "/images/gallery/gallery-25.jpg",
    caption: "Thoughtfully crafted sweet ends.",
  },
];

export default function MenuPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero content stagger
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

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
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <section
        ref={heroRef}
        className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src="/images/assets/SEVEN_STARS_2026_02_09-0112.jpg"
            alt="Menu at Seven Stars"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        </div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7">
              <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-[#475DB1]" />
                <span className="block text-[#475DB1] uppercase tracking-[0.4em] text-[10px] font-bold">
                  Culinary Journey
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                Our <br />
                <span className="italic font-light text-slate-300">Menu</span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <div className="hero-reveal border-l border-white/20 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic">
                  &quot;A look at our kitchen starts with fresh, quality
                  ingredients and builds outward from there, honouring the
                  classics.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Book Section */}
      <Menu />

      {/* Categorized Menu List (Bento Box Layout) */}
      <section className="py-32 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-section">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-[#475DB1]" />
              The Collection
              <span className="w-8 h-px bg-[#475DB1]" />
            </span>
            <h2 className="text-5xl md:text-6xl font-serif mt-6 text-slate-900">
              Curated Courses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
            {/* 1. Starters: Wide Card */}
            <div className="md:col-span-2 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section">
              <Image
                src={menuCategories[0].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={menuCategories[0].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold mb-2">01</span>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
                  {menuCategories[0].title}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 font-light">
                  {menuCategories[0].items.map((item) => (
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
              <Image
                src={menuCategories[1].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={menuCategories[1].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20 transition-opacity duration-500" />
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold">02</span>
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    {menuCategories[1].title}
                  </h3>
                  <div className="flex flex-col gap-4 text-white/80 font-light">
                    {menuCategories[1].items.map((item) => (
                      <span key={item} className="flex items-center gap-3 border-b border-white/20 pb-3 last:border-0">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Mains: Square Card */}
            <div className="md:col-span-1 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section">
              <Image
                src={menuCategories[2].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={menuCategories[2].title}
              />
              <div className="absolute inset-0 bg-[#475DB1]/30 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                <span className="text-white/80 uppercase tracking-widest text-[10px] font-bold mb-2">03</span>
                <h3 className="text-3xl font-serif text-white mb-4">
                  {menuCategories[2].title}
                </h3>
                <div className="flex flex-col gap-2 text-white/90 font-light text-sm">
                  {menuCategories[2].items.slice(0, 2).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                  <span className="text-white/60 italic">+ More</span>
                </div>
              </div>
            </div>

            {/* 4. Sunday Roast: Square Card */}
            <div className="md:col-span-1 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section bg-slate-900">
              <div className="absolute inset-0 opacity-40">
                <Image
                  src={menuCategories[3].image}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={menuCategories[3].title}
                />
              </div>
              <div className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center z-10">
                <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold mb-4">04</span>
                <h3 className="text-4xl font-serif text-white mb-6">
                  {menuCategories[3].title}
                </h3>
                <p className="text-white/70 italic font-light text-sm mb-6">
                  {menuCategories[3].description}
                </p>
                <div className="flex flex-col gap-2 text-white/90 font-light">
                  {menuCategories[3].items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Desserts: Wide Banner Bottom */}
            <div className="md:col-span-3 relative rounded-[2rem] overflow-hidden group shadow-xl reveal-section h-[300px]">
              <Image
                src={menuCategories[4].image}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 object-bottom"
                alt={menuCategories[4].title}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-center z-10 w-full md:w-1/2">
                <span className="text-[#475DB1] uppercase tracking-widest text-[10px] font-bold mb-2">05</span>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
                  {menuCategories[4].title}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 font-light">
                  {menuCategories[4].items.map((item) => (
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

      {/* Drinks Section */}
      <section className="py-24 bg-[#0a192f] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/assets/SEVEN_STARS_2026_02_09-0072.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-primary-400 uppercase font-medium">
                  The Cellar
                </span>
                <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                  We take our drinks <br />
                  <em className="text-primary-400 font-light italic">
                    as seriously as our food.
                  </em>
                </h2>
              </div>

              <p className="text-xl text-primary-100/70 font-light leading-relaxed">
                The Seven Stars stocks a carefully chosen range of local ales,
                lagers and ciders while supporting producers from across the
                region.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Beer className="text-primary-400" />
                  <span className="text-sm tracking-widest uppercase font-bold">
                    Local Ales
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Wine className="text-primary-400" />
                  <span className="text-sm tracking-widest uppercase font-bold">
                    Fine Wines
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <GlassWater className="text-primary-400" />
                  <span className="text-sm tracking-widest uppercase font-bold">
                    Lagers & Ciders
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Coffee className="text-primary-400" />
                  <span className="text-sm tracking-widest uppercase font-bold">
                    Soft Drinks
                  </span>
                </div>
              </div>
            </div>

            <div className="reveal-section relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/assets/SEVEN_STARS_2026_02_09-0065.jpg"
                alt="Local Ales"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center reveal-section space-y-8">
          <p className="text-2xl md:text-3xl text-slate-900 font-serif leading-relaxed italic">
            &quot;At The Seven Stars, our kitchen starts with fresh, quality
            ingredients and builds outward from there, honouring the classics
            while keeping things interesting with seasonal specials.&quot;
          </p>
          <div className="w-16 h-px bg-[#475DB1] mx-auto" />
          <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            We honour the classics while keeping things interesting with
            seasonal specials and the occasional inspired detour into South
            Asian and Mediterranean territory.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
