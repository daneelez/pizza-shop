import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {PizzaBaseProps, PizzaBaseRequest} from "../../../props/PizzaBase";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {updateRelatedOne} from "../../../hooks/useChangeRelated";
import {usePizza} from "../../../contexts/PizzaContext";

interface RemovePizzaBaseProps {
    userID: string;
}

const RemovePizzaBase: React.FC<RemovePizzaBaseProps> = ({userID}) => {
    const [curBase, setCurBase] = useState<PizzaBaseProps | null>(null);

    const {bases, setBases} = usePizzaBase();

    const {pizzas, setPizzas} = usePizza();
    const {update: updatePizzas, getAll: getAllPizzas} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    const {remove, getAll} = useCRUD<PizzaBaseProps, PizzaBaseRequest>('/bases');

    const handleRemove = async () => {
        if (!curBase) {
            return;
        }

        try {
            const response = await remove(userID, curBase.id);

            if (!response.data) {
                errorToaster("Ошибка удаления основы!")
            } else {
                succesToaster("Основа успешно удалена!")
            }

            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setBases(currentList);

            const pizzasToChange = pizzas.filter(item => item.base.id === curBase.id)

            const getPizzaProps = (pizza: PizzaProps) => ({
                name: pizza.name,
                ingredients: pizza.ingredients,
                base: pizza.base,
                side: pizza.side,
            });

            await updateRelatedOne(
                {
                    userID: userID,
                    items: pizzasToChange,
                    updatedEntry: curBase,
                    type: 'base',
                    filter: 'delete',
                    updateRemote: updatePizzas,
                    getItemProps: getPizzaProps,
                }
            );

            const currentPizzas = await getAllPizzas(userID).then(res =>
                res.data ? res.data : []);

            setPizzas(currentPizzas);

            setCurBase(null);
        } catch (error) {
        }
    }

    return (
        <>
            {!curBase ? (
                <ul className="ingredient-list ingredient-list-control">
                    {bases.map((base: PizzaBaseProps) => (
                        <PizzaBaseCard
                            key={base.id}
                            name={base.name}
                            price={base.price}
                            onClick={() => {
                                setCurBase(base);
                            }}
                        />
                    ))}
                </ul>
            ) : (
                <div>
                    <CommandButton size={"large"} type={'white'} command={handleRemove} title={"Удалить"}/>
                </div>
            )}
        </>
    );
}

export default RemovePizzaBase;