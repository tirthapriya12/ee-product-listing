import { renderHook, act } from "@testing-library/react";
import { CartContextProvider, useCart } from "./CartContext";
import { mockProducts } from "../__mocks__/apiData";

describe("CartContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("adds item to cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartContextProvider,
    });

    act(() => {
      result.current.addToCart(mockProducts[0]);
    });

    expect(result.current.getCartItemCount()).toBe(1);
  });

  test("updates quantity for same item on repeated addToCart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartContextProvider,
    });

    act(() => {
      result.current.addToCart(mockProducts[0]);
    });

    act(() => {
      result.current.addToCart(mockProducts[0]);
    });

    expect(result.current.getCartItemCount()).toBe(2);
  });

  test("clears the  cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartContextProvider,
    });

    act(() => {
      result.current.addToCart(mockProducts[0]);
      result.current.addToCart(mockProducts[0]);
      result.current.clear();
    });

    expect(result.current.getCartItemCount()).toBe(0);
  });

  test("updates the quantity of cart item", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartContextProvider,
    });

    act(() => {
      result.current.addToCart(mockProducts[1]);
    });

    act(() => {
      result.current.updateCartItemCount(mockProducts[1], 12);
    });

    expect(result.current.getCartItemCount()).toBe(12);

    //should remove item if quantity reaches 0
    act(() => {
      result.current.updateCartItemCount(mockProducts[1], 0);
    });
    expect(result.current.getCartItemCount()).toBe(0);
  });

  test("returns total cart price", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartContextProvider,
    });

    act(() => {
      result.current.addToCart(mockProducts[1]);
    });

    act(() => {
      result.current.updateCartItemCount(mockProducts[1], 12);
    });

    expect(result.current.getCartTotalAmount()).toBe(
      mockProducts[1].price * 12
    );
  });

  test("removes a cart item", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartContextProvider,
    });

    act(() => {
      result.current.addToCart(mockProducts[1]);
    });

    act(() => {
      result.current.removeItem(mockProducts[1]);
    });

    expect(result.current.getCartItemCount()).toBe(0);
  });
});
