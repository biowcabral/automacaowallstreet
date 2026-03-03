"use client";

/**
 * Navbar — fixed top bar with the coding2u logo.
 * Logo uses the brand typography from the provided image:
 *   "<coding" in cream/tan + "2u>" in orange.
 * Glassmorphism background appears after scrolling 80px.
 */

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        padding: "0 1.5rem",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(8,8,8,0.82)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(249,115,22,0.1)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 0 }}
      >
        {/* "<coding" — cream/tan */}
        <span
          style={{
            fontSize: "clamp(18px, 2.4vw, 26px)",
            fontWeight: 900,
            color: "#E8E0D0",
            fontFamily: "var(--font-geist-sans), sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          &lt;coding
        </span>
        {/* "2u" — orange */}
        <span
          style={{
            fontSize: "clamp(18px, 2.4vw, 26px)",
            fontWeight: 900,
            color: "#E05A1E",
            fontFamily: "var(--font-geist-sans), sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          2u
        </span>
        {/* ">" — cream/tan */}
        <span
          style={{
            fontSize: "clamp(18px, 2.4vw, 26px)",
            fontWeight: 900,
            color: "#E8E0D0",
            fontFamily: "var(--font-geist-sans), sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          &gt;
        </span>
      </a>

      {/* Right side nav items */}
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 32px)" }}>
        <a
          href="#scene"
          style={{
            fontSize: 12,
            color: "#6B7280",
            textDecoration: "none",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F97316")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B7280")}
        >
          How It Works
        </a>
        <a
          href="#autoflow"
          style={{
            fontSize: 12,
            color: "#6B7280",
            textDecoration: "none",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F97316")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B7280")}
        >
          Pipeline
        </a>
        <a
          href="#cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 20px",
            background: "linear-gradient(135deg, #F97316, #EA580C)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            borderRadius: 50,
            textDecoration: "none",
            fontFamily: "monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 30px rgba(249,115,22,0.55)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(249,115,22,0.3)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Get Started →
        </a>
      </div>
    </nav>
  );
}
