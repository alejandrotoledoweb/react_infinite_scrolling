import axios from "axios";
import { PokemonServices } from "./pokemon-services";
import MockAdapter from "axios-mock-adapter";
import { Pokemon } from "../../utils/interfaces/pokemon-interfaces";

const axiosMock = new MockAdapter(axios);

describe("Pokemon Service", () => {
  it("should get pokemon array", async () => {
    axiosMock.onGet("/pokemon?limit=50&offset=0").reply(200, [
      {
        name: "bulbasaur",
        url: "example.com",
      },
      {
        name: "pikachu",
        url: "example.com",
      },
    ] as Pokemon[]);
    const users = await PokemonServices.getPokemnos();
    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Object);
  });
});
