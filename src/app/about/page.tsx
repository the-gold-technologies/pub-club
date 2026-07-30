"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCMSStore } from "@/store/useCMSStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLoader from "@/components/layout/PageLoader";

import AboutHero from "./components/AboutHero";
import AboutRoots from "./components/AboutRoots";
import AboutPhilosophy from "./components/AboutPhilosophy";
import AboutExperience from "./components/AboutExperience";
import AboutAmenities from "./components/AboutAmenities";
import AboutCta from "./components/AboutCta";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("about").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["about"];
  const sections = pageData?.sections || {};
  const loading = isLoading["about"] ?? true;

  const hero = sections["AboutHero"] || {};
  const roots = sections["AboutRoots"] || {};
  const philosophy = sections["AboutPhilosophy"] || {};
  const experience = sections["AboutExperience"] || {};
  const amenitiesSection = sections["AboutAmenities"] || {};
  const cta = sections["AboutCta"] || {};

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal animations
      const sectionsElements = gsap.utils.toArray(".reveal-section");
      sectionsElements.forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [pageData]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <AboutHero data={hero} />
        <AboutRoots data={roots} />
        <AboutPhilosophy data={philosophy} />
        <AboutExperience data={experience} />
        <AboutAmenities data={amenitiesSection} />
        <AboutCta data={cta} />
      </main>

      <Footer />
    </div>
  );
}
