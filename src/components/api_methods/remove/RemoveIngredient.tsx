import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {useIngredients} from "../../../contexts/IngredientContext";
import {IngredientProps, IngredientRequest} from "../../../props/Ingredient";
import IngredientCard from "../../cards/Ingredient_card/IngredientCard";

interface RemoveIngredientProps {
    userID: string;
}

const RemoveIngredient: React.FC<RemoveIngredientProps> = ({userID}) => {
    const [curIngredient, setCurIngredient] = useState<IngredientProps | null>(null);

    const {ingredients, setIngredients} = useIngredients();

    const {remove, getAll} = useCRUD<IngredientProps, IngredientRequest>('/ingredients');

    const handleRemove = async () => {
        if (!curIngredient) {
            return;
        }

        try {
            await remove(userID, curIngredient);
            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setIngredients(currentList);
            setCurIngredient(null);

            console.log(currentList);

        } catch (error) {
            console.error(error);
            alert("Ошибка при создании ингредиента!");
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