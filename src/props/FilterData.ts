import {IngredientProps} from "./Ingredient";

export interface PriceFilterData {
    minPrice: number;
    maxPrice: number;
}

export interface IngredientsFilterData {
    minPrice: number;
    maxPrice: number;
    ingredients: IngredientProps[];
}

export interface OrderFilterData {
    minPrice: number;
    maxPrice: number;
    dateStart: string;
    dateEnd: string;
}