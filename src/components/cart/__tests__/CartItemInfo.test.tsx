import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItemInfo from "../CartItemInfo";
import { mockProducts } from "../../../__mocks__/apiData";
import { Product, CartItem } from "../../../types";
import { formatCurrency } from "../../../utils";

describe("CartItemInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should display the cart UI", async () => {
    const product: Product = mockProducts[0];
    const cartItem: CartItem = {
      product,
      quantity: 1,
    };
    render(<CartItemInfo cartItem={cartItem} />);

    //contains an img
    expect(
      screen.getByAltText(`Image of ${product.title}`)
    ).toBeInTheDocument();
    //contains title
    expect(
      screen.getByText(product.title, { exact: false })
    ).toBeInTheDocument();

    //contains price
    expect(
      screen.getAllByText(formatCurrency(product.price), { exact: true }).length
    ).toBeTruthy();

    // contains reduce quantity button
    expect(screen.getByTestId(`item-reduce-${product.id}`)).toBeInTheDocument();
    // contains increase quantity button
    expect(screen.getByTestId(`item-add-${product.id}`)).toBeInTheDocument();
    // contains remove item button
    expect(screen.getByTestId(`item-remove-${product.id}`)).toBeInTheDocument();
  });

  test("should trigger reduce cart item quantity on '-' button click", async () => {
    const product: Product = mockProducts[0];
    const cartItem: CartItem = {
      product,
      quantity: 1,
    };
    const reduceCount = jest.fn((cartItem: CartItem, isAdding: boolean) => {
      if (!isAdding) cartItem.quantity -= 1;
    });
    render(<CartItemInfo cartItem={cartItem} onUpdate={reduceCount} />);

    const reduceCountBtn = screen.getByTestId(`item-reduce-${product.id}`);

    await userEvent.click(reduceCountBtn);

    expect(reduceCount).toHaveBeenCalledTimes(1);
    expect(cartItem.quantity).toBe(0);
  });

  test("should trigger increment item in cart '+'' button click", async () => {
    const product: Product = mockProducts[0];
    const cartItem: CartItem = {
      product,
      quantity: 1,
    };
    const incCount = jest.fn((cartItem: CartItem, isAdding: boolean) => {
      if (isAdding) cartItem.quantity += 1;
    });
    render(<CartItemInfo cartItem={cartItem} onUpdate={incCount} />);

    const incCountBtn = screen.getByTestId(`item-add-${product.id}`);

    await userEvent.click(incCountBtn);
    expect(incCount).toHaveBeenCalledTimes(1);
    expect(cartItem.quantity).toBe(2);
  });

  test("should trigger remove cart item quantity on delete icon button click", async () => {
    const product: Product = mockProducts[0];
    const cartItem: CartItem = {
      product,
      quantity: 1,
    };
    const removeItem = jest.fn();
    render(<CartItemInfo cartItem={cartItem} onRemove={removeItem} />);

    const removeItemBtn = screen.getByTestId(`item-remove-${product.id}`);

    await userEvent.click(removeItemBtn);
    expect(removeItem).toHaveBeenCalledTimes(1);
  });
});
