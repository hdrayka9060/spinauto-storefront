import HeroSection from "@/components/home/HeroSection";
import FeatureTiles from "@/components/home/FeatureTiles";
import WelcomeBand from "@/components/home/WelcomeBand";
import FinancingCTA from "@/components/home/FinancingCTA";
import LocationBand from "@/components/home/LocationBand";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureTiles />
      <WelcomeBand />
      <FinancingCTA />
      <LocationBand />
    </>
  );
}
