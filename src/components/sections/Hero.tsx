"use client";

import Image from "next/image";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface HeroProps {
  data?: any;
}

export default function Hero({ data = {} }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const heroImages = Array.isArray(data.images) ? data.images : [];
  const marqueeTags = Array.isArray(data.marqueePills) ? data.marqueePills : [];

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

    // Image rotation logic
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, [heroImages, data]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Cinematic curtain overlay */}
      <div className="hero-overlay absolute inset-0 bg-dark-990 z-30 origin-top pointer-events-none" />

      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src: string, i: number) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt={`Seven Stars Interior ${i + 1}`}
              fill
              className="hero-bg-img object-cover object-center opacity-80"
              priority={i === 0}
            />
          </div>
        ))}
        {/* Persistent Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Main readability gradient (Left to Right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />

          {/* Bottom vignette for CTAs and bottom bar */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent h-1/2 bottom-0 top-auto" />

          {/* Subtle top frame */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-1/3" />

          {/* Radial spotlight effect for text region */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 25% 45%, transparent 0%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col pt-32 pb-8">
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-6 max-[650px]:gap-4">
            {/* Left side */}
            <div className="max-w-2xl space-y-6 relative group">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-serif text-white leading-[0.9] tracking-tight drop-shadow-2xl overflow-hidden">
                <span className="hero-h1-line1 block pr-2 whitespace-pre-line">
                  {data.headlineLine1}
                </span>
                <span className="hero-h1-line2 block italic text-[#475DB1] font-light pr-4 pb-3">
                  {data.headlineLine2Italic}
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center max-[650px]:items-start gap-3 pt-2">
                <a
                  href={data.primaryBtnUrl}
                  className="hero-cta w-max py-4 px-8 border border-[#475DB1] rounded-full text-[#475DB1] hover:text-white uppercase tracking-widest text-xs transition-all hover:bg-[#475DB1]/20"
                >
                  {data.primaryBtnLabel}
                </a>
                <a
                  href={data.secondaryBtnUrl}
                  className="hero-cta w-full sm:w-auto max-[650px]:w-max max-[650px]:px-10 text-white px-8 py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 uppercase tracking-widest text-xs font-semibold transition-all shadow-[0_0_20px_rgba(202,158,90,0.2)] hover:shadow-[0_0_30px_rgba(202,158,90,0.4)] rounded-full text-center"
                >
                  {data.secondaryBtnLabel}
                </a>
              </div>
            </div>

            {/* Right side: description */}
            <div className="hero-desc max-w-sm lg:ml-auto lg:self-end mt-8 lg:mt-0 text-left">
              <p className="text-lg md:text-xl text-dark-100 font-light leading-relaxed">
                {data.description}
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
                  {marqueeTags.map((tag: string) => (
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
              href={data.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg"
            >
              <Instagram size={15} />
            </a>
            <a
              href={data.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg"
            >
              <Facebook size={15} />
            </a>
            <a
              href={data.youtubeUrl}
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
