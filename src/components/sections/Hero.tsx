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
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Trigger animation state when data is loaded
  useEffect(() => {
    if (heroImages.length > 0 && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [heroImages, shouldAnimate]);

  // 1. Intro Animation (plays once when shouldAnimate becomes true)
  useEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Set initial hidden states
      gsap.set(".hero-label", { opacity: 0, y: 30 });
      gsap.set(".hero-h1-line1", { opacity: 0, y: 80 });
      gsap.set(".hero-h1-line2", { opacity: 0, y: 60 });
      gsap.set(".hero-cta", { opacity: 0, y: 24 });
      gsap.set(".hero-rating", { opacity: 0, y: 20 });
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

        // 5b. Google rating fade-in
        .to(".hero-rating", { opacity: 1, y: 0, duration: 0.65 }, "-=0.4")

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

    return () => {
      ctx.revert();
    };
  }, [shouldAnimate]);

  // 2. Background Slideshow Rotation
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [heroImages]);

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
                  className="hero-cta w-max py-4 px-8 border border-white rounded-full text-white hover:bg-[#5B75CE]/20 hover:border-[#5B75CE]/50 hover:text-white uppercase tracking-widest text-xs transition-all"
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

              {/* Google Reviews */}
              {(data.googleRating || data.googleReviewsCount) && (
                <div className="hero-rating flex items-center gap-2.5 pt-4 text-white select-none">
                  {/* Google G Logo */}
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>

                  {/* Rating value */}
                  <span className="text-base font-bold text-white tracking-tight leading-none pt-0.5">
                    {data.googleRating}
                  </span>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const ratingVal = parseFloat(data.googleRating || "0");
                      const fillPercentage = Math.max(
                        0,
                        Math.min(100, (ratingVal - index) * 100),
                      );

                      return (
                        <div key={index} className="relative w-4 h-4">
                          <svg
                            className="w-full h-full text-white/20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <div
                            className="absolute top-0 left-0 overflow-hidden h-full"
                            style={{ width: `${fillPercentage}%` }}
                          >
                            <svg
                              className="w-4 h-4 text-amber-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reviews link */}
                  {data.googleReviewsUrl ? (
                    <a
                      href={data.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-300 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all duration-200 pt-0.5"
                    >
                      {data.googleReviewsCount} Google reviews
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-white pt-0.5">
                      {data.googleReviewsCount} Google reviews
                    </span>
                  )}
                </div>
              )}
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
