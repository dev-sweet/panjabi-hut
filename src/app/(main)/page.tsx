import HeroSection from "@/components/Home/HeroSection/HeroSection";
import EidCollection from "@/components/Home/EidCollection/EidCollection";
import Trending from "@/components/Home/Trending/Trending";
import PremiumPanjabi from "@/components/Home/PremiumPanjabi/PremiumPanjabi";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EidCollection />
      <Trending />
      <PremiumPanjabi />
    </>
  );
}
