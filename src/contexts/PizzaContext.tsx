import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {PizzaProps} from "../props/Pizza";

interface PizzaContextType {
    pizzas: PizzaProps[];
    setPizzas: Dispatch<SetStateAction<PizzaProps[]>>;
}

const PizzaContext = createContext<PizzaContextType | undefined>(undefined);

export const PizzaProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [pizzas, setPizzas] = useState<PizzaProps[]>([]);

    return (
        <PizzaContext.Provider value={{pizzas, setPizzas}}>
            {children}
        </PizzaContext.Provider>
    );
}

export const usePizza = (): PizzaContextType => {
    const context = useContext(PizzaContext);
    if (!context) {
        throw new Error('PizzaProvider не обнаружен');
    }
    return context;
}