import {UserProvider} from "./UserContext";
import {IngredientProvider} from "./IngredientContext";
import {PizzaBaseProvider} from "./PizzaBaseContext";
import {PizzaSideProvider} from "./PizzaSideContext";
import {PizzaProvider} from "./PizzaContext";
import {OrderProvider} from "./OrderContext";


export const AppProviders: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <UserProvider>
            <IngredientProvider>
                <PizzaBaseProvider>
                    <PizzaSideProvider>
                        <PizzaProvider>
                            <OrderProvider>
                                {children}
                            </OrderProvider>
                        </PizzaProvider>
                    </PizzaSideProvider>
                </PizzaBaseProvider>
            </IngredientProvider>
        </UserProvider>
    );
}