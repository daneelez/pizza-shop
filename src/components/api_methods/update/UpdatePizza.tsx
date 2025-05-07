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
import {PizzaBaseProps} from "../../../props/PizzaBase";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {updateRelatedOne} from "../../../hooks/useChangeRelated";

interface UpdatePizzaProps {
    userID: string;
}

const UpdatePizza: React.FC<UpdatePizzaProps> = ({userID}) => {
    const [name, setName] = useState('');

    const [selectedSides, setSelectedSides] = useState<PizzaSideProps[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);
    const [selectedBases, setSelectedBases] = useState<PizzaBaseProps[]>([]);

    const [curPizza, setCurPizza] = useState<PizzaProps | null>(null);

    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isSideModalOpen, setIsSideModalOpen] = useState(false);
    const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);

    const {ingredients} = useIngredients();
    const {sides, setSides} = usePizzaSide();
    const {bases} = usePizzaBase();

    const {
        handleItemChange: handleIngredientChange,
        isSelected: isIngredientSelected,
    } = useModalWindow<IngredientProps>({selectedItems: selectedIngredients, setSelectedItems: setSelectedIngredients});

    const {
        handleItemReplace: handlePizzaSideChange,
        isSelectedOne: isPizzaSideSelected,
    } = useModalWindow<PizzaSideProps>({selectedItems: selectedSides, setSelectedItems: setSelectedSides});

    const {
        handleItemReplace: handlePizzaBaseChange,
        isSelectedOne: isPizzaBaseSelected,
    } = useModalWindow<PizzaBaseProps>({selectedItems: selectedBases, setSelectedItems: setSelectedBases});

    const {pizzas, setPizzas} = usePizza();

    const {update, getAll} = useCRUD<PizzaProps, PizzaRequest>('/pizza');
    const {update: updateSides, getAll: getAllSides} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');

    const handleUpdate = async () => {
        console.log("pizza.base", curPizza?.base);
        console.log("selectedBases", selectedBases);
        console.log("bases", bases);

        if (!curPizza || selectedBases.length === 0 || !name) return;

        const data = {
            name: name,
            ingredients: selectedIngredients,
            base: selectedBases[0],
            side: selectedSides[0],
        };

        try {
            const response = await update(userID, curPizza.id, data);

            if (!response.data) {
                errorToaster("Ошибка обновления пиццы!")
            } else {
                succesToaster("Пицца успешно обновлена!")
            }

            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setPizzas(currentList);

            const sidesToChange = sides.filter(side => curPizza.id in side.notAllowedList);

            const getSidesProps = (side: PizzaSideProps) => ({
                name: side.name,
                ingredients: side.ingredients,
                notAllowedList: side.notAllowedList,
            });

            await updateRelatedOne(
                {
                    userID: userID,
                    items: sidesToChange,
                    updatedEntry: curPizza,
                    type: 'notAllowedList',
                    filter: 'delete',
                    updateRemote: updateSides,
                    getItemProps: getSidesProps,
                }
            );

            const currentSides = await getAllSides(userID).then(res =>
                res.data ? res.data : []);

            setSides(currentSides);

            setName('');
            setSelectedIngredients([]);
            setSelectedBases([]);
            setSelectedSides([]);
            setCurPizza(null);
        } catch (error) {
        }
    }

    return (
        <>
            {!curPizza ? (
                <ul className="ingredient-list ingredient-list-control">
                    {pizzas.map((pizza: PizzaProps) => (
                        <PizzaBaseCard
                            key={pizza.id}
                            name={pizza.name}
                            price={pizza.price}
                            onClick={() => {
                                setCurPizza(pizza);
                                setName(pizza.name);
                                setSelectedIngredients(pizza.ingredients);
                                setSelectedBases([pizza.base]);
                                setSelectedSides([pizza.side]);
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
                                title={"Выбрать основу"}
                                command={() => setIsBaseModalOpen(true)}
                            />
                        </div>
                        <div className='modal-container'>
                            <CommandButton
                                size={"large"}
                                type={'black'}
                                title={"Выбрать бортик"}
                                command={() => setIsSideModalOpen(true)}
                            />
                        </div>
                    </div>
                    {isIngredientModalOpen && (
                        <ModalWindow title={'Выберите ингредиенты'} list={ingredients} onChange={handleIngredientChange}
                                     onChecked={isIngredientSelected} onToggle={setIsIngredientModalOpen}
                                     type={'many'}/>)}

                    {isBaseModalOpen && (
                        <ModalWindow title={'Выберите основу'} list={bases} onChange={handlePizzaBaseChange}
                                     onChecked={isPizzaBaseSelected} onToggle={setIsBaseModalOpen} type={'alone'}/>)}

                    {isSideModalOpen && (
                        <ModalWindow title={'Выберите бортик'} list={sides} onChange={handlePizzaSideChange}
                                     onChecked={isPizzaSideSelected} onToggle={setIsSideModalOpen} type={'alone'}/>)}
                    <CommandButton size={"large"} type={'white'} command={handleUpdate} title={"Обновить"}/>
                </>
            )}
        </>
    );
}

export default UpdatePizza;