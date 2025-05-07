import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {updateRelatedOne} from "../../../hooks/useChangeRelated";
import {usePizza} from "../../../contexts/PizzaContext";

interface RemovePizzaSideProps {
    userID: string;
}

const RemovePizzaSide: React.FC<RemovePizzaSideProps> = ({userID}) => {
    const [curSide, setCurSide] = useState<PizzaSideProps | null>(null);

    const {sides, setSides} = usePizzaSide();

    const {pizzas, setPizzas} = usePizza();
    const {update: updatePizzas, getAll: getAllPizzas} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    const {remove, getAll} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');

    const handleRemove = async () => {
        if (!curSide) {
            return;
        }

        try {
            const response = await remove(userID, curSide.id);

            if (!response.data) {
                errorToaster("Ошибка удаления бортика!")
            } else {
                succesToaster("Бортик успешно удален!")
            }

            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setSides(currentList);

            const pizzasToChange = pizzas.filter(item => item.side.id === curSide.id)

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
                    updatedEntry: curSide,
                    type: 'side',
                    filter: 'delete',
                    updateRemote: updatePizzas,
                    getItemProps: getPizzaProps,
                }
            );

            const currentPizzas = await getAllPizzas(userID).then(res =>
                res.data ? res.data : []);

            setPizzas(currentPizzas);

            setCurSide(null);
        } catch (error) {
        }
    }

    return (
        <>
            {!curSide ? (
                <ul className="ingredient-list ingredient-list-control">
                    {sides.map((side: PizzaSideProps) => (
                        <PizzaBaseCard
                            key={side.id}
                            name={side.name}
                            price={side.price}
                            onClick={() => {
                                setCurSide(side);
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

export default RemovePizzaSide;