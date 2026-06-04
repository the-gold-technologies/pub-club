"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactInfo({ data = {} }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
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
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitStatus("error");
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMsg("");

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_CMS_API_URL ||
        "https://cms-seven-star.vercel.app";
      const res = await fetch(`${apiBaseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          interestedIn: subject || "General Question",
          projectGoals: message,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        // Submit to FormSubmit.co for email notification
        try {
          const contactEmail =
            process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
            "info@sevenstarsatmb.co.uk";
          await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              subject: subject || "New Contact Enquiry",
              message,
            }),
          });
        } catch (emailErr) {
          console.error("Failed to send email notification:", emailErr);
        }

        setSubmitStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitStatus("error");
        setErrorMsg(json.error || "Failed to submit enquiry.");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Info */}
          <div className="reveal-section flex flex-col justify-between">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight mb-6">
                {data.infoHeading}{" "}
                <em className="text-[#475DB1] font-light italic">
                  {data.infoHeadingItalic}
                </em>
              </h2>
              <p className="text-lg text-slate-600 font-light leading-relaxed max-w-md">
                {data.infoDesc}
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
                    {data.locationTitle}
                    <br />
                    {data.addressLine1}
                    <br />
                    {data.addressLine2}
                  </address>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">
                    Contact
                  </h4>
                  <div className="text-slate-900 font-light leading-loose flex flex-col gap-1">
                    <a
                      href={`tel:${data.phoneNumber?.replace(/\s+/g, "")}`}
                      className="hover:text-[#475DB1] transition-colors"
                    >
                      {data.phoneNumber}
                    </a>
                    <a
                      href={`mailto:${data.emailAddress}`}
                      className="hover:text-[#475DB1] transition-colors"
                    >
                      {data.emailAddress}
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
                  {Array.isArray(data.openingHours) &&
                    data.openingHours.map((oh: any, idx: number) => (
                      <div
                        key={idx}
                        className={`flex justify-between pb-3 ${
                          idx < data.openingHours.length - 1
                            ? "border-b border-slate-100"
                            : ""
                        }`}
                      >
                        <span>{oh.days}</span>
                        <span>{oh.hours}</span>
                      </div>
                    ))}
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

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="relative pt-4">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent"
                    placeholder="Name"
                    required
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent"
                    placeholder="Email"
                    required
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
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="Table Reservation">Table Reservation</option>
                  <option value="Private Event Enquiry">
                    Private Event Enquiry
                  </option>
                  <option value="General Question">General Question</option>
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent resize-none"
                  placeholder="Message"
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-0 -top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#475DB1]"
                >
                  Message
                </label>
              </div>

              {submitStatus === "success" && (
                <p className="text-emerald-600 text-sm font-semibold mt-4">
                  ✓ Thank you! Your enquiry has been submitted successfully.
                </p>
              )}

              {submitStatus === "error" && (
                <p className="text-rose-600 text-sm font-semibold mt-4">
                  ✗ {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-4 mt-12 cursor-pointer disabled:opacity-50"
              >
                <span className="text-xs uppercase tracking-widest font-bold text-slate-900 group-hover:text-[#475DB1] transition-colors">
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </span>
                <div className="w-12 h-px bg-slate-900 group-hover:bg-[#475DB1] group-hover:w-16 transition-all duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
