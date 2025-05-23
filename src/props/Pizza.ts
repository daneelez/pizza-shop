import {PizzaBaseProps} from "./PizzaBase";
import {PizzaSideProps} from "./PizzaSide";
import {IngredientProps} from "./Ingredient";
import {PizzaSize} from "./PizzaSize";
import {UserProps} from "./User";

export interface PizzaProps {
    id: string;
    owner: string;
    name: string;
    base: PizzaBaseProps;
    ingredients: IngredientProps[];
    price: number;
    side: PizzaSideProps;
}

export interface PizzaRequest {
    name: string;
    base: PizzaBaseProps;
    ingredients: IngredientProps[];
    side: PizzaSideProps | null;
}

export interface PizzaSliceRequest {
    name: string | null;
    base: PizzaBaseProps;
    side: PizzaSideProps;
    ingredients: IngredientProps[];
}

export interface PizzaSliceRequestCustom {
    name: string | null;
    base?: PizzaBaseProps | undefined;
    side?: PizzaSideProps | undefined;
    ingredients?: IngredientProps[] | undefined;
}

export interface PizzaSliceProps {
    name: string | null;
    base: PizzaBaseProps;
    side: PizzaSideProps | null;
    ingredients: IngredientProps[];
}

export interface PizzaOrderProps {
    slices: PizzaSliceProps[] | PizzaSliceRequest[];
    size: PizzaSize;
    owners: UserProps[];
}