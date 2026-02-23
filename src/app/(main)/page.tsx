import HeroSection from "@/components/Home/HeroSection/HeroSection";
import EidCollection from "@/components/Home/EidCollection/EidCollection";
import Trending from "@/components/Home/Trending/Trending";
import PremiumPanjabi from "@/components/Home/PremiumPanjabi/PremiumPanjabi";
import { Product } from "@/types/product";
import { prisma } from "../../../lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany();
  // const eidCollectionProducts = products.filter(
  //   (product) => product.category === "Eid Collection",
  // );

  console.log(products);
  return (
    <>
      <HeroSection />
      <EidCollection products={products} />
      {/* <Trending />
      <PremiumPanjabi /> */}
    </>
  );
}
