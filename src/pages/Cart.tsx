import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils";
import { Link } from "react-router-dom";
import { CartItem } from "../types";
import CartItemInfo from "../components/cart/CartItemInfo";

/**
 * Represents the Cart page
 */
const Cart = () => {
  const {
    cart,
    removeItem,
    updateCartItemCount,
    clear,
    getCartTotalAmount,
    getCartItemCount,
  } = useCart();

  const cartStatus = useMemo(() => {
    return {
      totalPrice: formatCurrency(getCartTotalAmount()),
      totalItemsInCart: getCartItemCount(),
    };
  }, [cart]);

  const onRemoveItem = (cartItem: CartItem) => {
    removeItem(cartItem.product);
  };

  const onUpdate = (cartItem: CartItem, isAdding: boolean) => {
    isAdding
      ? updateCartItemCount(cartItem.product, cartItem.quantity + 1)
      : updateCartItemCount(cartItem.product, cartItem.quantity - 1);
  };

  return (
    <div className="my-8 ">
      <h3>Cart Summary</h3>

      {!cartStatus.totalItemsInCart && (
        <section className="no-item text-gray-500 py-5 text-center">
          <p className="text-xl">
            Nothing to show yet, please add some items to your cart!
          </p>
        </section>
      )}

      {/**renders cart items selected */}

      {cartStatus.totalItemsInCart > 0 && (
        <div className="max-h-[50vh] border-1 border-gray-400 rounded-sm overflow-auto p-2 my-2">
          {cart.map((cartItem: CartItem, index: number) => (
            <CartItemInfo
              key={index}
              cartItem={cartItem}
              onUpdate={onUpdate}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
      )}

      <section className="order-totals my-5">
        <h3 className="text-xl my-2">Totals</h3>
        <div className="flex justify-between my-1">
          <span>Items (x{cartStatus.totalItemsInCart})</span>
          <span className="total-price font-semibold">
            {cartStatus.totalPrice}
          </span>
        </div>
        <div className="flex justify-between my-1">
          <span>Shipping</span>
          <span>Free</span>
        </div>
      </section>

      <section className="actions-container flex items-center justify-between ">
        <Link
          className="border-0 bg-transparent"
          to="/products"
          title="Add more items to the cart"
        >
          + Add more Items
        </Link>
        <div className="action-buttons flex items-center gap-2 justify-between">
          <button className="bg-secondary text-white transform active:scale-90 p-1.5 rounded-sm">
            Checkout
          </button>
          <button
            className="border-0 border-blue-950 transform active:scale-90 p-1.5"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
