import Ticker from "./components/Ticker";
import Hero from "./components/Hero";
import PenSell from "./components/PenSell";
import PenScene from "./components/PenScene";
import NeuroBrains from "./components/NeuroBrains";
import AutoFlow from "./components/AutoFlow";
import Results from "./components/Results";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <Ticker />
      <Hero />
      <PenSell />
      <PenScene />
      <NeuroBrains />
      <AutoFlow />
      <Results />
      <FinalCTA />
    </main>
  );
}
