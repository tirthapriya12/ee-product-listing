import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

/** Renders the Header menu items */
const HeaderMenu: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {
  const navigate = useNavigate();
  const cartData = useCart();
  const itemCount = cartData.getCartItemCount() ?? 0;

  return (
    <nav className="flex gap-4 w-1/4 justify-end relative right-4 items-center">
      <button
        role="link"
        className={` rounded-md border-1 border-secondary p-2 h-10 ${
          currentRoute.toLowerCase().match("products")
            ? "bg-white text-black" // active route
            : "bg-transparent text-white"
        }`}
        onClick={() => {
          navigate("/products");
        }}
      >
        Products
      </button>

      <Link
        data-testid="cart-link"
        to="/cart"
        className={`p-1.5 ${
          currentRoute.toLocaleLowerCase().match("/cart")
            ? "border-1 text-black bg-sky-200"
            : "border-0 text-white"
        }`}
      >
        <ShoppingCart />
        {itemCount > 0 && (
          <span
            data-testid="cart-count"
            className="absolute -top-1 -right-3 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center"
            aria-live="polite"
          >
            {itemCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default HeaderMenu;
