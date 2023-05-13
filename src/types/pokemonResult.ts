export interface IResult {
  name: string
  url: string
}

export interface IPakemonResult {
  count: number
  next: string | null
  previous: string | null
  results: IResult[]
}

export interface IKeyString {
  [key: string]: any
}

export interface IPokemon extends IKeyString {
  id: number
  name: string
  img: string
  hp: number
  attack: number
  defense: number
  special_attack: number
  special_defense: number
  speed: number
  type: string
}
