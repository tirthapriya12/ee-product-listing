import { CartItem } from "../types";

interface MockCartContextOptions {
  cart?: CartItem[];
  addToCart?: jest.Mock;
  removeItem?: jest.Mock;
  clear?: jest.Mock;
  getCartItemCount?: jest.Mock<() => number>;
  getCartTotalAmount?: jest.Mock<() => number>;
  updateCartItemCount?: jest.Mock;
}

const getMockCartContextVal = (options?: MockCartContextOptions) => {
  let defaultCart = options?.cart ?? [];

  const defaultGetCartItemCount = jest.fn(() =>
    defaultCart.reduce((count, item) => count + item.quantity, 0)
  );

  const defaultGetCartTotalAmount = jest.fn(() =>
    defaultCart.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    )
  );

  return {
    cart: defaultCart,
    addToCart: options?.addToCart ?? jest.fn(),
    removeItem: options?.removeItem ?? jest.fn(),
    clear: options?.clear ?? jest.fn(),
    getCartItemCount: defaultGetCartItemCount,
    getCartTotalAmount: defaultGetCartTotalAmount,
    updateCartItemCount: options?.updateCartItemCount ?? jest.fn(),
  };
};

export { getMockCartContextVal, MockCartContextOptions };
