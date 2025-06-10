import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "../../types";
import { formatCurrency } from "../../utils";

const CartItemInfo: React.FC<{
  cartItem: CartItem;
  onUpdate?: (cartItem: CartItem, isAdding: boolean) => void;
  onRemove?: (cartItem: CartItem) => void;
}> = ({ cartItem, onUpdate, onRemove }) => {
  const { product, quantity } = cartItem;

  return (
    <div
      className="cart-item flex justify-between my-2 min-h-24"
      data-testid={`cartItem-${product.id}`}
    >
      <div className="detail-container flex gap-x-2 items-center">
        <div className="item-image aspect-square h-16 w-14">
          <img
            loading="lazy"
            className="size-15 object-contain object-center"
            src={product.image}
            alt={"Image of " + product.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className="text-md font-semibold inline-block w-[42vw] truncate"
            title={product.title}
          >
            {product.title}
          </span>
          <span className="text-sm">{product.category}</span>
          <span className="text-sm">{formatCurrency(product.price)}</span>
        </div>
      </div>

      <div className="qty-price-container flex flex-col sm:flex-row items-center gap-1 sm:gap-3 pt-1">
        <div className="flex w-20 gap-2 items-center">
          <button
            data-testid={`item-reduce-${product.id}`}
            className="text-black border-1 size-5"
            aria-label="reduce quantity"
            onClick={() => onUpdate?.(cartItem, false)}
            disabled={quantity === 0}
          >
            <Minus className="size-[90%]" />
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            className="text-black border-1 size-5"
            data-testid={`item-add-${product.id}`}
            aria-label="add more"
            onClick={() => onUpdate?.(cartItem, true)}
          >
            <Plus className="size-[90%]" />
          </button>
        </div>
        <span className="text-m font-bold inline-block w-15 text-center">
          {formatCurrency(Number(cartItem.quantity * product.price))}
        </span>
        <button
          data-testid={`item-remove-${product.id}`}
          className="p-2 border-0 text-black"
          aria-label="remove item"
          onClick={() => onRemove?.(cartItem)}
        >
          <Trash2 size="20px" />
        </button>
      </div>
    </div>
  );
};

export default CartItemInfo;
