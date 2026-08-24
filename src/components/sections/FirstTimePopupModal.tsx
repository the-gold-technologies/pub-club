"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCMSStore } from "@/store/useCMSStore";

export default function FirstTimePopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { fetchPage, pages } = useCMSStore();

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
          }, 1500);
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
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
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
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      sessionStorage.setItem("hasSeenFirstTimePopup", "true");
    }, 250);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const popupConfig = pages["home"]?.sections?.["FirstTimePopup"] || {};
  const popupImage = popupConfig.image || "/christmas-hero.png";
  const buttonText = popupConfig.buttonText;
  const buttonLink = popupConfig.buttonLink;

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100 animate-in fade-in"
      }`}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Announcement banner"
        className={`relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-neutral-950 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/15 transition-all duration-300 ${
          isClosing
            ? "scale-95 opacity-0"
            : "scale-100 opacity-100 animate-in zoom-in-95 duration-300"
        }`}
      >
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-30 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95 border border-white/20 group"
          aria-label="Close popup"
        >
          <X
            size={16}
            className="group-hover:rotate-90 transition-transform duration-200"
          />
        </button>

        {/* Banner Flyer Content */}
        <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
          {buttonLink ? (
            <Link
              href={buttonLink}
              onClick={handleClose}
              className="w-full block hover:opacity-95 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={popupImage}
                alt="Announcement banner"
                className="w-full h-auto max-h-[82vh] object-contain rounded-3xl select-none block"
              />
            </Link>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={popupImage}
              alt="Announcement banner"
              className="w-full h-auto max-h-[82vh] object-contain rounded-3xl select-none block"
            />
          )}

          {/* Optional CTA Button if configured */}
          {buttonText && buttonLink && (
            <div className="w-full p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex justify-center -mt-16 relative z-10">
              <Link
                href={buttonLink}
                onClick={handleClose}
                className="px-8 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
