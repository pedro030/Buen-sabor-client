import { MCategory } from "./MCategory";
import { MIngredient } from "./MIngredient";

export interface MProduct {
    id: number,
    name: string,
    active: boolean,
    price: number,
    cookingTime: number,
    image: string,
    subcategory: MCategory,
    cost: number,
    ingredients: [{ id: number, ingredient: MIngredient, cant: number}]
}