import { getProductById } from "@/schema/products";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }
  return <ProductDetails product={product} />;
}
