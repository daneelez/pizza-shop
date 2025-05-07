import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {PizzaBaseProps, PizzaBaseRequest} from "../../../props/PizzaBase";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";
import InputField from "../../input_field/InputField";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {updateRelatedOne} from "../../../hooks/useChangeRelated";
import {usePizza} from "../../../contexts/PizzaContext";

interface UpdatePizzaBaseProps {
    userID: string;
}

const UpdatePizzaBase: React.FC<UpdatePizzaBaseProps> = ({userID}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [curBase, setCurBase] = useState<PizzaBaseProps | null>(null);

    const {bases, setBases} = usePizzaBase();
    const {pizzas, setPizzas} = usePizza();

    const {update, getAll} = useCRUD<PizzaBaseProps, PizzaBaseRequest>('/bases');
    const {update: updatePizzas, getAll: getAllPizzas} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

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
            const response = await update(userID, curBase.id, data);

            if (!response.data) {
                errorToaster("Ошибка обновления основы!")
            } else {
                succesToaster("Основа успешно обновлена!")
            }


            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setBases(currentList);

            const updatedBase = {...curBase, ...data};

            const pizzasToChange = pizzas.filter(item => item.base.id === updatedBase.id)

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
                    updatedEntry: updatedBase,
                    type: 'base',
                    filter: 'update',
                    updateRemote: updatePizzas,
                    getItemProps: getPizzaProps,
                }
            );

            const currentPizzas = await getAllPizzas(userID).then(res =>
                res.data ? res.data : []);

            setPizzas(currentPizzas);

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