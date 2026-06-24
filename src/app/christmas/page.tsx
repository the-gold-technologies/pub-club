"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PageLoader from "@/components/layout/PageLoader";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Download,
  Phone,
  Mail,
  Award,
  Flame,
  GlassWater,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});
const ThreeDChristmasTree = dynamic(
  () => import("@/components/sections/ThreeDChristmasTree"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] sm:min-h-[500px]" />
    ),
  },
);

gsap.registerPlugin(ScrollTrigger);

// Custom Christmas Vector Icons
const SleighIcon = () => (
  <svg
    className="w-4 h-4 text-[#B91C1C] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10c0-2.5 2-4.5 4.5-4.5H15c2.5 0 4.5 2 4.5 4.5v2c0 2-1.5 3.5-3.5 3.5H5.5C3.5 15.5 2 14 2 12v-2z M2 15.5h20 M4 15.5v3a2 2 0 002 2h12a2 2 0 002-2v-3"
    />
  </svg>
);

const ReindeerIcon = () => (
  <svg
    className="w-4 h-4 text-[#B91C1C] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v6 M12 6l-3-3 M12 8l-2-2 M12 6l3-3 M12 8l2-2 M12 10c0 3 2 5 5 5h2 M12 10c0 3-2 5-5 5H7 M9 15v5 M15 15v5"
    />
  </svg>
);

const SantaHatIcon = () => (
  <svg
    className="w-4 h-4 text-red-500 inline-block shrink-0 animate-bounce"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
    style={{ animationDuration: "3s" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3a2 2 0 100 4 2 2 0 000-4z M12 7c-3.5 0-7 3-7 7v1c0 1 1 2 2 2h10c1 0 2-1 2-2v-1c0-4-3.5-7-7-7z M4 18h16a2 2 0 012 2v1H2v-1a2 2 0 012-2z"
    />
  </svg>
);

const HollyIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-600 inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12c-2-2-4-1-6 0 1 2 3 3 6 0z M12 12c2-2 4-1 6 0-1 2-3 3-6 0z M12 12c-1 3-3 4-4 6 2-1 3-3 4-6z M12 12c1 3 3 4 4 6-2-1-3-3-4-6z M12 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

const GiftIcon = () => (
  <svg
    className="w-5 h-5 text-[#B91C1C] inline-block shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 12v8H4v-8M22 7H2v5h20V7z M12 7V4a2 2 0 00-2-2H8a2 2 0 00-2 2v3 M12 7V4a2 2 0 012-2h2a2 2 0 012 2v3 M12 22V7"
    />
  </svg>
);

// Canvas-based interactive falling snow effect
const SnowEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const numFlakes = 80;
    const flakes = Array.from({ length: numFlakes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 0.8,
      vy: Math.random() * 1.2 + 0.4,
      vx: Math.random() * 0.8 - 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      for (let i = 0; i < numFlakes; i++) {
        const f = flakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);

        f.y += f.vy;
        f.x += f.vx;

        if (f.y > height) {
          flakes[i] = {
            x: Math.random() * width,
            y: -10,
            r: f.r,
            vy: f.vy,
            vx: f.vx,
          };
        }
        if (f.x > width) {
          f.x = 0;
        } else if (f.x < 0) {
          f.x = width;
        }
      }
      ctx.fill();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 w-full h-full"
    />
  );
};

// Hanging Ornament Parts
const ReindeerOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <ellipse
      cx="15"
      cy="20"
      rx="10"
      ry="7"
      fill="#8B5A2B"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="15" cy="22" r="3" fill="#B91C1C" />
    <circle cx="11" cy="18" r="1.2" fill="#FFFFFF" />
    <circle cx="19" cy="18" r="1.2" fill="#FFFFFF" />
    <path
      d="M7 14 Q3 5 9 8 M7 11 Q1 9 5 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M23 14 Q27 5 21 8 M23 11 Q29 9 25 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

const SantaHatOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#B91C1C] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M5 22 L15 5 L25 22 Z"
      fill="#B91C1C"
      stroke="#D4AF37"
      strokeWidth="1.5"
    />
    <rect
      x="3"
      y="21"
      width="24"
      height="4"
      fill="#FFFFFF"
      rx="1"
      stroke="#D4AF37"
      strokeWidth="1"
    />
    <circle
      cx="15"
      cy="4"
      r="3"
      fill="#FFFFFF"
      stroke="#D4AF37"
      strokeWidth="1"
    />
  </g>
);

const SnowmanOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <circle
      cx="15"
      cy="10"
      r="7"
      fill="#FFFFFF"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="15"
      cy="24"
      r="10"
      fill="#FFFFFF"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M10 16 L20 16"
      stroke="#B91C1C"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect x="10" y="0" width="10" height="4" fill="#1A1A1A" />
    <line x1="7" y1="4" x2="23" y2="4" stroke="#1A1A1A" strokeWidth="1.5" />
  </g>
);

const StarOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M15 2 L18 10 L27 10 L20 15 L23 23 L15 18 L7 23 L10 15 L3 10 L12 10 Z"
      fill="#D4AF37"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </g>
);

const BellOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#D4AF37] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M10 8 Q15 2 20 8 Q23 15 24 20 L6 20 Q7 15 10 8 Z"
      fill="#D4AF37"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="4"
      y="19"
      width="22"
      height="3"
      fill="#D4AF37"
      rx="1"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="15" cy="23" r="2.5" fill="#B91C1C" />
  </g>
);

const CandyCaneOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#B91C1C] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M10 25 L10 10 A5 5 0 0 1 20 10 L20 13"
      fill="none"
      stroke="#B91C1C"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M10 25 L10 10 A5 5 0 0 1 20 10 L20 13"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeDasharray="3 3"
    />
  </g>
);

const StockingOrnament = ({ x, y }: { x: number; y: number }) => (
  <g
    transform={`translate(${x - 15}, ${y})`}
    className="text-[#B91C1C] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
  >
    <line
      x1="15"
      y1="-120"
      x2="15"
      y2="0"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M10 6 L18 6 L18 16 L24 22 L17 25 L9 18 Z"
      fill="#B91C1C"
      stroke="#D4AF37"
      strokeWidth="1.5"
    />
    <rect
      x="8"
      y="4"
      width="12"
      height="4"
      rx="1"
      fill="#FFFFFF"
      stroke="#D4AF37"
      strokeWidth="1"
    />
  </g>
);

// Interactive 3D Parallax Stacked Christmas Tree Component
const Christmas3DTree = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * 20;

    gsap.to(container, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[360px] aspect-[4/5] flex items-center justify-center cursor-pointer py-12"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        {/* Layer 0: Ground/Glow Shadow */}
        <div
          className="absolute bottom-10 w-48 h-8 rounded-full bg-red-600/20 blur-xl filter"
          style={{ transform: "translateZ(-40px) rotateX(90deg)" }}
        />

        {/* Layer 1: Golden Star on Top */}
        <div
          className="w-16 h-16 text-[#D4AF37] mb-2 animate-bounce"
          style={{ transform: "translateZ(80px)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
          </svg>
        </div>

        {/* Layer 2: Top green tier */}
        <div
          className="w-24 h-20 bg-gradient-to-b from-[#1E3F20] to-[#15803D] border border-white/20 shadow-lg"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "translateZ(60px) translateY(-10px)",
            backdropFilter: "blur(4px)",
          }}
        />

        {/* Layer 3: Middle green tier */}
        <div
          className="w-40 h-28 bg-gradient-to-b from-[#1E3F20]/90 to-[#15803D]/90 border border-white/20 shadow-xl -mt-6"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "translateZ(40px) translateY(-5px)",
            backdropFilter: "blur(4px)",
          }}
        />

        {/* Layer 4: Bottom green tier */}
        <div
          className="w-56 h-36 bg-gradient-to-b from-[#1E3F20]/80 to-[#15803D]/80 border border-white/20 shadow-2xl -mt-10"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "translateZ(20px) translateY(0px)",
            backdropFilter: "blur(4px)",
          }}
        />

        {/* Layer 5: Trunk */}
        <div
          className="w-12 h-14 bg-gradient-to-b from-amber-800 to-amber-950 border border-white/10 shadow-inner -mt-1"
          style={{
            transform: "translateZ(10px) translateY(5px)",
          }}
        />

        {/* Floating 3D Ornaments / Balls */}
        <div
          className="absolute w-5 h-5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
          style={{
            transform: "translateZ(90px) translateX(-20px) translateY(-20px)",
          }}
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
          style={{
            transform: "translateZ(70px) translateX(30px) translateY(20px)",
          }}
        />
        <div
          className="absolute w-6 h-6 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
          style={{
            transform: "translateZ(50px) translateX(-45px) translateY(50px)",
          }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
          style={{
            transform: "translateZ(30px) translateX(55px) translateY(80px)",
          }}
        />
      </div>
    </div>
  );
};

// Hanging Christmas Ornaments Components
const HangingOrnamentsHero = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <ReindeerOrnament x={15} y={60} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <SantaHatOrnament x={15} y={45} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <SnowmanOrnament x={15} y={70} />
    </svg>
  </div>
);

const HangingOrnamentsFeatures = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <StarOrnament x={15} y={65} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <BellOrnament x={15} y={50} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <CandyCaneOrnament x={15} y={75} />
    </svg>
  </div>
);

const HangingOrnamentsMenus = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <StockingOrnament x={15} y={60} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <StarOrnament x={15} y={45} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <ReindeerOrnament x={15} y={70} />
    </svg>
  </div>
);

const HangingOrnamentsTransition = () => (
  <div className="absolute top-0 right-10 left-10 z-30 pointer-events-none flex justify-between opacity-80 h-36">
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <SnowmanOrnament x={15} y={65} />
    </svg>
    <svg
      className="w-16 h-full hidden sm:block"
      viewBox="0 0 30 120"
      fill="none"
    >
      <BellOrnament x={15} y={50} />
    </svg>
    <svg className="w-16 h-full" viewBox="0 0 30 120" fill="none">
      <SantaHatOrnament x={15} y={75} />
    </svg>
  </div>
);

