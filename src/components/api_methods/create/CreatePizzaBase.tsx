import '../Methods.css'
import {useState} from "react";
import InputField from "../../input_field/InputField";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {PizzaBaseProps, PizzaBaseRequest} from "../../../props/PizzaBase";

interface CreatePizzaBaseProps {
    userID: string;
}

const CreatePizzaBase: React.FC<CreatePizzaBaseProps> = ({userID}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const {setBases} = usePizzaBase();

    const {create} = useCRUD<PizzaBaseProps, PizzaBaseRequest>('/bases');

    const handleCreate = async () => {
        if (!name || !price) {
            return;
        }

        const floatPrice = parseFloat(price);
        if (isNaN(floatPrice) || floatPrice < 0) {
            alert("Введите корректную цену!");
            return;
        }

        const data = {
            name: name,
            price: floatPrice,
        };

        try {
            const result = await create(userID, data);

            const validData = result.data ?? [];
            setBases(validData);

            setName('');
            setPrice('');
        } catch (error) {
            alert("Ошибка при создании основы!");
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

export default CreatePizzaBase;