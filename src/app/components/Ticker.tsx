"use client";

const TICKERS = [
  { sym: "LEAD", val: "+247%", up: true },
  { sym: "CONV", val: "+94.3%", up: true },
  { sym: "CAC",  val: "-61%",   up: false },
  { sym: "LTV",  val: "+312%", up: true },
  { sym: "CHURN",val: "-78%",   up: false },
  { sym: "ROI",  val: "+847%", up: true },
  { sym: "CLOSE",val: "+6.2x", up: true },
  { sym: "DEALS",val: "+183%", up: true },
  { sym: "NPS",  val: "+91pts",up: true },
  { sym: "ARR",  val: "+420%", up: true },
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
