"use client";

import { useEffect, useRef, useState } from "react";

const TRIGGERS = [
  {
    id: "loss",
    icon: "📉",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.2)",
    tag: "Kahneman & Tversky, 1979",
    title: "Loss Aversion",
    science: "The brain processes losses 2.5× more intensely than equivalent gains. Fear of losing activates the amygdala — bypassing rational thought entirely.",
    how: "Exit-intent automation detects cursor velocity toward the browser bar. In that exact 0.3-second window, a personalized message fires: \"You're leaving $4,200 on the table every month without this.\" Calculated dynamically per visitor.",
    stat: "2.5×",
    statLabel: "stronger than gain",
    trigger: "Exit-intent + behavioral velocity",
    impact: "+47% recovered cart abandonments",
  },
  {
    id: "scarcity",
    icon: "⏳",
    color: "#F97316",
    glow: "rgba(249,115,22,0.2)",
    tag: "Cialdini, Influence — 1984",
    title: "Scarcity",
    science: "Rare = valuable. The limbic brain equates limited availability with quality. Scarcity triggers dopamine release — the same circuit as desire and reward.",
    how: "Inventory tracking automation monitors real stock. When units drop below threshold, \"Only 3 left\" fires across email, SMS, retargeting and on-page simultaneously. Real scarcity, amplified at scale.",
    stat: "82%",
    statLabel: "faster decisions under scarcity",
    trigger: "Inventory threshold + multi-channel blast",
    impact: "+61% conversion lift on offers",
  },
  {
    id: "social",
    icon: "👥",
    color: "#60A5FA",
    glow: "rgba(96,165,250,0.2)",
    tag: "Cialdini · Social Proof",
    title: "Social Proof",
    science: "Under uncertainty, humans defer to group behavior as a cognitive shortcut. \"If 847 people are looking at this, it must be valuable\" — the brain calculates safety in numbers.",
    how: "Live visitor aggregation automation displays real-time counts, recent purchase notifications and behavior-matched testimonials — served by AI based on the prospect's exact industry, company size and pain point.",
    stat: "63%",
    statLabel: "of consumers trust peer review",
    trigger: "Real-time visitor tracking + AI matching",
    impact: "+38% trust score in cold audiences",
  },
  {
    id: "reciprocity",
    icon: "🎁",
    color: "#34D399",
    glow: "rgba(52,211,153,0.2)",
    tag: "Cialdini · Reciprocity",
    title: "Reciprocity",
    science: "Receiving a gift creates a psychological debt the brain urgently wants to repay. The bigger and more unexpected the gift, the stronger the compulsion to reciprocate.",
    how: "Lead magnet automation delivers significant free value (personalized ROI report, industry audit, tool) within 60 seconds of first contact — before any ask. The follow-up sequence then arrives when the debt is at its peak.",
    stat: "3.1×",
    statLabel: "higher response to post-gift ask",
    trigger: "First-touch → instant value delivery",
    impact: "+219% email reply rate post-gift",
  },
  {
    id: "authority",
    icon: "🏆",
    color: "#D97706",
    glow: "rgba(217,119,6,0.2)",
    tag: "Milgram · Authority Principle",
    title: "Authority",
    science: "The brain uses authority as a heuristic to reduce cognitive load. Expert signals — credentials, logos, case studies — short-circuit the 'why should I trust you?' objection before it's raised.",
    how: "Behavior-profiling automation identifies the visitor's industry and company size, then dynamically serves the most relevant proof: the right logos, the right case study, the right result. The perfect credential at the perfect moment.",
    stat: "92%",
    statLabel: "of buyers influenced by authority signals",
    trigger: "Visitor profile → AI-matched proof",
    impact: "+54% reduction in sales cycle length",
  },
  {
    id: "urgency",
    icon: "⚡",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.2)",
    tag: "Temporal Discounting Theory",
    title: "Urgency",
    science: "The brain sharply discounts future rewards. A deadline triggers the prefrontal cortex to prioritize NOW over later — interrupting the procrastination loop that kills most deals.",
    how: "Dynamic deadline automation creates real, enforced time constraints — not fake timers. Each prospect gets a personalized deadline based on their behavior. Miss it, the offer changes. The urgency is genuine, and the brain knows it.",
    stat: "67%",
    statLabel: "of purchases made within deadline window",
    trigger: "Behavioral deadline engine + enforcement",
    impact: "+73% deals closed on first offer",
  },
];

