import Ticker from "./components/Ticker";
import Hero from "./components/Hero";
import PenSell from "./components/PenSell";
import PenScene from "./components/PenScene";
import AutoFlow from "./components/AutoFlow";
import Results from "./components/Results";
import FinalCTA from "./components/FinalCTA";
import CursorGlow from "./components/CursorGlow";
import Grain from "./components/Grain";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh", paddingTop: "60px" }}>
      {/* Global visual effects */}
      <CursorGlow />
      <Grain />
      <Navbar />
      <Ticker />
      <Hero />
      <PenSell />
      <PenScene />
      <AutoFlow />
      <Results />
      <FinalCTA />
    </main>
  );
}
