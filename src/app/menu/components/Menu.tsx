"use client";

import { Download, ChevronLeft, ChevronRight, Beer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
}

interface MenuCategory {
  name: string;
  subtitle?: string;
  items: MenuItem[];
}

interface MenuPage {
  categories: MenuCategory[];
}

interface MenuSection {
  id: string;
  title: string;
  subtitle?: string;
  pdf: string;
  pages: MenuPage[];
}

export default function Menu({ data = {} }: { data?: any }) {
  const menuSections: MenuSection[] = Array.isArray(data.menuSections)
    ? data.menuSections
    : [];

  const ref = useRef<HTMLElement>(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const flipPageRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".menu-header",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  if (menuSections.length === 0) return null;

  const changePage = (newSection: number, newPage: number) => {
    if (isFlipping) return;
    setIsFlipping(true);

    const isForward =
      newSection > sectionIdx ||
      (newSection === sectionIdx && newPage > pageIdx);

    const tl = gsap.timeline({
      onComplete: () => {
        setSectionIdx(newSection);
        setPageIdx(newPage);
        setIsFlipping(false);
        gsap.set(flipPageRef.current, { rotateY: 0, opacity: 0 });
        gsap.set(shadowRef.current, { opacity: 0 });
      },
    });

    // Reset page state
    gsap.set(flipPageRef.current, {
      opacity: 1,
      rotateY: isForward ? 0 : -180,
      transformOrigin: isForward ? "left center" : "right center",
      zIndex: 100,
    });

    // 1. Initial lift & shadow
    tl.to(shadowRef.current, { opacity: 0.3, duration: 0.2 });

    // 2. Realistic Flip Animation (Slow to Fast to Slow)
    tl.to(flipPageRef.current, {
      rotateY: isForward ? -180 : 0,
      duration: 1.0,
      ease: "power2.inOut",
      onUpdate: function () {
        const progress = this.progress();
        // Adjust brightness of the flipping page for 3D effect
        const brightness =
          progress < 0.5 ? 1 - progress * 0.4 : 0.6 + (progress - 0.5) * 0.8;
        gsap.set(flipPageRef.current, { filter: `brightness(${brightness})` });
      },
    });

    // 3. Fade content mid-flip
    tl.to(
      ".active-page-content",
      {
        opacity: 0,
        duration: 0.3,
      },
      0.3,
    );

    tl.to(
      ".active-page-content",
      {
        opacity: 1,
        duration: 0.4,
      },
      0.7,
    );
  };

  const next = () => {
    const currentSection = menuSections[sectionIdx];
    if (pageIdx < currentSection.pages.length - 1) {
      changePage(sectionIdx, pageIdx + 1);
    } else if (sectionIdx < menuSections.length - 1) {
      changePage(sectionIdx + 1, 0);
    }
  };

  const prev = () => {
    if (pageIdx > 0) {
      changePage(sectionIdx, pageIdx - 1);
    } else if (sectionIdx > 0) {
      const prevSection = menuSections[sectionIdx - 1];
      changePage(sectionIdx - 1, prevSection.pages.length - 1);
    }
  };

  const activeSection = menuSections[sectionIdx] || menuSections[0];
  const activePage =
    activeSection?.pages?.[pageIdx] || activeSection?.pages?.[0];

  const handleDownload = async () => {
    const pdfUrl = activeSection?.pdf;

    if (!pdfUrl || pdfUrl === "#") {
      setDownloadToast("No PDF available for this menu section.");
      setTimeout(() => setDownloadToast(null), 3000);
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch(pdfUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const filename = pdfUrl.split("/").pop() || `${activeSection.title || "menu"}.pdf`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab if fetch/CORS fails
      window.open(pdfUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!activeSection || !activePage) return null;

  return (
    <section
      ref={ref}
      id="menu"
      className="py-24 bg-[#faf9f6] relative overflow-hidden border-t border-black/5"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Download Toast */}
      {downloadToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-black/90 text-white text-[13px] px-6 py-3 rounded-full shadow-2xl tracking-wide transition-all animate-fade-in">
          {downloadToast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="menu-header mb-16 flex flex-col gap-6 border-b border-black/5 pb-12 w-full">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
              <span className="font-serif text-2xl text-black/10 leading-none">
                {data.sectionNumber}
              </span>
              <span className="w-6 h-[1px] bg-primary-600/30"></span>
              {data.tagline}
            </span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <h3 className="text-4xl md:text-5xl font-serif text-black leading-tight tracking-tight">
                {data.headingPart1}{" "}
                <em className="not-italic text-[#475DB1] font-light">
                  {data.headingItalicHighlight}
                </em>
              </h3>
            </div>
          </div>
          <p className="text-neutral-600 leading-relaxed font-light text-lg max-w-3xl">
            {data.description}
          </p>
        </div>

        {/* 3D Menu Book with Realistic Physics */}
        <div className="relative w-full max-w-6xl perspective-3000">
          <div className="menu-book relative flex h-[750px] md:h-[850px] bg-[#DED7CF] shadow-[0_60px_120px_rgba(0,0,0,0.18)] rounded-r-lg rounded-l-md overflow-hidden border-l-[15px] border-[#475DB1]">
            {/* Folder Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />

            {/* LEFT SIDE (Static Navigation) */}
            <div className="hidden md:flex w-[35%] bg-[#F2EDE7] relative border-r border-black/10 shrink-0">
              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              <div className="p-12 flex flex-col items-center justify-between h-full text-center py-20 border-r-[25px] border-black/5 w-full">
                <div className="flex flex-col items-center">
                  <h4 className="text-3xl font-serif text-black mb-1 tracking-tight">
                    {data.locationName}
                  </h4>
                  <p className="text-[#475DB1] text-[10px] uppercase tracking-[0.3em]">
                    {data.locationCounty}
                  </p>
                </div>

                <div className="space-y-8">
                  {menuSections.map((s, i) => (
                    <button
                      key={s.id || i}
                      onClick={() => changePage(i, 0)}
                      className={`block text-[11px] uppercase tracking-[0.4em] font-bold transition-all relative group ${sectionIdx === i ? "text-black scale-110" : "text-neutral-400 hover:text-black"}`}
                    >
                      {s.title}
                      <div
                        className={`absolute -bottom-2 left-0 right-0 h-[1px] bg-black transition-transform duration-500 ${sectionIdx === i ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#475DB1]/5 flex items-center justify-center text-[#475DB1]">
                    <Beer size={24} />
                  </div>
                  <div className="w-10 h-[1px] bg-black/10" />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (Content Area) */}
            <div className="flex-grow bg-[#FDFBF7] relative">
              {/* Internal Paper Texture */}
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              {/* Realistic Shadow for Flip Gutter */}
              <div
                ref={shadowRef}
                className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/20 to-transparent z-40 opacity-0 pointer-events-none"
              />

              {/* THE FLIPPING PAGE (Enhanced 3D Geometry) */}
              <div
                ref={flipPageRef}
                className="absolute inset-0 bg-[#F2EDE7] z-50 opacity-0 pointer-events-none origin-left shadow-[20px_0_50px_rgba(0,0,0,0.15)] border-l border-black/10"
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                {/* Internal page shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* CONTENT CONTAINER */}
              <div className="active-page-content p-8 md:p-12 lg:p-14 h-full flex flex-col relative z-10">
                <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
                  <div className="flex flex-col items-center text-center mb-10 border-b border-black/5 pb-6">
                    <h4 className="text-[20px] font-bold text-black uppercase tracking-[0.4em] mb-4">
                      {activeSection.title}
                    </h4>
                    <span className="text-[11px] text-[#475DB1] font-bold uppercase tracking-[0.2em]">
                      {activeSection.subtitle || data.activeSectionSubtitle}
                    </span>
                  </div>

                  <div className="space-y-10">
                    {activePage.categories.map((cat, cIdx) => (
                      <div key={cIdx}>
                        <h5 className="text-[#475DB1] text-[12px] font-bold uppercase tracking-[0.4em] mb-8 text-center flex items-center gap-8 justify-center">
                          <span className="w-8 h-[1px] bg-[#475DB1]/30"></span>
                          {cat.name}
                          <span className="w-8 h-[1px] bg-[#475DB1]/30"></span>
                        </h5>

                        <div className="space-y-8">
                          {cat.items.map((item, iIdx) => (
                            <div key={iIdx}>
                              <div className="flex justify-between items-start gap-8 mb-1">
                                <div className="flex-grow">
                                  <h6 className="text-[15px] font-bold text-black uppercase tracking-[0.15em] mb-1 leading-tight">
                                    {item.name}
                                  </h6>
                                  {item?.desc && (
                                    <p className="text-[12px] text-neutral-500 italic font-light lowercase leading-relaxed max-w-[85%]">
                                      {item.desc}
                                    </p>
                                  )}
                                </div>
                                <span className="text-[19px] font-serif text-[#475DB1] shrink-0 font-bold">
                                  {item.price}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elegant Navigation & Download */}
                <div className="mt-auto pt-6 border-t border-black/5 flex justify-between items-center bg-[#FDFBF7]/80 backdrop-blur-sm z-20">
                  <button
                    onClick={prev}
                    className={`flex items-center gap-4 text-[12px] uppercase tracking-widest font-bold transition-all ${sectionIdx === 0 && pageIdx === 0 ? "opacity-0 cursor-default" : "text-black hover:text-[#475DB1]"}`}
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>

                  <button
                    id="menu-download-btn"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    title={activeSection.pdf ? `Download ${activeSection.title} menu PDF` : "No PDF available"}
                    className={`transition-colors ${isDownloading ? "text-[#475DB1] animate-pulse cursor-wait" : activeSection.pdf ? "text-neutral-400 hover:text-[#475DB1]" : "text-neutral-300 cursor-not-allowed"}`}
                  >
                    <Download size={24} />
                  </button>

                  <button
                    onClick={next}
                    className={`flex items-center gap-4 text-[12px] uppercase tracking-widest font-bold transition-all ${sectionIdx === menuSections.length - 1 && pageIdx === activeSection.pages.length - 1 ? "opacity-0 cursor-default" : "text-black hover:text-[#475DB1]"}`}
                  >
                    Turn Page <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <a
            href={data.ctaLink}
            className="inline-flex items-center px-14 py-6 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-[0.2em] text-[12px] font-bold transition-all rounded-full shadow-xl"
          >
            {data.ctaText}
          </a>
        </div>
      </div>

      <style jsx global>{`
        .perspective-3000 {
          perspective: 3500px;
        }
        .menu-book {
          transform-style: preserve-3d;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
