import axios from "axios";
import { BASE_URL } from "../../utils/constants/services";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

export class PokemonServices {
  static async getPokemnos(page: number = 1) {
    const limit = 50;
    const offset = page;
    const responsePokemons = await axiosInstance.get(`/pokemon?limit=${limit}&offset=${offset}`);

    if (!responsePokemons.data) {
      throw new Error("No se pudo obtener el listado de pokemons");
    }

    return responsePokemons.data;
  }
}