// Interactive Snowman Component
const Snowman = () => (
  <svg
    className="w-20 h-28 text-slate-100 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] inline-block shrink-0 animate-bounce"
    fill="currentColor"
    viewBox="0 0 60 80"
    style={{ animationDuration: "4s" }}
  >
    {/* Hat */}
    <rect x="20" y="2" width="20" height="12" fill="#1A1A1A" rx="1" />
    <ellipse cx="30" cy="14" rx="16" ry="3" fill="#1A1A1A" />
    {/* Head */}
    <circle
      cx="30"
      cy="28"
      r="11"
      fill="#FFFFFF"
      stroke="#E2E8F0"
      strokeWidth="1.5"
    />
    {/* Eyes */}
    <circle cx="26" cy="26" r="1.5" fill="#1A1A1A" />
    <circle cx="34" cy="26" r="1.5" fill="#1A1A1A" />
    {/* Nose (Carrot) */}
    <polygon points="30,28 39,30 30,32" fill="#F97316" />
    {/* Smile */}
    <circle cx="26" cy="33" r="0.8" fill="#1A1A1A" />
    <circle cx="28" cy="34" r="0.8" fill="#1A1A1A" />
    <circle cx="30" cy="35" r="0.8" fill="#1A1A1A" />
    <circle cx="32" cy="34" r="0.8" fill="#1A1A1A" />
    <circle cx="34" cy="33" r="0.8" fill="#1A1A1A" />
    {/* Scarf */}
    <path d="M20 37 Q30 42 40 37 L38 41 Q30 46 22 41 Z" fill="#B91C1C" />
    <path d="M33 39 L35 50 L30 49 L30 39" fill="#B91C1C" />
    {/* Body */}
    <circle
      cx="30"
      cy="54"
      r="17"
      fill="#FFFFFF"
      stroke="#E2E8F0"
      strokeWidth="1.5"
    />
    {/* Buttons */}
    <circle cx="30" cy="46" r="2" fill="#1A1A1A" />
    <circle cx="30" cy="54" r="2" fill="#1A1A1A" />
    <circle cx="30" cy="62" r="2" fill="#1A1A1A" />
    {/* Sticks (Arms) */}
    <line
      x1="14"
      y1="46"
      x2="3"
      y2="40"
      stroke="#78350F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="46"
      y1="46"
      x2="57"
      y2="40"
      stroke="#78350F"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const menus = [
  {
    title: "Festive Party Menu",
    subtitle: "Corporate Events & Gatherings",
    description:
      "Our Festive Menu Is Here! Book Your Table and Enjoy Holiday Favorites! Don’t forget if you book your Christmas Party before the end of October 2025 you will receive a £20 voucher to use towards your booking. Minimum of 8 people dining and booking made before end of October 2025.",
    link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Festive-Christmas-Menu.pdf",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-celebration-2.webp",
    highlights: [
      "Smoked Salmon Starter",
      "Traditional Roast Turkey",
      "Spiced Plum Pudding",
    ],
  },
  {
    title: "Christmas Day Menu",
    subtitle: "The Main Event on December 25th",
    description:
      "Indulge in our Special Christmas Menu: From Turkey to Truffles! Why Cook on Christmas Day when we can do it for you? Book your Christmas Lunch with us here at Seven Stars instead.",
    link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Christmas-Day-Menu.pdf",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/25-dec.webp",
    highlights: [
      "Pan-Seared Scallops",
      "Aged Beef Wellington",
      "Decadent Chocolate Delice",
    ],
  },
  {
    title: "Children's Festive Menu",
    subtitle: "Special Treats for Younger Guests",
    description:
      "To make Christmas extra special for families, we’ve prepared a dedicated children’s menu — light, delicious, and perfect for younger guests.",
    link: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/Childrens-Christmas-Menu-2.pdf",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/children-christmas.webp",
    highlights: [
      "Mini Roast Turkey Dinner",
      "Festive Mac & Cheese",
      "Ice Cream Sundae",
    ],
  },
];

const dishes = [
  {
    name: "Festive Starters",
    tagline: "Begin the Celebration",
    description:
      "A selection of beautiful, chef-prepared seasonal appetizers to kick off your Christmas meal.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish1.webp",
  },
  {
    name: "Traditional Mains",
    tagline: "The Heart of Christmas",
    description:
      "Hearty, classic holiday main courses prepared using the finest locally sourced ingredients.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish2.webp",
  },
  {
    name: "Decadent Desserts",
    tagline: "A Sweet Finale",
    description:
      "Indulgent treats and festive showstoppers to end your celebration on a sweet note.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish3.webp",
  },
  {
    name: "Festive Canapés",
    tagline: "Perfect for Parties",
    description:
      "Bite-sized delights crafted to complement your festive drinks and social gatherings.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish4.webp",
  },
  {
    name: "Gourmet Selections",
    tagline: "Chef's Handcrafted Specialties",
    description:
      "Unique, seasonal creations highlighting the best of winter game and local produce.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish5.webp",
  },
  {
    name: "Festive Roast Sides",
    tagline: "The Perfect Accompaniments",
    description:
      "Crispy roast potatoes, honey-glazed root veg, and all the classic trimmings.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish6.webp",
  },
  {
    name: "Artisan Cheeseboard",
    tagline: "Savory Indulgence",
    description:
      "A curated selection of British cheeses served with crackers, seasonal chutney, and grapes.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish7.webp",
  },
  {
    name: "Holiday Treats",
    tagline: "Festive Sweet Treats",
    description:
      "Homemade mince pies, truffles, and warm festive cookies served alongside your coffee.",
    image:
      "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish8.webp",
  },
];

export default function ChristmasPage() {
  const [loading, setLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const santaRef = useRef<HTMLDivElement>(null);

  // Audio setup effect
  useEffect(() => {
    const audio = new Audio("/christmas-tune.mp3");
    audio.loop = true;
    audio.volume = 0.35; // Soft ambient volume
    audioRef.current = audio;

    const playAudio = () => {
      audio.play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch(() => {
          const startPlayOnInteract = () => {
            audio.play()
              .then(() => {
                setIsAudioPlaying(true);
              })
              .catch(err => console.log("Autoplay failed after interaction:", err));
            window.removeEventListener("click", startPlayOnInteract);
            window.removeEventListener("touchstart", startPlayOnInteract);
          };
          window.addEventListener("click", startPlayOnInteract);
          window.addEventListener("touchstart", startPlayOnInteract);
        });
    };

    const audioTimer = setTimeout(playAudio, 1000);

    return () => {
      clearTimeout(audioTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch(err => console.log("Play failed:", err));
    }
  };

  // Carousel State for Dishes
  const [activeDishIdx, setActiveDishIdx] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const dishContentRef = useRef<HTMLDivElement>(null);
  const slideDirectionRef = useRef<"next" | "prev">("next");

  // Tab State for Menus
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  // Autoplay effect for dishes carousel
  useEffect(() => {
    if (loading || isAutoplayPaused) return;

    const interval = setInterval(() => {
      slideDirectionRef.current = "next";
      const nextIdx = (activeDishIdx + 1) % dishes.length;
      // Animate out first, then set index
      if (dishContentRef.current) {
        gsap.to(dishContentRef.current, {
          opacity: 0,
          x: -35,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setActiveDishIdx(nextIdx);
          },
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activeDishIdx, loading, isAutoplayPaused]);

  const handleMenuTabChange = (idx: number) => {
    if (idx === activeMenuTab || !menuContentRef.current) return;

    // Animate out
    gsap.to(menuContentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveMenuTab(idx);
      },
    });
  };

  const handleDishChange = (newIdx: number) => {
    if (newIdx === activeDishIdx || !dishContentRef.current) return;

    // Determine direction based on index diff
    if (newIdx > activeDishIdx) {
      slideDirectionRef.current = "next";
    } else {
      slideDirectionRef.current = "prev";
    }

    const outX = slideDirectionRef.current === "next" ? -35 : 35;

    // Animate out
    gsap.to(dishContentRef.current, {
      opacity: 0,
      x: outX,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveDishIdx(newIdx);
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const updateIndicator = () => {
      if (!tabsRef.current || !indicatorRef.current) return;
      const activeTabEl = tabsRef.current.children[
        activeMenuTab + 1
      ] as HTMLElement; // +1 to account for the absolute span at index 0
      if (activeTabEl) {
        gsap.to(indicatorRef.current, {
          left: activeTabEl.offsetLeft,
          width: activeTabEl.offsetWidth,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    // Quick delay to ensure initial element layout is calculated properly
    const layoutTimer = setTimeout(updateIndicator, 50);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(layoutTimer);
    };
  }, [activeMenuTab, loading]);

  // Animate Menu Tab details in
  useEffect(() => {
    if (loading || !menuContentRef.current) return;

    gsap.fromTo(
      menuContentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeMenuTab, loading]);

  // Animate Dish details in (slides right-to-left or left-to-right)
  useEffect(() => {
    if (loading || !dishContentRef.current) return;

    const inX = slideDirectionRef.current === "next" ? 35 : -35;

    gsap.fromTo(
      dishContentRef.current,
      { opacity: 0, x: inX },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeDishIdx, loading]);

  useEffect(() => {
    if (loading) return;

    // Initialize smooth scrolling using Lenis locally on this page
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize GSAP ticker frame updates with Lenis
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Parallax Background for Hero
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Parallax effect on Santa image
      if (santaRef.current && heroRef.current) {
        gsap.to(santaRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero Animations
      gsap.fromTo(
        ".christmas-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".christmas-hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 },
      );
      gsap.fromTo(
        ".christmas-hero-cta",
        {
          opacity: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.7,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.7,
        },
      );

      // Section reveal animations
      const revealElements = gsap.utils.toArray(".reveal-section");
      revealElements.forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, [loading]);

  const nextDish = () => {
    const nextIdx = (activeDishIdx + 1) % dishes.length;
    handleDishChange(nextIdx);
  };

  const prevDish = () => {
    const prevIdx = (activeDishIdx - 1 + dishes.length) % dishes.length;
    handleDishChange(prevIdx);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#faf9f6] text-neutral-800 overflow-x-hidden relative"
    >
      <PageLoader isLoading={loading} />
      <SnowEffect />
      <Navbar />

      {/* SECTION 1: HERO SECTION - Custom Full-Backdrop split layout */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0A192F] py-16 sm:py-24"
      >
        {/* Hanging Ornaments */}
        <HangingOrnamentsHero />

        {/* Background Image */}
        <div ref={heroBgRef} className="absolute inset-0 z-0">
          <Image
            src="/christmas-hero.png"
            alt="Cozy Christmas interior at Seven Stars"
            fill
            className="object-cover object-center opacity-90"
            priority
          />
          {/* Layer of brand color tint overlay on top of background image */}
          <div className="absolute inset-0 bg-[#0A192F]/50 mix-blend-multiply z-10" />
          {/* Readability Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/70 via-transparent to-[#0A192F]/90 z-10" />
        </div>

        {/* Content Layer floating on top */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text and CTAs */}
            <div className="lg:col-span-7 space-y-6 lg:text-left text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#E6C653] w-fit lg:mx-0 mx-auto animate-pulse">
                <span>❄</span> Festive Season 2026
              </div>

              <h1 className="christmas-hero-title text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Celebrate
                <span className="italic font-light text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                  {" "}
                  Christmas{" "}
                </span>{" "}
                <br />
                at Seven Stars
              </h1>

              <div className="w-16 h-px bg-white/20 lg:mx-0 mx-auto" />

              <p className="christmas-hero-desc text-base sm:text-lg text-slate-300 font-serif font-light leading-relaxed max-w-lg lg:mx-0 mx-auto">
                Step into the warmth of our decorated countryside pub in Marsh
                Baldon, Oxford. Savor award-winning festive menus, cozy up next
                to glowing fireplaces, and celebrate the season in style.
              </p>

              <div className="christmas-hero-cta flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                <a
                  href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#B91C1C] hover:bg-[#990000] text-white uppercase tracking-widest text-xs font-bold rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.4)] hover:shadow-xl text-center"
                >
                  Reserve Your Table
                </a>
                <a
                  href="#menus"
                  className="px-8 py-4 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/10 uppercase tracking-widest text-xs font-bold rounded-full transition-all text-center"
                >
                  Discover Menus
                </a>
              </div>
            </div>

            {/* Right Column: Santa Claus Standalone Picture with Floating Glowing Snow Star */}
            <div
              ref={santaRef}
              className="lg:col-span-5 flex justify-center lg:justify-end relative py-8"
            >
              {/* Single glowing snow star (snowflake) next to Santa */}
              <div className="absolute top-[10%] right-[-5%] z-30 text-white/90 animate-pulse pointer-events-none">
                <Snowflake className="w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>

              {/* Fully Interactive 3D WebGL Christmas Tree Model (Fitted & Borderless) */}
              <div className="relative w-full max-w-[410px] aspect-[3/4.2] flex items-center justify-center z-20">
                <ThreeDChristmasTree />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative snowflakes and lines at the bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center gap-2 px-8 opacity-60">
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
            <div className="h-[1px] bg-white/10 flex-grow" />
            <div className="flex gap-3 text-[#D4AF37] items-center">
              <Snowflake
                className="w-3.5 h-3.5 animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <Snowflake className="w-4 h-4 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.35em] font-serif font-light text-white/80">
                Seven Stars Christmas
              </span>
              <Snowflake className="w-4 h-4 animate-pulse" />
              <Snowflake
                className="w-3.5 h-3.5 animate-spin"
                style={{ animationDuration: "20s" }}
              />
            </div>
            <div className="h-[1px] bg-white/10 flex-grow" />
          </div>
        </div>
      </section>

      {/* SECTION 2A: INTRO & WHY CHOOSE US (Light background) */}
      <section className="reveal-section py-24 bg-[#FDFBF7] border-b border-black/5 relative overflow-hidden">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Intro Copy */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase font-bold flex items-center gap-2">
                Warmth & Festive Cheer <ReindeerIcon />
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
                Celebrate Christmas at <br />
                <span className="italic font-light text-[#B91C1C]">
                  Seven Stars in Marsh Baldon!
                </span>
              </h2>
              <div className="w-16 h-[1px] bg-[#B91C1C] opacity-50" />

              <p className="text-lg text-neutral-600 leading-relaxed font-serif font-light">
                Are you looking for the perfect place to celebrate Christmas
                with your loved ones? Seven Stars located in Marsh Baldon,
                Oxford, is here to make your Christmas Day magical!
              </p>

              <div className="space-y-4 pt-4">
                <h3 className="text-sm tracking-wider uppercase font-bold text-[#B91C1C] flex items-center gap-2">
                  <HollyIcon /> Why Choose Seven Stars:
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600 font-serif font-light">
                  <li className="flex gap-3 items-start">
                    <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                    <span>
                      Cosy Pub with beautiful Christmas décor, spreading warmth
                      and festive cheer.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                    <span>
                      Savor festive Christmas dishes prepared by our chefs for
                      the occasion.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-[#B91C1C] font-bold mt-0.5">✓</span>
                    <span>
                      Our Pub serves wine, cocktails, and seasonal drinks to
                      enhance Christmas joy.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Santa Claus Image Showcase */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
              <Image
                src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-santaclaus.webp"
                alt="Santa Claus at Seven Stars"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[4000ms] ease-out"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2B: SPECIAL FEATURES & INCENTIVES (Dark background for color breakage) */}
      <section className="reveal-section py-20 bg-[#0a192f] text-white border-y border-white/5 relative overflow-hidden">
        <HangingOrnamentsFeatures />
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(185,28,28,0.2),transparent_60%)]" />
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Special features */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold flex items-center gap-2">
                Exclusive Experiences <GiftIcon />
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white leading-tight">
                Special Christmas <br />
                <span className="italic font-light text-[#D4AF37]">
                  Party Features
                </span>
              </h2>
              <div className="w-12 h-[1px] bg-[#D4AF37] opacity-50" />

              <ul className="space-y-4 text-base text-slate-300 font-serif font-light pt-2">
                <li className="flex gap-3 items-start">
                  <span className="text-[#D4AF37] font-bold mt-0.5">★</span>
                  <span>
                    Special Seating arrangements tailored for families and group
                    bookings.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#D4AF37] font-bold mt-0.5">★</span>
                  <span>
                    Elegant options for Private Celebrations and large
                    corporate/friend gatherings.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#D4AF37] font-bold mt-0.5">★</span>
                  <span>
                    Book Before October to secure a £20 Voucher reward.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column: Early Booking Card & CTA */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6 shadow-xl">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-[#B91C1C]/20 text-[#FFAAAA] border border-[#B91C1C]/30 text-[10px] font-bold uppercase tracking-widest">
                  Early Booking Reward
                </div>
                <h3 className="text-xl font-serif text-white">
                  Secure a{" "}
                  <span className="text-[#D4AF37] italic font-semibold">
                    £20 Voucher
                  </span>
                </h3>
                <p
                  className="text-sm text-slate-300 font-serif font-light leading-relaxed"
                  style={{ color: "#cbd5e1" }}
                >
                  Book your party of 8 or more before the end of October to
                  receive a thank-you voucher redeemable in the New Year.
                </p>
                <div
                  className="text-[10px] text-slate-400 italic"
                  style={{ color: "#94a3b8" }}
                >
                  *Terms & Conditions apply.
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <p
                  className="text-xs text-slate-400 font-serif font-light"
                  style={{ color: "#94a3b8" }}
                >
                  Tables are filling fast – don&apos;t miss your chance to make
                  this Christmas unforgettable!
                </p>
                <a
                  href="https://sevenstarsatmarshbaldon.co.uk/book-a-table/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-[#B91C1C] hover:bg-[#990000] uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.3)] hover:shadow-lg text-center"
                >
                  Book your Christmas Party Now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FESTIVE MENUS SHOWCASE (Tabbed View with Food Imagery) */}
      <section
        id="menus"
        className="reveal-section py-24 bg-[#faf9f6] relative overflow-hidden"
      >
        <HangingOrnamentsMenus />
        {/* Large Christmas Bell Outline on the left (Top) */}
        <div className="absolute left-[-50px] lg:left-4 top-2 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M50 30C45 20 30 20 38 32C42 38 48 34 50 34C52 34 58 38 62 32C70 20 55 20 50 30Z" />
            <circle cx="50" cy="32" r="3" fill="currentColor" />
            <path d="M47 34C40 42 35 55 38 60" />
            <path d="M53 34C60 42 65 55 62 60" />
            <path d="M50 34C40 34 34 44 34 56C34 68 24 74 24 74H76C76 74 66 68 66 56C66 44 60 34 50 34Z" />
            <circle cx="50" cy="78" r="5" fill="currentColor" />
            <path d="M26 71C35 73 65 73 74 71" />
          </svg>
        </div>

        {/* Large Snowman Outline on the right (Bottom) */}
        <div className="absolute right-[-50px] lg:right-4 bottom-12 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            {/* Top hat */}
            <rect x="38" y="10" width="24" height="12" fill="none" />
            <line x1="30" y1="22" x2="70" y2="22" />

            {/* Head */}
            <circle cx="50" cy="35" r="12" fill="none" />
            {/* Eyes */}
            <circle cx="46" cy="33" r="1.2" fill="currentColor" />
            <circle cx="54" cy="33" r="1.2" fill="currentColor" />
            {/* Nose */}
            <polygon points="50,35 59,37 50,39" fill="currentColor" />

            {/* Scarf */}
            <path d="M40 45 Q50 49 60 45" />
            <path d="M53 47 L55 58 L50 57 L49 47" />

            {/* Body */}
            <circle cx="50" cy="67" r="20" fill="none" />
            {/* Buttons */}
            <circle cx="50" cy="57" r="1.5" fill="currentColor" />
            <circle cx="50" cy="67" r="1.5" fill="currentColor" />
            <circle cx="50" cy="77" r="1.5" fill="currentColor" />

            {/* Arms */}
            <line x1="31" y1="60" x2="16" y2="52" />
            <line x1="69" y1="60" x2="84" y2="52" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase font-bold block">
              Culinary Delights
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900">
              Download Our{" "}
              <span className="italic font-light text-[#B91C1C]">
                Festive Menus
              </span>
            </h2>
            <div className="w-12 h-[1px] bg-[#B91C1C] opacity-50 mx-auto mt-4" />
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center border-b border-black/5 mb-12">
            <div
              ref={tabsRef}
              className="flex gap-4 sm:gap-8 overflow-x-auto pb-px relative"
            >
              {/* Sliding Indicator */}
              <span
                ref={indicatorRef}
                className="absolute bottom-0 h-[2px] bg-[#D4AF37] rounded-full z-10 pointer-events-none"
                style={{ left: 0, width: 0 }}
              />
              {menus.map((menu, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMenuTabChange(idx)}
                  className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap cursor-pointer relative flex items-center gap-2 ${
                    activeMenuTab === idx
                      ? "text-[#B91C1C] font-extrabold"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {idx === 0 && <SleighIcon />}
                  {idx === 1 && <ReindeerIcon />}
                  {idx === 2 && <SantaHatIcon />}
                  {menu.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content panel */}
          <div className="bg-[#FDFBF7] border border-black/5 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            {/* Natural paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div
              ref={menuContentRef}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
            >
              {/* Menu Details */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] uppercase font-bold text-[#B91C1C] tracking-widest flex items-center gap-2">
                  {activeMenuTab === 0 && <SleighIcon />}
                  {activeMenuTab === 1 && <ReindeerIcon />}
                  {activeMenuTab === 2 && <SantaHatIcon />}
                  {menus[activeMenuTab].subtitle}
                </span>
                <h3 className="text-3xl font-serif text-neutral-950">
                  {menus[activeMenuTab].title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-serif font-light">
                  {menus[activeMenuTab].description}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Menu Highlights Include:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700 font-serif font-light">
                    {menus[activeMenuTab].highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] opacity-70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href={menus[activeMenuTab].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B91C1C] hover:bg-[#990000] text-white uppercase tracking-widest text-[10px] font-bold rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.2)]"
                  >
                    <Download size={14} /> Download PDF Menu <SleighIcon />
                  </a>
                </div>
              </div>

              {/* Menu Cover Image */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[300px] sm:h-[350px] shadow-md">
                <Image
                  src={menus[activeMenuTab].image}
                  alt={menus[activeMenuTab].title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2C: TRANSITION BANNER (Make This Christmas Unforgettable - Dark Theme) */}
      <section className="reveal-section py-24 bg-[#0A192F] text-white relative overflow-hidden">
        <HangingOrnamentsTransition />
        {/* Soft decorative floating snowflakes and borders */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-white rounded-full translate-x-1/2 translate-y-1/2" />
          <div
            className="absolute top-1/4 right-12 animate-pulse"
            style={{ animationDuration: "6s" }}
          >
            <Snowflake className="w-20 h-20 text-white" />
          </div>
          <div
            className="absolute bottom-1/4 left-12 animate-pulse"
            style={{ animationDuration: "8s" }}
          >
            <Snowflake className="w-16 h-16 text-white" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mb-2">
            <HollyIcon />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white leading-tight">
            Make This Christmas <br className="sm:hidden" />
            <span className="italic font-light text-[#D4AF37]">
              Unforgettable at Seven Stars
            </span>
          </h2>
          <div className="w-20 h-[1px] bg-white/40 mx-auto" />
          <p className="text-lg sm:text-xl text-white/95 font-serif font-light leading-relaxed max-w-3xl mx-auto">
            Step into the festive spirit at our cosy pub in Marsh Baldon,
            Oxford. Whether you’re planning an intimate family lunch or a lively
            Christmas party with friends, Seven Stars is the perfect place to
            celebrate. With glowing décor, hearty festive dishes, and seasonal
            drinks, we’ll make sure your Christmas gathering is full of warmth,
            laughter, and cheer.
          </p>
        </div>
      </section>

      {/* SECTION 5: SPECIAL DISHES CAROUSEL */}
      <section className="reveal-section py-24 bg-[#FDFBF7] border-t border-black/5 relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        {/* Large Christmas Tree Outline on the right */}
        <div className="absolute right-[-40px] lg:right-6 top-8 w-[340px] h-[340px] opacity-[0.08] text-[#1E3F20] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            {/* Star on top */}
            <path
              d="M50 5 L52 11 L58 11 L53 14 L55 20 L50 16 L45 20 L47 14 L42 11 L48 11 Z"
              fill="currentColor"
            />
            {/* Tree branches */}
            <path d="M50 16 L35 36 L42 36 L25 56 L35 56 L15 76 L85 76 L65 56 L75 56 L58 36 L65 36 Z" />
            {/* Trunk */}
            <rect x="46" y="76" width="8" height="12" />
            {/* Details/Decorations */}
            <circle cx="50" cy="30" r="1.5" fill="currentColor" />
            <circle cx="43" cy="45" r="1.5" fill="currentColor" />
            <circle cx="57" cy="45" r="1.5" fill="currentColor" />
            <circle cx="35" cy="65" r="1.5" fill="currentColor" />
            <circle cx="50" cy="60" r="1.5" fill="currentColor" />
            <circle cx="65" cy="65" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Large Christmas Tree Outline on the left (Bottom) */}
        <div className="absolute left-[-40px] lg:left-6 bottom-8 w-[280px] h-[280px] opacity-[0.08] text-[#1E3F20] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M50 10 L38 28 L44 28 L30 46 L38 46 L20 66 L80 66 L62 46 L70 46 L56 28 L62 28 Z" />
            <rect x="47" y="66" width="6" height="10" />
            <circle cx="50" cy="22" r="1.5" fill="currentColor" />
            <circle cx="42" cy="38" r="1.5" fill="currentColor" />
            <circle cx="58" cy="38" r="1.5" fill="currentColor" />
            <circle cx="32" cy="56" r="1.5" fill="currentColor" />
            <circle cx="50" cy="52" r="1.5" fill="currentColor" />
            <circle cx="68" cy="56" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase font-bold block">
                Visual Feast
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900 flex items-center gap-3">
                Our Christmas{" "}
                <span className="italic font-light text-[#B91C1C]">
                  Special Dishes
                </span>
                <HollyIcon />
                <Snowflake
                  className="w-5 h-5 text-[#D4AF37] animate-spin"
                  style={{ animationDuration: "12s" }}
                />
              </h2>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevDish}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all cursor-pointer shadow-sm"
                title="Previous Dish"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextDish}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all cursor-pointer shadow-sm"
                title="Next Dish"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dish Detail Carousel Item */}
          <div
            className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-sm overflow-hidden relative"
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
          >
            <div
              ref={dishContentRef}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Image Side */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] shadow-inner">
                <Image
                  src={dishes[activeDishIdx].image}
                  alt={dishes[activeDishIdx].name}
                  fill
                  className="object-cover transition-opacity duration-500 ease-in-out"
                />
              </div>

              {/* Description Side */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[10px] uppercase font-bold text-[#B91C1C] tracking-widest flex items-center gap-2">
                  {activeDishIdx === 0 && <SleighIcon />}
                  {activeDishIdx === 1 && <ReindeerIcon />}
                  {activeDishIdx === 2 && <SantaHatIcon />}
                  {dishes[activeDishIdx].tagline}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight transition-all duration-300">
                  {dishes[activeDishIdx].name}
                </h3>
                <div className="w-12 h-[1px] bg-[#B91C1C]/30" />
                <p className="text-base text-neutral-600 leading-relaxed font-serif font-light">
                  {dishes[activeDishIdx].description}
                </p>

                {/* Stots/Indicators */}
                <div className="flex gap-2.5 pt-4">
                  {dishes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDishChange(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeDishIdx === idx
                          ? "w-8 bg-[#B91C1C]"
                          : "w-1.5 bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact & Reservatons Block */}
      <section className="reveal-section py-20 bg-[#FDFBF7] border-t border-black/5 relative overflow-hidden">
        {/* Large Christmas Bell Outline on the left (Top) */}
        <div className="absolute left-[-50px] lg:left-4 -top-4 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M50 30C45 20 30 20 38 32C42 38 48 34 50 34C52 34 58 38 62 32C70 20 55 20 50 30Z" />
            <circle cx="50" cy="32" r="3" fill="currentColor" />
            <path d="M47 34C40 42 35 55 38 60" />
            <path d="M53 34C60 42 65 55 62 60" />
            <path d="M50 34C40 34 34 44 34 56C34 68 24 74 24 74H76C76 74 66 68 66 56C66 44 60 34 50 34Z" />
            <circle cx="50" cy="78" r="5" fill="currentColor" />
            <path d="M26 71C35 73 65 73 74 71" />
          </svg>
        </div>

        {/* Large Snowman Outline on the right (Bottom) */}
        <div className="absolute right-[-50px] lg:right-4 -bottom-3 w-[320px] h-[320px] opacity-[0.12] text-[#B91C1C] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            {/* Top hat */}
            <rect x="38" y="10" width="24" height="12" fill="none" />
            <line x1="30" y1="22" x2="70" y2="22" />

            {/* Head */}
            <circle cx="50" cy="35" r="12" fill="none" />
            {/* Eyes */}
            <circle cx="46" cy="33" r="1.2" fill="currentColor" />
            <circle cx="54" cy="33" r="1.2" fill="currentColor" />
            {/* Nose */}
            <polygon points="50,35 59,37 50,39" fill="currentColor" />

            {/* Scarf */}
            <path d="M40 45 Q50 49 60 45" />
            <path d="M53 47 L55 58 L50 57 L49 47" />

            {/* Body */}
            <circle cx="50" cy="67" r="20" fill="none" />
            {/* Buttons */}
            <circle cx="50" cy="57" r="1.5" fill="currentColor" />
            <circle cx="50" cy="67" r="1.5" fill="currentColor" />
            <circle cx="50" cy="77" r="1.5" fill="currentColor" />

            {/* Arms */}
            <line x1="31" y1="60" x2="16" y2="52" />
            <line x1="69" y1="60" x2="84" y2="52" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight leading-none">
            Reserve Your Place at the <br className="hidden sm:inline" />
            <span className="italic font-light text-[#B91C1C]">
              Christmas Table
            </span>
          </h2>
          <p className="text-base text-neutral-500 font-serif font-light max-w-xl mx-auto leading-relaxed">
            Tables fill up very fast during the Christmas season. Reserve your
            lunch or party early to avoid missing out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 text-neutral-700">
            <a
              href="tel:01865343337"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#B91C1C] transition-colors"
            >
              <Phone size={14} className="text-[#B91C1C]" /> 01865 343337
            </a>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <a
              href="mailto:info@sevenstarsatmb.co.uk"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#B91C1C] transition-colors"
            >
              <Mail size={14} className="text-[#B91C1C]" />{" "}
              info@sevenstarsatmb.co.uk
            </a>
          </div>

          <div className="pt-4">
            <a
              href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-[#B91C1C] hover:bg-[#990000] uppercase tracking-widest text-xs font-bold text-white rounded-full transition-all shadow-[0_0_15px_rgba(185,28,28,0.25)] hover:shadow-lg"
            >
              Book Table Online
            </a>
          </div>
        </div>
      </section>

      {/* Floating Music Control Button */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 ${
          isAudioPlaying
            ? "bg-[#B91C1C]/25 border-[#B91C1C]/40 text-red-200 shadow-[0_0_15px_rgba(185,28,28,0.3)] hover:bg-[#B91C1C]/35"
            : "bg-white/10 border-white/20 text-slate-300 hover:bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        }`}
        aria-label={isAudioPlaying ? "Mute Christmas music" : "Play Christmas music"}
      >
        <div className="flex items-end gap-[3px] h-3.5 w-4 overflow-hidden">
          <span
            className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
              isAudioPlaying ? "animate-[soundWave_1.2s_ease-in-out_infinite]" : "h-1"
            }`}
            style={{ animationDelay: "0.1s" }}
          />
          <span
            className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
              isAudioPlaying ? "animate-[soundWave_0.8s_ease-in-out_infinite]" : "h-1.5"
            }`}
            style={{ animationDelay: "0.3s" }}
          />
          <span
            className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
              isAudioPlaying ? "animate-[soundWave_1.0s_ease-in-out_infinite]" : "h-0.5"
            }`}
            style={{ animationDelay: "0.0s" }}
          />
          <span
            className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
              isAudioPlaying ? "animate-[soundWave_0.9s_ease-in-out_infinite]" : "h-2"
            }`}
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <span className="text-[10px] tracking-widest uppercase font-bold select-none">
          {isAudioPlaying ? "Music On" : "Music Off"}
        </span>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `}} />

      <Footer />
    </div>
  );
}
