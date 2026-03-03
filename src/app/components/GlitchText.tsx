"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!?";

/**
 * GlitchText — types characters as random scramble, then resolves
 * left-to-right to the real text, like a hacker terminal decode.
 * After resolve, randomly "glitches" a few chars every few seconds.
 */
export default function GlitchText({
  text,
  style,
  className,
  delay = 0,
  speed = 36,
}: {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  const [display, setDisplay] = useState(() =>
    text
      .split("")
      .map((c) => (c === " " ? " " : rand()))
      .join("")
  );

  const resolved = useRef(0);
  const done = useRef(false);

  // Initial decode phase
  useEffect(() => {
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        resolved.current += 1;
        if (resolved.current > text.length) {
          setDisplay(text);
          done.current = true;
          clearInterval(iv);
          return;
        }
        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              if (i < resolved.current) return c;
              return rand();
            })
            .join("")
        );
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  // Periodic glitch bursts after resolve
  useEffect(() => {
    const glitch = setInterval(() => {
      if (!done.current) return;
      let cycles = 0;
      const burst = setInterval(() => {
        cycles++;
        setDisplay((prev) =>
          prev
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              // Glitch 2-3 random positions
              if ([
                Math.floor(Math.random() * text.length),
                Math.floor(Math.random() * text.length),
              ].includes(i))
                return rand();
              return text[i];
            })
            .join("")
        );
        if (cycles > 5) {
          setDisplay(text);
          clearInterval(burst);
        }
      }, 60);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(glitch);
  }, [text]);

  return (
    <span className={className} style={{ fontFamily: "monospace", ...style }}>
      {display}
    </span>
  );
}
