"use client";

import { useEffect, useRef, useState } from "react";

const GUARANTEES = [
  "30-day money-back guarantee",
  "Full setup & onboarding included",
  "We build it. You approve it. Then it runs.",
];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onBtnMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
  };
  const onBtnLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0,0) scale(1)";
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="cta"
      style={{
        padding: "120px 0 80px",
        background: "#080808",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dramatic background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 55% at 50% 100%, rgba(249,115,22,0.18) 0%, rgba(217,119,6,0.06) 40%, transparent 70%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)" }} />

      {/* Floating particles (static, no hydration issue) */}
      {[
        { w: 2, h: 140, left: "8%", top: "15%", opacity: 0.07, rotate: 25 },
        { w: 2, h: 80, left: "92%", top: "20%", opacity: 0.05, rotate: -18 },
        { w: 2, h: 100, left: "3%", top: "55%", opacity: 0.06, rotate: 40 },
        { w: 2, h: 60, left: "97%", top: "60%", opacity: 0.04, rotate: -30 },
      ].map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: p.left, top: p.top,
          width: p.w, height: p.h, opacity: p.opacity,
          background: `linear-gradient(${p.rotate}deg, #F97316, transparent)`,
          transform: `rotate(${p.rotate}deg)`, pointerEvents: "none",
        }} />
      ))}

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 1.5rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Act label */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", color: "#F97316", textTransform: "uppercase" }}>
            FINAL ACT
          </span>
        </div>

        {/* SVG pen-stroke signature — draws on scroll-in */}
        <div style={{
          pointerEvents: "none", margin: "0 auto", width: "100%", maxWidth: 520, height: 48,
          opacity: visible ? 1 : 0, transition: "opacity 0.3s ease 0.7s",
        }}>
          <svg viewBox="0 0 520 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <path
              d="M 10 32 C 60 10, 130 44, 200 24 S 320 6, 400 28 S 470 42, 510 20"
              stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.35"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: visible ? 0 : 600,
                transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.8s",
              }}
            />
            <path
              d="M 30 38 C 90 20, 160 52, 240 30 S 370 12, 440 34 S 490 46, 508 28"
              stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.18"
              style={{
                strokeDasharray: 580,
                strokeDashoffset: visible ? 0 : 580,
                transition: "stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1) 1s",
              }}
            />
          </svg>
        </div>

        {/* Headline */}
        <h2 style={{
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 1.05,
          marginTop: 20, letterSpacing: "-0.02em",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          Sell your pen.
          <br />
          <span className="text-orange-grad" style={{ filter: "drop-shadow(0 0 40px rgba(249,115,22,0.4))" }}>
            While you sleep.
          </span>
        </h2>

        {/* Subline */}
        <p style={{
          marginTop: 24, fontSize: "clamp(1rem, 2.2vw, 1.15rem)", color: "#9CA3AF", lineHeight: 1.7, maxWidth: 560, margin: "24px auto 0",
          opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.25s",
        }}>
          Jordan Belfort built a $50M sales machine with charm and hustle.{" "}
          You&apos;ll build yours with automation, neuroscience and AI &mdash;{" "}
          and it won&apos;t call in sick, forget to follow up, or lose a lead.
        </p>

        {/* CTA button */}
        <div style={{
          marginTop: 48,
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
        }}>
          <a
            ref={btnRef}
            href="https://wa.me/5511999999999?text=I+want+to+automate+my+sales+pipeline"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={(e) => { setHovered(false); onBtnLeave(e); }}
            onMouseMove={onBtnMove}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "20px 44px",
              background: hovered
                ? "linear-gradient(135deg, #fb923c, #D97706)"
                : "linear-gradient(135deg, #F97316, #ea6c00)",
              color: "#fff", fontWeight: 800, fontSize: 17,
              borderRadius: 50, textDecoration: "none",
              boxShadow: hovered
                ? "0 0 60px rgba(249,115,22,0.6), 0 20px 40px rgba(249,115,22,0.3)"
                : "0 0 40px rgba(249,115,22,0.35), 0 8px 24px rgba(249,115,22,0.2)",
              transform: hovered ? "scale(1.04) translateY(-2px)" : "scale(1)",
              transition: "all 0.25s ease",
              letterSpacing: "0.01em",
            }}
          >
            <span style={{ fontSize: 20 }}>📲</span>
            Book My Strategy Call — Free
            <span style={{ fontSize: 18, transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.2s ease" }}>→</span>
          </a>
        </div>

        {/* Guarantee list */}
        <div style={{
          marginTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 24px",
          opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.5s",
        }}>
          {GUARANTEES.map(g => (
            <span key={g} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#6B7280" }}>
              <span style={{ color: "#22c55e", fontSize: 14 }}>✓</span> {g}
            </span>
          ))}
        </div>

        {/* Big quote */}
        <div style={{
          marginTop: 72, padding: "32px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.65s",
        }}>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "#D1D5DB", fontStyle: "italic", lineHeight: 1.6 }}>
            &ldquo;The easiest way to sell something is to make someone{" "}
            <span style={{ color: "#F97316", fontStyle: "normal", fontWeight: 700 }}>feel they need it</span>{" "}
            before you ever mention the price.&rdquo;
          </p>
          <p style={{ marginTop: 12, fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>— Jordan Belfort, adapted for the automation era</p>
        </div>

        {/* Footer credit */}
        <p style={{
          marginTop: 60, fontSize: 11, color: "#6B7280", fontFamily: "monospace", letterSpacing: "0.1em",
          opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.8s",
        }}>
          BUILT BY <span style={{ color: "#F97316" }}>CODING2U</span> · AUTOMATIONS THAT CLOSE DEALS
        </p>
      </div>
    </section>
  );
}
