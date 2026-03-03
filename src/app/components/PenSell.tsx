"use client";

import { useEffect, useRef, useState } from "react";

/* ── Pen SVG ───────────────────────────────────────────────────── */
function PenSVG({ glowing }: { glowing: boolean }) {
  return (
    <svg viewBox="0 0 60 220" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", filter: glowing ? "drop-shadow(0 0 24px #F97316) drop-shadow(0 0 60px rgba(249,115,22,0.4))" : "drop-shadow(0 0 6px rgba(249,115,22,0.2))", transition: "filter 0.8s ease" }}>
      {/* Body */}
      <rect x="18" y="20" width="24" height="148" rx="4" fill="#1a1a1a" stroke="#F97316" strokeWidth="1.5" />
      {/* Clip/button top */}
      <rect x="24" y="14" width="4" height="16" rx="2" fill="#D97706" />
      <rect x="36" y="14" width="2" height="12" rx="1" fill="#D97706" />
      {/* Brand line */}
      <line x1="18" y1="52" x2="42" y2="52" stroke="#F97316" strokeWidth="0.8" opacity="0.4" />
      {/* Grip section */}
      <rect x="18" y="148" width="24" height="28" rx="3" fill="#111" stroke="#F97316" strokeWidth="1" opacity="0.8" />
      {/* Grip lines */}
      {[154, 159, 164, 169].map(y => (
        <line key={y} x1="20" y1={y} x2="40" y2={y} stroke="#F97316" strokeWidth="0.5" opacity="0.3" />
      ))}
      {/* Tip transition */}
      <path d="M18 176 L22 200 L30 210 L38 200 L42 176 Z" fill="#1a1a1a" stroke="#F97316" strokeWidth="1.2" />
      {/* Ink tip */}
      <circle cx="30" cy="210" r="2.5" fill="#F97316" />
      {/* Shine */}
      <rect x="27" y="28" width="3" height="100" rx="1.5" fill="white" opacity="0.04" />
    </svg>
  );
}

/* ── Node / orbiting item ─────────────────────────────────────── */
function Node({ x, y, icon, label, sub, color, visible, delay = 0 }: {
  x: string; y: string; icon: string; label: string; sub?: string;
  color: string; visible: boolean; delay?: number;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)",
      opacity: visible ? 1 : 0,
      scale: visible ? "1" : "0.6",
      transition: `opacity 0.55s ease ${delay}s, scale 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
      zIndex: 4,
      pointerEvents: "none",
    }}>
      <div style={{
        background: "#111", border: `1px solid ${color}55`,
        borderRadius: 14, padding: "10px 14px",
        boxShadow: `0 0 20px ${color}22`,
        display: "flex", alignItems: "center", gap: 8,
        minWidth: 140, maxWidth: 180,
      }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2 }}>{label}</p>
          {sub && <p style={{ fontSize: 10, color, fontFamily: "monospace", marginTop: 2 }}>{sub}</p>}
        </div>
      </div>
    </div>
  );
}

/* ── SVG connection line (percentage coords in 0-100 viewBox) ── */
function Line({ x1, y1, x2, y2, color, visible, delay = 0 }: {
  x1: number; y1: number; x2: number; y2: number;
  color: string; visible: boolean; delay?: number;
}) {
  const len = Math.hypot(x2 - x1, y2 - y1) * 14; // scale factor for viewBox units
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth="0.3" opacity="0.6"
      strokeDasharray={len}
      strokeDashoffset={visible ? 0 : len}
      style={{ transition: `stroke-dashoffset 0.7s ease ${delay}s` }}
    />
  );
}

/* ── Pulse ring (around pen tip at close moment) ─────────────── */
function PulseRing({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: "18%",
      transform: "translate(-50%, 50%)",
      width: 80, height: 80,
      borderRadius: "50%",
      border: `2px solid #F97316`,
      opacity: visible ? 0 : 0,
      animation: visible ? "pulse-ring 1.2s ease-out 3" : "none",
      pointerEvents: "none",
      zIndex: 3,
    }} />
  );
}

/* ── SOLD stamp ───────────────────────────────────────────────── */
function SoldStamp({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: "absolute", right: "8%", top: "28%",
      transform: visible ? "rotate(-12deg) scale(1)" : "rotate(-20deg) scale(0.4)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      zIndex: 10,
      pointerEvents: "none",
    }}>
      <div style={{
        border: "3px solid #22c55e",
        borderRadius: 8, padding: "8px 16px",
        background: "rgba(34,197,94,0.06)",
        boxShadow: "0 0 30px rgba(34,197,94,0.3)",
      }}>
        <p style={{ fontSize: 28, fontWeight: 900, color: "#22c55e", letterSpacing: "0.1em", lineHeight: 1, fontFamily: "monospace" }}>SOLD</p>
      </div>
    </div>
  );
}

