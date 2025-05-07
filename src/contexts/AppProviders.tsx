import {UserProvider} from "./UserContext";
import {IngredientProvider} from "./IngredientContext";
import {PizzaBaseProvider} from "./PizzaBaseContext";
import {PizzaSideProvider} from "./PizzaSideContext";
import {PizzaProvider} from "./PizzaContext";


export const AppProviders: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <UserProvider>
            <IngredientProvider>
                <PizzaBaseProvider>
                    <PizzaSideProvider>
                        <PizzaProvider>
                            {children}
                        </PizzaProvider>
                    </PizzaSideProvider>
                </PizzaBaseProvider>
            </IngredientProvider>
        </UserProvider>
    );
}