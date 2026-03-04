"use client";

import { useEffect, useRef, useState } from "react";

const OLD_WAY = [
  '"Our landing page looks great and is responsive"',
  '"We have excellent customer support"',
  '"Our price is accessible, worth the investment"',
  '"Our product has lots of great features"',
  "Listing features nobody asked for",
  "Competing on price instead of creating value",
];

const AUTO_WAY = [
  "Opens with the exact pain of the ideal visitor",
  '"What is the cost of each month without a solution?"',
  "Urgency trigger at precisely the right moment",
  "Social proof aligned to the visitor's profile",
  "CTA positioned where the decision was already made",
  "Sells. Reconverts. Upsells. Itself.",
];

const INSIGHT_STEPS = [
  { icon: "🎯", title: "Don't sell the pen", body: "Most pages list features. The visitor doesn't want to know about the product — they want to know what it costs NOT to have it. A great LP opens with that cost." },
  { icon: "🧠", title: "Create the need first", body: "Belfort's answer was never about the pen. It was about manufacturing desire through scarcity: 'Write down my number' — then there's no pen. Your LP does the same." },
  { icon: "⚡", title: "Every section fires a trigger", body: "The exact psychological moment when the need is felt — that's where the copy strikes. Not when you edit the text. Right now, as they read." },
  { icon: "📈", title: "Scale to any offer", body: "A salesperson reads the room once. A well-built LP reads signals from thousands of visitors and delivers the right answer to each one — simultaneously." },
];

export default function PenScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="scene" ref={ref} style={{ padding: "100px 0", background: "#0A0A0A", position: "relative", overflow: "hidden" }}>
      {/* Top border */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Scene label */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", color: "#F97316", textTransform: "uppercase" }}>
            ACT I — The Challenge
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
            marginTop: 12, lineHeight: 1.15,
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            The Question This Page{" "}
            <span className="text-orange-grad">Already Answered</span>
          </h2>
        </div>

        {/* The Belfort quote card */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(217,119,6,0.04))",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: 16,
            padding: "48px 48px",
            marginBottom: 72,
            textAlign: "center",
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <p style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.4, fontStyle: "italic" }}>
            &ldquo;Sell me{" "}
            <span style={{ color: "#F97316", borderBottom: "2px solid #F97316", paddingBottom: 2 }}>this pen.</span>
            &rdquo;
          </p>
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 40, height: 1, background: "rgba(249,115,22,0.3)" }} />
            <span style={{ fontSize: 12, color: "#6B7280", letterSpacing: "0.12em" }}>THE CLASSIC CLOSE · WALL STREET</span>
            <div style={{ width: 40, height: 1, background: "rgba(249,115,22,0.3)" }} />
          </div>
          <p style={{ marginTop: 20, fontSize: 15, color: "#9CA3AF", maxWidth: 560, margin: "20px auto 0" }}>
            A room full of salespeople. None got it right. The pen was never the point.
          </p>
        </div>

        {/* Old way vs Auto way */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 80 }} className="vs-grid">
          {/* Old Way */}
          <div style={{
            background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)",
            borderRadius: 14, padding: 32,
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-32px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ fontSize: 20 }}>❌</span>
              <span style={{ fontWeight: 800, fontSize: 15, color: "#ef4444", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                The Old Way — Feature Lists
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#6B7280", marginBottom: 20, fontFamily: "monospace", letterSpacing: "0.08em" }}>
              WHAT MOST PAGES DO:
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {OLD_WAY.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#9CA3AF",
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <span style={{ color: "#ef4444", flexShrink: 0, marginTop: 1, opacity: 0.7 }}>✕</span>
                  <span style={{ textDecoration: i < 4 ? "line-through" : "none", textDecorationColor: "rgba(239,68,68,0.4)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24, padding: "12px 16px", background: "rgba(239,68,68,0.08)", borderRadius: 8, borderLeft: "3px solid rgba(239,68,68,0.4)" }}>
              <p style={{ fontSize: 12, color: "#ef4444" }}>Result: 2% conversion. Quotes ignored. Price war.</p>
            </div>
          </div>

          {/* Auto Way */}
          <div style={{
            background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: 14, padding: 32,
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(32px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <span style={{ fontWeight: 800, fontSize: 15, color: "#F97316", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                The Right Way — Creating Need
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#6B7280", marginBottom: 20, fontFamily: "monospace", letterSpacing: "0.08em" }}>
              WHAT A GREAT LP DOES:
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {AUTO_WAY.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#F8FAFC",
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24, padding: "12px 16px", background: "rgba(34,197,94,0.06)", borderRadius: 8, borderLeft: "3px solid rgba(34,197,94,0.4)" }}>
              <p style={{ fontSize: 12, color: "#22c55e" }}>Result: up to 8× higher conversion. No manual effort. 24/7.</p>
            </div>
          </div>
        </div>

        {/* Insight steps */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.2em", color: "#F97316", textTransform: "uppercase" }}>
            The Belfort Method — In a Landing Page
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
          {INSIGHT_STEPS.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "rgba(249,115,22,0.08)" : "rgba(22,22,22,0.8)",
                border: `1px solid ${hovered === i ? "rgba(249,115,22,0.4)" : "rgba(249,115,22,0.1)"}`,
                borderRadius: 12, padding: "28px 24px",
                transition: "all 0.25s ease",
                cursor: "default",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${0.5 + i * 0.12}s`,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F8FAFC", marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.7 }}>{step.body}</p>
              <div style={{ marginTop: 16, fontSize: 11, color: "#F97316", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                STEP {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .vs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
