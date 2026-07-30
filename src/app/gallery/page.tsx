"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import PageLoader from "@/components/layout/PageLoader";
import { useCMSStore } from "@/store/useCMSStore";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const GalleryHero = dynamic(() => import("@/app/gallery/components/GalleryHero"), { ssr: false });
const GalleryGrid = dynamic(() => import("@/app/gallery/components/GalleryGrid"), { ssr: false });

export default function GalleryPage() {
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("gallery").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["gallery"] || {};
  const sections = pageData.sections || {};
  const loading = isLoading["gallery"] ?? true;

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <GalleryHero data={sections["GalleryHero"] || {}} />
        <GalleryGrid data={sections["GalleryGrid"] || {}} />
      </main>
      <Footer />
    </div>
  );
}
