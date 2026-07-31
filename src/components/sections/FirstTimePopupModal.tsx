"use client";

import { useEffect, useRef, useState } from "react";
import { X, Snowflake } from "lucide-react";
import Image from "next/image";
import { useCMSStore } from "@/store/useCMSStore";
import { parseMarkdownLinks } from "@/utils/text";

export default function FirstTimePopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { fetchPage, pages } = useCMSStore();

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

  // Check first visit and fetch page data
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenFirstTimePopup");

    fetchPage("home")
      .then((data) => {
        const popupConfig = data?.sections?.["FirstTimePopup"] || {};
        const isEnabled = popupConfig.isEnabled ?? true;

        if (isEnabled && !hasSeenPopup) {
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 2000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => console.error("Error fetching popup config:", err));
  }, [fetchPage]);

  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Disable background scrolling and focus management when modal is open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus first interactive element inside modal
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle keydown for escape and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenFirstTimePopup", "true");
  };

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
          interestedIn: subject || "General Enquiry",
          projectGoals: message,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
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
              subject: subject || "New Popup Enquiry",
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

        setTimeout(() => {
          handleClose();
          setSubmitStatus("idle");
        }, 2000);
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const popupConfig = pages["home"]?.sections?.["FirstTimePopup"] || {};
  const popupImage = popupConfig.image || "/christmas-hero.png";
  const popupTitle = popupConfig.title || "Send an Enquiry";
  const popupDesc =
    popupConfig.description ||
    "We aim to respond to all enquiries within 24 hours.";
  const popupWelcome = popupConfig.welcomeText || "Welcome";
  const popupImageTitle = popupConfig.imageTitle || "Seven Stars";
  const popupImageSubtitle = popupConfig.imageSubtitle || "Marsh Baldon, Oxford";

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/25 backdrop-blur-[3px] transition-all duration-300"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="first-time-modal-title"
        className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-black/5"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
          aria-label="Close popup"
        >
          <X size={15} />
        </button>

        {/* LEFT SIDE: Dynamic Image from CMS */}
        <div className="relative h-48 md:h-auto w-full min-h-[200px] md:min-h-[500px]">
          <Image
            src={popupImage}
            alt="Seven Stars Atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white max-w-xs z-10 hidden md:block">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-blue-200 font-bold mb-2">
              <Snowflake
                className="w-3 h-3 text-blue-200 animate-spin"
                style={{ animationDuration: "6s" }}
              />{" "}
              {popupWelcome}
            </div>
            <p className="font-serif text-3xl tracking-wide leading-tight drop-shadow-md">
              {popupImageTitle}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-neutral-300 mt-1.5 drop-shadow-sm font-bold">
              {popupImageSubtitle}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Styled Enquiry Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#FDFBF7] relative">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

          <div className="relative z-10">
            <div className="mb-8">
              <span className="text-[9px] tracking-[0.4em] text-[#475DB1] uppercase font-bold block mb-1">
                Get In Touch
              </span>
              <h2 id="first-time-modal-title" className="text-2xl sm:text-3xl font-serif text-neutral-900 tracking-tight leading-none mb-2">
                {popupTitle}
              </h2>
              <p className="text-neutral-500 font-serif font-light text-xs leading-relaxed">
                {parseMarkdownLinks(popupDesc)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="first-time-name"
                    className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 ml-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="first-time-name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#475DB1] focus:border-[#475DB1] focus:outline-none transition-all placeholder:text-neutral-300"
                    placeholder="Your name"
                    required
                    aria-required="true"
                    aria-describedby="first-time-modal-status"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="first-time-email"
                    className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 ml-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="first-time-email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#475DB1] focus:border-[#475DB1] focus:outline-none transition-all placeholder:text-neutral-300"
                    placeholder="Your email"
                    required
                    aria-required="true"
                    aria-describedby="first-time-modal-status"
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="first-time-subject"
                  className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 ml-1"
                >
                  Subject
                </label>
                <div className="relative">
                  <select
                    id="first-time-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#475DB1] focus:border-[#475DB1] focus:outline-none transition-all appearance-none cursor-pointer pr-10"
                    aria-describedby="first-time-modal-status"
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
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-400" aria-hidden="true">
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
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="first-time-message"
                  className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 ml-1"
                >
                  Message *
                </label>
                <textarea
                  id="first-time-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#475DB1] focus:border-[#475DB1] focus:outline-none transition-all resize-none placeholder:text-neutral-300"
                  placeholder="Tell us about your enquiry..."
                  required
                  aria-required="true"
                  aria-describedby="first-time-modal-status"
                />
              </div>

              {/* Feedback messages */}
              <div id="first-time-modal-status" role="status" aria-live="polite">
                {submitStatus === "success" && (
                  <p className="text-emerald-600 text-xs font-semibold mt-2 transition-opacity duration-300">
                    ✓ Thank you! Enquiry submitted successfully.
                  </p>
                )}

                {submitStatus === "error" && (
                  <p className="text-rose-600 text-xs font-semibold mt-2 transition-opacity duration-300">
                    ✗ {errorMsg}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-[0.2em] text-[10px] font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Send Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
