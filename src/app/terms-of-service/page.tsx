"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import { useCMSStore } from "@/store/useCMSStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TermsOfServicePage() {
  const { fetchPage, pages, isLoading } = useCMSStore();
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPage("terms-of-service").catch((err) => {
      console.warn("Could not load Terms of Service from CMS.", err);
    });
  }, [fetchPage]);

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
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [pages["terms-of-service"]]);

  const pageData = pages["terms-of-service"];
  const contentData = pageData?.sections?.TermsOfServiceContent || {
    title: "Terms of Service",
    introduction:
      "Please read these Terms of Service carefully before accessing our website.",
    backgroundImage:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-celebration-2.webp",
    content: "",
  };
  const loading = isLoading["terms-of-service"] ?? true;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 flex flex-col font-serif">
      <PageLoader isLoading={loading} />
      <Navbar />

      <style>{`
        /* Clean up copy/paste style alignments, prevent horizontal scrolls and bad word breaks */
        .legal-content p, 
        .legal-content span,
        .legal-content div,
        .legal-content li,
        .legal-content h1,
        .legal-content h2,
        .legal-content h3,
        .legal-content h4,
        .legal-content h5,
        .legal-content h6 {
          white-space: normal !important;
          word-break: normal !important;
          overflow-wrap: break-word !important;
          margin-left: 0 !important;
          text-indent: 0 !important;
          background-color: transparent !important;
          background: transparent !important;
        }

        .legal-content h3 {
          font-size: 1.45rem;
          font-weight: 750;
          font-family: var(--font-playfair), serif;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 0.95rem;
          letter-spacing: -0.015em;
        }
        
        .legal-content p {
          font-size: 1rem;
          line-height: 1.8;
          color: #4b5563;
          margin-bottom: 1.5rem;
          font-family: var(--font-inter), sans-serif;
          font-weight: 300;
        }
        
        .legal-content ul {
          list-style-type: disc !important;
          padding-left: 1.75rem !important;
          margin-bottom: 1.75rem !important;
          color: #4b5563;
          font-family: var(--font-inter), sans-serif;
          font-weight: 300;
        }

        .legal-content ol {
          list-style-type: decimal !important;
          padding-left: 1.75rem !important;
          margin-bottom: 1.75rem !important;
          color: #4b5563;
          font-family: var(--font-inter), sans-serif;
          font-weight: 300;
        }
        
        .legal-content li {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 0.6rem;
          padding-left: 0.25rem !important;
        }
        
        .legal-content strong {
          font-weight: 600;
          color: #111827;
        }
        
        .legal-content a {
          color: #394A8D !important;
          text-decoration: underline !important;
          font-weight: 500 !important;
          cursor: pointer !important;
        }
        
        .legal-content a:hover {
          color: #2d3b72 !important;
        }
      `}</style>

      {/* Hero Header Section — identical style to other page heroes */}
      <section
        ref={heroRef}
        className="relative h-[55vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Background Image / Pattern overlay */}
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          {contentData.backgroundImage && (
            <Image
              src={contentData.backgroundImage}
              alt={contentData.title || "Terms of Service"}
              fill
              className="object-cover opacity-40"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        </div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end text-left">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-[#475DB1]" />
                <span className="block text-[#475DB1] uppercase tracking-[0.4em] text-[12px] font-bold">
                  Legal Information
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                {contentData.title}
              </h1>
            </div>

            <div className="md:col-span-5 lg:col-span-4 pb-2 md:pb-4">
              {contentData.introduction && (
                <p className="hero-reveal text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic border-l border-[#475DB1]/50 pl-6">
                  {contentData.introduction}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="flex-1 bg-[#FDFBF7] pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 relative z-20">
          <div
            className="legal-content max-w-5xl mx-auto"
            dangerouslySetInnerHTML={{ __html: contentData.content }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
