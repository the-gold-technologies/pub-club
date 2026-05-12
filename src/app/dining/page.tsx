"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuFeatured from "@/components/sections/MenuFeatured";
import Gallery from "@/components/sections/Gallery";
import OutdoorSeating from "@/app/dining/components/OutdoorSeating";
import {
  Utensils,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Flame,
  ChefHat,
  GlassWater,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiningPage() {
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

      // Floating text effect
      gsap.to(".hero-drift", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Section reveal animations
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

      // Feature cards stagger
      gsap.fromTo(
        ".feature-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src="/images/gallery/feature-classic-1.jpg"
            alt="Dining at Seven Stars"
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
                  The Culinary Art
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                Dining <br />
                <span className="italic font-light text-[#475DB1]">
                  Experience
                </span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <div className="hero-reveal border-l border-white/20 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic">
                  &quot;A look at our menu and you&apos;ll see the care and
                  craft of a serious kitchen, where every plate tells a story of
                  local heritage.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                  The Craft
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                  Serious food, <br />
                  <em className="text-[#475DB1] font-light italic text-5xl md:text-7xl">
                    unfussy
                  </em>{" "}
                  hospitality.
                </h2>
              </div>

              <div className="space-y-6 text-xl text-slate-600 font-light leading-relaxed">
                <p>
                  The combination of relaxed, unfussy hospitality with genuinely
                  high-quality food is what sets us apart. We believe the best
                  meals are served without pretension but with immense skill.
                </p>
                <p className="text-lg">
                  Every plate reflects our dedication to sourcing the finest
                  local ingredients and treating them with the respect they
                  deserve.
                </p>
              </div>

              <div className="pt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                  <ChefHat size={18} className="text-[#475DB1]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                    Expert Chefs
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                  <Flame size={18} className="text-[#475DB1]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                    Fresh Flavors
                  </span>
                </div>
              </div>
            </div>

            <div className="reveal-section relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/assets/SEVEN_STARS_2026_02_09-0112.jpg"
                alt="Exquisite Dish"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <MenuFeatured />

      {/* Quote Banner */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <Image
            src="/images/assets/SEVEN_STARS_2026_02_09-0065.jpg"
            alt="Atmosphere"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center reveal-section relative z-10">
          <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight italic font-light">
            &quot;Food is the ingredient that binds us together, <br />
            and at Seven Stars, we make sure it&apos;s{" "}
            <span className="text-[#475DB1] not-italic">extraordinary.</span>
            &quot;
          </h3>
        </div>
      </section>

      {/* Menu & Specials */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 reveal-section">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium block mb-4">
              Our Menu
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
              Classic Foundations, <br />
              <em className="text-[#475DB1] font-light">Global Inspirations</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 features-grid">
            {/* Pub Classics */}
            <div className="feature-card relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white">
              <Image
                src="/images/gallery/feature-classic-1.jpg"
                alt="British Pub Classics"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                    <Utensils size={28} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">British Classics</h3>
                  <p className="text-white/90 font-light leading-relaxed mb-6">
                    We serve British pub classics done properly. No shortcuts, just
                    traditional recipes elevated with premium ingredients.
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/80 italic">
                    <ChevronRight size={14} className="text-white/60" /> Proper Pies
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80 italic">
                    <ChevronRight size={14} className="text-white/60" /> Hand-cut Chips
                  </li>
                </ul>
              </div>
            </div>

            {/* Global Specials */}
            <div className="feature-card relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white">
              <Image
                src="/images/gallery/feature-special-1.jpg"
                alt="Seasonal Specials"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                    <Sparkles size={28} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Seasonal Specials</h3>
                  <p className="text-white/90 font-light leading-relaxed mb-6">
                    Our specials draw on European, Middle Eastern and South Asian
                    flavours, bringing a contemporary twist to the village pub.
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/80 italic">
                    <ChevronRight size={14} className="text-white/60" /> Middle Eastern Spices
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80 italic">
                    <ChevronRight size={14} className="text-white/60" /> European Techniques
                  </li>
                </ul>
              </div>
            </div>

            {/* Signature Nights */}
            <div className="feature-card relative overflow-hidden p-10 rounded-[2rem] shadow-xl transition-all duration-500 group text-white">
              <Image
                src="/images/gallery/feature-roast-1.jpg"
                alt="Sunday Roast Signature Night"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                    <Clock size={28} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Not To Be Missed</h3>
                  <p className="text-white/90 font-light leading-relaxed mb-6">
                    Our fortnightly Indian Thali Nights and Sunday Roasts are,
                    frankly, the highlight of the week.
                  </p>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/80 italic">
                    <ChevronRight size={14} className="text-white/60" /> Sunday Roasts
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80 italic">
                    <ChevronRight size={14} className="text-white/60" /> Indian Thali Nights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Barn Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section order-2 lg:order-1 relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/gallery/gallery-25.jpg"
                alt="The Private Barn"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>

            <div className="reveal-section order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                  Private Dining
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                  The <em className="text-[#475DB1] font-light italic">Barn</em>
                </h2>
              </div>

              <p className="text-xl text-slate-600 font-light leading-relaxed">
                Delicious meals, thoroughly enjoyed in our barn. A flexible
                private space that accommodates up to 40 guests, ideal for
                private dining, celebrations or small corporate gatherings.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-[#475DB1]">
                    <Users size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-1">
                      Capacity
                    </h4>
                    <p className="text-slate-500 font-light text-sm">
                      Up to 40 guests for intimate gatherings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-[#475DB1]">
                    <GlassWater size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-1">
                      Beer Tent Option
                    </h4>
                    <p className="text-slate-500 font-light text-sm">
                      Comes with an option for a covered Beer Tent for outdoor
                      versatility.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button className="px-8 py-4 bg-[#475DB1] text-white rounded-full uppercase tracking-widest text-xs font-bold hover:bg-[#475DB1]/90 transition-all shadow-lg hover:scale-105 active:scale-95">
                  Enquire About Private Dining
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Journey */}
      <Gallery />

      {/* Outdoor Seating Layout */}
      <OutdoorSeating />
      <Footer />
    </div>
  );
}
