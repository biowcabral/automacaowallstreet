"use client";

const TICKERS = [
  { sym: "CONV",  val: "+340%",  up: true  },
  { sym: "CPL",   val: "-58%",   up: false },
  { sym: "TICKET",val: "+2.7×",  up: true  },
  { sym: "BOUNCE", val: "-71%",  up: false },
  { sym: "LEAD",  val: "+219%",  up: true  },
  { sym: "ROI",   val: "+910%",  up: true  },
  { sym: "CTA",   val: "+83%",   up: true  },
  { sym: "SCROLL", val: "+4min", up: true  },
  { sym: "TRUST", val: "+94pts", up: true  },
  { sym: "CLOSE", val: "+6.8×",  up: true  },
];
const ROW = [...TICKERS, ...TICKERS];

export default function Ticker() {
  return (
    <div
      style={{
        background: "rgba(249,115,22,0.07)",
        borderBottom: "1px solid rgba(249,115,22,0.18)",
        borderTop: "1px solid rgba(249,115,22,0.18)",
        padding: "6px 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div className="ticker-track">
        {ROW.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginRight: 32,
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ color: "#6B7280" }}>{t.sym}</span>
            <span style={{ color: t.up ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
              {t.up ? "▲" : "▼"} {t.val}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
