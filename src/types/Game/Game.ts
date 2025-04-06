import type { GameField } from '@/types/Game/GameField'
import type { GameFieldTypes } from '@/types/Game/GameFieldTypes'

export type Game = {
  [K in GameField]: K extends keyof GameFieldTypes ? GameFieldTypes[K] : never
}
