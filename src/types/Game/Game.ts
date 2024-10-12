import { GameField } from "./GameField"
import { GameFieldTypes } from "./GameFieldTypes";

export type Game = {
  [K in GameField]: K extends keyof GameFieldTypes ? GameFieldTypes[K] : never;
};
