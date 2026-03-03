"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   DATA — 6 neuro triggers woven into the story
   ───────────────────────────────────────────── */
const TRIGGERS = [
  {
    id: "loss",
    icon: "📉",
    color: "#ef4444",
    dimColor: "rgba(239,68,68,0.12)",
    glowColor: "rgba(239,68,68,0.18)",
    act: "The hook",
    storyHeadline: "Make them fear losing it.",
    storySub: "Before they want the pen — they fear not having one.",
    tag: "Kahneman & Tversky, 1979",
    trigger: "LOSS AVERSION",
    science: "The brain processes losses 2.5× more intensely than equivalent gains. Fear of losing activates the amygdala — bypassing rational thought entirely.",
    automation: "Exit-intent automation detects cursor velocity toward the browser bar. In that exact 0.3-second window: \"You're leaving $4,200/month on the table.\" Calculated dynamically per visitor.",
    stat: "2.5×",
    statLabel: "stronger than gain",
    impact: "+47% recovered abandonments",
    visual: "exit",
  },
  {
    id: "scarcity",
    icon: "⏳",
    color: "#F97316",
    dimColor: "rgba(249,115,22,0.10)",
    glowColor: "rgba(249,115,22,0.18)",
    act: "The rarity",
    storyHeadline: "Only 2 left.",
    storySub: "Scarcity turns an ordinary pen into the one pen they need right now.",
    tag: "Cialdini, Influence — 1984",
    trigger: "SCARCITY",
    science: "Rare = valuable. The limbic brain equates limited availability with quality. Scarcity triggers dopamine release — the same circuit as desire and reward.",
    automation: "Inventory tracking monitors real stock. When units drop below threshold, \"Only 2 left\" fires across email, SMS, retargeting and on-page simultaneously. Real scarcity, amplified at scale.",
    stat: "82%",
    statLabel: "faster decisions under scarcity",
    impact: "+61% conversion lift",
    visual: "counter",
  },
  {
    id: "social",
    icon: "👥",
    color: "#60A5FA",
    dimColor: "rgba(96,165,250,0.10)",
    glowColor: "rgba(96,165,250,0.18)",
    act: "The crowd",
    storyHeadline: "847 people are looking at this pen.",
    storySub: "If everyone wants it, the brain calculates it must be worth having.",
    tag: "Cialdini · Social Proof",
    trigger: "SOCIAL PROOF",
    science: "Under uncertainty, humans defer to group behavior as a cognitive shortcut. \"If 847 people are looking at this, it must be valuable\" — the brain calculates safety in numbers.",
    automation: "Live visitor aggregation displays real-time counts, recent purchase notifications and behavior-matched testimonials — served by AI based on exact industry, company size and pain point.",
    stat: "63%",
    statLabel: "of consumers trust peer review",
    impact: "+38% trust in cold audiences",
    visual: "crowd",
  },
  {
    id: "reciprocity",
    icon: "🎁",
    color: "#34D399",
    dimColor: "rgba(52,211,153,0.10)",
    glowColor: "rgba(52,211,153,0.18)",
    act: "The gift",
    storyHeadline: "Here — take this. No strings.",
    storySub: "Give first. The brain creates a debt it urgently needs to repay.",
    tag: "Cialdini · Reciprocity",
    trigger: "RECIPROCITY",
    science: "Receiving a gift creates a psychological debt the brain urgently wants to repay. The bigger and more unexpected the gift, the stronger the compulsion to reciprocate.",
    automation: "Lead magnet automation delivers significant free value — personalized ROI report, industry audit, tool — within 60 seconds of first contact, before any ask. Follow-up arrives when the debt peaks.",
    stat: "3.1×",
    statLabel: "higher response post-gift",
    impact: "+219% email reply rate",
    visual: "gift",
  },
  {
    id: "authority",
    icon: "🏆",
    color: "#D97706",
    dimColor: "rgba(217,119,6,0.10)",
    glowColor: "rgba(217,119,6,0.18)",
    act: "The credibility",
    storyHeadline: "2,400 companies trust this pen.",
    storySub: "Authority signals short-circuit the 'why should I trust you?' objection before it's raised.",
    tag: "Milgram · Authority Principle",
    trigger: "AUTHORITY",
    science: "The brain uses authority as a heuristic to reduce cognitive load. Expert signals — credentials, logos, case studies — short-circuit doubt before it crystallises.",
    automation: "Behavior-profiling automation identifies the visitor's industry and size, then dynamically serves the most relevant proof: the right logos, case study, result. The perfect credential at the perfect moment.",
    stat: "92%",
    statLabel: "influenced by authority signals",
    impact: "−54% sales cycle length",
    visual: "badges",
  },
  {
    id: "urgency",
    icon: "⚡",
    color: "#A78BFA",
    dimColor: "rgba(167,139,250,0.10)",
    glowColor: "rgba(167,139,250,0.18)",
    act: "The close",
    storyHeadline: "Offer expires in 11:47.",
    storySub: "A real deadline forces the prefrontal cortex to decide now instead of later.",
    tag: "Temporal Discounting Theory",
    trigger: "URGENCY",
    science: "The brain sharply discounts future rewards. A deadline triggers the prefrontal cortex to prioritize NOW over later — interrupting the procrastination loop that kills most deals.",
    automation: "Dynamic deadline automation creates real, enforced time constraints — not fake timers. Each prospect gets a personalized deadline based on behavior. Miss it, the offer changes. The urgency is genuine.",
    stat: "67%",
    statLabel: "of purchases within deadline",
    impact: "+73% deals closed on first offer",
    visual: "timer",
  },
];

