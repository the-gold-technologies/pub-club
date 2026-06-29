"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import PageLoader from "@/components/layout/PageLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Eye, BookOpen } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

gsap.registerPlugin(ScrollTrigger);

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

export default function BlogIndexPage() {
  const { fetchBlogs, blogs } = useCMSStore();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBlogs().finally(() => setLoading(false));
  }, [fetchBlogs]);

  const blogPosts = blogs || [];

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Parallax Background
      if (bgRef.current && heroRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero content reveal stagger
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.2, ease: "power4.out", delay: 0.2 }
      );

      // Stagger fade in of blog cards
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#faf9f6] text-neutral-800 overflow-x-hidden">
      <PageLoader isLoading={loading} />
      <Navbar />

      {/* Hero Section - Matching Dining/Events layout */}
      <section
        ref={heroRef}
        className="relative h-[55vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Background Image with parallax */}
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-celebration-2.webp"
            alt="Seven Stars Dining Room"
            fill
            className="object-cover opacity-50 object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7">
              <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-[#475DB1]" />
                <span className="block text-[#475DB1] uppercase tracking-[0.4em] text-[10px] font-bold">
                  Guides & Articles
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                The Seven Stars <br />
                <span className="italic font-light text-[#475DB1]">
                  Blog
                </span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <div className="hero-reveal border-l border-white/20 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic">
                  Read about local attractions, dining recommendations, seasonal events, and why the Seven Stars is the destination pub of choice near Abingdon, Wallingford, and South Oxfordshire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              className="blog-card relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 block"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={post.featuredImage || "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish1.webp"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              </div>

              {/* Top Left Tag */}
              {post.tag && post.tag.trim() !== "" && (
                <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <span className="text-[11px] text-amber-500 font-bold">★</span>
                  <span className="text-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                    {post.tag}
                  </span>
                </div>
              )}

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white flex flex-col gap-5">
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-serif font-bold leading-snug group-hover:text-[#8fa2f4] transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>

                {/* Info Columns */}
                <div className="grid grid-cols-12 items-center gap-4 border-t border-white/10 pt-4">
                  {/* Excerpt */}
                  <div className="col-span-6 pr-2">
                    <p className="text-[11px] text-slate-300 font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read Time */}
                  <div className="col-span-3 border-l border-white/20 pl-4 flex flex-col">
                    <div className="flex items-center gap-1 text-white">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[12px] font-bold whitespace-nowrap">{post.readTime.split(" ")[0]} min</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                      READ
                    </span>
                  </div>

                  {/* Views */}
                  <div className="col-span-3 border-l border-white/20 pl-4 flex flex-col">
                    <div className="flex items-center gap-1 text-white">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[12px] font-bold">{post.views}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                      VIEWS
                    </span>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-white/10" />

                {/* Author & Date Footer */}
                <div className="flex items-center justify-end text-[11px] text-slate-400">
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
