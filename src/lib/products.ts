import { INITIAL_PRODUCTS, getStoredProducts, Product } from "./store";

export const PRODUCTS: Product[] = INITIAL_PRODUCTS;

export function getProductById(id: string): Product | undefined {
  const current = getStoredProducts();
  return current.find((product) => product.id === id) || INITIAL_PRODUCTS.find((p) => p.id === id);
}

export { type Product } from "./store";
