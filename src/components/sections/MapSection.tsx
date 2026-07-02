"use client";

import React from "react";
import { parseMarkdownLinks } from "@/utils/text";

interface MapSectionProps {
  data?: {
    mapHeading?: string;
    mapDescription?: string;
    mapEmbedUrl?: string;
  };
}

export default function MapSection({ data = {} }: MapSectionProps) {
  const heading = data.mapHeading || "Find Our Location";
  const description = data.mapDescription || "The Seven Stars, The Green, Marsh Baldon, Oxford OX44 9LP";
  const rawUrl = data.mapEmbedUrl;
  
  // Use a query-based maps URL as a fallback because it guarantees placing a red pin at the location
  const embedUrl = (rawUrl && rawUrl.trim().startsWith("http"))
    ? rawUrl.trim()
    : "https://maps.google.com/maps?q=The%20Seven%20Stars%20at%20Marsh%20Baldon,%20Oxford,%20OX44%209LP&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section className="relative w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 tracking-wider mb-3">
            {heading}
          </h2>
          <div className="w-16 h-1 bg-[#475DB1] mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto font-light leading-relaxed">
            {parseMarkdownLinks(description)}
          </p>
        </div>

        <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 bg-white p-2">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full rounded-2xl"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
