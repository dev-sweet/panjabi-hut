import HeroSection from "@/components/Home/HeroSection/HeroSection";
import EidCollection from "@/components/Home/EidCollection/EidCollection";
import Trending from "@/components/Home/Trending/Trending";
import PremiumPanjabi from "@/components/Home/PremiumPanjabi/PremiumPanjabi";
import { Product } from "@/types/product";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: "no-store",
  });
  const data = await res.json();
  const products: Product[] = data.data;
  const eidCollection = products.filter((product) => product.isEidCollection);
  const trendingProducts = products.filter((product) => product.isTrending);
  const premiumPanjabi = products.filter((product) => product.isPremium);

  return (
    <>
      <HeroSection />
      <EidCollection products={eidCollection} />
      <Trending products={trendingProducts} />
      <PremiumPanjabi products={premiumPanjabi} />
    </>
  );
}
