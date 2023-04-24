import { render, screen } from "@testing-library/react";
import { Card } from "./card";

const poke = {
  name: "bulbasaur",
  url: "https://media.tenor.com/WxflQIGfOYkAAAAj/spider-man-no-way-home-marvel-studios.gif",
};

describe("Card", () => {
  it("should render the Card image", () => {
    render(<Card name={poke.name} url={poke.url} />);
    const input = screen.getByAltText(
      "https://media.tenor.com/WxflQIGfOYkAAAAj/spider-man-no-way-home-marvel-studios.gif"
    );
    expect(input).toBeVisible();
  });
});
