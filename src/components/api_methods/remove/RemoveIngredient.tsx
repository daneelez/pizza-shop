import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {useIngredients} from "../../../contexts/IngredientContext";
import {IngredientProps, IngredientRequest} from "../../../props/Ingredient";
import IngredientCard from "../../cards/Ingredient_card/IngredientCard";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {updateRelated} from "../../../hooks/useChangeRelated";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {usePizza} from "../../../contexts/PizzaContext";

interface RemoveIngredientProps {
    userID: string;
}

const RemoveIngredient: React.FC<RemoveIngredientProps> = ({userID}) => {
    const [curIngredient, setCurIngredient] = useState<IngredientProps | null>(null);

    const {ingredients, setIngredients} = useIngredients();

    const {sides, setSides} = usePizzaSide();
    const {pizzas, setPizzas} = usePizza();

    const {update: updateSides} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');
    const {update: updatePizzas} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    const {remove, getAll} = useCRUD<IngredientProps, IngredientRequest>('/ingredients');

    const handleRemove = async () => {
        if (!curIngredient) {
            return;
        }

        try {
            const response = await remove(userID, curIngredient.id);

            if (!response.data) {
                errorToaster("Ошибка удаления ингредиента!")
            } else {
                succesToaster("Ингредиент успешно удален!")
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
                    updatedEntry: curIngredient,
                    type: 'ingredients',
                    filter: 'delete',
                    updateRemote: updateSides,
                    getItemProps: getSideProps,
                }
            );

            setSides(updatedSides);

            const getPizzaProps = (pizza: PizzaProps) => ({
                name: pizza.name,
                ingredients: pizza.ingredients,
                base: pizza.base,
                side: pizza.side,
            });

            const updatedPizzas = await updateRelated(
                {
                    userID: userID,
                    items: pizzas,
                    updatedEntry: curIngredient,
                    type: 'ingredients',
                    filter: 'delete',
                    updateRemote: updatePizzas,
                    getItemProps: getPizzaProps,
                }
            );

            setPizzas(updatedPizzas);

            setIngredients(currentList);
            setCurIngredient(null);
        } catch (error) {
        }
    }

    return (
        <>
            {!curIngredient ? (
                <ul className="ingredient-list ingredient-list-control">
                    {ingredients.map((ingredient: IngredientProps) => (
                        <IngredientCard
                            key={ingredient.id}
                            name={ingredient.name}
                            price={ingredient.price}
                            onClick={() => {
                                setCurIngredient(ingredient);
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

export default RemoveIngredient;