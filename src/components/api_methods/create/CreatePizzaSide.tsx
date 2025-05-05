import '../Methods.css'
import {useState} from "react";
import InputField from "../../input_field/InputField";
import CommandButton from "../../command_button/CommandButton";
import {useCRUD} from "../../../hooks/useCRUD";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {IngredientProps} from "../../../props/Ingredient";
import {PizzaProps} from "../../../props/Pizza";
import {useIngredients} from "../../../contexts/IngredientContext";
import {useModalWindow} from "../../../hooks/useModalWindow";
import ModalWindow from "../../modal_window/ModalWindow";

interface CreatePizzaSideProps {
    userID: string;
}

const CreatePizzaSide: React.FC<CreatePizzaSideProps> = ({userID}) => {
    const [name, setName] = useState('');

    const [selectedPizzas, setSelectedPizzas] = useState<PizzaProps[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);

    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);


    const {ingredients} = useIngredients();
    const {setSides} = usePizzaSide();

    const {
        handleItemChange: handleIngredientChange,
        isSelected,
    } = useModalWindow<IngredientProps>({selectedItems: selectedIngredients, setSelectedItems: setSelectedIngredients});

    const {create} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');

    const handleCreate = async () => {
        const data = {
            name: name,
            ingredients: selectedIngredients,
            notAllowedList: selectedPizzas,
        };

        try {
            const result = await create(userID, data);

            const validData = result.data ?? [];
            setSides(validData);

            setName('');
            setSelectedIngredients([]);
            setSelectedPizzas([]);
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
            </div>
            {isIngredientModalOpen && (
                <ModalWindow title={'Выберите ингредиенты'} list={ingredients} onChange={handleIngredientChange}
                             onChecked={isSelected} onToggle={setIsIngredientModalOpen}/>)}
            <CommandButton size={"large"} type={'white'} command={handleCreate} title={"Создать"}/>
        </>
    );
}

export default CreatePizzaSide;