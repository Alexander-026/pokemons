import { IPakemonResult } from "../../types/pokemonResult"
import { api } from "./api"

export const pokemonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPokemons: builder.query<
      IPakemonResult,
      { offset: number; limit: number }
    >({
      query: (params) => ({
        url: `?offset=${params.offset}&limit=${params.limit}`,
        method: "GET",
      }),
    }),
  }),
})

export const { useGetPokemonsQuery } = pokemonApi
