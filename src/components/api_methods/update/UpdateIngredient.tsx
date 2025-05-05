import '../Methods.css'
import {useState} from "react";
import InputField from "../../input_field/InputField";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {useIngredients} from "../../../contexts/IngredientContext";
import {IngredientProps, IngredientRequest} from "../../../props/Ingredient";
import IngredientCard from "../../cards/Ingredient_card/IngredientCard";

interface UpdateIngredientProps {
    userID: string;
}

const UpdateIngredient: React.FC<UpdateIngredientProps> = ({userID}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [curIngredient, setCurIngredient] = useState<IngredientProps | null>(null);

    const {ingredients, setIngredients} = useIngredients();

    const {update, getAll} = useCRUD<IngredientProps, IngredientRequest>('/ingredients');

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
            await update(userID, curIngredient.id, data);
            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setIngredients(currentList);

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