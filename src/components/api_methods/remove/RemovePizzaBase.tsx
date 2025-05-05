import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {PizzaBaseProps, PizzaBaseRequest} from "../../../props/PizzaBase";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";

interface RemovePizzaBaseProps {
    userID: string;
}

const RemovePizzaBase: React.FC<RemovePizzaBaseProps> = ({userID}) => {
    const [curBase, setCurBase] = useState<PizzaBaseProps | null>(null);

    const {bases, setBases} = usePizzaBase();

    const {remove, getAll} = useCRUD<PizzaBaseProps, PizzaBaseRequest>('/bases');

    const handleRemove = async () => {
        if (!curBase) {
            return;
        }

        try {
            await remove(userID, curBase);
            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setBases(currentList);
            setCurBase(null);

            console.log(currentList);

        } catch (error) {
            console.error(error);
            alert("Ошибка при создании основы!");
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

export default RemovePizzaBase;