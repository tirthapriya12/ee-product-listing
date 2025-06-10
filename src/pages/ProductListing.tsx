import { useEffect, useState } from "react";
import { fetchProductList } from "../data";
import { Product } from "../types";
import { RefreshCcw } from "lucide-react";
import LoadingIndicator from "../components/common/LoadingIndicator";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "../context/CartContext";

/**
 * Represents Product listing page
 */
const ProductListing = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [producList, setProductList] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const products = await fetchProductList();
      setProductList(products);
      setError(null);
    } catch (e) {
      setProductList([]);
      e instanceof Error && setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addProductToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <>
      <div className="top-container mt-3 sm:mb-5">
        <h2 className="heading text-2xl">Products</h2>
        <p className="text-sm">Discover all the products at one place</p>
      </div>

      {loading && <LoadingIndicator />}
      {/*product list section*/}
      {!loading && (
        <section
          className="product-card-container grid  place-items-center sm:place-items-start grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-y-6 gap-x-8 my-4"
          role="list"
        >
          {producList.map((productItem: Product) => {
            return (
              <ProductCard
                product={productItem}
                key={productItem.id}
                onAddToCart={addProductToCart}
              />
            );
          })}
        </section>
      )}

      {error && !loading && (
        <div
          className="error-container p-[10%] text-center"
          data-testid="products-err"
        >
          <h3 className="mb-2"> Oopps! {error}</h3>
          <button
            className="bg-black text-white rounded-md p-2 h-10"
            onClick={getData}
          >
            Retry <RefreshCcw className="w-4 inline" />
          </button>
        </div>
      )}
    </>
  );
};

export default ProductListing;
