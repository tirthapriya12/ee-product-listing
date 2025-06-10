import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductListing from "../ProductListing";
import {
  CartContextProvider,
  CartContext,
  CartContextType,
} from "../../context/CartContext";
import * as productApi from "../../data";
import { mockProducts } from "../../__mocks__/apiData";

jest.mock("../../data");
const mockProductsApi = jest.spyOn(productApi, "fetchProductList");

describe("ProductListing Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    mockProductsApi.mockClear();
    mockProductsApi.mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    mockProductsApi.mockRestore();
  });

  test("renders laoding initially", () => {
    mockProductsApi.mockResolvedValue(new Promise(() => {}));
    render(
      <CartContextProvider>
        <ProductListing />
      </CartContextProvider>
    );

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  test("renders products with success", async () => {
    render(
      <CartContextProvider>
        <ProductListing />
      </CartContextProvider>
    );
    await waitFor(() => {
      expect(screen.getAllByText("Add To Cart").length).toEqual(
        mockProducts.length
      );
    });
    expect(screen.queryByTestId("loading-icon")).not.toBeInTheDocument();
  });

  test("renders error if product response fails", async () => {
    mockProductsApi.mockRejectedValue(new Error("Failed to load products"));
    render(
      <CartContextProvider>
        <ProductListing />
      </CartContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("products-err")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("product-1")).not.toBeInTheDocument();
  });

  test("renders data on retry after error if product response fails", async () => {
    mockProductsApi.mockRejectedValue(new Error("Failed to load products"));
    render(
      <CartContextProvider>
        <ProductListing />
      </CartContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("products-err")).toBeInTheDocument();
    });
    mockProductsApi.mockRestore();
    mockProductsApi.mockResolvedValue(mockProducts);

    const retryBtn = screen.getByText("Retry", { exact: false });

    await userEvent.click(retryBtn);

    expect(
      screen.getAllByRole("button", { name: /add to cart/i }).length
    ).toBeTruthy();
  });

  test("should add product to cart on Add to cart click", async () => {
    const mockAddToCart = jest.fn();
    const mockCartContextVal: CartContextType = {
      cart: [],
      addToCart: mockAddToCart,
      removeItem: jest.fn(),
      clear: jest.fn(),
      getCartItemCount: jest.fn(),
      getCartTotalAmount: jest.fn(),
      updateCartItemCount: jest.fn(),
    };
    render(
      <CartContext.Provider value={mockCartContextVal}>
        <ProductListing />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading-icon")).not.toBeInTheDocument();
    });

    const addToCartBtn = screen.getAllByRole("button", {
      name: /add to cart/i,
    })[0];

    await userEvent.click(addToCartBtn);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});
