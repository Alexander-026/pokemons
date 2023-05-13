import axios from "axios"
import { IPokemon, IResult } from "../types/pokemonResult"

export const packPakemons = async (results: IResult[]): Promise<IPokemon[]> => {
  const pokemons = await Promise.all(
    results.map(async (p) => {
      try {
        const res = await axios.get(p.url)
        const pokemon: IPokemon = {
          id: res.data.id,
          name: p.name,
          img: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          special_attack: res.data.stats[3].base_stat,
          special_defense: res.data.stats[4].base_stat,
          speed: res.data.stats[5].base_stat,
          type: res.data.types[0].type.name,
        }
        return pokemon
      } catch (error) {
        throw new Error("Ошибка при загрузке данных о покемонах")
      }
    }),
  )
  return pokemons
}
