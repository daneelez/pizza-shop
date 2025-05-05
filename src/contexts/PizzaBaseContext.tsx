import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {PizzaBaseProps} from "../props/PizzaBase";

interface PizzaBaseContextType {
    bases: PizzaBaseProps[]
    setBases: Dispatch<SetStateAction<PizzaBaseProps[]>>;
}

const PizzaBaseContext = createContext<PizzaBaseContextType | undefined>(undefined);

export const PizzaBaseProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [bases, setBases] = useState<PizzaBaseProps[]>([]);

    return (
        <PizzaBaseContext.Provider value={{bases, setBases}}>
            {children}
        </PizzaBaseContext.Provider>
    );
}

export const usePizzaBase = (): PizzaBaseContextType => {
    const context = useContext(PizzaBaseContext);
    if (!context) {
        throw new Error('PizzaBaseProvider не обнаружен');
    }
    return context;
}