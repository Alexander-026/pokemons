export interface DataType {
  key: number
  id: number
  avatar: JSX.Element
  name: string
  hp: number
  type: string
}

export type DataIndex = keyof DataType
