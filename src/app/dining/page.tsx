"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import PageLoader from "@/components/layout/PageLoader";
import { useCMSStore } from "@/store/useCMSStore";
import Dining from "@/components/sections/Dining";

// Lazy-loaded dynamic components to prevent hydration gaps and duplicate animation loops
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
// const MenuFeatured = dynamic(() => import("@/components/sections/MenuFeatured"), { ssr: false });
// const Gallery = dynamic(() => import("@/components/sections/Gallery"), { ssr: false });
const DiningHero = dynamic(() => import("@/app/dining/components/DiningHero"), { ssr: false });
const DiningIntro = dynamic(() => import("@/app/dining/components/DiningIntro"), { ssr: false });
const DiningQuote = dynamic(() => import("@/app/dining/components/DiningQuote"), { ssr: false });
const DiningPillars = dynamic(() => import("@/app/dining/components/DiningPillars"), { ssr: false });
const DiningBarn = dynamic(() => import("@/app/dining/components/DiningBarn"), { ssr: false });
const OutdoorSeating = dynamic(() => import("@/app/dining/components/OutdoorSeating"), { ssr: false });


export default function DiningPage() {
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("dining").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["dining"] || {};
  const sections = pageData.sections || {};
  const loading = isLoading["dining"] ?? true;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />
      <DiningHero data={sections["DiningHero"] || {}} />
      <Dining data={sections["Dining"] || {}} />
      <DiningQuote data={sections["DiningQuote"] || {}} />
      <DiningIntro data={sections["DiningIntro"] || {}} />
      {/* <MenuFeatured data={sections["MenuFeatured"] || {}} /> */}
      <DiningPillars data={sections["DiningPillars"] || sections["DiningMenu"] || {}} />
      <DiningBarn data={sections["DiningBarn"] || {}} />
      {/* <Gallery data={sections["Gallery"] || {}} /> */}
      <OutdoorSeating data={sections["DiningOutdoor"] || {}} />
      <Footer />

    </div>
  );
}

