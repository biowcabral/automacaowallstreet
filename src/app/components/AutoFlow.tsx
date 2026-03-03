"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [
  {
    id: "visitor",
    icon: "👤",
    label: "Visitor Arrives",
    sub: "Anonymous intent detected",
    color: "#6B7280",
    detail: "UTM source, referrer, device, geo and time-of-day logged immediately. Behavioral fingerprint starts building.",
  },
  {
    id: "profile",
    icon: "🧠",
    label: "AI Profiles Intent",
    sub: "300ms decision window",
    color: "#60A5FA",
    detail: "Scroll depth, click heatmap, time-on-section and visit history analyzed. Visitor bucketed: curious / warm / ready-to-buy.",
  },
  {
    id: "trigger",
    icon: "⚡",
    label: "Trigger Fires",
    sub: "Neuro-matched in real time",
    color: "#F97316",
    detail: "The right trigger selected per profile: scarcity for hot leads, social proof for cold, reciprocity for first-time visitors. Zero guessing.",
  },
  {
    id: "sequence",
    icon: "💬",
    label: "Personalized Sequence",
    sub: "WhatsApp · Email · Retargeting",
    color: "#34D399",
    detail: "Multi-channel sequence launches: WhatsApp with the prospect's name and pain point, email with matched case study, retargeting ad with the trigger asset.",
  },
  {
    id: "objection",
    icon: "🤝",
    label: "AI Handles Objections",
    sub: "24/7 chatbot + voice",
    color: "#A78BFA",
    detail: "Every common objection has a pre-trained response. AI responds instantly — no rep needed. Escalates to human only when deal is 90%+ ready to close.",
  },
  {
    id: "close",
    icon: "💰",
    label: "Sale Closes",
    sub: "Payment link auto-sent",
    color: "#D97706",
    detail: "Purchase confirmation detected. Receipt, onboarding and welcome sequence fires within 60 seconds. CRM updated, team notified.",
  },
  {
    id: "upsell",
    icon: "🔄",
    label: "Upsell Triggers",
    sub: "Revenue per customer ↑",
    color: "#F97316",
    detail: "Post-purchase satisfaction window (72h) triggers upsell sequence. Cross-sell based on purchase history. Referral ask at peak happiness moment.",
  },
];

export default function AutoFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Cascade nodes once visible
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const iv = setInterval(() => {
      setLit(i);
      i++;
      if (i >= NODES.length) clearInterval(iv);
    }, 280);
    return () => clearInterval(iv);
  }, [visible]);

  return (
    <section
      ref={ref}
      id="autoflow"
      style={{
        padding: "110px 0",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 68 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", color: "#F97316", textTransform: "uppercase" }}>
            ACT III — The Machine
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginTop: 12, lineHeight: 1.15,
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            Your <span className="text-orange-grad">Automated Sales</span> Pipeline
          </h2>
          <p style={{ marginTop: 16, color: "#9CA3AF", fontSize: 16, maxWidth: 560, margin: "16px auto 0",
            opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
            Every node fires automatically. No reps needed between steps. This runs 24/7 for every single visitor.
          </p>
        </div>

        {/* Pipeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          {NODES.map((node, i) => {
            const isLit = i <= lit;
            const isLeft = i % 2 === 0;
            return (
              <div key={node.id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isLeft ? "row" : "row-reverse",
                    alignItems: "stretch",
                    gap: 0,
                    opacity: isLit ? 1 : 0,
                    transform: isLit ? "none" : (isLeft ? "translateX(-24px)" : "translateX(24px)"),
                    transition: "opacity 0.45s ease, transform 0.45s ease",
                  }}
                >
                  {/* Node card */}
                  <div
                    style={{
                      flex: "0 0 auto",
                      width: "clamp(260px, 45%, 420px)",
                      background: "#111111",
                      border: `1px solid ${isLit ? node.color + "44" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 14,
                      padding: "22px 24px",
                      position: "relative",
                      boxShadow: isLit ? `0 0 30px rgba(${node.color === "#F97316" ? "249,115,22" : "99,99,99"},0.1)` : "none",
                      transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                    }}
                  >
                    {/* Step number */}
                    <span style={{
                      position: "absolute", top: 16, right: isLeft ? 20 : "auto", left: isLeft ? "auto" : 20,
                      fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.12)",
                      letterSpacing: "0.1em",
                    }}>
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{
                        fontSize: 24, width: 44, height: 44, borderRadius: 10,
                        background: `${node.color}18`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: `1px solid ${node.color}33`,
                        flexShrink: 0,
                      }}>
                        {node.icon}
                      </span>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "#F8FAFC" }}>{node.label}</p>
                        <p style={{ fontSize: 11, color: node.color, fontFamily: "monospace" }}>{node.sub}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.65 }}>{node.detail}</p>

                    {/* Live indicator */}
                    {isLit && (
                      <div style={{
                        position: "absolute", top: 14,
                        ...(isLeft ? { left: 20 } : { right: 20 }),
                        display: "flex", alignItems: "center", gap: 5,
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: node.color, display: "block",
                          animation: "pulse-orange 1.8s ease-in-out infinite",
                        }} />
                        <span style={{ fontSize: 9, color: node.color, fontFamily: "monospace", letterSpacing: "0.08em" }}>LIVE</span>
                      </div>
                    )}
                  </div>

                  {/* Center connector */}
                  <div style={{
                    flex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", minHeight: 80,
                  }}>
                    <div style={{
                      width: 2, height: "100%", minHeight: 80,
                      background: isLit
                        ? `linear-gradient(${node.color}, ${NODES[Math.min(i + 1, NODES.length - 1)].color})`
                        : "rgba(255,255,255,0.06)",
                      transition: "background 0.5s ease",
                      position: "absolute",
                    }} />
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: isLit ? node.color : "#1a1a1a",
                      border: `2px solid ${isLit ? node.color : "rgba(255,255,255,0.1)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.4s ease",
                      position: "relative", zIndex: 1,
                      fontSize: 14,
                      boxShadow: isLit ? `0 0 16px ${node.color}66` : "none",
                    }}>
                      {isLit ? "✓" : "○"}
                    </div>
                  </div>

                  {/* Spacer (mirror) */}
                  <div style={{ flex: "0 0 auto", width: "clamp(260px, 45%, 420px)" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stat bar */}
        <div style={{
          marginTop: 64,
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1, background: "rgba(249,115,22,0.1)", borderRadius: 14,
          border: "1px solid rgba(249,115,22,0.15)", overflow: "hidden",
          opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.9s",
        }}>
          {[
            { v: "< 300ms", l: "AI profiling time" },
            { v: "7 triggers", l: "per visitor journey" },
            { v: "0 reps", l: "needed to close" },
          ].map((s) => (
            <div key={s.v} style={{ padding: "24px 20px", textAlign: "center", background: "#111111" }}>
              <p style={{ fontSize: 26, fontWeight: 900, color: "#F97316" }}>{s.v}</p>
              <p style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
