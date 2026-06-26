"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { MoveRight, Utensils } from "lucide-react";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFCFA] text-[#0B0F29] overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-28 px-6 relative">
        {/* Fine grid pattern for a high-end menu layout feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        {/* Soft elegant vignette */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#475DB1]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-9 z-10">
          
          {/* Refined Minimalist Table Setting */}
          <div className="relative flex items-center justify-center w-52 h-52 md:w-60 md:h-60 bg-white rounded-full border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-6">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              stroke="#475DB1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-[#475DB1]/80"
            >
              {/* Outer Plate Circle */}
              <circle cx="60" cy="55" r="42" className="stroke-[#475DB1]/20" strokeWidth="1" />
              {/* Inner Plate Edge */}
              <circle cx="60" cy="55" r="34" className="stroke-[#475DB1]" strokeWidth="2" />
              {/* Delicate Plate Rim Detail */}
              <circle cx="60" cy="55" r="26" className="stroke-[#475DB1]/30" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Elegant Fork Illustration (Left Side) */}
              <path d="M14 36 L14 54 M10 36 L18 36 M10 36 L10 44 M18 36 L18 44 M14 54 L14 74" className="stroke-[#475DB1]/50" strokeWidth="1.2" />
              
              {/* Elegant Knife Illustration (Right Side) */}
              <path d="M106 36 L106 52 C106 52, 102 55, 106 74 M106 36 L102 40" className="stroke-[#475DB1]/50" strokeWidth="1.2" />
            </svg>
            
            {/* 404 Number inside Plate - stylized matching website typography */}
            <div className="absolute inset-0 flex items-center justify-center pt-2.5 select-none">
              <span className="font-serif text-4xl md:text-5xl font-light italic tracking-wider text-[#475DB1]">
                404
              </span>
            </div>
          </div>

          {/* Title and Tagline */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-[#475DB1] bg-[#475DB1]/5 px-4 py-2 rounded-full w-fit mx-auto">
              Table for None
            </span>
            <h1 className="font-serif text-4xl md:text-[3.5rem] font-normal text-black leading-tight tracking-tighter">
              This Page is <em className="italic font-light text-[#475DB1]">Not on the Menu</em>
            </h1>
          </div>

          {/* Description */}
          <p className="text-base text-neutral-500 font-light leading-relaxed max-w-md">
            We searched the kitchen, checked the cellar, and looked under every table, but the page you requested is currently out of stock. It might have been a seasonal special that has retired.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto mt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#475DB1] text-white font-medium uppercase tracking-wider text-[11px] hover:bg-[#0B0F29] transition-all shadow-[0_4px_20px_rgba(71,93,177,0.25)] hover:shadow-lg w-full sm:w-auto justify-center group"
            >
              Back to Main Menu
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-neutral-200 text-neutral-600 font-medium uppercase tracking-wider text-[11px] hover:bg-neutral-50 hover:text-black hover:border-neutral-300 transition-all w-full sm:w-auto justify-center"
            >
              Explore Our Food
              <Utensils className="w-3.5 h-3.5 text-[#475DB1]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
