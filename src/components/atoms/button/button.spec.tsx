import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("should render the button", () => {
    render(<Button>Agregar</Button>);
    const buttonFound = screen.getByText("Agregar");
    expect(buttonFound).toBeDefined();
    expect(buttonFound).toHaveTextContent("Agregar");
  });
  it("should call the onClick function in the button", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Agregar</Button>);
    const buttonFound = screen.getByText("Agregar");
    expect(buttonFound).toHaveTextContent("Agregar");
    fireEvent.click(buttonFound);
    expect(handleClick).toBeCalledTimes(1);
  });
});
