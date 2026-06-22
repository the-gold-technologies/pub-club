"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import PageLoader from "@/components/layout/PageLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Eye, MapPin, Compass, ArrowLeft, Star, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

interface BlogDetailLayoutProps {
  title: string;
  italicHighlight: string;
  tagline: string;
  description: string;
  backgroundImage: string;
  area: string;
  readTime: string;
  date: string;
  views: string;
  distanceInfo: string;
  children: React.ReactNode;
}

const relatedPosts = [
  {
    title: "Celebrate Christmas at Seven Stars",
    excerpt: "Step into the warmth of our decorated countryside pub in Marsh Baldon, Oxford. Savor award-winning festive menus and celebrate the season in style.",
    link: "/christmas",
    image: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-celebration-2.webp",
    area: "Marsh Baldon",
    readTime: "4 min read",
    date: "15 Nov 2026",
    tag: "Festive Season",
    views: "142"
  },
  {
    title: "Looking for the Perfect Pub in Abingdon?",
    excerpt: "Just a short 10-minute drive from Abingdon-on-Thames, the Seven Stars at Marsh Baldon offers the ultimate countryside dining experience.",
    link: "/blog/pub-in-abingdon",
    image: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish1.webp",
    area: "Abingdon",
    readTime: "3 min read",
    date: "22 Jun 2026",
    tag: "Local SEO",
    views: "89"
  },
  {
    title: "The Best Gastro Pub Experience Near Wallingford",
    excerpt: "Discover why food enthusiasts from Wallingford make the short journey to Marsh Baldon for our seasonal dishes and premium drinks selection.",
    link: "/blog/best-pub-in-wallingford",
    image: "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish2.webp",
    area: "Wallingford",
    readTime: "3 min read",
    date: "20 Jun 2026",
    tag: "Dining Guide",
    views: "112"
  }
];

