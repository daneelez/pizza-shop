export interface PizzaBaseProps {
    id: string;
    owner: string;
    name: string;
    price: number;
}

export interface PizzaBaseRequest {
    name: string;
    price: number;
}