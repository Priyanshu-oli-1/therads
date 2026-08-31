import { products } from "../data/products";

export async function getProducts() {
  return products;
}

export async function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export async function getProductsByCategory(category: string) {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export async function searchProducts(query: string) {
  const searchTerm = query.trim().toLowerCase();

  if (!searchTerm) {
    return products;
  }

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
}
export async function getProductsByPriceRange(
  min: number,
  max: number
) {
  return products.filter(
    (product) => product.price >= min && product.price <= max
  );
}
export async function sortProducts(
  sort: "price-asc" | "price-desc" | "name-asc" | "name-desc"
) {
  const sortedProducts = [...products];

  switch (sort) {
    case "price-asc":
      return sortedProducts.sort(
        (a, b) => a.price - b.price
      );

    case "price-desc":
      return sortedProducts.sort(
        (a, b) => b.price - a.price
      );

    case "name-asc":
      return sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "name-desc":
      return sortedProducts.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    default:
      return sortedProducts;
  }
}