"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-slate-950"
      >
        <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
          <Image
            src="/images/gallery/gallery-25.jpg"
            alt="The Seven Stars Exterior"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        </div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 pt-32">
          <div className="hero-reveal overflow-hidden mb-6 flex items-center gap-4">
            <div className="w-12 h-px bg-[#475DB1]" />
            <span className="block text-[#475DB1] uppercase tracking-[0.4em] text-[10px] font-bold">
              Find Us
            </span>
          </div>
          <h1 className="hero-reveal text-5xl md:text-7xl font-serif text-white tracking-tighter leading-[0.9]">
            Contact <span className="italic font-light text-slate-300">Us</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Contact Info */}
            <div className="reveal-section flex flex-col justify-between">
              <div>
                <h2 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight mb-6">
                  Get in{" "}
                  <em className="text-[#475DB1] font-light italic">touch</em>
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed max-w-md">
                  Whether you&apos;re looking to book a table for Sunday roast,
                  enquire about an event, or just drop by for a pint, we&apos;re
                  always happy to welcome you.
                </p>
              </div>

              <div className="space-y-12 mt-16">
                {/* Location & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">
                      Location
                    </h4>
                    <address className="not-italic text-slate-900 font-light leading-loose">
                      The Seven Stars
                      <br />
                      The Green, Marsh Baldon
                      <br />
                      Oxford, OX44 9LP
                    </address>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">
                      Contact
                    </h4>
                    <div className="text-slate-900 font-light leading-loose flex flex-col gap-1">
                      <a
                        href="tel:01865343337"
                        className="hover:text-[#475DB1] transition-colors"
                      >
                        01865 343337
                      </a>
                      <a
                        href="mailto:info@sevenstarsmarshbaldon.co.uk"
                        className="hover:text-[#475DB1] transition-colors"
                      >
                        info@sevenstarsmarshbaldon.co.uk
                      </a>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-6">
                    Opening Hours
                  </h4>
                  <div className="max-w-md space-y-3 text-slate-900 font-light">
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span>Monday - Thursday</span>
                      <span>12:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span>Friday - Saturday</span>
                      <span>12:00 - 23:30</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span>Sunday</span>
                      <span>12:00 - 21:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="reveal-section bg-slate-50 p-10 md:p-16">
              <h3 className="text-3xl font-serif text-slate-900 mb-2">
                Send an Enquiry
              </h3>
              <p className="text-slate-500 font-light mb-12">
                We aim to respond to all enquiries within 24 hours.
              </p>

              <form className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="relative pt-4">
                    <input
                      type="text"
                      id="name"
                      className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#475DB1]"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative pt-4">
                    <input
                      type="email"
                      id="email"
                      className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#475DB1]"
                    >
                      Email
                    </label>
                  </div>
                </div>

                <div className="relative pt-4">
                  <select
                    id="subject"
                    defaultValue=""
                    className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option>Table Reservation</option>
                    <option>Private Event Enquiry</option>
                    <option>General Question</option>
                  </select>
                  <label
                    htmlFor="subject"
                    className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-focus:text-[#475DB1]"
                  >
                    Subject
                  </label>
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400 mt-4">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="relative pt-4">
                  <textarea
                    id="message"
                    rows={4}
                    className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent resize-none"
                    placeholder="Message"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#475DB1]"
                  >
                    Message
                  </label>
                </div>

                <button
                  type="button"
                  className="group flex items-center gap-4 mt-12 cursor-pointer"
                >
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-900 group-hover:text-[#475DB1] transition-colors">
                    Submit Enquiry
                  </span>
                  <div className="w-12 h-px bg-slate-900 group-hover:bg-[#475DB1] group-hover:w-16 transition-all duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
