import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../ProductCard";
import { mockProducts } from "../../../__mocks__/apiData";
import { Product } from "../../../types";

describe("ProductCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should display product card UI", async () => {
    const product: Product = mockProducts[0];
    render(<ProductCard product={product} />);

    //contains an img
    expect(
      screen.getByAltText(`Image of ${product.title}`)
    ).toBeInTheDocument();
    //contains title
    expect(
      screen.getByText(product.title, { exact: false })
    ).toBeInTheDocument();

    //contains description
    expect(
      screen.getByText(product.description, { exact: false })
    ).toBeInTheDocument();

    //contains price
    expect(
      screen.getByText(product.price, { exact: false })
    ).toBeInTheDocument();

    // contains add to cart button
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  test("should display product title with ellipsis if length more than 65", async () => {
    const product: Product = mockProducts[0];
    product.title = Array(70).fill("a").join();
    render(<ProductCard product={product} />);

    const title = screen.getByText(product.title.substring(0, 62), {
      exact: false,
    }).textContent;

    expect(title?.match("...")).toBeTruthy();
  });

  test("should display product card description with ellipsis if length more than 150", async () => {
    const product: Product = mockProducts[0];
    product.description = Array(160).fill("a").join();
    render(<ProductCard product={product} />);

    const description = screen.getByText(
      product.description.substring(0, 147),
      {
        exact: false,
      }
    ).textContent;

    expect(description?.match("...")).toBeTruthy();
  });

  test("should trigger add to cart on Add To Cart button click", async () => {
    const product: Product = mockProducts[0];
    const mockAddToCart = jest.fn();
    render(<ProductCard product={product} onAddToCart={mockAddToCart} />);

    const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

    await userEvent.click(addToCartBtn);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});
