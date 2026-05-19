"use client";

import { useEffect } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import dynamic from "next/dynamic";
import PageLoader from "@/components/layout/PageLoader";

// Lazy-loaded dynamic sections to isolate GSAP execution and prevent double animation loads
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const AboutUs = dynamic(() => import("@/components/sections/AboutUs"), { ssr: false });
const Dining = dynamic(() => import("@/components/sections/Dining"), { ssr: false });
const MenuFeatured = dynamic(() => import("@/components/sections/MenuFeatured"), { ssr: false });
const FeatureTiles = dynamic(() => import("@/components/sections/FeatureTiles"), { ssr: false });
const EventGallery = dynamic(() => import("@/components/sections/EventGallery"), { ssr: false });
const Gallery = dynamic(() => import("@/components/sections/Gallery"), { ssr: false });
const ReadyToVisit = dynamic(() => import("@/components/sections/ReadyToVisit"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false });


export default function Home() {
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("home").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["home"] || {};
  const sections = pageData.sections || {};
  const loading = isLoading["home"] ?? true;


  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-500 selection:text-white overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />
      <Hero data={sections["HeroSection"] || {}} />

      <AboutUs data={sections["AboutUs"] || {}} />
      <EventGallery data={sections["EventGallery"] || {}} />
      <Dining data={sections["Dining"] || {}} />
      <FeatureTiles data={sections["FeatureTiles"] || {}} />
      <MenuFeatured data={sections["MenuFeatured"] || {}} />
      <Gallery data={sections["Gallery"] || {}} />
      <Testimonials data={sections["Testimonials"] || {}} />
      <ReadyToVisit data={sections["ReadyToVisit"] || {}} />
      <Footer />
    </div>
  );
}
