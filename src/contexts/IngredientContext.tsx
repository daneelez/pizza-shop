import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {IngredientProps} from "../props/Ingredient";

interface IngredientContextType {
    ingredients: IngredientProps[]
    setIngredients: Dispatch<SetStateAction<IngredientProps[]>>;
}

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export const IngredientProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [ingredients, setIngredients] = useState<IngredientProps[]>([]);

    return (
        <IngredientContext.Provider value={{ingredients, setIngredients}}>
            {children}
        </IngredientContext.Provider>
    );
}

export const useIngredients = (): IngredientContextType => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('IngredientsProvider не обнаружен');
    }
    return context;
}