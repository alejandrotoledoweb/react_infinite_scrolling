import { render, screen } from "@testing-library/react";
import { SearchBar } from "./search-bar";

describe("SearchBar", () => {
  it("should render the input", () => {
    const handleChange = jest.fn();
    render(<SearchBar handleChange={handleChange} counter={45} />);
    const input = screen.getByPlaceholderText("buscar pokemon");
    expect(input).toBeDefined();
    expect(input).toHaveTextContent("");
  });
  it("should render the input with error message", () => {
    const handleChange = jest.fn();
    render(<SearchBar handleChange={handleChange} counter={45} />);
    const input = screen.getByPlaceholderText("buscar pokemon");
    expect(input).toBeDefined();
    expect(input).toHaveTextContent("");
  });
});