export default function BlogDetailLayout({
  title,
  italicHighlight,
  tagline,
  description,
  backgroundImage,
  area,
  readTime,
  date,
  views,
  distanceInfo,
  children
}: BlogDetailLayoutProps) {
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Parse Headings
  useEffect(() => {
    if (loading || !contentRef.current) return;
    const headingElements = contentRef.current.querySelectorAll("h2, h3");
    const parsedHeadings: { id: string; text: string; level: number }[] = [];

    headingElements.forEach((el, index) => {
      let id = el.id;
      if (!id) {
        id = el.textContent
          ? el.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          : `heading-${index}`;
        el.id = id;
      }
      parsedHeadings.push({
        id,
        text: el.textContent || "",
        level: el.tagName.toLowerCase() === "h2" ? 2 : 3
      });
    });

    setHeadings(parsedHeadings);
    if (parsedHeadings.length > 0) {
      setActiveHeadingId(parsedHeadings[0].id);
    }
  }, [loading, children]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      const threshold = 150;
      const startY = rect.top - threshold;
      
      const scrollableRange = elementHeight - (viewportHeight - threshold);
      
      if (startY > 0) {
        setScrollProgress(0);
      } else {
        const scrolled = Math.abs(startY);
        const progress = Math.min(100, Math.round((scrolled / Math.max(1, scrollableRange)) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    // Initial call
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Intersection Observer for Active Heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    const headingElements = contentRef.current?.querySelectorAll("h2, h3");
    headingElements?.forEach((el) => observer.observe(el));

    return () => {
      headingElements?.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

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

      // Stagger other sections
      gsap.fromTo(
        ".reveal-section",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reveal-section",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  // Get status text based on progress
  const getReadingStatus = () => {
    if (scrollProgress <= 5) return "Just started";
    if (scrollProgress >= 95) return "Completed";
    return "In progress";
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#faf9f6] text-neutral-800 overflow-x-clip font-sans">
      <PageLoader isLoading={loading} />
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[55vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover opacity-50 object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        </div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7">
              <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#475DB1] hover:text-white transition-colors duration-200"
                >
                  <span>←</span> Back to Blog
                </Link>
                <div className="w-px h-4 bg-white/20" />
                <span className="block text-[#475DB1] uppercase tracking-[0.25em] text-[11px] font-semibold">
                  {tagline}
                </span>
              </div>

              <h1 className="hero-reveal text-5xl md:text-7xl font-serif text-white tracking-tighter leading-[0.95]">
                {title} <br />
                <span className="italic font-light text-[#475DB1]">
                  {italicHighlight}
                </span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <div className="hero-reveal border-l border-white/20 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-serif italic">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Blog Post Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Metadata Block */}
            <div className="flex flex-wrap gap-8 sm:gap-10 items-center pb-6 border-b border-neutral-200/60">
              <span className="flex items-center gap-2 text-neutral-400 font-light text-sm sm:text-base">
                <MapPin className="w-5 h-5 text-[#475DB1] shrink-0" /> Marsh Baldon, OX44 9LP
              </span>
              <span className="flex items-center gap-2 text-neutral-400 font-light text-sm sm:text-base">
                <Clock className="w-5 h-5 text-[#475DB1] shrink-0" /> {readTime}
              </span>
              <span className="flex items-center gap-2 text-neutral-400 font-light text-sm sm:text-base">
                <Compass className="w-5 h-5 text-[#475DB1] shrink-0" /> {distanceInfo}
              </span>
            </div>

            {/* Content Container */}
            <div ref={contentRef} className="prose prose-lg max-w-none text-neutral-600 font-light leading-relaxed">
              {children}
            </div>
          </div>

          {/* Right Column: Sticky Sidebar (Matches screenshot) */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6 hidden lg:block">
            {/* Reading Progress Block */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm flex items-center gap-5">
              {/* Radial Progress Circle SVG */}
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#f3f4f6"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#475DB1"
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - scrollProgress / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-150"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold text-neutral-800">{scrollProgress}%</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-neutral-900">Reading progress</h4>
                <p className="text-xs text-neutral-400">{getReadingStatus()}</p>
              </div>
            </div>

            {/* In This Article Index Map Block */}
            {headings.length > 0 && (
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="w-full p-5 border-b border-neutral-100 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    In This Article
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "-rotate-90"}`} />
                </button>
                <div className={`transition-all duration-350 ease-in-out overflow-hidden flex flex-col gap-1 ${isSidebarOpen ? "max-h-[500px] opacity-100 p-4" : "max-h-0 opacity-0 p-0"}`}>
                  {headings.map((heading) => {
                    const isActive = activeHeadingId === heading.id;
                    return (
                      <button
                        key={heading.id}
                        onClick={() => handleHeadingClick(heading.id)}
                        className={`text-left text-xs py-2.5 transition-all duration-200 border-l-2 ${
                          isActive
                            ? "text-[#cca05a] border-[#cca05a] font-semibold bg-[#faf9f6] pl-4"
                            : "text-neutral-500 border-transparent pl-4 hover:text-neutral-900 hover:pl-5"
                        }`}
                      >
                        {heading.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Continue Reading Section (Related Posts Grid) */}
      <section className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-200">
        <div className="space-y-2 mb-10 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">Continue Reading</h3>
          <p className="text-sm text-neutral-500 font-light">More on design, engineering, and craft</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post, i) => (
            <Link
              key={i}
              href={post.link}
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 block"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              </div>

              <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="text-[11px] text-amber-500 font-bold">★</span>
                <span className="text-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white flex flex-col gap-4">
                <h2 className="text-lg font-serif font-bold leading-snug group-hover:text-[#8fa2f4] transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>
                <div className="grid grid-cols-12 items-center gap-2 border-t border-white/10 pt-4">
                  <div className="col-span-6 pr-2">
                    <p className="text-[10px] text-slate-300 font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="col-span-3 border-l border-white/20 pl-3 flex flex-col">
                    <div className="flex items-center gap-0.5 text-white">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold whitespace-nowrap">{post.readTime.split(" ")[0]} min</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">READ</span>
                  </div>
                  <div className="col-span-3 border-l border-white/20 pl-3 flex flex-col">
                    <div className="flex items-center gap-0.5 text-white">
                      <Eye className="w-3 h-3" />
                      <span className="text-[10px] font-bold">{post.views}</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">VIEWS</span>
                  </div>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-end text-[10px] text-slate-400">
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
