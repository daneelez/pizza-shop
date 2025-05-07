import './Filters.css'
import {useIngredients} from "../../contexts/IngredientContext";
import {useState} from "react";
import {useModalWindow} from "../../hooks/useModalWindow";
import {IngredientProps} from "../../props/Ingredient";
import ModalWindow from "../modal_window/ModalWindow";
import CommandButton from "../command_button/CommandButton";

interface IngredientFilterProps {
    selectedIngredients: IngredientProps[];
    setSelectedIngredients: React.Dispatch<React.SetStateAction<IngredientProps[]>>;
}


const IngredientFilter: React.FC<IngredientFilterProps> = ({selectedIngredients, setSelectedIngredients}) => {
    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const {ingredients} = useIngredients();


    const {
        handleItemChange: handleIngredientChange,
        isSelected,
    } = useModalWindow<IngredientProps>({selectedItems: selectedIngredients, setSelectedItems: setSelectedIngredients});

    return (
        <div className={'price-filter-container'}>
            <h2 className={'filter-container-title'}>Ингредиенты</h2>
            <div className='modal-container'>
                <CommandButton
                    size={"small"}
                    type={'black'}
                    title={"Выбрать"}
                    command={() => setIsIngredientModalOpen(true)}
                />
            </div>
            {isIngredientModalOpen && (
                <ModalWindow title={'Выберите ингредиенты для фильтрации'} list={ingredients}
                             onChange={handleIngredientChange}
                             onChecked={isSelected} onToggle={setIsIngredientModalOpen}
                             type={'many'}
                />)}

        </div>
    );
}

export default IngredientFilter;