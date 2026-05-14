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
      desc: "Let us take you back to late 2012, after years of instability, the pub closed its doors. For the villages of Marsh Baldon, Toot Baldon, and Nuneham Courtenay, this meant losing a place that had been central to their joy for over 350 years.",
    },
    {
      title: "December 2012",
      subtitle: "Mission",
      desc: "We’re grateful to our community who has always been there for us, motivating us to never stop hosting. What began as conversations among neighbours soon turned into a mission of buying and running the pub. By December 2012, residents formed the Baldons and Nuneham Community Society (BNCS).",
    },
    {
      title: "March 2013",
      subtitle: "Reopening",
      desc: "Through a community share offer, local investment, grants, and support from the previous owner, the society successfully purchased the pub in March 2013. But our story didn’t stop here. Villagers worked together to restore the space, and on 30th March 2013, the Seven Stars reopened a revived community hub.",
    },
    {
      title: "Over the years",
      subtitle: "Milestones",
      desc: "The pub earned CAMRA Pub of the Year (2016). Continuous improvements enhanced dining, accessibility and facilities. A professional lease helped navigate challenging periods like COVID.",
    },
    {
      title: "2023 & Beyond",
      subtitle: "Renewal",
      desc: "In 2023, a new chapter began under the stewardship of Namit Julka and Sunit Bansode, who ensured that the club stays true to its roots but also welcomes fresh energy. Today, Seven Stars is a pub where the community comes to life. What began as a closure has become a story of renewal.",
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

      // Scroll-driven line animation using precise HTML timeline segments to route flawlessly into target cards
      gsap.utils
        .toArray(".gsap-connector-group")
        .forEach((groupWrapper: any) => {
          const lineH = groupWrapper.querySelector(".gsap-line-h");
          const lineV = groupWrapper.querySelector(".gsap-line-v");

          if (!lineH || !lineV) return;

          // Build continuous scrubbed sequence drawing horizontal segment first, then routing straight down to intersect target card
          const tlLine = gsap.timeline({
            scrollTrigger: {
              trigger: groupWrapper,
              start: "top 65%",
              end: "bottom 35%",
              scrub: true,
            },
          });

          tlLine
            .fromTo(
              lineH,
              { scaleX: 0 },
              { scaleX: 1, ease: "none", duration: 0.5 },
            )
            .fromTo(
              lineV,
              { scaleY: 0 },
              { scaleY: 1, ease: "none", duration: 0.5 },
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
                Discover the rich history of the Seven Stars—saved by the community, for the community. A true village pub where every pint pours a story of resilience, joy, and shared moments since 2013.
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

      {/* The Timeline Staggered Animated Layout */}
      <section className="py-16 sm:py-24 bg-white relative opacity-99 select-none overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-12 sm:space-y-16 relative pt-4">
            {timelineSteps.map((step, idx) => {
              const isRightAligned = idx % 2 === 1;

              return (
                <div
                  key={idx}
                  className={`gsap-step-card flex ${
                    isRightAligned ? "justify-end" : "justify-start"
                  } relative group`}
                >
                  {/* Native HTML Solid Connector Lines routing exactly down to join the boundary of the next card below */}
                  {idx < timelineSteps.length - 1 && (
                    <div
                      className={`hidden md:block absolute top-[60%] ${
                        isRightAligned
                          ? "right-[45%] w-[32.5%]"
                          : "left-[45%] w-[32.5%]"
                      } h-[calc(40%+4rem)] z-0 pointer-events-none gsap-connector-group`}
                    >
                      {/* Faint uncolored static base track providing visual route guide */}
                      <div
                        className={`absolute inset-0 ${
                          isRightAligned
                            ? "border-t-[3px] border-l-[3px] rounded-tl-3xl"
                            : "border-t-[3px] border-r-[3px] rounded-tr-3xl"
                        } border-solid border-slate-200/80`}
                      />

                      {/* Dynamic live scroll-drawing segments placed absolutely over the base track */}
                      {/* Horizontal top segment */}
                      <div
                        className={`absolute top-0 left-0 right-0 border-t-[3px] border-solid border-[#475DB1] gsap-line-h ${
                          isRightAligned ? "origin-right" : "origin-left"
                        }`}
                      />

                      {/* Vertical drop segment routing directly down to intersect the card layout perfectly */}
                      <div
                        className={`absolute top-0 bottom-0 ${
                          isRightAligned
                            ? "left-0 border-l-[3px]"
                            : "right-0 border-r-[3px]"
                        } border-solid border-[#475DB1] origin-top gsap-line-v`}
                      />
                    </div>
                  )}

                  {/* Actual Card Container preserving premium aesthetic layout */}
                  <div className="w-full md:w-[48%] relative z-10">
                    {/* Nested Translucent Glow Badge dynamically scaling up when card is hovered */}
                    <div
                      className={`absolute -top-6 sm:-top-8 ${
                        isRightAligned
                          ? "-right-6 sm:-right-8"
                          : "-left-6 sm:-left-8"
                      } w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center z-10 pointer-events-none group-hover:scale-110 transition-transform duration-500`}
                    >
                      {/* Outer faint ring */}
                      <div className="absolute inset-0 rounded-full bg-[#475DB1]/10 scale-110 sm:scale-125 animate-pulse duration-1000" />
                      {/* Secondary soft ring */}
                      <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-blue-50 shadow-inner" />
                      {/* Crisp solid core */}
                      <div className="absolute inset-2 sm:inset-3 rounded-full bg-white shadow-md border border-blue-100 flex items-center justify-center text-[#475DB1]">
                        <span className="font-serif text-lg font-bold leading-none">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Main Card Body featuring smooth vertical translation and complete border removal on hover */}
                    <div className="p-5 sm:p-7 rounded-2xl bg-white shadow-lg group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-500 border border-slate-100/80 group-hover:border-transparent text-left relative overflow-hidden">
                      {/* Text wrapper elevated to z-30 to ensure absolute typography clarity over soft glowing aura rings */}
                      <div className="relative z-30">
                        {/* Subtitle baseline marker */}
                        <div className="text-[10px] font-mono font-bold text-[#475DB1] uppercase tracking-widest mb-1.5">
                          {step.subtitle}
                        </div>

                        {/* Title string */}
                        <h3 className="text-xl sm:text-2xl font-serif text-slate-900 tracking-tight mb-2.5 group-hover:text-[#475DB1] transition-colors">
                          {step.title}
                        </h3>

                        {/* Description string */}
                        <p className="text-sm text-slate-500 leading-relaxed font-normal">
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
