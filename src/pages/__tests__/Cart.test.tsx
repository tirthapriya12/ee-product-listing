import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../Cart";
import { CartContext, CartContextType } from "../../context/CartContext";
import { MemoryRouter } from "react-router-dom";
import { mockProducts } from "../../__mocks__/apiData";
import { CartItem } from "../../types";
import { getMockCartContextVal } from "../../__mocks__/cartContextHelper";

describe("Cart Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should display cart item and details", async () => {
    const mockCartItem: CartItem = {
      product: mockProducts[0],
      quantity: 1,
    };
    const mockCartContextVal: CartContextType = getMockCartContextVal({
      cart: [mockCartItem],
    });

    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContextVal}>
          <Cart />
        </CartContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Cart Summary")).toBeInTheDocument();
    });

    expect(
      screen.getByTestId(`cartItem-${mockCartItem.product.id}`)
    ).toBeInTheDocument();
  });

  test("should clear cart on clear button click", async () => {
    const mockClearCart = jest.fn();
    const mockCartItems: CartItem[] = [
      {
        product: mockProducts[0],
        quantity: 1,
      },
      {
        product: mockProducts[1],
        quantity: 1,
      },
    ];
    const mockCartContextVal: CartContextType = getMockCartContextVal({
      cart: [...mockCartItems],
      clear: mockClearCart,
    });
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContextVal}>
          <Cart />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const clearCartBtn = screen.getAllByRole("button", {
      name: /clear/i,
    })[0];

    await userEvent.click(clearCartBtn);

    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  test("should update product quantity in cart on +/- button click", async () => {
    const mockUpdateCartItemCount = jest.fn();
    const mockCartItems: CartItem[] = [
      {
        product: mockProducts[0],
        quantity: 1,
      },
    ];
    const mockCartContextVal: CartContextType = getMockCartContextVal({
      cart: [...mockCartItems],
      updateCartItemCount: mockUpdateCartItemCount,
    });
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContextVal}>
          <Cart />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByTestId(`item-add-${mockProducts[0].id}`);

    await userEvent.click(addButton);

    expect(mockUpdateCartItemCount).toHaveBeenCalledTimes(1);

    const minusButton = screen.getByTestId(`item-reduce-${mockProducts[0].id}`);

    await userEvent.click(minusButton);

    expect(mockUpdateCartItemCount).toHaveBeenCalledTimes(2);
  });

  test("should remove product in cart on remove button click", async () => {
    const mockRemoveItem = jest.fn();
    const mockCartItems: CartItem[] = [
      {
        product: mockProducts[0],
        quantity: 1,
      },
    ];
    const mockCartContextVal: CartContextType = getMockCartContextVal({
      cart: [...mockCartItems],
      removeItem: mockRemoveItem,
    });
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContextVal}>
          <Cart />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const removeButton = screen.getByTestId(
      `item-remove-${mockProducts[0].id}`
    );

    await userEvent.click(removeButton);

    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
  });
});
