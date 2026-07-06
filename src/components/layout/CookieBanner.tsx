"use client";

import React, { useState, useEffect } from "react";

const COOKIE_KEY = "pub_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // Small delay so it slides in after the page loads
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes cookieSlideIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .cookie-banner {
          animation: cookieSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div
        className="cookie-banner"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          maxWidth: "340px",
          width: "calc(100vw - 3rem)",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "1.25rem",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.06)",
          padding: "1.25rem 1.4rem 1.3rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
        }}
        role="dialog"
        aria-label="Cookie consent"
        aria-live="polite"
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.35rem" }} aria-hidden="true">
            🍪
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#111827",
              letterSpacing: "-0.01em",
            }}
          >
            We use cookies
          </span>
        </div>

        {/* Body */}
        <p
          style={{
            fontSize: "0.78rem",
            color: "#6b7280",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          We use cookies to enhance your browsing experience and analyse site
          traffic. You can accept or decline non-essential cookies.{" "}
          <a
            href="/privacy-policy"
            style={{
              color: "#b91c1c",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            Learn more
          </a>
          .
        </p>

        {/* Actions — same button theme as site-wide CTAs */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button
            id="cookie-reject-btn"
            onClick={handleReject}
            aria-label="Reject non-essential cookies"
            style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "9999px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
              background: "transparent",
              color: "#6b7280",
              border: "1.5px solid #d1d5db",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6";
              (e.currentTarget as HTMLButtonElement).style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
            }}
          >
            Reject
          </button>
          <button
            id="cookie-accept-btn"
            onClick={handleAccept}
            aria-label="Accept all cookies"
            style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "9999px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
              background: "#394A8D",
              color: "#fff",
              border: "none",
              outline: "none",
              boxShadow: "0 0 15px rgba(57,74,141,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#2d3b72";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(57,74,141,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#394A8D";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 15px rgba(57,74,141,0.4)";
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </>
  );
}
