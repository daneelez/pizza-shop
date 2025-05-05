import '../Methods.css'
import {useState} from "react";
import InputField from "../../input_field/InputField";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {useIngredients} from "../../../contexts/IngredientContext";
import {IngredientProps, IngredientRequest} from "../../../props/Ingredient";

interface CreateIngredientProps {
    userID: string;
}

const CreateIngredient: React.FC<CreateIngredientProps> = ({userID}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const {setIngredients} = useIngredients();

    const {create} = useCRUD<IngredientProps, IngredientRequest>('/ingredients');

    const handleCreate = async () => {
        const floatPrice = parseFloat(price);

        const data = {
            name: name,
            price: floatPrice,
        };

        try {
            const result = await create(userID, data);

            const validData = result.data ?? [];
            setIngredients(validData);

            setName('');
            setPrice('');
        } catch (error) {
        }
    }

    return (
        <>
            <div
                className='create-method-container'
            >
                <InputField type={'text'} placeholder={'Название'} value={name}
                            onChangeString={setName} size={'large'}/>
                <InputField type={'text'} placeholder={'Цена'} value={price}
                            onChangeString={setPrice} size={'large'}/>
            </div>
            <CommandButton size={"large"} type={'white'} command={handleCreate} title={"Создать"}/>
        </>
    );
}

export default CreateIngredient;