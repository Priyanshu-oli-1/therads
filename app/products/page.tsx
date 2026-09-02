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
    price?: string;
    page?: string;
    limit?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  // Read the requested page from the URL.
  const requestedPage = Number(params.page ?? "1");

  // Keep the existing 4 / 8 / 12 items-per-page functionality.
  const requestedLimit = Number(params.limit ?? "4");

  const initialPage = Number.isFinite(requestedPage)
    ? Math.max(1, requestedPage)
    : 1;

  const initialItemsPerPage = [4, 8, 12].includes(requestedLimit)
    ? requestedLimit
    : 4;

  return (
    <>
      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8 md:py-6">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-5xl font-semibold tracking-tight md:text-6xl">
            Fashion
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-500 md:text-sm"
          >
            <span>Home</span>
            <span>›</span>
            <span className="text-gray-600">Fashion</span>
          </nav>
        </header>

        {/* Product filtering, sorting, grid and pagination */}
        <ProductList
          products={products}
          initialSearch={params.search ?? ""}
          initialCategory={params.category ?? ""}
          initialSort={params.sort ?? ""}
          initialPrice={params.price ?? ""}
          initialPage={initialPage}
          initialItemsPerPage={initialItemsPerPage}
        />
      </main>

      {/* Existing sections are preserved. */}
      <FeaturedCollection />
      <InstagramSection />
      <Newsletter />
      <Footer />
    </>
  );
}