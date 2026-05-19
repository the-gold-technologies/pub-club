"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

interface PageLoaderProps {
  isLoading: boolean;
}

export default function PageLoader({ isLoading }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Premium exit: fade out and slide up beautifully
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false),
      });

      tl.to(".loader-content", {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.inOut",
      }).to(
        ".loader-container",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.2"
      );
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className="loader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white">
      {/* Self-contained styling for infinite rotation spin states */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin-clockwise {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-counterclockwise {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          .spin-cw {
            animation: spin-clockwise 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .spin-ccw {
            animation: spin-counterclockwise 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `
      }} />

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(71,93,177,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="loader-content relative flex flex-col items-center gap-8 z-10">
        {/* Double-ring luxurious rotating spinner */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="spin-cw absolute inset-0 rounded-full border-t border-r border-[#475DB1]" />
          <div className="spin-ccw absolute inset-2 rounded-full border-b border-l border-white/20" />
          <div className="w-2 h-2 rounded-full bg-white opacity-40" />
        </div>

        {/* Brand Text Stagger */}
        <div className="text-center space-y-3 mt-4">
          <h2 className="text-3xl md:text-4xl font-serif tracking-[0.2em] uppercase font-light text-white">
            Seven Stars
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-[1px] bg-[#475DB1] opacity-50" />
            <p className="text-[9px] tracking-[0.4em] text-[#475DB1] uppercase font-black">
              Boutique Club & Gastropub
            </p>
            <div className="w-6 h-[1px] bg-[#475DB1] opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