/* ── Deal counter ─────────────────────────────────────────────── */
function Counter({ active }: { active: boolean }) {
  const [n, setN] = useState(1);
  useEffect(() => {
    if (!active) { setN(1); return; }
    const targets = [1, 3, 7, 14, 28, 55, 110, 220, 440, 847, 1200, 2400];
    let idx = 0;
    const iv = setInterval(() => {
      idx++;
      if (idx >= targets.length) { setN(2400); clearInterval(iv); return; }
      setN(targets[idx]);
    }, 160);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div style={{
      position: "absolute", left: "50%", bottom: "10%",
      transform: "translateX(-50%)",
      textAlign: "center",
      opacity: active ? 1 : 0,
      transition: "opacity 0.6s ease",
      zIndex: 10, pointerEvents: "none",
    }}>
      <p style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, color: "#F97316", lineHeight: 1, fontFamily: "monospace" }}>
        {n.toLocaleString()}
      </p>
      <p style={{ fontSize: 11, color: "#9CA3AF", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace" }}>
        pens sold · automatically
      </p>
    </div>
  );
}

/* ── Stage caption ────────────────────────────────────────────── */
const CAPTIONS = [
  { title: "A pen.", sub: "Alone. Worth nothing. Waiting." },
  { title: "Connect automation.", sub: "Turn the pen into a 24/7 salesperson." },
  { title: "Leads appear.", sub: "AI profiles intent before you say a word." },
  { title: "Trigger fires.", sub: "The right message at the exact right moment." },
  { title: "Scale to infinity.", sub: "One pen. Infinite buyers. Zero extra effort." },
];

/* ── Main component ───────────────────────────────────────────── */
export default function PenSell() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const handleScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / totalScroll));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stage thresholds
  const stage = progress < 0.15 ? 0
    : progress < 0.35 ? 1
    : progress < 0.58 ? 2
    : progress < 0.78 ? 3
    : 4;

  const captionIdx = stage;

  // Pen glow increases with stage
  const penGlowing = stage >= 1;

  // SVG dimension constants (percentage of viewport)
  // We'll draw lines in absolute px via CSS — just fade them
  return (
    <div ref={outerRef} style={{ height: "500vh", position: "relative" }}>
      {/* sticky viewport */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        background: "#080808",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Radial glow behind pen */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vmin", height: "80vmin",
          background: `radial-gradient(ellipse, rgba(249,115,22,${0.02 + stage * 0.06}) 0%, transparent 70%)`,
          transition: "background 1s ease",
          pointerEvents: "none",
        }} />

        {/* SVG overlay for connection lines — 0-100 viewBox = percentage coords */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }}>
          {/* Stage 1: line to brain node */}
          <Line x1={50} y1={50} x2={78} y2={38} color="#F97316" visible={stage >= 1} delay={0} />
          {/* Stage 2: lines to lead nodes */}
          <Line x1={50} y1={50} x2={18} y2={36} color="#60A5FA" visible={stage >= 2} delay={0} />
          <Line x1={50} y1={50} x2={18} y2={54} color="#34D399" visible={stage >= 2} delay={0.12} />
          <Line x1={50} y1={50} x2={18} y2={71} color="#A78BFA" visible={stage >= 2} delay={0.24} />
          {/* Stage 3: closing/trigger lines */}
          <Line x1={50} y1={50} x2={80} y2={56} color="#22c55e" visible={stage >= 3} delay={0} />
          <Line x1={50} y1={50} x2={80} y2={72} color="#22c55e" visible={stage >= 3} delay={0.14} />
        </svg>

        {/* ── Pen (center) ── */}
        <div style={{
          position: "absolute", left: "50%", top: "15%",
          transform: "translateX(-50%)",
          width: "clamp(40px, 5vw, 70px)",
          height: "clamp(140px, 20vw, 240px)",
          zIndex: 5,
          transition: "transform 0.6s ease",
          filter: stage === 4 ? "saturate(1.6)" : "none",
        }}>
          <PenSVG glowing={penGlowing} />
        </div>

        {/* ── Stage 1: Automation brain node (right) ── */}
        <Node x="78%" y="38%" icon="🧠" label="AI Engine" sub="always-on · 24/7"
          color="#F97316" visible={stage >= 1} delay={0.1} />

        {/* ── Stage 2: Lead nodes (left) ── */}
        <Node x="18%" y="36%" icon="👤" label="Lead detected" sub="profile scored"
          color="#60A5FA" visible={stage >= 2} delay={0} />
        <Node x="18%" y="54%" icon="👤" label="Intent: HIGH" sub="exit-intent caught"
          color="#34D399" visible={stage >= 2} delay={0.15} />
        <Node x="18%" y="71%" icon="👤" label="Warm lead" sub="3rd visit · ready"
          color="#A78BFA" visible={stage >= 2} delay={0.3} />

        {/* ── Stage 3: trigger nodes (right) + SOLD ── */}
        <Node x="80%" y="56%" icon="⚡" label="Trigger fired" sub="WhatsApp sent"
          color="#22c55e" visible={stage >= 3} delay={0} />
        <Node x="80%" y="72%" icon="💬" label="Objection handled" sub="AI replied in 4s"
          color="#22c55e" visible={stage >= 3} delay={0.15} />
        <SoldStamp visible={stage >= 3} />

        {/* ── Stage 4: scale indicators ── */}
        <Node x="50%" y="20%" icon="🔄" label="Upsell triggered" sub="+$812 avg order"
          color="#D97706" visible={stage >= 4} delay={0} />
        <Counter active={stage >= 4} />

        {/* Pulse ring */}
        <PulseRing visible={stage >= 3} />

        {/* ── Stage 1: floating data chips ── */}
        {stage >= 1 && (
          <div style={{
            position: "absolute", right: "6%", bottom: "22%",
            opacity: stage >= 1 ? 1 : 0,
            transition: "opacity 0.5s ease 0.3s",
            zIndex: 4,
          }}>
            {["UTM tracked", "Source: Google", "Device: Mobile", "Time: 23:40"].map((t, i) => (
              <div key={t} style={{
                fontSize: 10, color: "#6B7280", fontFamily: "monospace",
                background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)",
                borderRadius: 4, padding: "3px 8px", marginBottom: 4,
                opacity: stage >= 1 ? 1 : 0,
                transition: `opacity 0.4s ease ${0.2 + i * 0.1}s`,
              }}>
                {t}
              </div>
            ))}
          </div>
        )}

        {/* ── scroll progress rail ── */}
        <div style={{
          position: "absolute", right: 28, top: "20%", bottom: "20%",
          width: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2,
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: `${progress * 100}%`,
            background: "linear-gradient(180deg, #F97316, #D97706)",
            borderRadius: 2, transition: "height 0.1s ease",
          }} />
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              position: "absolute", left: "50%", top: `${i * 25}%`,
              transform: "translate(-50%, -50%)",
              width: 8, height: 8, borderRadius: "50%",
              background: stage >= i ? "#F97316" : "#1a1a1a",
              border: `1px solid ${stage >= i ? "#F97316" : "rgba(255,255,255,0.1)"}`,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* ── Caption ── */}
        <div style={{
          position: "absolute", left: "50%", bottom: "6%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10, pointerEvents: "none",
          width: "clamp(260px, 50vw, 480px)",
        }}>
          {CAPTIONS.map((c, i) => (
            <div key={i} style={{
              position: i === 0 ? "relative" : "absolute",
              left: i > 0 ? "50%" : undefined,
              top: i > 0 ? 0 : undefined,
              transform: i > 0 ? "translateX(-50%)" : undefined,
              width: "100%",
              opacity: captionIdx === i ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}>
              <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 900, color: "#F8FAFC", lineHeight: 1.15, marginBottom: 8 }}>
                {c.title}
              </p>
              <p style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)", color: "#9CA3AF" }}>
                {c.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Step dots (bottom center) */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: 8, zIndex: 10,
        }}>
          {CAPTIONS.map((_, i) => (
            <div key={i} style={{
              width: captionIdx === i ? 20 : 6, height: 6, borderRadius: 3,
              background: captionIdx === i ? "#F97316" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* Scroll hint (only at start) */}
        <div style={{
          position: "absolute", bottom: 52, left: "50%",
          transform: "translateX(-50%)",
          opacity: progress < 0.05 ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none", zIndex: 10,
        }}>
          <p style={{ fontSize: 10, color: "#4B5563", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>
            scroll to watch the pen sell
          </p>
          <div style={{ width: 1, height: 24, background: "linear-gradient(#F97316, transparent)", margin: "8px auto 0" }} />
        </div>
      </div>
    </div>
  );
}
