import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {PizzaBaseProps, PizzaBaseRequest} from "../../../props/PizzaBase";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";
import InputField from "../../input_field/InputField";

interface UpdatePizzaBaseProps {
    userID: string;
}

const UpdatePizzaBase: React.FC<UpdatePizzaBaseProps> = ({userID}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [curBase, setCurBase] = useState<PizzaBaseProps | null>(null);

    const {bases, setBases} = usePizzaBase();

    const {update, getAll} = useCRUD<PizzaBaseProps, PizzaBaseRequest>('/bases');

    const handleUpdate = async () => {
        if (!curBase) {
            return;
        }

        const floatPrice = parseFloat(price);

        const data = {
            name: name,
            price: floatPrice,
        };

        try {
            await update(userID, curBase.id, data);
            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setBases(currentList);

            setName('');
            setPrice('');
            setCurBase(null);
        } catch (error) {
        }
    }

    return (
        <>
            {!curBase ? (
                <ul className="ingredient-list ingredient-list-control">
                    {bases.map((ingredient: PizzaBaseProps) => (
                        <PizzaBaseCard
                            key={ingredient.id}
                            name={ingredient.name}
                            price={ingredient.price}
                            onClick={() => {
                                setCurBase(ingredient);
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

export default UpdatePizzaBase;