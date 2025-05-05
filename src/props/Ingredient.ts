export interface IngredientProps {
    id: string;
    owner: string;
    name: string;
    price: number;
}

export interface IngredientRequest {
    name: string;
    price: number;
}

export interface IngredientFilterProps {
    selectedIngredients: IngredientProps[];
    setSelectedIngredients: React.Dispatch<React.SetStateAction<IngredientProps[]>>;
}