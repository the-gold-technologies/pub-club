"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Beer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";

gsap.registerPlugin(ScrollTrigger);

interface MenuFeaturedProps {
  data?: any;
}

export default function MenuFeatured({ data = {} }: MenuFeaturedProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredItems = Array.isArray(data.dishes) ? data.dishes : [];

  // State to track the index order of featured items
  const [displayIndices, setDisplayIndices] = useState<number[]>([0, 1, 2]);

  // Sync indices when CMS dishes load or change in length
  useEffect(() => {
    if (featuredItems.length > 0) {
      setDisplayIndices(
        Array.from({ length: featuredItems.length }, (_, i) => i),
      );
    }
  }, [featuredItems.length]);

  const handleSwap = (clickedPosition: number) => {
    setDisplayIndices((prev) => {
      if (prev.length <= clickedPosition) return prev;
      const newIndices = [...prev];
      const temp = newIndices[0];
      newIndices[0] = newIndices[clickedPosition];
      newIndices[clickedPosition] = temp;
      return newIndices;
    });
  };

  const mainItem =
    displayIndices.length > 0 && displayIndices[0] < featuredItems.length
      ? featuredItems[displayIndices[0]]
      : undefined;
  const smallItem1 =
    displayIndices.length > 1 && displayIndices[1] < featuredItems.length
      ? featuredItems[displayIndices[1]]
      : undefined;
  const smallItem2 =
    displayIndices.length > 2 && displayIndices[2] < featuredItems.length
      ? featuredItems[displayIndices[2]]
      : undefined;

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
  }, [featuredItems, data]);

  return (
    <section
      ref={sectionRef}
      id="featured-menu"
      className="py-16 bg-neutral-50 relative overflow-hidden"
    >
      {/* Decorative Branding Elements */}
      {data.watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-serif text-black/[0.02] select-none pointer-events-none whitespace-nowrap hidden lg:block">
          {data.watermark}
        </div>
      )}

      {/* Decorative Beer Icon to cover white space */}
      <div className="absolute top-5 right-[-5%] text-[#475DB1]/[0.03] select-none pointer-events-none hidden lg:block">
        <Beer size={420} strokeWidth={0.5} className="rotate-[12deg]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Editorial Style */}
        <div className="menu-header-content mb-12 max-w-full">
          <div className="flex items-center gap-4 mb-3">
            <span className="h-[2px] w-10 bg-[#475DB1]" />
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold">
              {data.upperTag}
            </span>
          </div>
          <h2 className="text-4xl md:text-[3.8rem] font-serif text-black leading-tight tracking-tighter mb-4">
            {data.regularHeading}{" "}
            <em className="italic font-light text-[#475DB1]">
              {data.italicHeading}
            </em>
          </h2>
          <p className="text-base text-neutral-500 font-light leading-relaxed">
            {parseMarkdownLinks(data.description)}
          </p>
        </div>

        {/* Featured Items - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Main Large Item */}
          {mainItem && (
            <div className="featured-item lg:col-span-7 space-y-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl group">
                <div className="item-image absolute inset-0">
                  <Image
                    src={mainItem.image}
                    alt={mainItem.name}
                    fill
                    className="object-cover scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-8 left-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <span className="text-[10px] tracking-widest uppercase mb-1 block">
                    {data.badgeLabel || "Chef's Signature"}
                  </span>
                  <p className="text-xl font-serif italic">
                    {data.badgeText || "Culinary excellence in every bite."}
                  </p>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
                  <span className="font-serif text-base font-bold text-[#475DB1]">
                    {mainItem.price}
                  </span>
                </div>
              </div>
              <div className="max-w-2xl">
                <h3 className="text-3xl font-serif text-black mb-3">
                  {mainItem.name}
                </h3>
                <p className="text-base text-neutral-600 font-light leading-relaxed">
                  {parseMarkdownLinks(mainItem.description)}
                </p>
              </div>
            </div>
          )}

          {/* Secondary Column */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-12">
            {/* Small Item 1 */}
            {smallItem1 && (
              <div
                className="featured-item group cursor-pointer"
                onClick={() => handleSwap(1)}
              >
                <div className="flex gap-6 items-center">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={smallItem1.image}
                      alt={smallItem1.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] tracking-widest text-[#475DB1] font-bold uppercase">
                      {smallItem1.price}
                    </span>
                    <h3 className="text-xl font-serif text-black group-hover:text-[#475DB1] transition-colors">
                      {smallItem1.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-light line-clamp-2">
                      {parseMarkdownLinks(smallItem1.description)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Small Item 2 */}
            {smallItem2 && (
              <div
                className="featured-item group cursor-pointer"
                onClick={() => handleSwap(2)}
              >
                <div className="flex gap-6 items-center">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={smallItem2.image}
                      alt={smallItem2.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] tracking-widest text-[#475DB1] font-bold uppercase">
                      {smallItem2.price}
                    </span>
                    <h3 className="text-xl font-serif text-black group-hover:text-[#475DB1] transition-colors">
                      {smallItem2.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-light line-clamp-2">
                      {parseMarkdownLinks(smallItem2.description)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Explore CTA */}
            <div className="featured-item pt-4">
              <Link
                href={data.btnUrl || "/menu"}
                className="inline-flex items-center gap-5 group"
                aria-label={data.btnLabel || "View Menu"}
              >
                <div className="w-14 h-14 rounded-full bg-[#475DB1] flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
                  <ArrowRight size={20} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold uppercase tracking-[0.15em] text-black">
                    {data.btnLabel}
                  </span>
                  {data.btnSublabel && (
                    <span className="block text-[10px] text-neutral-400 font-light">
                      {data.btnSublabel}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
