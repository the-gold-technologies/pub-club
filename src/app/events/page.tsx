"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import PageLoader from "@/components/layout/PageLoader";
import { useCMSStore } from "@/store/useCMSStore";

// Lazy-loaded dynamic components
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const EventsHero = dynamic(() => import("@/app/events/components/EventsHero"), { ssr: false });
const UpcomingEvents = dynamic(() => import("@/app/events/components/UpcomingEvents"), { ssr: false });
// const EventsArchive = dynamic(() => import("@/app/events/components/EventsArchive"), { ssr: false });
const WhatWeHost = dynamic(() => import("@/app/events/components/WhatWeHost"), { ssr: false });
const EventsCapabilities = dynamic(() => import("@/app/events/components/EventsCapabilities"), { ssr: false });
const InstagramRibbon = dynamic(() => import("@/app/events/components/InstagramRibbon"), { ssr: false });

export default function EventsPage() {
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("events").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["events"] || {};
  const sections = pageData.sections || {};
  const loading = isLoading["events"] ?? true;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <EventsHero data={sections["EventsHero"] || {}} />
        <UpcomingEvents data={sections["UpcomingEvents"] || {}} />
        {/* <EventsArchive data={sections["EventsArchive"] || {}} /> */}
        <WhatWeHost data={sections["WhatWeHost"] || {}} />
        <EventsCapabilities data={sections["EventsCapabilities"] || {}} />
        <InstagramRibbon data={sections["InstagramRibbon"] || {}} />
      </main>
      <Footer />
    </div>
  );
}
