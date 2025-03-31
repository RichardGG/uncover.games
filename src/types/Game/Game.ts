import type { GameField } from './GameField'
import type { GameFieldTypes } from './GameFieldTypes'

export type Game = {
  [K in GameField]: K extends keyof GameFieldTypes ? GameFieldTypes[K] : never
}
