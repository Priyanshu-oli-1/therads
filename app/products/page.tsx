import { products } from "@/data/products";
import ProductList from "@/components/products/ProductList";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import InstagramSection from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const initialPage = Math.max(1, Number(params.page ?? "1"));

  const initialItemsPerPage = [4, 8, 12].includes(Number(params.limit))
    ? Number(params.limit)
    : 4;
  const allowedLimits = [4, 8, 12];

  const requestedLimit = Number(params.limit);

  const itemsPerPage = allowedLimits.includes(requestedLimit)
    ? requestedLimit
    : 4;

  

  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold">Shop</h1>

        <p className="mt-4 text-gray-600">
          Explore our latest fashion collection.
        </p>

        <p className="mt-2 text-sm text-gray-500">{products.length} products</p>

        <div className="mt-10">
          <ProductList
            products={products}
            initialSearch={params.search ?? ""}
            initialCategory={params.category ?? ""}
            initialSort={params.sort ?? ""}
            initialPage={initialPage}
            initialItemsPerPage={initialItemsPerPage}
          />
        </div>
      </main>

      {/* Featured Collection Section */}
      <div>
        <FeaturedCollection />
      </div>

      {/* Instagram Gallery Section */}
      <div>
        <InstagramSection />
      </div>

      {/* Newsletter Section */}
      <div>
        <Newsletter />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
