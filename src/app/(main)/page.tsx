import HeroSection from "@/components/Home/HeroSection/HeroSection";
import EidCollection from "@/components/Home/EidCollection/EidCollection";
import Trending from "@/components/Home/Trending/Trending";
import PremiumPanjabi from "@/components/Home/PremiumPanjabi/PremiumPanjabi";
import { Product } from "@/types/product";
import { prisma } from "../../../lib/prisma";

export default async function Home() {
  // const eidCollectionProducts = products.filter(
  //   (product) => product.category === "Eid Collection",
  // );

  const products = await prisma.product.findMany({});
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
