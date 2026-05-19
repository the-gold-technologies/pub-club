"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import PageLoader from "@/components/layout/PageLoader";
import { useCMSStore } from "@/store/useCMSStore";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});
const MenuHero = dynamic(() => import("@/app/menu/components/MenuHero"), {
  ssr: false,
});
const Menu = dynamic(() => import("@/app/menu/components/Menu"), {
  ssr: false,
});
const MenuCurated = dynamic(() => import("@/app/menu/components/MenuCurated"), {
  ssr: false,
});
const MenuCellar = dynamic(() => import("@/app/menu/components/MenuCellar"), {
  ssr: false,
});
const MenuIntro = dynamic(() => import("@/app/menu/components/MenuIntro"), {
  ssr: false,
});

export default function MenuPage() {
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("menu").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["menu"] || {};
  const sections = pageData.sections || {};
  const loading = isLoading["menu"] ?? true;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />
      <MenuHero data={sections["MenuHero"] || {}} />
      <Menu data={sections["MenuBook"] || {}} />
      <MenuCurated data={sections["MenuCurated"] || {}} />
      <MenuCellar data={sections["MenuCellar"] || {}} />
      <MenuIntro data={sections["MenuIntro"] || {}} />
      <Footer />
    </div>
  );
}
