"use client";

import { useEffect, useState } from "react";
import GlitchText from "./GlitchText";

// Pre-determined dollar positions (avoids hydration mismatch)
const DOLLARS = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 3.7 + 1.2) % 100,
  delay: (i * 0.47) % 8,
  dur: 5 + (i % 5),
  size: 10 + (i % 14),
  opacity: 0.06 + (i % 5) * 0.03,
}));

const WORDS = ["SELL", "ME", "THIS", "PEN."];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(-1);
  const [subVisible, setSubVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setWordIdx(i);
      i++;
      if (i >= WORDS.length) {
        clearInterval(iv);
        setTimeout(() => setSubVisible(true), 300);
        setTimeout(() => setCtaVisible(true), 700);
      }
    }, 220);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* Ambient radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(249,115,22,0.06) 0%, transparent 60%)",
      }} />

      {/* Dollar rain */}
      {DOLLARS.map((d, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: "-60px",
            fontSize: d.size,
            opacity: d.opacity,
            color: "#F97316",
            animation: `dollar-fall ${d.dur}s ${d.delay}s linear infinite`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          $
        </span>
      ))}

      {/* Floating Pen SVG */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "22%",
          animation: "penFloat 4s ease-in-out infinite",
          opacity: 0.85,
          filter: "drop-shadow(0 0 24px rgba(249,115,22,0.45))",
        }}
      >
        <svg width="120" height="340" viewBox="0 0 60 170" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(-18deg)" }}>
          {/* Pen body */}
          <rect x="18" y="10" width="24" height="110" rx="2" fill="#1a1a1a" stroke="#F97316" strokeWidth="1.2"/>
          {/* Pen clip */}
          <rect x="36" y="14" width="4" height="85" rx="2" fill="#D97706"/>
          {/* Pen tip section */}
          <path d="M18 120 L30 155 L42 120 Z" fill="#2a2a2a" stroke="#F97316" strokeWidth="1"/>
          {/* Pen nib */}
          <path d="M24 145 L30 162 L36 145" fill="#D97706" stroke="#D97706" strokeWidth="0.8"/>
          {/* Ink dot */}
          <circle cx="30" cy="163" r="2.5" fill="#F97316" opacity="0.9"/>
          {/* Grip bands */}
          <rect x="18" y="108" width="24" height="4" rx="1" fill="#F97316" opacity="0.4"/>
          <rect x="18" y="100" width="24" height="2" rx="1" fill="#F97316" opacity="0.2"/>
          {/* Top cap */}
          <rect x="18" y="5" width="24" height="10" rx="4" fill="#D97706"/>
          <rect x="22" y="3" width="16" height="4" rx="2" fill="#F97316" opacity="0.6"/>
          {/* Pen brand line */}
          <text x="30" y="72" textAnchor="middle" fontSize="5" fill="rgba(249,115,22,0.5)" fontFamily="monospace" transform="rotate(-90 30 72)">coding2u</text>
        </svg>
      </div>

      {/* Corner quote marks */}
      <span style={{ position: "absolute", top: "15%", left: "6%", fontSize: 120, color: "rgba(249,115,22,0.04)", fontFamily: "Georgia, serif", lineHeight: 1, userSelect: "none" }}>&ldquo;</span>
      <span style={{ position: "absolute", bottom: "12%", right: "5%", fontSize: 120, color: "rgba(249,115,22,0.04)", fontFamily: "Georgia, serif", lineHeight: 1, userSelect: "none" }}>&rdquo;</span>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
        {/* Pre-label */}
        <p style={{
          fontFamily: "monospace", fontSize: 12, letterSpacing: "0.22em",
          color: "#F97316", textTransform: "uppercase", marginBottom: 24,
          opacity: wordIdx >= 0 ? 1 : 0, transition: "opacity 0.4s",
        }}>
          <GlitchText
            text="Wall Street · 1987 · The question this page just answered for you"
            delay={400}
            speed={28}
            style={{ color: "#F97316", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: 12 }}
          />
        </p>

        {/* Hero headline — word by word */}
        <h1 style={{
          fontSize: "clamp(3.5rem, 12vw, 9rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginBottom: 32,
          display: "flex",
          gap: "0.25em",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {WORDS.map((w, i) => (
            <span
              key={w}
              className={i === WORDS.length - 1 ? "text-orange-grad" : ""}
              style={{
                display: "inline-block",
                color: i === WORDS.length - 1 ? undefined : "#F8FAFC",
                opacity: wordIdx >= i ? 1 : 0,
                transform: wordIdx >= i ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)`,
                animation: wordIdx >= i && i === WORDS.length - 1 ? "glow-pulse 3s ease-in-out infinite" : "none",
              }}
            >
              {w}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "#9CA3AF",
            maxWidth: 680,
            margin: "0 auto 40px",
            lineHeight: 1.7,
            opacity: subVisible ? 1 : 0,
            transform: subVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span style={{ color: "#F97316", fontWeight: 700 }}>This page just answered the question.</span>{" "}
          You were convinced — without noticing, without resistance. Now imagine{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>your product being sold like this.
          </span>
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <a
            href="#cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px",
              background: "linear-gradient(135deg, #F97316, #EA580C)",
              color: "#fff", fontWeight: 700, fontSize: 15,
              borderRadius: 8, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(249,115,22,0.4)",
              animation: "pulse-orange 2.5s ease-in-out infinite",
              letterSpacing: "0.02em",
            }}
          >
            Get My Page Like This →
          </a>
          <a
            href="#scene"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px",
              background: "transparent",
              color: "#F8FAFC", fontWeight: 600, fontSize: 15,
              borderRadius: 8, textDecoration: "none",
              border: "1px solid rgba(249,115,22,0.35)",
              letterSpacing: "0.02em",
            }}
          >
            How It Works
          </a>
        </div>

        {/* Micro-stats */}
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
          {[
            { n: "8.3×",  label: "More Conversions" },
            { n: "72h",   label: "Project Delivery" },
            { n: "$0",    label: "To see our work" },
          ].map(s => (
            <div key={s.n} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 900, color: "#F97316", letterSpacing: "-0.02em" }}>{s.n}</p>
              <p style={{ fontSize: 11, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: ctaVisible ? 0.5 : 0, transition: "opacity 1s ease 1s",
      }}>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#6B7280", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #F97316, transparent)" }} />
      </div>
    </section>
  );
}
