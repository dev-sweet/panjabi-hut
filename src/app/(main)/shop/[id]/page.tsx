import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { notFound } from "next/navigation";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  let loading = true;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/products/${id}`,
    {
      next: {
        revalidate: 3600,
        tags: [`product-${id}`],
      },
    },
  );

  const data = await res.json();
  loading = false;
  // console.log(data);
  // if (!data.data) {
  //   return notFound();
  // }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }
  return (
    <main>
      <ProductDetails product={data.product} />
    </main>
  );
};

export default ProductDetailsPage;
