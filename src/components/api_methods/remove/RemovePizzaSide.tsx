import '../Methods.css'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";

interface RemovePizzaSideProps {
    userID: string;
}

const RemovePizzaSide: React.FC<RemovePizzaSideProps> = ({userID}) => {
    const [curSide, setCurSide] = useState<PizzaSideProps | null>(null);

    const {sides, setSides} = usePizzaSide();

    const {remove, getAll} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');

    const handleRemove = async () => {
        if (!curSide) {
            return;
        }

        try {
            await remove(userID, curSide.id);
            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setSides(currentList);
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