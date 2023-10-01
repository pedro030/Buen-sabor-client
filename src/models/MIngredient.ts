import { MMeasure } from "./MMeasure";

export interface MIngredient {
    id: number,
    name: string,
    stock: number,
    cost: number,
    stockMin: number,
    measure: MMeasure
}

export interface MProductIngredient {
    id: number,
    ingredient: MIngredient,
    cant: number
}