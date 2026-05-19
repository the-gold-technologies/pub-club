"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import PageLoader from "@/components/layout/PageLoader";
import { useCMSStore } from "@/store/useCMSStore";

// Lazy-loaded dynamic components
const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});
const ContactHero = dynamic(
  () => import("@/app/contact/components/ContactHero"),
  { ssr: false },
);
const ContactInfo = dynamic(
  () => import("@/app/contact/components/ContactInfo"),
  { ssr: false },
);

export default function ContactPage() {
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("contact").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["contact"] || {};
  const sections = pageData.sections || {};
  const loading = isLoading["contact"] ?? true;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />
      <ContactHero data={sections["ContactHero"] || {}} />
      <ContactInfo data={sections["ContactInfo"] || {}} />
      <Footer />
    </div>
  );
}