/* ─────────────────────────────────────────────
   PEN SVG
   ───────────────────────────────────────────── */
function PenSVG({ color, glow }: { color: string; glow: boolean }) {
  return (
    <svg viewBox="0 0 60 220" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%", height: "100%",
        filter: glow
          ? `drop-shadow(0 0 18px ${color}) drop-shadow(0 0 50px ${color}66)`
          : "drop-shadow(0 0 6px rgba(249,115,22,0.25))",
        transition: "filter 0.9s ease",
      }}>
      <rect x="18" y="18" width="24" height="150" rx="4" fill="#1a1a1a" stroke={color} strokeWidth="1.5" />
      <rect x="24" y="12" width="4" height="16" rx="2" fill="#D97706" />
      <rect x="36" y="12" width="2" height="12" rx="1" fill="#D97706" />
      <line x1="18" y1="50" x2="42" y2="50" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <rect x="18" y="148" width="24" height="28" rx="3" fill="#111" stroke={color} strokeWidth="1" opacity="0.7" />
      {[154, 159, 164, 169].map(y => (
        <line key={y} x1="20" y1={y} x2="40" y2={y} stroke={color} strokeWidth="0.5" opacity="0.3" />
      ))}
      <path d="M18 176 L22 200 L30 210 L38 200 L42 176 Z" fill="#1a1a1a" stroke={color} strokeWidth="1.2" />
      <circle cx="30" cy="210" r="2.5" fill={color} />
      <rect x="27" y="26" width="3" height="100" rx="1.5" fill="white" opacity="0.04" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   STAGE VISUALS — what orbits the pen per trigger
   ───────────────────────────────────────────── */
