import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import App from "./app";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "./services/pokemon-services/pokemon-services";

const axiosMock = new MockAdapter(axiosInstance);

describe("App component", () => {
  afterEach(() => {
    cleanup();
  });
  it("Should render the title", async () => {
    axiosMock.onGet("/pokemon?limit=50&offset=0").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "bulbasaur",
        },
        {
          url: "gifno2",
          name: "ivysaur",
        },
      ],
    });
    render(<App />);
    const title = screen.getByText(/total of pokemon:/);
    expect(title).toBeVisible();
    await waitFor(() => {
      const pokemonCard = screen.getByText("bulbasaur");
      expect(pokemonCard).toBeVisible();
    });
  });

  it("should filter pokemons by name", async () => {
    render(<App />);
    axiosMock.onGet("/pokemon?limit=50&offset=0").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "bulbasaur",
        },
        {
          url: "gifno2",
          name: "ivysaur",
        },
      ],
    });

    await waitFor(() => {
      const pokemonCard = screen.getByText("bulbasaur");
      expect(pokemonCard).toBeVisible();
    });
    const input = screen.getByPlaceholderText("buscar pokemon");
    fireEvent.change(input, { target: { value: "bulbasaur" } });
    await waitFor(() => {
      const pokemonCard = screen.getByText("bulbasaur");
      expect(pokemonCard).toBeVisible();
    });

    await waitFor(() => {
      const pokemonCard2 = screen.queryByText("ivysaur");
      expect(pokemonCard2).not.toBeInTheDocument();
    });
  });

  it("should show message when filter pokemons by name and no match found", async () => {
    render(<App />);
    axiosMock.onGet("/pokemon?limit=50&offset=0").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "bulbasaur",
        },
        {
          url: "gifno2",
          name: "ivysaur",
        },
      ],
    });

    await waitFor(() => {
      const pokemonCard = screen.getByText("bulbasaur");
      expect(pokemonCard).toBeVisible();
    });
    const input = screen.getByPlaceholderText("buscar pokemon");
    fireEvent.change(input, { target: { value: "zooloo" } });
    await waitFor(() => {
      const pokemonCard = screen.getByText("No existe ningun pokemon con ese nombre");
      expect(pokemonCard).toBeVisible();
    });
  });

  it("should add and remove event listener on window object", () => {
    const addEventSpy = jest.spyOn(window, "addEventListener");
    const removeEventSpy = jest.spyOn(window, "removeEventListener");

    render(<App />);

    expect(addEventSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    cleanup();

    expect(removeEventSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("loads more pokemons on scroll", async () => {
    axiosMock.onGet("/pokemon?limit=50&offset=50").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "pikachu",
        },
        {
          url: "gifno2",
          name: "ivysaur",
        },
      ],
    });
    render(<App />);
    window.innerHeight = 1000;
    window.scrollY = 1200;

    fireEvent.scroll(window);

    await waitFor(() => {
      screen.getByText("ivysaur");
    });
  });

  it("should not call getMorePokemons when user has not scrolled to the bottom of the page", () => {
    const store = {
      getMorePokemons: jest.fn(),
      page: 0,
    };

    jest.spyOn(global, "window", "get").mockImplementation(() =>
      Object.assign({}, window, {
        innerHeight: 500,
        scrollY: 500,
        document: {
          body: {
            offsetHeight: 1300,
          },
        },
      })
    );

    expect(store.getMorePokemons).not.toHaveBeenCalled();
    expect(store.page).toEqual(0);
  });
});
