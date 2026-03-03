"use client";

/**
 * Grain — animated SVG feTurbulence film-grain overlay.
 * Shifts a few pixels every 80ms to simulate 35mm noise.
 * Pointer-events: none so it never blocks interaction.
 */
export default function Grain() {
  return (
    <>
      {/* SVG filter definition */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "fixed", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id="film-grain" x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
            <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Grain layer — white plane passed through the filter at low opacity */}
      <div
        className="grain-layer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9994,
          pointerEvents: "none",
          background: "white",
          opacity: 0.04,
          filter: "url(#film-grain)",
        }}
      />
    </>
  );
}
