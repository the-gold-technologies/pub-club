"use client";

import Link from "next/link";
import Image from "next/image";
import { useCMSStore } from "@/store/useCMSStore";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Clock,
  Mail,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultNavLinks = [
  { label: "About Us", href: "/about" },
  { label: "Dining", href: "/dining" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { fetchPage, pages, navLinks } = useCMSStore();

  useEffect(() => {
    fetchPage("home").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["home"];
  const sections = pageData?.sections || {};
  const footerCMS = sections["FooterCMS"] || {};

  const openingHours = Array.isArray(footerCMS.openingHours) ? footerCMS.openingHours : [];

  const displayNavLinks = Array.isArray(navLinks) && navLinks.length > 0
    ? navLinks.map(link => ({ label: link.title, href: link.link }))
    : defaultNavLinks;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top brand block: rises up from below
      gsap.fromTo(
        ".footer-brand",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-brand",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      // CTA: slides in from right
      gsap.fromTo(
        ".footer-cta",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-brand",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      // Grid columns: stagger fade + slide up, each column delayed
      gsap.fromTo(
        ".footer-col",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-col",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      // Bottom bar: fade in last
      gsap.fromTo(
        ".footer-bottom",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 98%",
            toggleActions: "play none none none",
          },
        },
      );

      // Watermark text: slow reveal scale from small
      gsap.fromTo(
        ".footer-watermark",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-watermark",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [pageData]);

  return (
    <footer
      ref={ref}
      className="relative bg-[#0a192f] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.08]">
        {footerCMS.backgroundImage && (
          <Image
            src={footerCMS.backgroundImage}
            alt="Atmospheric Footer Background"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Large watermark word */}
      <div
        className="footer-watermark absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[22rem] font-serif text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter whitespace-nowrap z-0"
      >
        {footerCMS.watermark}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Brand + CTA */}
        <div className="pt-20 pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="footer-brand space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-4xl md:text-5xl tracking-widest text-white font-light">
                {footerCMS.companyName}
              </h2>
            </div>
            <p className="text-primary-200 font-light text-sm italic tracking-widest">
              {footerCMS.tagline}
            </p>
          </div>

          <Link
            href={footerCMS.ctaUrl || "#"}
            className="footer-cta self-start md:self-end flex items-center justify-center px-8 py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-widest text-[12px] font-bold transition-all rounded-full group shadow-lg hover:shadow-primary-600/20"
          >
            <span>{footerCMS.ctaLabel}</span>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10">
          {/* Col 1: About */}
          <div className="footer-col space-y-5">
            <span className="text-[10px] tracking-[0.4em] text-primary-400 uppercase font-medium flex items-center gap-3">
              About
            </span>
            <p className="text-white/90 text-sm font-light leading-relaxed">
              {footerCMS.footerDescription}
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={footerCMS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-primary-300 hover:text-white hover:border-white transition-all"
              >
                <Instagram size={15} />
              </a>
              <a
                href={footerCMS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-primary-300 hover:text-white hover:border-white transition-all"
              >
                <Facebook size={15} />
              </a>
              <a
                href={footerCMS.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-primary-300 hover:text-white hover:border-white transition-all"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col space-y-5">
            <span className="text-[10px] tracking-[0.4em] text-primary-400 uppercase font-medium flex items-center gap-3">
              {footerCMS.navigateTitle || "Navigate"}
            </span>
            <ul className="space-y-3">
              {displayNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href || "#"}
                    className="text-white/90 hover:text-white text-sm font-light transition-colors tracking-wide flex items-center gap-2 group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div className="footer-col space-y-5">
            <span className="text-[10px] tracking-[0.4em] text-primary-400 uppercase font-medium flex items-center gap-3">
              Hours
            </span>
            <ul className="space-y-4">
              {openingHours.map((item: { day: string, hours: string }) => (
                <li key={item.day} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-primary-300/60">
                    {item.day}
                  </span>
                  <span className="text-white font-light text-sm flex items-center gap-2">
                    <Clock size={12} className="text-primary-400" />
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col space-y-5">
            <span className="text-[10px] tracking-[0.4em] text-primary-400 uppercase font-medium flex items-center gap-3">
              Find Us
            </span>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-primary-400 mt-1 shrink-0" />
                <span className="text-white/90 text-sm font-light leading-relaxed">
                  {footerCMS.address && footerCMS.address.split("\n").map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-primary-400 shrink-0" />
                <a
                  href={`tel:${footerCMS.phoneNumber}`}
                  className="text-white/90 hover:text-white text-sm font-light transition-colors"
                >
                  {footerCMS.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-primary-400 shrink-0" />
                <a
                  href={`mailto:${footerCMS.emailAddress}`}
                  className="text-white/90 hover:text-white text-sm font-light transition-colors"
                >
                  {footerCMS.emailAddress}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[10px] text-primary-400/60 uppercase tracking-[0.3em]">
            {`© ${new Date().getFullYear()} ${footerCMS.companyName || "Seven Stars"}. All Rights Reserved.`}
          </p>
          <div className="flex items-center gap-4 text-[10px] text-primary-400/60 uppercase tracking-widest flex-wrap justify-center">
            <span className="text-primary-800">·</span>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-primary-800">·</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[8px] text-[#3F6EA9] text-end -mt-6 mb-4 justify-end">
          Made with <span className="text-red-500 ">♥</span> by{" "}
          <a
            href="https://thegoldtechnologies.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline decoration-white/20 transition-colors"
          >
            TGT
          </a>
        </div>
      </div>
    </footer>
  );
}
