
import { getProduct } from "@/api/products";
import ProductDetails from "@/components/products/ProductDetails";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import InstagramSection from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-7xl px-6 py-6">
        <ProductDetails product={product} />
      </main>

      <div className="mt-20">
        <FeaturedCollection />
      </div>

      <div className="mt-20">
        <InstagramSection />
      </div>

      <div className="mt-20">
        <Newsletter />
      </div>

      <Footer />
    </ProtectedRoute>
  );
}

