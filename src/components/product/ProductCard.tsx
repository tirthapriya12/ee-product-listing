import React, { useMemo } from "react";
import { Product } from "../../types";
import { Star } from "lucide-react";
import { formatCurrency, textEllipsis } from "../../utils";

/**Represents a single product entity UI */
const ProductCard: React.FC<{
  product: Product;
  onAddToCart?: (product: Product) => void;
}> = ({ product, onAddToCart }) => {
  const cardData = useMemo(() => {
    return {
      ...product,
      title: textEllipsis(product.title, 65),
      description: textEllipsis(product.description, 150),
      price: formatCurrency(product.price),
    };
  }, [product]);

  return (
    <div
      data-testid={`product-${product.id}`}
      className="product-card bg-white border-2 border-secondary rounded-lg h-120 w-75 shadow-md overflow-hidden flex flex-col"
      role="listitem"
    >
      <div className="product-img-container h-2/5 w-full p-2">
        <img
          alt={`Image of ${product.title}`}
          className="w-full h-full object-contain object-center"
          loading="lazy"
          src={cardData.image}
        />
      </div>
      <div className="product-details-container p-3 pt-1 flex-grow relative">
        <div className="flex justify-between items-center">
          <div className="product-category rounded-2xl text-sm bg-blue-200 p-1 px-2 w-35 text-ellipsis whitespace-nowrap overflow-hidden text-blue-900 text-center my-3">
            {product.category}
          </div>
          <div className="product-rating text-xs">
            <Star className="text-amber-300 inline" fill="yellow" />{" "}
            {product.rating.rate} ({cardData.rating.count} ratings)
          </div>
        </div>
        <h3 className="product-title w-[95%] font-sm text-wrap overflow-hidden text-blue-900  my-3">
          {cardData.title}
        </h3>
        <div
          className="product-description w-full h-15 text-xs text-ellipsis whitespace-break-spaces overflow-hidden text-blue-900 my-2"
          title={product.description}
        >
          {cardData.description}
        </div>
        <div className="action-container absolute flex justify-between items-center bottom-2 w-[92%]">
          <span className="text-md">{cardData.price}</span>
          <button
            className="add-to-cart text-sm rounded-sm bg-secondary text-white p-2 shadow-sm hover:bg-blue-950 transform active:scale-90 transition-transform"
            onClick={() => onAddToCart?.(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
