import { makeAutoObservable, runInAction } from "mobx";
import { Pokemon } from "../utils/interfaces/pokemon-interfaces";
import { PokemonServices } from "../services/pokemon-services/pokemon-services";

class Store {
  allPokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  counter: number = 0;
  page: number = 0;
  constructor() {
    makeAutoObservable(this);
  }

  getImage = (pokeNumber: string) => {
    const number = pokeNumber[pokeNumber?.length - 2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${number}.svg`;
  };

  async getAllPokemons(page: number) {
    const data = await PokemonServices.getPokemnos(page);

    const pokemonsUrl = data.results?.map((item: { name: string; url: string }) => ({
      name: item.name,
      url: this.getImage(item.url),
    }));

    runInAction(() => {
      this.allPokemons = [...pokemonsUrl];
      this.filteredPokemons = [...pokemonsUrl];
      this.counter = data.count;
    });
  }

  async getMorePokemons(page: number) {
    const { results } = await PokemonServices.getPokemnos(page);
    this.page = page;

    const pokemonsUrl = results?.map((item: { name: string; url: string }) => ({
      name: item.name,
      url: this.getImage(item.url),
    }));

    runInAction(() => {
      this.allPokemons = [...this.allPokemons, ...pokemonsUrl];
      this.filteredPokemons = [...this.allPokemons, ...pokemonsUrl];
    });
  }

  filterPokemons(filterW: string) {
    const filtered = this.allPokemons.filter(item =>
      item.name.toUpperCase().includes(filterW.toUpperCase())
    );
    runInAction(() => {
      this.filteredPokemons = filtered;
    });
  }
}

const store = new Store();
export default store;
