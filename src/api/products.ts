
import type { Product } from "@/types/product";

const API_URL = "https://dummyjson.com";
const USD_TO_INR = 94.45;
const MAX_PRODUCTS = 40;

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
};

type ApiProductsResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};

function mapProduct(product: ApiProduct): Product {
  return {
    id: product.id,
    name: product.title,
    price: Math.round(product.price * USD_TO_INR),
    image: product.thumbnail,
    category: product.category,
  };
}

export async function getProducts(
  limit = 12,
  skip = 0,
  search = "",
  category = "",
  sort = "",
  price = "",
): Promise<{
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}> {
  let url = `${API_URL}/products`;

  if (search.trim()) {
    url = `${API_URL}/products/search?q=${encodeURIComponent(
      search.trim(),
    )}`;
  } else if (category.trim()) {
    url = `${API_URL}/products/category/${encodeURIComponent(
      category.trim(),
    )}`;
  }

  const params = new URLSearchParams();

  // Fetch only 40 products for now.
  params.set("limit", String(MAX_PRODUCTS));
  params.set("skip", "0");

  if (sort) {
    const [sortBy, order] = sort.split("-");

    if (sortBy && order) {
      params.set(
        "sortBy",
        sortBy === "name" ? "title" : sortBy,
      );

      params.set("order", order);
    }
  }

  const separator = url.includes("?") ? "&" : "?";

  const response = await fetch(
    `${url}${separator}${params.toString()}`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`,
    );
  }

  const data: ApiProductsResponse = await response.json();

  let products = data.products.map(mapProduct);

  // Price ranges are applied after USD → INR conversion.
  if (price) {
    const [min, max] = price.split("-").map(Number);

    if (
      Number.isFinite(min) &&
      Number.isFinite(max)
    ) {
      products = products.filter(
        (product) =>
          product.price >= min &&
          product.price <= max,
      );
    }
  }

  return {
    products,
    total: products.length,
    skip: 0,
    limit: MAX_PRODUCTS,
  };
}

export async function getProduct(id: string): Promise<Product> {
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error("Invalid product ID");
  }

  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product: ${response.status}`,
    );
  }

  const product: ApiProduct = await response.json();

  return {
    id: product.id,
    name: product.title,
    price: Math.round(product.price * USD_TO_INR),
    image: product.thumbnail,
    category: product.category,
  };
}
