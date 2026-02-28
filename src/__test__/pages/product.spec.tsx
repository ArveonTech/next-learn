import ProductPage from "@/pages/product";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/product",
      pathname: "",
      query: "",
      asPath: "/",
      push: jest.fn(),
      events: { on: jest.fn(), off: jest.fn() },
      beforePopState: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      isReady: true,
    };
  },
}));

describe("ProductPage", () => {
  it("renders product page", () => {
    const { container } = render(<ProductPage />);
    expect(container).toMatchSnapshot();
  });
});
