"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { icon: Car, label: "Free Parking" },
  { icon: Sun, label: "Beer Garden" },
  { icon: Flame, label: "Open Fireplace" },
  { icon: Beer, label: "Local Ales & Ciders" },
  { icon: Home, label: "Private Barn" },
  { icon: Music, label: "Live Music" },
  { icon: CloudRain, label: "Covered Outdoor Space" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      if (bgRef.current && heroRef.current) {
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
      }

      // Hero animations
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
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

      // Amenity cards stagger
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
            src="/images/assets/SEVEN_STARS_2026_02_09-125.jpg"
            alt="About Seven Stars"
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
                  Our Story
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                About
                <span className="italic font-light text-[#475DB1]">Us</span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <div className="hero-reveal border-l border-white/20 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic">
                  &quot;A community-owned gem in the heart of Oxfordshire, where
                  traditional hospitality meets a serious kitchen.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Story & Philosophy */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                  Our Roots
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                  More than a pub, it belongs to its{" "}
                  <em className="text-[#475DB1] font-light">community.</em>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  The Seven Stars at Marsh Baldon is set in a picturesque
                  Oxfordshire village. In the truest sense of the word, it
                  belongs to the people who call this place home.
                </p>
                <p>
                  Community-owned and community-run, every pint poured and every
                  plate served is a small act of keeping something genuinely
                  valuable alive.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-8">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                    <Users size={20} />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Community
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                    <Heart size={20} />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Passion
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                    <Utensils size={20} />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Quality
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal-section relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/assets/SEVEN_STARS_2026_02_09-0001.jpg"
                alt="Community Spirit"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif text-2xl italic">
                  &quot;Keeping something genuinely valuable alive.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-24 bg-[#0A192F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-white fill-current"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center space-y-12 reveal-section">
          <h3 className="text-3xl md:text-5xl font-serif text-white leading-snug">
            &quot;We believe that a great British pub should do three things
            well: serve{" "}
            <span className="text-[#475DB1] italic">excellent food</span>, pour
            a <span className="text-[#475DB1] italic">proper drink</span>, and
            make{" "}
            <span className="text-[#475DB1] italic">every single person</span>{" "}
            who walks through the door feel welcome.&quot;
          </h3>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-[#475DB1]" />
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-section order-2 lg:order-1 relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/assets/SEVEN_STARS_2026_02_09-0066.jpg"
                alt="Cozy Interior"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>

            <div className="reveal-section order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                  The Experience
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                  Experience the{" "}
                  <em className="text-[#475DB1] font-light">
                    best of both worlds.
                  </em>
                </h2>
              </div>

              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Walk into The Seven Stars and you&apos;ll find the character and
                warmth of a classic village. Local open fires, aged beams, and
                the hum of good conversation create an atmosphere that is both
                nostalgic and vibrantly alive.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#475DB1]" />
                  <p className="text-slate-700 font-medium italic">
                    The character of a classic Oxfordshire village.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#475DB1]" />
                  <p className="text-slate-700 font-medium italic">
                    Warmth of local open fires and aged beams.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#475DB1]" />
                  <p className="text-slate-700 font-medium italic">
                    A place where everyone is welcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-section">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium">
              Amenities
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-serif text-slate-900">
              Everything you need
            </h2>
          </div>

          <div className="amenities-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {amenities.map((item, index) => (
              <div
                key={index}
                className="amenity-card group p-6 bg-white rounded-2xl border border-slate-200/50 hover:border-[#475DB1]/30 hover:shadow-xl hover:shadow-[#475DB1]/5 transition-all duration-500 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#475DB1]/10 group-hover:text-[#475DB1] transition-colors duration-500">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-[#475DB1]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-10 reveal-section">
          <h2 className="text-5xl md:text-7xl font-serif text-white">
            Celebrate your <br />
            <em className="font-light italic">special moments</em> with us.
          </h2>
          <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
            From intimate dinners to grand celebrations in our private barn, we
            make every occasion unforgettable.
          </p>
          <div className="pt-6">
            <a
              href="/contact"
              className="inline-block px-12 py-5 bg-white text-[#475DB1] rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Book Your Visit
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
