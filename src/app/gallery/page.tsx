"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ALL_CATEGORIES = [
  "All",
  "Interiors",
  "Beer Garden",
  "Events",
  "Gastronomy",
  "The Cellar",
];

const ITEMS_PER_PAGE = 15;

const galleryItems = [
  // Interiors
  {
    id: 1,
    src: "/images/gallery/gallery-2.jpg",
    category: "Interiors",
    aspect: "aspect-[4/3]",
  },
  {
    id: 2,
    src: "/images/gallery/gallery-25.jpg",
    category: "Interiors",
    aspect: "aspect-[3/4]",
  },
  {
    id: 3,
    src: "/images/gallery/gallery-6.jpg",
    category: "Interiors",
    aspect: "aspect-square",
  },
  {
    id: 4,
    src: "/images/gallery/gallery-1.jpg",
    category: "Interiors",
    aspect: "aspect-[4/3]",
  },
  // Beer Garden
  {
    id: 5,
    src: "/images/assets/SEVEN_STARS_2026_02_09-0074.jpg",
    category: "Beer Garden",
    aspect: "aspect-square",
  },
  {
    id: 6,
    src: "/images/assets/SEVEN_STARS_2026_02_09-0001.jpg",
    category: "Beer Garden",
    aspect: "aspect-[4/5]",
  },
  {
    id: 7,
    src: "/images/assets/SEVEN_STARS_2026_02_09-0010.jpg",
    category: "Beer Garden",
    aspect: "aspect-[16/9]",
  },
  // Events
  {
    id: 8,
    src: "/images/gallery/event-celebration.jpg",
    category: "Events",
    aspect: "aspect-square",
  },
  {
    id: 9,
    src: "/images/gallery/gallery-3.jpg",
    category: "Events",
    aspect: "aspect-[3/4]",
  },
  {
    id: 10,
    src: "/images/gallery/gallery-4.jpg",
    category: "Events",
    aspect: "aspect-[4/3]",
  },
  // Gastronomy
  {
    id: 11,
    src: "/images/assets/SEVEN_STARS_2026_02_09-0112.jpg",
    category: "Gastronomy",
    aspect: "aspect-[3/4]",
  },
  {
    id: 12,
    src: "/images/gallery/feature-classic-1.jpg",
    category: "Gastronomy",
    aspect: "aspect-square",
  },
  {
    id: 13,
    src: "/images/gallery/gallery-25.jpg",
    category: "Gastronomy",
    aspect: "aspect-[4/3]",
  },
  // The Cellar
  {
    id: 14,
    src: "/images/gallery/gallery-8.jpg",
    category: "The Cellar",
    aspect: "aspect-[4/5]",
  },
  {
    id: 15,
    src: "/images/gallery/gallery-2.jpg",
    category: "The Cellar",
    aspect: "aspect-square",
  },
  {
    id: 16,
    src: "/images/gallery/gallery-6.jpg",
    category: "The Cellar",
    aspect: "aspect-[4/3]",
  },
  // Additional Mix for Pagination
  {
    id: 17,
    src: "/images/gallery/gallery-1.jpg",
    category: "Interiors",
    aspect: "aspect-square",
  },
  {
    id: 18,
    src: "/images/gallery/gallery-3.jpg",
    category: "Interiors",
    aspect: "aspect-[4/5]",
  },
  {
    id: 19,
    src: "/images/gallery/gallery-4.jpg",
    category: "Interiors",
    aspect: "aspect-[16/9]",
  },
  {
    id: 20,
    src: "/images/gallery/food-gourmet.jpg",
    category: "Gastronomy",
    aspect: "aspect-square",
  },
  {
    id: 21,
    src: "/images/gallery/event-celebration.jpg",
    category: "Events",
    aspect: "aspect-[3/4]",
  },
  {
    id: 22,
    src: "/images/gallery/gallery-8.jpg",
    category: "Beer Garden",
    aspect: "aspect-[4/3]",
  },
  {
    id: 23,
    src: "/images/gallery/feature-roast-1.jpg",
    category: "Gastronomy",
    aspect: "aspect-[4/5]",
  },
  {
    id: 24,
    src: "/images/gallery/gallery-1.jpg",
    category: "The Cellar",
    aspect: "aspect-square",
  },
];

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Handle Category Change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // Reset to first page
  };

  // Re-run GSAP animations when items change
  useEffect(() => {
    if (!galleryRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }, galleryRef);
    return () => ctx.revert();
  }, [currentItems]);

  // Initial Hero Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-slate-50 overflow-x-hidden"
    >
      <Navbar />

      {/* Modern Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src="/images/gallery/gallery-25.jpg"
            alt="Seven Stars Gallery"
            fill
            className="object-cover opacity-60"
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
                  A Visual Story
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                Photo <br />
                <span className="italic font-light text-[#475DB1]">
                  Gallery
                </span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <div className="hero-reveal border-l border-white/20 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic">
                  &quot;Captured moments from our interiors, gardens, and
                  gastronomy. A comprehensive visual journey through the Seven
                  Stars.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white min-h-[800px]" ref={galleryRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#475DB1] text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item relative break-inside-avoid rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer"
              >
                <div className={`relative w-full ${item.aspect}`}>
                  <Image
                    src={item.src}
                    alt={item.category}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-widest font-bold border border-white/30 px-6 py-2 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500 font-light">
                No images found for this category.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-[#475DB1] hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                        currentPage === pageNumber
                          ? "bg-[#475DB1] text-white shadow-md"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-[#475DB1] hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
