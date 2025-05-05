import {IngredientProps} from "./Ingredient";
import {PizzaProps} from "./Pizza";

export interface PizzaSideProps {
    id: string;
    owner: string;
    name: string;
    ingredients: IngredientProps[];
    notAllowedList: PizzaProps[];
    price: number;
}

export interface PizzaSideRequest {
    name: string;
    ingredients: IngredientProps[];
    notAllowedList: PizzaProps[];
}