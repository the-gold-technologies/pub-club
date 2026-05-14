"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Heart, Beer, Music, Coffee } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const timelineSteps = [
    {
      title: "Late 2012",
      subtitle: "Closure",
      desc: "After years of instability, the pub closed its doors. The villages lost a 350-year-old central hub for community joy.",
      gridClass:
        "col-span-1 md:col-span-2 lg:col-span-2 md:col-start-1 lg:col-start-1 md:row-start-1 lg:row-start-1",
      lines: { mobile: "down", tablet: "right", desktop: "right" },
    },
    {
      title: "Dec 2012",
      subtitle: "Mission",
      desc: "What began as conversations turned into a mission. Residents formed the Baldons and Nuneham Community Society (BNCS).",
      gridClass:
        "col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-3 md:row-start-1 lg:row-start-1",
      lines: { mobile: "down", tablet: "down", desktop: "right" },
    },
    {
      title: "Mar 2013",
      subtitle: "Reopening",
      desc: "Through community investment and grants, the society purchased the pub. On March 30th, the Seven Stars reopened.",
      gridClass:
        "col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-5 md:row-start-2 lg:row-start-1",
      lines: { mobile: "down", tablet: "left", desktop: "down-left" },
    },
    {
      title: "The Journey",
      subtitle: "Milestones",
      desc: "Named CAMRA Pub of the Year in 2016. Continuous improvements and community support helped navigate challenges like COVID.",
      gridClass:
        "col-span-1 md:col-span-2 lg:col-span-2 md:col-start-1 lg:col-start-4 md:row-start-2 lg:row-start-2",
      lines: { mobile: "down", tablet: "down-right", desktop: "left" },
    },
    {
      title: "2023 & Beyond",
      subtitle: "Renewal",
      desc: "Under new stewards Namit and Sunit, the pub stays true to its roots with fresh energy. A true story of renewal.",
      gridClass:
        "col-span-1 md:col-span-2 lg:col-span-2 md:col-start-2 lg:col-start-2 md:row-start-3 lg:row-start-2",
      lines: { mobile: "none", tablet: "none", desktop: "none" },
    },
  ];

  useEffect(() => {
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

      // Hero animations
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Section reveal animations
      const sections = gsap.utils.toArray(".reveal-section");
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Staggered reveal for the timeline cards
      gsap.fromTo(
        gsap.utils.toArray(".gsap-step-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-step-card",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Scroll-driven animation for the connector lines between grid items
      gsap.utils.toArray(".gsap-connector").forEach((line: any) => {
        // Detect if line is vertical by checking its width class
        const isVertical = line.classList.contains("w-[3px]");

        gsap.fromTo(
          line,
          { scaleX: isVertical ? 1 : 0, scaleY: isVertical ? 0 : 1 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src="/images/assets/SEVEN_STARS_2026_02_09-0112.jpg"
            alt="Our Story"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        </div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-[#475DB1]" />
                <span className="block text-[#475DB1] uppercase tracking-[0.4em] text-[10px] font-bold">
                  Heritage & People
                </span>
              </div>

              <h1 className="hero-reveal text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                Our Story & <br />
                <span className="italic font-light text-[#475DB1]">
                  Community
                </span>
              </h1>
            </div>

            <div className="md:col-span-5 lg:col-span-4 pb-2 md:pb-4">
              <p className="hero-reveal text-white/80 font-light text-sm md:text-base leading-relaxed border-l border-[#475DB1]/50 pl-6">
                Discover the rich history of the Seven Stars—saved by the
                community, for the community. A true village pub where every
                pint pours a story of resilience, joy, and shared moments since
                2013.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Intro Section */}
      <section className="pt-24 md:pt-32 pb-8 bg-white relative">
        {/* Background radial highlight matching the style provided */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-[#475DB1]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-section relative z-10">
          <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#475DB1]"></span>
            Our Story
            <span className="w-8 h-[1px] bg-[#475DB1]"></span>
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight mb-8">
            A Community That Creates{" "}
            <em className="text-[#475DB1] font-light">Happy Moments</em>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
            Our story began when we started looking for ways to bring people
            together. These community members shared a common interest and
            shared purpose.
          </p>
        </div>
      </section>

      {/* The Timeline Grid Animated Layout */}
      <section className="py-16 sm:py-24 bg-white relative opacity-99 select-none overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16 lg:gap-y-20 relative pt-8 sm:pt-12">
            {timelineSteps.map((step, idx) => {
              return (
                <div
                  key={idx}
                  className={`gsap-step-card relative group flex flex-col h-full ${step.gridClass}`}
                >
                  {/* Connectors container - rendered based on configuration */}
                  {/* Mobile Lines */}
                  {step.lines.mobile === "down" && (
                    <div className="block md:hidden absolute -bottom-12 left-1/2 w-[3px] h-12 bg-[#475DB1] origin-top gsap-connector z-0" />
                  )}

                  {/* Tablet Lines */}
                  {step.lines.tablet === "right" && (
                    <div className="hidden md:block lg:hidden absolute top-1/2 -right-8 w-8 h-[3px] bg-[#475DB1] origin-left gsap-connector z-0" />
                  )}
                  {step.lines.tablet === "left" && (
                    <div className="hidden md:block lg:hidden absolute top-1/2 -left-8 w-8 h-[3px] bg-[#475DB1] origin-right gsap-connector z-0" />
                  )}
                  {step.lines.tablet === "down" && (
                    <div className="hidden md:block lg:hidden absolute top-full left-1/2 w-[3px] h-16 bg-[#475DB1] origin-top gsap-connector z-0" />
                  )}
                  {step.lines.tablet === "down-right" && (
                    <>
                      <div className="hidden md:block lg:hidden absolute top-full left-1/2 w-[3px] h-8 bg-[#475DB1] origin-top gsap-connector z-0" />
                      <div className="hidden md:block lg:hidden absolute top-[calc(100%+2rem)] left-1/2 w-[calc(50%+1rem)] h-[3px] bg-[#475DB1] origin-left gsap-connector z-0" />
                      <div className="hidden md:block lg:hidden absolute top-[calc(100%+2rem)] -right-4 w-[3px] h-8 bg-[#475DB1] origin-top gsap-connector z-0" />
                    </>
                  )}

                  {/* Desktop Lines */}
                  {step.lines.desktop === "right" && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-[3px] bg-[#475DB1] origin-left gsap-connector z-0" />
                  )}
                  {step.lines.desktop === "left" && (
                    <div className="hidden lg:block absolute top-1/2 -left-8 w-8 h-[3px] bg-[#475DB1] origin-right gsap-connector z-0" />
                  )}
                  {step.lines.desktop === "down-left" && (
                    <>
                      <div className="hidden lg:block absolute top-full right-1/2 w-[3px] h-10 bg-[#475DB1] origin-top gsap-connector z-0" />
                      <div className="hidden lg:block absolute top-[calc(100%+2.5rem)] right-1/2 w-[calc(50%+1rem)] h-[3px] bg-[#475DB1] origin-right gsap-connector z-0" />
                      <div className="hidden lg:block absolute top-[calc(100%+2.5rem)] -left-4 w-[3px] h-10 bg-[#475DB1] origin-top gsap-connector z-0" />
                    </>
                  )}

                  {/* Actual Card Container */}
                  <div className="w-full relative z-10 flex-grow flex flex-col">
                    {/* Badge */}
                    <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center z-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 rounded-full bg-[#475DB1]/10 scale-110 sm:scale-125 animate-pulse duration-1000" />
                      <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-blue-50 shadow-inner" />
                      <div className="absolute inset-2 sm:inset-3 rounded-full bg-white shadow-md border border-blue-100 flex items-center justify-center text-[#475DB1]">
                        <span className="font-serif text-lg font-bold leading-none">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Main Card Body */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-lg group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-500 border border-slate-100/80 group-hover:border-transparent text-left relative overflow-hidden flex-grow flex flex-col pt-10 sm:pt-12">
                      <div className="relative z-30 flex-grow flex flex-col">
                        <div className="text-[10px] font-mono font-bold text-[#475DB1] uppercase tracking-widest mb-2">
                          {step.subtitle}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif text-slate-900 tracking-tight mb-3 group-hover:text-[#475DB1] transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-normal flex-grow">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Hub Section */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#475DB1]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#475DB1]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="reveal-section lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                  Community Hub
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                  A Pub By the People, <br />
                  <em className="text-[#475DB1] font-light">For the People</em>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  We are truly community-owned, bought by the community and
                  restored by it. This takes our attention away from short-term
                  profit to long-term stability.
                </p>
                <p>
                  Our doors are open to both locals and visitors alike. The love
                  showered by our people has made us so resilient. We are always
                  going to be a people-first pub, delivering quality food and
                  warm service to guests.
                </p>
                <p>
                  We value our community members who not only saved us but are
                  continually helping us grow by supporting in-house events.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                  <Music className="text-[#475DB1] w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    Expect More Experiences
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    You can also expect quiz nights, live music and seasonal
                    activities. Join us for great food, great beer, and a true
                    village pub experience in Oxfordshire.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal-section lg:col-span-6">
              <div className="relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                <Image
                  src="/images/assets/SEVEN_STARS_2026_02_09-0001.jpg"
                  alt="Community Hub Experiences"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-serif italic font-light">
                    Our experiences look like:
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                    <Beer className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-800 text-sm">
                    Friends catching up over a pint
                  </span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-800 text-sm">
                    Families enjoying Sunday lunch
                  </span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-800 text-sm">
                    Neighbours celebrating special moments
                  </span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-800 text-sm">
                    Visitors discovering a true village pub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
