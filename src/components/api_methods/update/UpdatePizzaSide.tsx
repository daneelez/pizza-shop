import '../Methods.css'
import {useState} from "react";
import InputField from "../../input_field/InputField";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {IngredientProps} from "../../../props/Ingredient";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {useIngredients} from "../../../contexts/IngredientContext";
import {useModalWindow} from "../../../hooks/useModalWindow";
import ModalWindow from "../../modal_window/ModalWindow";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";
import {usePizza} from "../../../contexts/PizzaContext";
import {updateRelatedOne} from "../../../hooks/useChangeRelated";

interface UpdatePizzaSideProps {
    userID: string;
}

const UpdatePizzaSide: React.FC<UpdatePizzaSideProps> = ({userID}) => {
    const [name, setName] = useState('');

    const [selectedPizzas, setSelectedPizzas] = useState<PizzaProps[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);

    const [curSide, setCurSide] = useState<PizzaSideProps | null>(null);

    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isPizzaModalOpen, setIsPizzaModalOpen] = useState(false);


    const {ingredients} = useIngredients();
    const {pizzas, setPizzas} = usePizza();

    const {update: updatePizzas, getAll: getAllPizzas} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    const {sides, setSides} = usePizzaSide();

    const {
        handleItemChange: handleIngredientChange,
        isSelected: isIngredientSelected,
    } = useModalWindow<IngredientProps>({selectedItems: selectedIngredients, setSelectedItems: setSelectedIngredients});

    const {
        handleItemChange: handlePizzaChange,
        isSelected: isPizzaSelected,
    } = useModalWindow<PizzaProps>({selectedItems: selectedPizzas, setSelectedItems: setSelectedPizzas});

    const {update, getAll} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');

    const handleUpdate = async () => {
        if (!curSide) return;

        const data = {
            name: name,
            ingredients: selectedIngredients,
            notAllowedList: selectedPizzas,
        };

        try {
            const response = await update(userID, curSide.id, data);

            if (!response.data) {
                errorToaster("Ошибка обновления бортика!")
            } else {
                succesToaster("Бортик успешно обновлен!")
            }

            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setSides(currentList);

            const updatedSide = {...curSide, ...data};

            const pizzasToChange = pizzas.filter(item => item.side.id === updatedSide.id)

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
                    updatedEntry: updatedSide,
                    type: 'side',
                    filter: 'update',
                    updateRemote: updatePizzas,
                    getItemProps: getPizzaProps,
                }
            );

            const currentPizzas = await getAllPizzas(userID).then(res =>
                res.data ? res.data : []);

            setPizzas(currentPizzas);

            setName('');
            setSelectedIngredients([]);
            setSelectedPizzas([]);
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
                                setName(side.name);
                                setSelectedIngredients(side.ingredients);
                                setSelectedPizzas(side.notAllowedList);
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

                        <div className='modal-container'>
                            <CommandButton
                                size={"large"}
                                type={'black'}
                                title={"Выбрать ингредиенты"}
                                command={() => setIsIngredientModalOpen(true)}
                            />
                        </div>
                        <div className='modal-container'>
                            <CommandButton
                                size={"large"}
                                type={'black'}
                                title={"Выбрать запрещенные пиццы"}
                                command={() => setIsPizzaModalOpen(true)}
                            />
                        </div>
                    </div>
                    {isIngredientModalOpen && (
                        <ModalWindow title={'Выберите ингредиенты'} list={ingredients} onChange={handleIngredientChange}
                                     onChecked={isIngredientSelected} onToggle={setIsIngredientModalOpen}
                                     type={'many'}/>)}

                    {isPizzaModalOpen && (
                        <ModalWindow title={'Выберите запрещенные пиццы'} list={pizzas} onChange={handlePizzaChange}
                                     onChecked={isPizzaSelected} onToggle={setIsPizzaModalOpen} type="many"/>)}
                    <CommandButton size={"large"} type={'white'} command={handleUpdate} title={"Обновить"}/>
                </>
            )}
        </>
    );
}

export default UpdatePizzaSide;