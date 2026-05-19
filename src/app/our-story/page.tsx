"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCMSStore } from "@/store/useCMSStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLoader from "@/components/layout/PageLoader";

import StoryHero from "./components/StoryHero";
import StoryIntro from "./components/StoryIntro";
import StoryTimeline from "./components/StoryTimeline";
import StoryHub from "./components/StoryHub";

gsap.registerPlugin(ScrollTrigger);

export default function OurStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("our-story").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["our-story"];
  const sections = pageData?.sections || {};
  const loading = isLoading["our-story"] ?? true;

  // Extract sections
  const hero = sections["StoryHero"] || {};
  const intro = sections["StoryIntro"] || {};
  const timeline = sections["StoryTimeline"] || {};
  const hub = sections["StoryHub"] || {};

  const timelineSteps = timeline.timelineSteps || [];

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

      <StoryHero data={hero} />
      <StoryIntro data={intro} />
      <StoryTimeline data={timelineSteps} />
      <StoryHub data={hub} />

      <Footer />
    </div>
  );
}
