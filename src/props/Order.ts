import {UserProps} from "./User";
import {PizzaOrderProps} from "./Pizza";

export interface OrderProps {
    id: string;
    owner: UserProps;
    owners: UserProps[];
    pizzas: PizzaOrderProps[];
    description: string;
    date: string;
    price: number;
}

export interface OrderRequest {
    owners: UserProps[];
    pizzas: PizzaOrderProps[];
    description: string;
    date: string;
}

export interface DateFilterData {
    dateStart: string;
    dateEnd: string;
    setDateStart: (date: string) => void;
    setDateEnd: (date: string) => void;
}