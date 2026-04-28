"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left info panel: slides from left
      gsap.fromTo(
        ".contact-info",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Right form card: slides from right
      gsap.fromTo(
        ".contact-form",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Form fields: stagger fade in after card appears
      gsap.fromTo(
        ".contact-field",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 bg-white relative border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="contact-info space-y-12">
            <div>
              <h2 className="text-[#475DB1] tracking-[0.2em] uppercase text-sm font-semibold mb-2">
                Get in Touch
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-black">
                Visit <span className="italic">Us</span>
              </h3>
            </div>

            <div className="space-y-8 glass-card rounded-3xl p-10 border border-black/5 shadow-sm">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-[#475DB1] mr-6 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-black uppercase tracking-wider text-sm font-medium mb-2">
                    Address
                  </h4>
                  <p className="text-dark-900 font-light leading-relaxed">
                    The Seven Stars, <br />
                    Marsh Baldon, <br />
                    Oxford, OX44 9LP
                  </p>
                </div>
              </div>

              <div className="flex items-start border-t border-black/5 pt-8">
                <svg
                  className="w-6 h-6 text-[#475DB1] mr-6 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-black uppercase tracking-wider text-sm font-medium mb-2">
                    Opening Hours
                  </h4>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    Mon - Thu: 12:00 PM - 11:00 PM <br />
                    Fri - Sat: 12:00 PM - 1:00 AM <br />
                    Sun: 12:00 PM - 10:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start border-t border-black/5 pt-8">
                <svg
                  className="w-6 h-6 text-[#475DB1] mr-6 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h4 className="text-black uppercase tracking-wider text-sm font-medium mb-2">
                    Contact
                  </h4>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    reservations@sevenstars.com <br />
                    +44 123 456 7890
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form glass-card rounded-3xl p-10 self-start border border-black/5 shadow-sm">
            <h4 className="contact-field text-2xl font-serif text-black mb-8 border-b border-black/5 pb-4">
              Book a Table
            </h4>
            <form className="space-y-6">
              <div className="contact-field grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-black/10 p-3 text-black focus:outline-none focus:border-primary-600 transition-colors rounded-xl shadow-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white border border-black/10 p-3 text-black focus:outline-none focus:border-primary-600 transition-colors rounded-xl shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="contact-field grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-white border border-black/10 p-3 text-black focus:outline-none focus:border-primary-600 transition-colors rounded-xl shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Guests
                  </label>
                  <select className="w-full bg-white border border-black/10 p-3 text-black focus:outline-none focus:border-primary-600 transition-colors appearance-none rounded-xl shadow-sm">
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                    <option>5+ People</option>
                  </select>
                </div>
              </div>
              <div className="contact-field">
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-black/10 p-3 text-black focus:outline-none focus:border-primary-600 transition-colors rounded-xl shadow-sm"
                  placeholder="Special requirements..."
                />
              </div>
              <button
                type="submit"
                className="contact-field w-full py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-widest text-sm font-semibold transition-all shadow-lg hover:shadow-primary-600/30 rounded-full"
              >
                Request Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
