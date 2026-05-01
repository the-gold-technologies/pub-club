"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Beer } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuredItems = [
  {
    name: "Cured Scottish Salmon",
    price: "£14.50",
    description:
      "Citrus-cured salmon, pickled cucumber, radish, and herb emulsion.",
    image: "/images/menu/SEVEN_STARS_2026_02_09-129.jpg",
  },
  {
    name: "Pan-Seared Duck Breast",
    price: "£26.95",
    description:
      "Tender duck breast, honey-glazed carrots, potato fondant, and rich red wine reduction.",
    image: "/images/menu/SEVEN_STARS_2026_02_09-142.jpg",
  },
  {
    name: "Golden Squash Risotto",
    price: "£18.50",
    description:
      "Creamy butternut squash risotto, crumbled feta, roasted beetroot, and crispy kale.",
    image: "/images/menu/SEVEN_STARS_2026_02_09-213.jpg",
  },
  {
    name: "Chocolate Lava Cake",
    price: "£9.50",
    description:
      "Warm chocolate fondant, vanilla bean ice cream, fresh strawberries, and berry coulis.",
    image: "/images/menu/SEVEN_STARS_2026_02_09-0159.jpg",
  },
];

export default function MenuFeatured() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".menu-header-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Item Animations
      const items = gsap.utils.toArray(".featured-item");
      items.forEach((item: any, i: number) => {
        gsap.fromTo(
          item,
          {
            y: 100,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: i * 0.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          },
        );
      });

      // Parallax for images
      gsap.to(".item-image", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-menu"
      className="py-16 bg-neutral-50 relative overflow-hidden"
    >
      {/* Decorative Branding Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-serif text-black/[0.02] select-none pointer-events-none whitespace-nowrap hidden lg:block">
        Signature Dishes
      </div>

      {/* Decorative Beer Icon to cover white space */}
      <div className="absolute top-5 right-[-5%] text-[#475DB1]/[0.03] select-none pointer-events-none hidden lg:block">
        <Beer size={420} strokeWidth={0.5} className="rotate-[12deg]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Editorial Style */}
        <div className="menu-header-content mb-12 max-w-full">
          <div className="flex items-center gap-4 mb-3">
            <span className="h-[2px] w-10 bg-[#475DB1]" />
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-black">
              The Chef's Selection
            </span>
          </div>
          <h2 className="text-4xl md:text-[3.8rem] font-serif text-black leading-tight tracking-tighter mb-4">
            Taste the{" "}
            <em className="italic font-light text-[#475DB1]">Exceptional</em>
          </h2>
          <p className="text-base text-neutral-500 font-light leading-relaxed">
            Experience our most celebrated seasonal creations, each crafted with
            locally sourced ingredients and culinary passion.
          </p>
        </div>

        {/* Featured Items - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Main Large Item */}
          <div className="featured-item lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl group">
              <div className="item-image absolute inset-0">
                <Image
                  src={featuredItems[1].image}
                  alt={featuredItems[1].name}
                  fill
                  className="object-cover scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-8 left-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] tracking-widest uppercase mb-1 block">
                  Chef's Signature
                </span>
                <p className="text-xl font-serif italic">
                  Culinary excellence in every bite.
                </p>
              </div>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
                <span className="font-serif text-base font-bold text-[#475DB1]">
                  {featuredItems[1].price}
                </span>
              </div>
            </div>
            <div className="max-w-2xl">
              <h3 className="text-3xl font-serif text-black mb-3">
                {featuredItems[1].name}
              </h3>
              <p className="text-base text-neutral-600 font-light leading-relaxed">
                {featuredItems[1].description}
              </p>
            </div>
          </div>

          {/* Secondary Column */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-12">
            {/* Small Item 1 */}
            <div className="featured-item group">
              <div className="flex gap-6 items-center">
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={featuredItems[0].image}
                    alt={featuredItems[0].name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] tracking-widest text-[#475DB1] font-bold uppercase">
                    {featuredItems[0].price}
                  </span>
                  <h3 className="text-xl font-serif text-black group-hover:text-[#475DB1] transition-colors">
                    {featuredItems[0].name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light line-clamp-2">
                    {featuredItems[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Small Item 2 */}
            <div className="featured-item group">
              <div className="flex gap-6 items-center">
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={featuredItems[3].image}
                    alt={featuredItems[3].name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] tracking-widest text-[#475DB1] font-bold uppercase">
                    {featuredItems[3].price}
                  </span>
                  <h3 className="text-xl font-serif text-black group-hover:text-[#475DB1] transition-colors">
                    {featuredItems[3].name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light line-clamp-2">
                    {featuredItems[3].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Explore CTA */}
            <div className="featured-item pt-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-5 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#475DB1] flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
                  <ArrowRight size={20} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold uppercase tracking-[0.15em] text-black">
                    Explore Full Menu
                  </span>
                  <span className="block text-[10px] text-neutral-400 font-light">
                    See our complete seasonal collection
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
