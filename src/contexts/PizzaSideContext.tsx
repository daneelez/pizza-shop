import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {PizzaSideProps} from "../props/PizzaSide";

interface PizzaSideContextType {
    sides: PizzaSideProps[];
    setSides: Dispatch<SetStateAction<PizzaSideProps[]>>;
}

const PizzaSideContext = createContext<PizzaSideContextType | undefined>(undefined);

export const PizzaSideProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [sides, setSides] = useState<PizzaSideProps[]>([]);

    return (
        <PizzaSideContext.Provider value={{sides, setSides}}>
            {children}
        </PizzaSideContext.Provider>
    );
}

export const usePizzaSide = (): PizzaSideContextType => {
    const context = useContext(PizzaSideContext);
    if (!context) {
        throw new Error('PizzaSideProvider не обнаружен');
    }
    return context;
}