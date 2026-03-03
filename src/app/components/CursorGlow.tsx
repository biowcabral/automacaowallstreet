"use client";

import { useEffect, useRef } from "react";

/**
 * CursorGlow — spring-physics magnetic cursor replacement.
 * A large soft glow orb lags behind with lerp interpolation.
 * A sharp orange dot snaps to the exact cursor position.
 * Both are fixed-position, pointer-events:none, zIndex:9999.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -600, y: -600 });
  const smooth = useRef({ x: -600, y: -600 });
  const ring = useRef({ x: -600, y: -600 });
  const raf = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const target = e.target as Element;
      isHovering.current = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      );
    };

    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.08);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.08);
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.18);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.18);

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${smooth.current.x - 220}px, ${smooth.current.y - 220}px)`;
      }
      if (dotRef.current) {
        const scale = isHovering.current ? 1.8 : 1;
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px) scale(${scale})`;
        dotRef.current.style.opacity = isHovering.current ? "0.6" : "1";
      }
      if (ringRef.current) {
        const size = isHovering.current ? 48 : 32;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor = isHovering.current
          ? "rgba(249,115,22,0.7)"
          : "rgba(249,115,22,0.35)";
      }

      raf.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Soft ambient glow — slow lerp, large radius */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9995,
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.13) 0%, rgba(249,115,22,0.04) 45%, transparent 72%)",
          pointerEvents: "none",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />

      {/* Medium ring — medium lerp speed */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9997,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(249,115,22,0.35)",
          pointerEvents: "none",
          willChange: "transform",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
        }}
      />

      {/* Sharp center dot — no lerp, exact position */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#F97316",
          pointerEvents: "none",
          boxShadow: "0 0 14px #F97316, 0 0 5px rgba(249,115,22,0.9)",
          willChange: "transform",
          transition: "transform 0.1s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
