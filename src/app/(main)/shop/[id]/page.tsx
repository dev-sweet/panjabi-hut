import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { notFound } from "next/navigation";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: {
      revalidate: 3600,
      tags: [`product-${id}`],
    },
  });

  const data = await res.json();
  // console.log(data);
  // if (!data.data) {
  //   return notFound();
  // }

  return (
    <main>
      <ProductDetails product={data.product} />
    </main>
  );
};

export default ProductDetailsPage;