function StageVisual({ visual, color, visible }: { visual: string; color: string; visible: boolean }) {
  const [tick, setTick] = useState(47);
  const [crowd, setCrowd] = useState(847);
  const [timer, setTimer] = useState({ m: 11, s: 47 });

  useEffect(() => {
    if (!visible) return;
    if (visual === "counter") {
      const iv = setInterval(() => setTick(t => (t <= 2 ? 2 : t - 1)), 320);
      return () => clearInterval(iv);
    }
    if (visual === "crowd") {
      const iv = setInterval(() => setCrowd(c => c + Math.floor(Math.random() * 3 - 1)), 900);
      return () => clearInterval(iv);
    }
    if (visual === "timer") {
      const iv = setInterval(() => setTimer(t => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { m: t.m - 1, s: 59 };
        return { m: 0, s: 0 };
      }), 1000);
      return () => clearInterval(iv);
    }
  }, [visible, visual]);

  const base: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.7)",
    transition: "opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
    pointerEvents: "none" as const,
  };

  if (visual === "exit") return (
    <div style={{ ...base, position: "absolute", top: "10%", right: "5%", zIndex: 6 }}>
      <div style={{
        background: "#1a0808", border: "1px solid rgba(239,68,68,0.4)",
        borderRadius: 12, padding: "14px 18px", maxWidth: 220,
        boxShadow: "0 0 40px rgba(239,68,68,0.2)",
      }}>
        <p style={{ fontSize: 10, color: "#ef4444", fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.08em" }}>⚠ EXIT DETECTED</p>
        <p style={{ fontSize: 13, color: "#F8FAFC", lineHeight: 1.5, fontWeight: 600 }}>
          You&apos;re leaving <span style={{ color: "#ef4444" }}>$4,200</span> on the table every month.
        </p>
        <div style={{ marginTop: 8, height: 2, background: "linear-gradient(90deg, #ef4444, transparent)", borderRadius: 1 }} />
        <p style={{ fontSize: 10, color: "#6B7280", marginTop: 6 }}>Calculated for your business · real-time</p>
      </div>
    </div>
  );

  if (visual === "counter") return (
    <div style={{ ...base, position: "absolute", top: "10%", left: "50%", transform: visible ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.7)", zIndex: 6, pointerEvents: "none" }}>
      <div style={{
        background: "#140900", border: `1px solid ${color}55`,
        borderRadius: 12, padding: "12px 28px", textAlign: "center",
        boxShadow: `0 0 40px ${color}33`,
      }}>
        <p style={{ fontSize: 10, color, fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 6 }}>STOCK LEVEL</p>
        <p style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, fontFamily: "monospace" }}>{tick}</p>
        <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>units remaining</p>
        <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: "#1a1a1a" }}>
          <div style={{ width: `${(tick / 47) * 100}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.3s ease" }} />
        </div>
      </div>
    </div>
  );

  if (visual === "crowd") return (
    <div style={{ ...base, position: "absolute", top: "10%", left: "50%", transform: visible ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.7)", zIndex: 6, pointerEvents: "none" }}>
      <div style={{
        background: "#000d1a", border: `1px solid ${color}44`,
        borderRadius: 12, padding: "12px 22px",
        boxShadow: `0 0 30px ${color}22`,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{ display: "flex" }}>
          {["🧑","👩","👨","🧑","👩","🧔"].map((e, i) => (
            <span key={i} style={{ fontSize: 20, marginLeft: i > 0 ? -8 : 0, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))" }}>{e}</span>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 30, fontWeight: 900, color, fontFamily: "monospace", lineHeight: 1 }}>{crowd.toLocaleString()}</p>
          <p style={{ fontSize: 10, color: "#9CA3AF" }}>people viewing right now</p>
        </div>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, animation: "pulse-orange 1.5s infinite" }} />
      </div>
    </div>
  );

  if (visual === "gift") return (
    <div style={{ ...base, position: "absolute", top: "10%", left: "50%", transform: visible ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.7)", zIndex: 6, pointerEvents: "none" }}>
      <div style={{
        background: "#001409", border: `1px solid ${color}44`,
        borderRadius: 14, padding: "16px 24px", textAlign: "center",
        boxShadow: `0 0 40px ${color}22`,
      }}>
        <p style={{ fontSize: 36, marginBottom: 8 }}>🎁</p>
        <p style={{ fontSize: 11, color, fontFamily: "monospace", letterSpacing: "0.1em" }}>FREE ROI ANALYSIS</p>
        <p style={{ fontSize: 10, color: "#6B7280", marginTop: 6 }}>Delivered in 60 seconds · Zero ask</p>
        <div style={{ marginTop: 10, padding: "4px 12px", background: `${color}18`, borderRadius: 20, display: "inline-block" }}>
          <p style={{ fontSize: 10, color, fontFamily: "monospace" }}>✓ Sent automatically</p>
        </div>
      </div>
    </div>
  );

  if (visual === "badges") return (
    <div style={{ ...base, position: "absolute", top: "10%", left: "50%", transform: visible ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.7)", zIndex: 6, pointerEvents: "none" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", maxWidth: 340 }}>
        {["Forbes ↗", "Y Combinator", "G2 #1 · 2025", "2,400+ clients", "ISO 9001", "SOC 2"].map((b, i) => (
          <span key={b} style={{
            fontSize: 10, color, background: `${color}0f`,
            border: `1px solid ${color}44`, borderRadius: 6,
            padding: "5px 12px", fontFamily: "monospace", fontWeight: 700,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.4s ease ${i * 0.08}s`,
          }}>{b}</span>
        ))}
      </div>
    </div>
  );

  if (visual === "timer") return (
    <div style={{ ...base, position: "absolute", top: "10%", left: "50%", transform: visible ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.7)", zIndex: 6, pointerEvents: "none" }}>
      <div style={{
        background: "#08001a", border: `1px solid ${color}55`,
        borderRadius: 14, padding: "16px 32px", textAlign: "center",
        boxShadow: `0 0 50px ${color}33`,
      }}>
        <p style={{ fontSize: 10, color, fontFamily: "monospace", letterSpacing: "0.2em", marginBottom: 10 }}>OFFER EXPIRES</p>
        <p style={{ fontSize: 52, fontWeight: 900, color, fontFamily: "monospace", lineHeight: 1, letterSpacing: "0.05em" }}>
          {String(timer.m).padStart(2, "0")}:{String(timer.s).padStart(2, "0")}
        </p>
        <p style={{ fontSize: 10, color: "#6B7280", marginTop: 8 }}>Then the price changes. Permanently.</p>
      </div>
    </div>
  );

  return null;
}

