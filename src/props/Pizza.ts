import {PizzaBaseProps} from "./PizzaBase";
import {PizzaSideProps} from "./PizzaSide";
import {IngredientProps} from "./Ingredient";

export interface PizzaProps {
    id: string;
    owner: string;
    name: string;
    base: PizzaBaseProps;
    ingredients: IngredientProps[];
    price: number;
    sides: PizzaSideProps[];
}

export interface PizzaRequest {
    name: string;
    price: number;
}