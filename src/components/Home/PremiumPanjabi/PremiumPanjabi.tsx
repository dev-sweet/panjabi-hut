import ProductCard from "@/components/Shared/ProductCard/ProductCard";
import { Product } from "@/types/product";

const PremiumPanjabi = ({ products }: { products: Product[] }) => {
  return (
    <section className="bg-[#050605] max-w-7xl mx-auto px-4 py-20 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-8">Premium Panjabi</h2>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </section>
  );
};

export default PremiumPanjabi;