/* ─────────────────────────────────────────────
   HOVER SCIENCE CARD — the trigger pill + detail
   ───────────────────────────────────────────── */
function ScienceCard({ t, visible, side }: {
  t: typeof TRIGGERS[0]; visible: boolean; side: "left" | "right";
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      position: "absolute",
      [side]: "2%",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 20,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.5s ease",
    }}>
      {/* Always-visible trigger pill */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          background: hovered ? t.dimColor : "#0f0f0f",
          border: `1px solid ${hovered ? t.color + "99" : t.color + "44"}`,
          borderRadius: 50, padding: "10px 18px",
          cursor: "pointer",
          transition: "all 0.25s ease",
          boxShadow: hovered ? `0 0 30px ${t.glowColor}, 0 0 60px ${t.glowColor}` : "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          position: "relative", zIndex: 21,
        }}
      >
        <span style={{ fontSize: 20 }}>{t.icon}</span>
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, color: t.color, letterSpacing: "0.08em" }}>{t.trigger}</p>
          <p style={{ fontSize: 9, color: "#6B7280", fontFamily: "monospace" }}>{t.tag}</p>
        </div>
        <span style={{ fontSize: 10, color: t.color + "99", marginLeft: 2 }}>{hovered ? "▾" : "▸"}</span>
      </div>

      {/* Expanded detail on hover */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "absolute",
          [side === "right" ? "right" : "left"]: 0,
          top: "calc(100% + 8px)",
          width: 290,
          background: "#0f0f0f",
          border: `1px solid ${t.color}44`,
          borderRadius: 14,
          overflow: "hidden",
          maxHeight: hovered ? 480 : 0,
          opacity: hovered ? 1 : 0,
          transition: "max-height 0.45s ease, opacity 0.3s ease",
          boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 40px ${t.glowColor}`,
          zIndex: 30,
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        {/* Science */}
        <div style={{ borderLeft: `3px solid ${t.color}`, padding: "16px", background: `${t.color}06` }}>
          <p style={{ fontSize: 9, color: t.color, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 8 }}>THE SCIENCE</p>
          <p style={{ fontSize: 12.5, color: "#D1D5DB", lineHeight: 1.7 }}>{t.science}</p>
        </div>
        {/* Automation */}
        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontSize: 9, color: t.color, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 8 }}>AUTOMATION FIRES:</p>
          <p style={{ fontSize: 12.5, color: "#9CA3AF", lineHeight: 1.7 }}>{t.automation}</p>
        </div>
        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.3)",
        }}>
          <div>
            <p style={{ fontSize: 26, fontWeight: 900, color: t.color, lineHeight: 1, fontFamily: "monospace" }}>{t.stat}</p>
            <p style={{ fontSize: 9, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.statLabel}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 11, color: "#22c55e", fontFamily: "monospace", fontWeight: 700 }}>{t.impact}</p>
            <p style={{ fontSize: 9, color: "#6B7280" }}>avg. client result</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SOLD STAMP
   ───────────────────────────────────────────── */
function SoldStamp({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: "absolute", left: "50%", top: "42%",
      transform: visible
        ? "translate(-50%, -50%) rotate(-6deg) scale(1)"
        : "translate(-50%, -50%) rotate(-28deg) scale(0.2)",
      opacity: visible ? 1 : 0,
      transition: "all 0.55s cubic-bezier(0.34,1.56,0.64,1)",
      zIndex: 15, pointerEvents: "none",
    }}>
      <div style={{
        border: "4px solid #22c55e", borderRadius: 12,
        padding: "10px 28px",
        background: "rgba(34,197,94,0.06)",
        boxShadow: "0 0 80px rgba(34,197,94,0.45), 0 0 20px rgba(34,197,94,0.2)",
      }}>
        <p style={{ fontSize: 48, fontWeight: 900, color: "#22c55e", fontFamily: "monospace", letterSpacing: "0.15em" }}>
          SOLD
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function PenSell() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      const el = outerRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // 8 stages: 0=intro, 1-6=triggers, 7=sold
  // 700vh → each stage ~1 viewport of scroll
  const totalStages = 8;
  const rawStage = progress * (totalStages - 1);
  const stage = Math.min(7, Math.floor(rawStage));
  const stageProgress = rawStage - stage;

  const triggerIdx = stage >= 1 && stage <= 6 ? stage - 1 : -1;
  const currentTrigger = triggerIdx >= 0 ? TRIGGERS[triggerIdx] : null;
  const isSold = stage >= 7;

  const penColor = currentTrigger ? currentTrigger.color : "#F97316";

  return (
    <div ref={outerRef} style={{ height: "700vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        background: "#080808",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Dynamic atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: currentTrigger
            ? `radial-gradient(ellipse 65% 55% at 50% 50%, ${currentTrigger.glowColor} 0%, transparent 65%)`
            : "radial-gradient(ellipse 35% 30% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 65%)",
          transition: "background 1.1s ease",
        }} />

        {/* Subtle horizontal scan lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "100% 72px",
        }} />

        {/* Top section label */}
        <div style={{
          position: "absolute", top: 24, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10, pointerEvents: "none",
          transition: "opacity 0.4s ease",
        }}>
          {/* Intro label */}
          {stage === 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)",
              borderRadius: 50, padding: "6px 18px",
            }}>
              <span style={{ fontSize: 10, color: "#F97316", fontFamily: "monospace", letterSpacing: "0.15em" }}>
                SCROLL TO WATCH THE SALE UNFOLD
              </span>
            </div>
          )}
          {/* Trigger label */}
          {currentTrigger && !isSold && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: currentTrigger.dimColor,
              border: `1px solid ${currentTrigger.color}33`,
              borderRadius: 50, padding: "6px 18px",
            }}>
              <span style={{ fontSize: 14 }}>{currentTrigger.icon}</span>
              <span style={{ fontSize: 11, color: currentTrigger.color, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.1em" }}>
                TRIGGER {triggerIdx + 1}/6 · {currentTrigger.trigger}
              </span>
              <span style={{ fontSize: 9, color: "#6B7280", fontFamily: "monospace" }}>· {currentTrigger.tag}</span>
            </div>
          )}
          {/* Sold label */}
          {isSold && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 50, padding: "6px 18px",
            }}>
              <span style={{ fontSize: 11, color: "#22c55e", fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.12em" }}>
                ✓ ALL 6 TRIGGERS DEPLOYED · PEN SOLD
              </span>
            </div>
          )}
        </div>

        {/* ── PEN — stays center, color + glow changes ── */}
        <div style={{
          position: "absolute", left: "50%", top: "8%",
          transform: `translateX(-50%) scale(${isSold ? 0.35 : 1})`,
          width: "clamp(40px, 5vw, 66px)",
          height: "clamp(140px, 20vw, 240px)",
          zIndex: 8,
          transition: "transform 0.8s cubic-bezier(0.34,1.56,0.64,1), opacity 0.8s ease",
          opacity: isSold ? 0.2 : 1,
        }}>
          <PenSVG color={penColor} glow={stage >= 1} />
        </div>

        {/* ── Stage visual per trigger ── */}
        {currentTrigger && !isSold && (
          <StageVisual
            visual={currentTrigger.visual}
            color={currentTrigger.color}
            visible={stageProgress > 0.18}
          />
        )}

        {/* ── Science pill — alternates left/right ── */}
        {TRIGGERS.map((t, i) => (
          <ScienceCard
            key={t.id}
            t={t}
            visible={stage === i + 1 && stageProgress > 0.15}
            side={i % 2 === 0 ? "right" : "left"}
          />
        ))}

        {/* ── SOLD stamp ── */}
        <SoldStamp visible={isSold} />

        {/* ── Final message ── */}
        {isSold && (
          <div style={{
            position: "absolute", left: "50%", bottom: "12%",
            transform: "translateX(-50%)",
            textAlign: "center", zIndex: 10, pointerEvents: "none",
            opacity: 1, transition: "opacity 0.8s ease 0.6s",
          }}>
            <p style={{ fontSize: 13, color: "#9CA3AF", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
              6 triggers · 1 pipeline · zero effort
            </p>
            <p style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#F97316", lineHeight: 1 }}>
              The pen sells itself.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", marginTop: 10 }}>Now scale it to every product you own.</p>
          </div>
        )}

        {/* ── Story captions (bottom center) ── */}
        {!isSold && (
          <div style={{
            position: "absolute", left: "50%", bottom: "7%",
            transform: "translateX(-50%)",
            textAlign: "center", zIndex: 10, pointerEvents: "none",
            width: "clamp(280px, 54vw, 560px)",
          }}>
            {/* Stage 0: intro */}
            <div style={{ opacity: stage === 0 ? 1 : 0, transition: "opacity 0.45s ease", position: "relative" }}>
              <p style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.6rem)", fontWeight: 900, color: "#F8FAFC", lineHeight: 1.15 }}>
                A pen.<br /><span style={{ color: "#6B7280" }}>Just a pen.</span>
              </p>
              <p style={{ fontSize: 13, color: "#6B7280", marginTop: 12, lineHeight: 1.6 }}>
                Jordan Belfort used six psychological triggers to sell it.<br />
                Automation uses all six — simultaneously — for every visitor.
              </p>
            </div>

            {/* Trigger captions */}
            {TRIGGERS.map((t, i) => (
              <div key={t.id} style={{
                position: "absolute", left: "50%", top: 0, width: "100%",
                transform: "translateX(-50%)",
                opacity: stage === i + 1 ? 1 : 0,
                transition: "opacity 0.45s ease",
                pointerEvents: "none",
              }}>
                <p style={{
                  fontSize: 10, color: t.color, fontFamily: "monospace",
                  letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12,
                }}>
                  {t.act}
                </p>
                <p style={{
                  fontSize: "clamp(1.4rem, 3.6vw, 2.5rem)", fontWeight: 900,
                  color: "#F8FAFC", lineHeight: 1.2, marginBottom: 12,
                }}>
                  {t.storyHeadline}
                </p>
                <p style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)", color: "#9CA3AF", lineHeight: 1.65 }}>
                  {t.storySub}
                </p>
                <p style={{ fontSize: 9, color: t.color + "77", marginTop: 10, fontFamily: "monospace", letterSpacing: "0.1em" }}>
                  HOVER THE PILL TO SEE THE SCIENCE →
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Progress rail ── */}
        <div style={{
          position: "absolute", right: 18, top: "50%",
          transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 0, zIndex: 20,
          height: 180,
          justifyContent: "space-between",
        }}>
          {/* Track */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            transform: "translateX(-50%)", width: 1,
            background: "rgba(255,255,255,0.06)",
          }}>
            <div style={{
              width: "100%",
              height: `${Math.min(100, (stage / 7) * 100)}%`,
              background: `linear-gradient(180deg, #F97316, ${currentTrigger?.color ?? "#22c55e"})`,
              transition: "height 0.5s ease, background 0.8s ease",
            }} />
          </div>
          {/* Dots */}
          {[
            { s: 0, c: "#F97316" },
            ...TRIGGERS.map((t, i) => ({ s: i + 1, c: t.color })),
            { s: 7, c: "#22c55e" },
          ].map(({ s, c }) => (
            <div key={s} style={{
              width: stage === s ? 9 : 5,
              height: stage === s ? 9 : 5,
              borderRadius: "50%",
              background: stage >= s ? c : "rgba(255,255,255,0.1)",
              border: stage === s ? `2px solid ${c}` : "1px solid transparent",
              boxShadow: stage === s ? `0 0 10px ${c}` : "none",
              transition: "all 0.35s ease",
              position: "relative", zIndex: 1,
            }} />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <div style={{
          position: "absolute", bottom: 24, left: "50%",
          transform: "translateX(-50%)",
          opacity: progress < 0.03 ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none", zIndex: 10, textAlign: "center",
        }}>
          <p style={{ fontSize: 9, color: "#9CA3AF", fontFamily: "monospace", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            scroll to watch the pen sell
          </p>
          <div style={{ width: 1, height: 20, background: "linear-gradient(#F97316, transparent)", margin: "8px auto 0" }} />
        </div>
      </div>
    </div>
  );
}
