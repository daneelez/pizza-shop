import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {usePizza} from "../../../contexts/PizzaContext";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {updateRelated} from "../../../hooks/useChangeRelated";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";

interface RemovePizzaProps {
    userID: string;
}

const RemovePizza: React.FC<RemovePizzaProps> = ({userID}) => {
    const [curPizza, setCurPizza] = useState<PizzaProps | null>(null);

    const {pizzas, setPizzas} = usePizza();
    const {sides, setSides} = usePizzaSide();

    const {update: updateSides} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');
    const {remove, getAll} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    const handleRemove = async () => {
        if (!curPizza) {
            return;
        }

        try {
            const response = await remove(userID, curPizza.id);

            if (!response.data) {
                errorToaster("Ошибка удаления пиццы!")
            } else {
                succesToaster("Пицца успешно удалена!")
            }

            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            const getSideProps = (side: PizzaSideProps) => ({
                name: side.name,
                ingredients: side.ingredients,
                notAllowedList: side.notAllowedList,
            });

            const updatedSides = await updateRelated(
                {
                    userID: userID,
                    items: sides,
                    updatedEntry: curPizza,
                    type: 'notAllowedList',
                    filter: 'delete',
                    updateRemote: updateSides,
                    getItemProps: getSideProps,
                }
            );

            setSides(updatedSides);

            setPizzas(currentList);
            setCurPizza(null);
        } catch (error) {
        }
    }

    return (
        <>
            {!curPizza ? (
                <ul className="ingredient-list ingredient-list-control">
                    {pizzas.map((pizza: PizzaProps) => (
                        <PizzaBaseCard
                            key={pizza.id}
                            name={pizza.name}
                            price={pizza.price}
                            onClick={() => {
                                setCurPizza(pizza);
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

export default RemovePizza;