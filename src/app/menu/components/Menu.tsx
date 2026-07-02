"use client";

import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mobileNavRef.current) {
      const activeEl = mobileNavRef.current.children[sectionIdx] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [sectionIdx]);

  const scrollTriggerRef = useRef<any>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Entrance animation for header
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

      // Pin the menu-book and scrub-scroll the container
      const maxScroll = container.scrollHeight - container.clientHeight;
      const anim = gsap.to(container, {
        scrollTop: maxScroll,
        ease: "none",
        scrollTrigger: {
          trigger: ".menu-book",
          pin: true,
          start: "top 90px",
          end: () => `+=${Math.max(1200, maxScroll * 1.3)}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTriggerRef.current = anim.scrollTrigger;
    }, ref);

    return () => ctx.revert();
  }, [menuSections]);

  // Scrollspy logic
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top;
    let activeIdx = 0;

    for (let i = 0; i < menuSections.length; i++) {
      const el = document.getElementById(`menu-section-${i}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        // If the top of the section is near or above the container's top boundary
        if (rect.top - containerTop <= 120) {
          activeIdx = i;
        } else {
          break; // Since they are ordered, we can stop checking
        }
      }
    }

    setSectionIdx(activeIdx);
  };

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    const element = document.getElementById(`menu-section-${index}`);
    const st = scrollTriggerRef.current;

    if (container && element) {
      isProgrammaticScroll.current = true;
      setSectionIdx(index);

      if (st) {
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        const targetScrollTop = container.scrollTop + (elementTop - containerTop) - 20;

        const maxScroll = container.scrollHeight - container.clientHeight;
        const progress = Math.min(1, Math.max(0, targetScrollTop / (maxScroll || 1)));

        const triggerStart = st.start;
        const triggerEnd = st.end;
        const windowScrollTarget = triggerStart + progress * (triggerEnd - triggerStart);

        window.scrollTo({
          top: windowScrollTarget,
          behavior: "smooth",
        });
      } else {
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        const scrollTarget = container.scrollTop + (elementTop - containerTop) - 20;

        container.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000); // Wait for smooth scroll and GSAP scrub to complete
    }
  };


  const handleDownloadAll = async () => {
    const pdfsToDownload = Array.isArray(data.menuPdfs) && data.menuPdfs.length > 0
      ? data.menuPdfs.filter((url: string) => url && url !== "#")
      : menuSections.map((s: MenuSection) => s.pdf).filter((url: string) => url && url !== "#");

    if (pdfsToDownload.length === 0) {
      setDownloadToast("No PDF menus available for download.");
      setTimeout(() => setDownloadToast(null), 3000);
      return;
    }

    setIsDownloading(true);

    try {
      if (pdfsToDownload.length === 1) {
        setDownloadToast("Downloading menu PDF...");
        const pdfUrl = pdfsToDownload[0];
        const downloadUrl = `/api/download?url=${encodeURIComponent(pdfUrl)}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        const filename = pdfUrl.split("/").pop()?.split("?")[0] || "menu.pdf";
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        setDownloadToast(`Zipping and downloading ${pdfsToDownload.length} menu PDFs...`);
        const encodedUrls = pdfsToDownload.map((url: string) => encodeURIComponent(url)).join(",");
        const downloadUrl = `/api/download?urls=${encodedUrls}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "all-menus.zip";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      console.error("Download failed:", err);
      pdfsToDownload.forEach((url: string) => window.open(url, "_blank"));
    } finally {
      setIsDownloading(false);
      setTimeout(() => setDownloadToast(null), 3000);
    }
  };

  if (menuSections.length === 0) return null;

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
        <div className="menu-header mb-10 flex flex-col gap-6 border-b border-black/5 pb-12 w-full">
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
            {parseMarkdownLinks(data.description)}
          </p>
        </div>

        {/* Scrollable Menu Container */}
        <div className="relative w-full max-w-6xl">
          <div className="menu-book relative flex flex-col md:flex-row h-[80vh] md:h-[85vh] max-h-[900px] min-h-[520px] md:min-h-[680px] bg-[#DED7CF] shadow-[0_60px_120px_rgba(0,0,0,0.18)] rounded-2xl overflow-hidden border-l-[15px] border-[#475DB1]">
            {/* Folder Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />

            {/* LEFT SIDE (Desktop Sidebar Navigation - Hidden on Mobile) */}
            <div className="hidden md:flex w-[32%] bg-[#F2EDE7] relative border-r border-black/10 shrink-0">
              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              <div className="p-10 flex flex-col items-center justify-between h-full text-center py-16 border-r-[25px] border-black/5 w-full">
                <div className="flex flex-col items-center">
                  <h4 className="text-3xl font-serif text-black mb-1 tracking-tight">
                    {data.locationName}
                  </h4>
                  <p className="text-[#475DB1] text-[10px] uppercase tracking-[0.3em]">
                    {data.locationCounty}
                  </p>
                </div>

                <div className="space-y-7 w-full px-2">
                  {menuSections.map((s, i) => (
                    <button
                      key={s.id || i}
                      onClick={() => scrollToSection(i)}
                      className={`block w-full text-center text-[11px] uppercase tracking-[0.4em] font-bold transition-all relative group py-1 cursor-pointer ${sectionIdx === i ? "text-black scale-105" : "text-neutral-400 hover:text-black"}`}
                    >
                      {s.title}
                      <div
                        className={`absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[#475DB1] transition-transform duration-500 ${sectionIdx === i ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleDownloadAll}
                    disabled={isDownloading}
                    className="w-12 h-12 rounded-full bg-[#475DB1]/5 hover:bg-[#475DB1]/10 flex items-center justify-center text-[#475DB1] hover:scale-110 active:scale-95 transition-all duration-300 relative z-30 pointer-events-auto cursor-pointer"
                    title="Download all PDF menus"
                  >
                    <Download size={24} className={isDownloading ? "animate-bounce" : ""} />
                  </button>
                  <button
                    onClick={handleDownloadAll}
                    disabled={isDownloading}
                    className="text-[10px] tracking-[0.27em] font-bold text-[#475DB1] hover:text-black transition-colors uppercase relative z-30 pointer-events-auto cursor-pointer"
                  >
                    Download Menu
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (Scrollable Content Panel) */}
            <div className="flex-grow bg-[#FDFBF7] relative h-full flex flex-col">
              {/* Internal Paper Texture */}
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              {/* Gutter shadow overlay */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/5 to-transparent z-20 pointer-events-none" />

              {/* Mobile Navigation Header */}
              <div
                ref={mobileNavRef}
                className="flex md:hidden w-full overflow-x-auto no-scrollbar border-b border-black/5 px-6 py-4 gap-6 shrink-0 z-20 relative bg-[#FDFBF7]"
              >
                {menuSections.map((s, i) => (
                  <button
                    key={s.id || i}
                    onClick={() => scrollToSection(i)}
                    className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-all relative shrink-0 py-1.5 ${sectionIdx === i
                        ? "text-[#475DB1] scale-105"
                        : "text-neutral-400 hover:text-black"
                      }`}
                  >
                    {s.title}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#475DB1] transition-transform duration-500 origin-left ${sectionIdx === i ? "scale-x-100" : "scale-x-0"
                        }`}
                    />
                  </button>
                ))}
              </div>

              {/* CONTENT CONTAINER */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-grow overflow-hidden no-scrollbar p-6 md:p-14 pb-24 space-y-16 relative z-10"
              >
                {menuSections.map((section, sIdx) => (
                  <div
                    key={section.id || sIdx}
                    id={`menu-section-${sIdx}`}
                    className="border-b border-black/5 pb-14 last:border-0 last:pb-0 scroll-mt-6"
                  >
                    {/* Section Header */}
                    <div className="flex flex-col items-center text-center mb-10 pb-6 relative group">
                      <h4 className="text-[22px] font-bold text-black uppercase tracking-[0.4em] mb-3 flex items-center justify-center gap-4">
                        {section.title}
                      </h4>
                      <span className="text-[11px] text-[#475DB1] font-bold uppercase tracking-[0.2em]">
                        {section.subtitle || data.activeSectionSubtitle}
                      </span>
                    </div>

                    {/* Section Pages/Categories */}
                    <div className="space-y-12">
                      {section.pages.map((page, pIdx) => (
                        <div key={pIdx} className="space-y-12">
                          {page.categories.map((cat, cIdx) => (
                            <div key={cIdx} className="space-y-8">
                              <h5 className="text-[#475DB1] text-[12px] font-bold uppercase tracking-[0.4em] text-center flex items-center gap-6 justify-center">
                                <span className="w-6 h-[1px] bg-[#475DB1]/25"></span>
                                {cat.name}
                                <span className="w-6 h-[1px] bg-[#475DB1]/25"></span>
                              </h5>

                              <div className="grid grid-cols-1 gap-x-12 gap-y-8">
                                {cat.items.map((item, iIdx) => (
                                  <div key={iIdx} className="group hover:translate-x-1.5 transition-transform duration-300">
                                    <div className="flex justify-between items-start gap-6 mb-1">
                                      <div className="flex-grow">
                                        <h6 className="text-[14px] font-bold text-black uppercase tracking-[0.12em] mb-1.5 leading-tight group-hover:text-[#475DB1] transition-colors duration-300">
                                          {item.name}
                                        </h6>
                                        {item?.desc && (
                                          <p className="text-[11px] text-neutral-500 italic font-light lowercase leading-relaxed max-w-[90%]">
                                            {parseMarkdownLinks(item.desc)}
                                          </p>
                                        )}
                                      </div>
                                      <span className="text-[17px] font-serif text-[#475DB1] shrink-0 font-bold">
                                        {item.price}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="mt-24 text-center">
          <a
            href={data.ctaLink}
            className="inline-flex items-center px-14 py-6 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-[0.2em] text-[12px] font-bold transition-all rounded-full shadow-xl hover:shadow-[#475DB1]/20 hover:scale-105 duration-300"
          >
            {data.ctaText}
          </a>
        </div>
      </div>

      <style jsx global>{`
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
