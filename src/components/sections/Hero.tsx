"use client";

import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Set initial hidden states
      gsap.set(".hero-label", { opacity: 0, y: 30 });
      gsap.set(".hero-h1-line1", { opacity: 0, y: 80 });
      gsap.set(".hero-h1-line2", { opacity: 0, y: 60 });
      gsap.set(".hero-cta", { opacity: 0, y: 24 });
      gsap.set(".hero-desc", { opacity: 0, x: 40 });
      gsap.set(".hero-bottom", { opacity: 0, y: 24 });
      gsap.set(".hero-social", { opacity: 0, y: 16 });

      // 1. Cinematic curtain collapses upward
      tl.to(".hero-overlay", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.4,
        ease: "power4.inOut",
      })

        // 2. Background image zooms from 110% to 100%
        .fromTo(
          ".hero-bg-img",
          { scale: 1.1 },
          { scale: 1, duration: 2.2, ease: "power2.out" },
          "<0.3",
        )

        // 3. Label
        .to(".hero-label", { opacity: 1, y: 0, duration: 0.7 }, "-=1.0")

        // 4. Heading lines
        .to(".hero-h1-line1", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(".hero-h1-line2", { opacity: 1, y: 0, duration: 0.85 }, "-=0.65")

        // 5. CTAs staggered
        .to(
          ".hero-cta",
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.15 },
          "-=0.5",
        )

        // 6. Description slides from right
        .to(".hero-desc", { opacity: 1, x: 0, duration: 0.85 }, "-=0.6")

        // 7. Pills bottom strip
        .to(".hero-bottom", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")

        // 8. Social icons stagger
        .to(
          ".hero-social",
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Cinematic curtain overlay */}
      <div className="hero-overlay absolute inset-0 bg-dark-990 z-30 origin-top pointer-events-none" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_pub.png"
          alt="Seven Stars Gastro Club Interior"
          fill
          className="hero-bg-img object-cover object-center opacity-80 border-b border-dark-800"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-990/90 via-dark-990/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-990 via-transparent to-dark-990/30 z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col pt-32 pb-8">
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-6">
            {/* Left side */}
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-serif text-white leading-[0.9] tracking-tight drop-shadow-2xl overflow-hidden">
                <span className="hero-h1-line1 block pr-2">
                  Where Village <br /> Warmth Meets
                </span>
                <span className="hero-h1-line2 block italic text-gold-500 font-light pr-4 pb-3">
                  Great Food
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href="#menu"
                  className="hero-cta w-full sm:w-auto px-8 py-4 border border-gold-600/50 hover:border-gold-500 text-gold-400 hover:text-gold-300 uppercase tracking-widest text-xs transition-all hover:bg-gold-900/20 glass-card rounded-full"
                >
                  Discover Menu
                </a>
                <a
                  href="#contact"
                  className="hero-cta w-full sm:w-auto px-8 py-4 bg-gold-600 hover:bg-gold-500 text-dark-990 uppercase tracking-widest text-xs font-semibold transition-all shadow-[0_0_20px_rgba(202,158,90,0.2)] hover:shadow-[0_0_30px_rgba(202,158,90,0.4)] rounded-full"
                >
                  Book a Table
                </a>
              </div>
            </div>

            {/* Right side: description */}
            <div className="hero-desc max-w-sm lg:ml-auto lg:self-end mt-8 lg:mt-0 text-left">
              <p className="text-lg md:text-xl text-dark-100 font-light leading-relaxed">
                We’re your neighborhood pub situated in the heart of Oxfordshire
                serving mouth-watering food, real ales, and a warm welcome.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Marquee + Social */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8">
          {/* Marquee pills */}
          <div className="hero-bottom relative flex overflow-hidden max-w-2xl w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-2 hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 items-center pr-4">
                  {[
                    "Sunday Roasts",
                    "Local Ales",
                    "Beer Garden",
                    "Private Barn",
                    "Seasonal Specials",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="whitespace-nowrap px-4 py-2 rounded-full backdrop-blur-md text-[12px] text-gray-300 flex items-center gap-2 hover:text-white cursor-pointer transition-colors shadow-lg"
                    >
                      {tag}{" "}
                      <span className="text-gold-500 text-[13px] opacity-80">
                        ❋
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Social icons */}
          <div className="hidden md:flex gap-2">
            <a
              href="#"
              className="hero-social w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg"
            >
              <Instagram size={15} />
            </a>
            <a
              href="#"
              className="hero-social w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="#"
              className="hero-social w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg"
            >
              <Youtube size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
