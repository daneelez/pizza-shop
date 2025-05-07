import '../Methods.css'
import {useState} from "react";
import InputField from "../../input_field/InputField";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {PizzaSideProps} from "../../../props/PizzaSide";
import {IngredientProps} from "../../../props/Ingredient";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";
import {useIngredients} from "../../../contexts/IngredientContext";
import {useModalWindow} from "../../../hooks/useModalWindow";
import ModalWindow from "../../modal_window/ModalWindow";
import {errorToaster, succesToaster} from "../../notify_toaster/NotifyToaster";
import {usePizza} from "../../../contexts/PizzaContext";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {PizzaBaseProps} from "../../../props/PizzaBase";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";

interface CreatePizzaProps {
    userID: string;
}

const CreatePizza: React.FC<CreatePizzaProps> = ({userID}) => {
    const [name, setName] = useState('');

    const [selectedSides, setSelectedSides] = useState<PizzaSideProps[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);
    const [selectedBases, setSelectedBases] = useState<PizzaBaseProps[]>([]);

    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isSideModalOpen, setIsSideModalOpen] = useState(false);
    const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);


    const {ingredients} = useIngredients();
    const {sides} = usePizzaSide();
    const {bases} = usePizzaBase();

    const {setPizzas} = usePizza();

    const {
        handleItemChange: handleIngredientChange,
        isSelected: isIngredientSelected,
    } = useModalWindow<IngredientProps>({selectedItems: selectedIngredients, setSelectedItems: setSelectedIngredients});

    const {
        handleItemReplace: handlePizzaSideChange,
        isSelected: isPizzaSideSelected,
    } = useModalWindow<PizzaSideProps>({selectedItems: selectedSides, setSelectedItems: setSelectedSides});

    const {
        handleItemReplace: handlePizzaBaseChange,
        isSelected: isPizzaBaseSelected,
    } = useModalWindow<PizzaBaseProps>({selectedItems: selectedBases, setSelectedItems: setSelectedBases});


    const {create, getAll} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    const handleCreate = async () => {
        if (selectedBases.length === 0 || !name) return;

        const data = {
            name: name,
            ingredients: selectedIngredients,
            base: selectedBases[0],
            side: selectedSides.length === 1 ? selectedSides[0] : null,
        };

        try {
            const response = await create(userID, data);

            if (!response.data) {
                errorToaster("Ошибка создания пиццы!")
            } else {
                succesToaster("Пицца успешно создана!")
            }

            const currentList = await getAll(userID).then(res =>
                res.data ? res.data : []);

            setPizzas(currentList);

            setName('');
            setSelectedIngredients([]);
            setSelectedBases([]);
            setSelectedSides([]);
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
                             onChecked={isIngredientSelected} onToggle={setIsIngredientModalOpen} type={'many'}/>)}

            {isBaseModalOpen && (
                <ModalWindow title={'Выберите основу'} list={bases} onChange={handlePizzaBaseChange}
                             onChecked={isPizzaBaseSelected} onToggle={setIsBaseModalOpen} type={'alone'}/>)}

            {isSideModalOpen && (
                <ModalWindow title={'Выберите бортик'} list={sides} onChange={handlePizzaSideChange}
                             onChecked={isPizzaSideSelected} onToggle={setIsSideModalOpen} type={'alone'}/>)}

            <CommandButton size={"large"} type={'white'} command={handleCreate} title={"Создать"}/>
        </>
    );
}

export default CreatePizza;