import { Product } from "../types";

export const fetchProductList = async (): Promise<Product[]> => {
  const url =
    "https://equalexperts.github.io/frontend-take-home-test-data/products.json";
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Failed to load data");
  }
  const data = await resp.json();
  return data;
};
