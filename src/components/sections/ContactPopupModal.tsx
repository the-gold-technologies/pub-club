"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface ContactPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopupModal({
  isOpen,
  onClose,
}: ContactPopupModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
        onClose();
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
  }, [isOpen, onClose]);

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
          interestedIn: subject || "Table Reservation",
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
        // Close modal automatically after a delay on success
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 3000);
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

  // Close when clicking outside the modal content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-500 ease-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className={`relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden p-10 md:p-14 transition-all duration-500 ease-out transform ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-8 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Form Content */}
        <div>
          <h2 id="contact-modal-title" className="text-3xl font-serif text-slate-900 mb-2">
            Send an Enquiry
          </h2>
          <p className="text-slate-500 font-light mb-12 text-sm">
            We aim to respond to all enquiries within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Name */}
              <div className="relative pt-4">
                <input
                  type="text"
                  id="modal-contact-name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent text-sm"
                  placeholder="Name"
                  required
                  aria-required="true"
                  aria-describedby="contact-modal-status"
                />
                <label
                  htmlFor="modal-contact-name"
                  className="absolute left-0 top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#475DB1]"
                >
                  Name <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Email */}
              <div className="relative pt-4">
                <input
                  type="email"
                  id="modal-contact-email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent text-sm"
                  placeholder="Email"
                  required
                  aria-required="true"
                  aria-describedby="contact-modal-status"
                />
                <label
                  htmlFor="modal-contact-email"
                  className="absolute left-0 top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#475DB1]"
                >
                  Email <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="relative pt-4">
              <select
                id="modal-contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors appearance-none cursor-pointer text-sm pr-8"
                aria-describedby="contact-modal-status"
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
                htmlFor="modal-contact-subject"
                className="absolute left-0 top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-focus:text-[#475DB1]"
              >
                Subject
              </label>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400 mt-4" aria-hidden="true">
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

            {/* Message */}
            <div className="relative pt-4">
              <textarea
                id="modal-contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="peer w-full bg-transparent border-b border-slate-300 py-2 text-slate-900 font-light focus:outline-none focus:border-[#475DB1] transition-colors placeholder-transparent resize-none text-sm"
                placeholder="Message"
                required
                aria-required="true"
                aria-describedby="contact-modal-status"
              ></textarea>
              <label
                htmlFor="modal-contact-message"
                className="absolute left-0 top-0 text-[10px] uppercase tracking-widest font-bold text-slate-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-light peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-[#475DB1]"
              >
                Message <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Feedback messages */}
            <div id="contact-modal-status" role="status" aria-live="polite">
              {submitStatus === "success" && (
                <p className="text-emerald-600 text-sm font-semibold mt-4 transition-opacity duration-300">
                  ✓ Thank you! Your enquiry has been submitted successfully.
                </p>
              )}

              {submitStatus === "error" && (
                <p className="text-rose-600 text-sm font-semibold mt-4 transition-opacity duration-300">
                  ✗ {errorMsg}
                </p>
              )}
            </div>

            {/* Submit Button */}
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
  );
}
