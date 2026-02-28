import AboutPage from "@/pages/about";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("AboutPage", () => {
  it("renders about page", () => {
    const { container } = render(<AboutPage />);
    expect(screen.getByTestId("title").textContent).toBe("About page");
    expect(container).toMatchSnapshot();
  });
});
