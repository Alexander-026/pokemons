import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { pokemonApi } from "../../app/services/pocemon"
import { IPakemonResult, IPokemon } from "../../types/pokemonResult"

export interface IPokemonState {
  pokemons: IPokemon[]
  loading: boolean
  selected: IPokemon | null
  dataResults: IPakemonResult | null
  current: number
  pageSize: number
}

export const initialState: IPokemonState = {
  pokemons: [],
  loading: true,
  selected: null,
  dataResults: null,
  current: 1,
  pageSize: 10,
}

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<IPokemon[]>) => {
      state.pokemons = action.payload
      state.loading = false
    },
    selectPakemon: (state, action: PayloadAction<IPokemon | null>) => {
      state.selected = action.payload
    },
    setPagination: (
      state,
      action: PayloadAction<{ current: number; pageSize: number }>,
    ) => {
      const { current, pageSize } = action.payload
      state.current = current
      state.pageSize = pageSize
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.getPokemons.matchPending,
      (state) => {
        state.loading = true
      },
    )
    builder.addMatcher(
      pokemonApi.endpoints.getPokemons.matchFulfilled,
      (state, action) => {
        state.dataResults = action.payload
      },
    )
  },
})

export const { setPokemons, selectPakemon, setPagination } =
  pokemonSlice.actions

export default pokemonSlice.reducer
