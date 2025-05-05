import {UserProvider} from "./UserContext";
import {IngredientProvider} from "./IngredientContext";
import {PizzaBaseProvider} from "./PizzaBaseContext";
import {PizzaSideProvider} from "./PizzaSideContext";


export const AppProviders: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <UserProvider>
            <IngredientProvider>
                <PizzaBaseProvider>
                    <PizzaSideProvider>
                        {children}
                    </PizzaSideProvider>
                </PizzaBaseProvider>
            </IngredientProvider>
        </UserProvider>
    );
}