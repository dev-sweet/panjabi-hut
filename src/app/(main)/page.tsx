import HeroSection from "@/components/Home/HeroSection/HeroSection";
import EidCollection from "@/components/Home/EidCollection/EidCollection";
import Trending from "@/components/Home/Trending/Trending";
import PremiumPanjabi from "@/components/Home/PremiumPanjabi/PremiumPanjabi";
import { Product } from "@/types/product";

export default async function Home() {
  const res = await fetch("/api/products");
  const data = await res.json();
  const products: Product[] = data.data;
  return (
    <>
      <HeroSection />
      <EidCollection products={products} />
      {/* <Trending />
      <PremiumPanjabi /> */}
    </>
  );
}
