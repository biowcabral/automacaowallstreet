"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 6.2, suffix: "×", label: "More Deals Closed", sub: "vs. unautomated pipeline", color: "#F97316", prefix: "" },
  { value: 847, suffix: "%", label: "Average Client ROI", sub: "within 6 months of deployment", color: "#D97706", prefix: "" },
  { value: 74, suffix: "%", label: "Conversion Rate", sub: "on AI-qualified warm leads", color: "#34D399", prefix: "" },
  { value: 2400, suffix: "+", label: "Automations Deployed", sub: "across 14 industries", color: "#60A5FA", prefix: "" },
];

const PROOF = [
  { quote: "We closed 38 new clients in the first 90 days. The pipeline never slept — it literally worked while we were on vacation.", name: "Mariana T.", role: "CMO · SaaS · São Paulo" },
  { quote: "CAC dropped 61%. LTV went up 3×. I honestly don't know how we ran sales without this.", name: "Rafael M.", role: "Founder · E-commerce · US$2M ARR" },
  { quote: "Six months in, our close rate went from 11% to 74%. Same team. Same offer. Just this machine.", name: "Claudia B.", role: "CEO · Consultancy · 140 staff" },
];

function useCountUp(target: number, active: boolean, duration = 1600): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const iv = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(iv); }
      else setCount(start);
    }, 16);
    return () => clearInterval(iv);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, active, i }: { stat: typeof STATS[0]; active: boolean; i: number }) {
  const val = useCountUp(stat.value, active, 1400 + i * 100);
  const display = stat.value < 10
    ? val.toFixed(1)
    : stat.value < 100
    ? Math.round(val).toString()
    : Math.round(val).toLocaleString();

  return (
    <div style={{
      background: "#111111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16,
      padding: "36px 28px", position: "relative", overflow: "hidden",
      opacity: active ? 1 : 0, transform: active ? "none" : "translateY(28px)",
      transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 20% 80%, ${stat.color}08 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${stat.color}, transparent)`, borderRadius: "16px 16px 0 0" }} />
      <p style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)", fontWeight: 900, color: stat.color, lineHeight: 1, fontFamily: "monospace" }}>
        {stat.prefix}{display}{stat.suffix}
      </p>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#F8FAFC", marginTop: 8 }}>{stat.label}</p>
      <p style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{stat.sub}</p>
    </div>
  );
}

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [proofIdx, setProofIdx] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Cycle testimonials
  useEffect(() => {
    const iv = setInterval(() => setProofIdx(p => (p + 1) % PROOF.length), 4800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "110px 0",
        background: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(249,115,22,0.05) 0%, transparent 70%), #080808",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", color: "#F97316", textTransform: "uppercase" }}>
            ACT IV — The Numbers
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginTop: 12, lineHeight: 1.15,
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            Real Results.<br /><span className="text-orange-grad">Real Clients.</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 64 }}>
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} active={visible} i={i} />)}
        </div>

        {/* Testimonial rotator */}
        <div style={{
          background: "#111111", border: "1px solid rgba(249,115,22,0.15)",
          borderRadius: 16, padding: "40px 40px 32px",
          position: "relative", overflow: "hidden",
          opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, #F97316, #D97706, transparent)",
          }} />

          {/* Big quote mark */}
          <span style={{
            position: "absolute", top: 20, right: 40,
            fontSize: 120, lineHeight: 1, color: "rgba(249,115,22,0.06)",
            fontFamily: "Georgia, serif", userSelect: "none",
          }}>&ldquo;</span>

          <p style={{
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)", color: "#E5E7EB", lineHeight: 1.7,
            fontStyle: "italic", maxWidth: 700, marginBottom: 24,
            transition: "opacity 0.4s ease",
          }}>
            &ldquo;{PROOF[proofIdx].quote}&rdquo;
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontWeight: 700, color: "#F8FAFC", fontSize: 14 }}>{PROOF[proofIdx].name}</p>
              <p style={{ fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>{PROOF[proofIdx].role}</p>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8 }}>
              {PROOF.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setProofIdx(i)}
                  style={{
                    width: i === proofIdx ? 20 : 8, height: 8, borderRadius: 4,
                    background: i === proofIdx ? "#F97316" : "rgba(255,255,255,0.12)",
                    border: "none", cursor: "pointer",
                    transition: "all 0.3s ease", padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Industry strip */}
        <div style={{
          marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, flexWrap: "wrap",
          opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.9s",
        }}>
          <span style={{ fontSize: 11, color: "#6B7280", fontFamily: "monospace", marginRight: 8 }}>DEPLOYED IN:</span>
          {["SaaS", "E-commerce", "Real Estate", "Healthcare", "Education", "Finance", "Consulting", "Retail", "Legal", "Beauty"].map(ind => (
            <span key={ind} style={{
              fontSize: 10, color: "#6B7280", fontFamily: "monospace",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 4, padding: "3px 8px", letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              {ind}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
