import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("should render the input", () => {
    render(<Input placeholder="poke name" />);
    const input = screen.getByPlaceholderText("poke name");
    expect(input).toBeDefined();
    expect(input).toHaveTextContent("");
  });
  it("should call the onChange function in the Input", async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="poke name" />);
    const input = screen.getByPlaceholderText("poke name");
    expect(input).toBeDefined();
    expect(input).toHaveTextContent("");
    fireEvent.change(input, { target: { value: "new poke" } });
    expect(input).toHaveValue("new poke");
  });
});
