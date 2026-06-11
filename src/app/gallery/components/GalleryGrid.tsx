"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ALL_CATEGORIES = ["All", "Indoor", "Outdoor", "Food"];
const ITEMS_PER_PAGE = 15;

export default function GalleryGrid({ data = {} }: { data?: any }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const galleryItems = Array.isArray(data.galleryItems)
    ? data.galleryItems
    : [];

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item: any) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const closeLightbox = () => setSelectedItemIndex(null);

  const showNext = () => {
    setSelectedItemIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  };

  const showPrev = () => {
    setSelectedItemIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  };

  useEffect(() => {
    if (selectedItemIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, filteredItems.length]);

  useEffect(() => {
    if (selectedItemIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItemIndex]);

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

  return (
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

        {/* Flex Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {[0, 1, 2].map((colIndex) => {
            const colItems = currentItems.filter(
              (_: any, idx: number) => idx % 3 === colIndex,
            );

            if (colItems.length === 0) return null;

            return (
              <div key={colIndex} className="flex flex-col gap-6 h-full">
                {colItems.map((item: any, itemIdx: number) => {
                  const isLast = itemIdx === colItems.length - 1;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        const globalIndex = filteredItems.findIndex((x: any) => x.id === item.id);
                        if (globalIndex !== -1) setSelectedItemIndex(globalIndex);
                      }}
                      className={`gallery-item relative rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer w-full ${
                        isLast ? "flex-1 min-h-[200px]" : ""
                      }`}
                    >
                      <div
                        className={`relative w-full ${isLast ? "h-full" : item.aspect}`}
                      >
                        {item.src && (
                          <Image
                            src={item.src}
                            alt={item.category}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-start justify-start p-6">
                          <span className="text-white text-xs uppercase tracking-widest font-bold border border-white/30 px-4 py-1.5 rounded-full backdrop-blur-md bg-white/10">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
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

      {/* Lightbox Modal */}
      {selectedItemIndex !== null && filteredItems[selectedItemIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm select-none"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all cursor-pointer bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md hover:scale-105 active:scale-95 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation - Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all cursor-pointer bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md hover:scale-105 active:scale-95 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Showcase Wrapper */}
          <div 
            className="relative w-[90vw] h-[80vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems[selectedItemIndex].src && (
              <Image
                src={filteredItems[selectedItemIndex].src}
                alt={filteredItems[selectedItemIndex].category || "Gallery Image"}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            )}
          </div>

          {/* Counter & Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/60 text-xs tracking-widest uppercase font-bold bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
            Image <span className="text-white font-extrabold">{selectedItemIndex + 1}</span> of {filteredItems.length} &mdash; {filteredItems[selectedItemIndex].category}
          </div>
        </div>
      )}
    </section>
  );
}
