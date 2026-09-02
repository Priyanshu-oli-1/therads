import { getProductById } from "@/schema/products";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import InstagramSection from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

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
  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-6">
        <ProductDetails product={product} />
      </main>

      {/* Featured Collection Section */}
      <div className="mt-20">
        <FeaturedCollection />
      </div>

      {/* Instagram Gallery Section */}
      <div className="mt-20">
        <InstagramSection />
      </div>

      {/* Newsletter Section */}
      <div className="mt-20">
        <Newsletter />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
