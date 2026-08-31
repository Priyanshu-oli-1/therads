import Link from "next/link";
import QuantitySelector from "@/components/products/QuantitySelector";
import { getProducts } from "@/schema/products";
import AddToCartButton from "@/components/cart/AddToCartButton";
import SizeSelector from "@/components/products/SizeSelector";
import ProductPurchase from "@/components/products/ProductPurchase";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const products = await getProducts();

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    notFound();
  }
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link
        href="/products"
        className="mb-6 inline-flex text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to Shop
      </Link>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <span>/</span>

          <Link href="/products" className="hover:text-black">
            Shop
          </Link>

          <span>/</span>

          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Product Image */}
        <div className="flex h-[600px] items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="text-sm text-gray-500 hover:text-black"
          >
            {product.category}
          </Link>

          <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

          <p className="mt-6 text-2xl font-semibold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p className="mt-3 text-sm font-medium text-green-600">In Stock</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Product Information</h2>

            <p className="mt-3 leading-7 text-gray-600">
              Discover the perfect combination of comfort, quality and
              contemporary fashion. Designed for everyday wear with a focus on
              style and comfort.
            </p>
          </div>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold">Product Details</h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Category</dt>

                <dd className="font-medium">{product.category}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Product ID</dt>

                <dd className="font-medium">{product.id}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-8 rounded-lg border p-5">
            <h2 className="font-semibold">Free Shipping</h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enjoy free shipping on your order. Your product will be carefully
              packed and delivered to your address.
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-400">Product ID: {product.id}</p>

       <ProductPurchase product={product} />

          <p className="mt-3 text-center text-xs text-gray-400">
            Secure checkout • Easy returns • Customer support
          </p>

          <Link
            href="/products"
            aria-label="Continue shopping"
            className="mt-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