export default function NeuroBrains() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "110px 0",
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 60%), #080808",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", color: "#F97316", textTransform: "uppercase" }}>
            ACT II — The Science
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginTop: 12, lineHeight: 1.15,
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            6 Neuroscience Triggers{" "}
            <span className="text-orange-grad">That Close Deals</span>
          </h2>
          <p
            style={{
              marginTop: 16, color: "#9CA3AF", fontSize: 16, maxWidth: 580, margin: "16px auto 0",
              opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s",
            }}
          >
            Peer-reviewed psychology, weaponised by automation. Each trigger fires at the exact neurological moment it has maximum impact.
          </p>
        </div>

        {/* Trigger cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {TRIGGERS.map((t, i) => {
            const isActive = active === t.id;
            return (
              <div
                key={t.id}
                onMouseEnter={() => setActive(t.id)}
                onMouseLeave={() => setActive(null)}
                style={{
                  background: isActive ? `rgba(${t.color === "#F97316" ? "249,115,22" : t.color === "#ef4444" ? "239,68,68" : t.color === "#60A5FA" ? "96,165,250" : t.color === "#34D399" ? "52,211,153" : t.color === "#D97706" ? "217,119,6" : "167,139,250"},0.06)` : "#111111",
                  border: `1px solid ${isActive ? t.color + "55" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 16, padding: "32px 28px",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  position: "relative", overflow: "hidden",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transitionDelay: `${0.1 + i * 0.1}s`,
                  boxShadow: isActive ? `0 0 40px ${t.glow}` : "none",
                }}
              >
                {/* Top number */}
                <span style={{
                  position: "absolute", top: 20, right: 24,
                  fontSize: 60, fontWeight: 900, color: "rgba(255,255,255,0.03)",
                  lineHeight: 1, fontFamily: "monospace",
                  userSelect: "none",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#F8FAFC" }}>{t.title}</h3>
                    <span style={{ fontSize: 10, color: t.color, fontFamily: "monospace", letterSpacing: "0.08em" }}>{t.tag}</span>
                  </div>
                </div>

                {/* Science */}
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, color: "#6B7280", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>THE SCIENCE</p>
                  <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.7 }}>{t.science}</p>
                </div>

                {/* Automation deployment */}
                <div style={{
                  background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "14px 16px", marginBottom: 16,
                  borderLeft: `3px solid ${t.color}`,
                }}>
                  <p style={{ fontSize: 11, color: t.color, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 6 }}>AUTOMATION FIRES:</p>
                  <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.65 }}>{t.how}</p>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p style={{ fontSize: 28, fontWeight: 900, color: t.color, lineHeight: 1 }}>{t.stat}</p>
                    <p style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.statLabel}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 11, color: "#22c55e", fontFamily: "monospace" }}>{t.impact}</p>
                    <p style={{ fontSize: 10, color: "#6B7280" }}>avg. client result</p>
                  </div>
                </div>

                {/* Trigger type pill */}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "monospace" }}>TRIGGER: </span>
                  <span style={{ fontSize: 10, color: t.color, fontFamily: "monospace" }}>{t.trigger}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div
          style={{
            marginTop: 64, textAlign: "center", padding: "36px 24px",
            background: "linear-gradient(135deg, rgba(249,115,22,0.07), rgba(217,119,6,0.03))",
            border: "1px solid rgba(249,115,22,0.15)", borderRadius: 16,
            opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.8s",
          }}
        >
          <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.5 }}>
            Jordan Belfort used these triggers manually.<br />
            <span style={{ color: "#F97316" }}>You can fire all six simultaneously — for every visitor — automatically.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
