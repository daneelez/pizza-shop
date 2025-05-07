import '../Methods.css'
import {useState} from "react";
import InputField from "../../input_field/InputField";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {useIngredients} from "../../../contexts/IngredientContext";
import {IngredientProps, IngredientRequest} from "../../../props/Ingredient";
import IngredientCard from "../../cards/Ingredient_card/IngredientCard";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import {updateRelated} from "../../../hooks/useChangeRelated";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {usePizza} from "../../../contexts/PizzaContext";

interface UpdateIngredientProps {
    userID: string,
}

const UpdateIngredient: React.FC<UpdateIngredientProps> = ({userID}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [curIngredient, setCurIngredient] = useState<IngredientProps | null>(null);

    const {ingredients, setIngredients} = useIngredients();
    const {sides, setSides} = usePizzaSide();
    const {pizzas, setPizzas} = usePizza();

    const {update, getAll} = useCRUD<IngredientProps, IngredientRequest>('/ingredients');
    const {update: updateSides} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');
    const {update: updatePizzas} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    const handleUpdate = async () => {
        if (!curIngredient) {
            return;
        }

        const floatPrice = parseFloat(price);

        const data = {
            name: name,
            price: floatPrice,
        };

        try {
            const response = await update(userID, curIngredient.id, data);

            if (!response.data) {
                errorToaster("Ошибка обновления ингредиента!")
            } else {
                succesToaster("Ингредиент успешно обновлен!")
            }

            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setIngredients(currentList);

            const updatedIngredient = {...curIngredient, ...data};

            const getSideProps = (side: PizzaSideProps) => ({
                name: side.name,
                ingredients: side.ingredients,
                notAllowedList: side.notAllowedList,
            });

            const updatedSides = await updateRelated(
                {
                    userID: userID,
                    items: sides,
                    updatedEntry: updatedIngredient,
                    type: 'ingredients',
                    filter: 'update',
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
                    updatedEntry: updatedIngredient,
                    type: 'ingredients',
                    filter: 'update',
                    updateRemote: updatePizzas,
                    getItemProps: getPizzaProps,
                }
            );

            setPizzas(updatedPizzas);

            setName('');
            setPrice('');
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
                                setName(ingredient.name);
                                setPrice(String(ingredient.price));
                            }}
                        />
                    ))}
                </ul>
            ) : (
                <>
                    <div
                        className='create-method-container'
                    >
                        <InputField type={'text'} placeholder={'Название'} value={name}
                                    onChangeString={setName} size={'large'}/>
                        <InputField type={'text'} placeholder={'Цена'} value={price}
                                    onChangeString={setPrice} size={'large'}/>
                    </div>
                    <CommandButton size={"large"} type={'white'} command={handleUpdate} title={"Изменить"}/>
                </>
            )}
        </>
    );
}

export default UpdateIngredient;