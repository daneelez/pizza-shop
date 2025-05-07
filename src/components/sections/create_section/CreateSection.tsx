import './CreateSection.css'
import {useUser} from '../../../contexts/UserContext'
import {useEffect, useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import ControlMenu from "../../control_menu/ControlMenu";
import CreateMethod from "../../api_methods/create/CreateMethod";
import UpdateMethod from "../../api_methods/update/UpdateMethod";
import RemoveMethod from "../../api_methods/remove/RemoveMethod";
import {useIngredients} from "../../../contexts/IngredientContext";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {useCRUD} from "../../../hooks/useCRUD";
import {IngredientProps, IngredientRequest} from "../../../props/Ingredient";
import {PizzaBaseProps, PizzaBaseRequest} from "../../../props/PizzaBase";
import {PizzaSideProps, PizzaSideRequest} from "../../../props/PizzaSide";
import {usePizza} from "../../../contexts/PizzaContext";
import {PizzaProps, PizzaRequest} from "../../../props/Pizza";

const CreateSection = () => {
    const {user} = useUser();

    const [currentFocus, setCurrentFocus] = useState('');
    const [currentAction, setCurrentAction] = useState('');

    const {setIngredients} = useIngredients();
    const {setBases} = usePizzaBase();
    const {setSides} = usePizzaSide();
    const {setPizzas} = usePizza();

    const {getAll: getAllIngredients} = useCRUD<IngredientProps, IngredientRequest>('/ingredients');
    const {getAll: getAllBases} = useCRUD<PizzaBaseProps, PizzaBaseRequest>('/bases');
    const {getAll: getAllSides} = useCRUD<PizzaSideProps, PizzaSideRequest>('/sides');
    const {getAll: getAllPizzas} = useCRUD<PizzaProps, PizzaRequest>('/pizza');

    useEffect(() => {
        if (!user) {
            setIngredients([]);
            setSides([]);
            setBases([]);
            setPizzas([]);
        } else {
            getAllIngredients(user.id).then(res => {
                if (res.data) {
                    setIngredients(res.data);
                } else {
                    setIngredients([]);
                }
            });

            getAllBases(user.id).then(res => {
                if (res.data) {
                    setBases(res.data);
                } else {
                    setBases([]);
                }
            });

            getAllSides(user.id).then(res => {
                if (res.data) {
                    setSides(res.data);
                } else {
                    setSides([]);
                }
            });

            getAllPizzas(user.id).then(res => {
                if (res.data) {
                    setPizzas(res.data);
                } else {
                    setPizzas([]);
                }
            });
        }
    }, []);

    let focusTitle;

    switch (currentFocus) {
        case 'pizza':
            focusTitle = 'Пицца'
            break;
        case 'ingredients':
            focusTitle = 'Ингредиент'
            break;
        case 'bases':
            focusTitle = 'Основа'
            break;
        case 'sides':
            focusTitle = 'Бортик'
            break;
        default:
            focusTitle = ''
            break;
    }

    return (
        <div className="create-section-container">
            <h3 className='create-section-title'>
                {user ? currentFocus === '' ? `Выберите компонент` : `${focusTitle}` : "Сначала нужно войти!"}
            </h3>
            {user && currentFocus === '' && currentAction === '' &&
                <div className='create-focus-section'>
                    <CommandButton size={"large"} type={'black'} command={() => setCurrentFocus('pizza')}
                                   title={"Пицца"}/>
                    <CommandButton size={"large"} type={'black'} command={() => setCurrentFocus('ingredients')}
                                   title={"Ингредиент"}/>
                    <CommandButton size={"large"} type={'black'} command={() => setCurrentFocus('bases')}
                                   title={"Основа"}/>
                    <CommandButton size={"large"} type={'black'} command={() => setCurrentFocus('sides')}
                                   title={"Бортик"}/>
                </div>
            }
            {currentFocus !== '' && currentAction === '' &&
                <ControlMenu onClick={setCurrentAction} backState={setCurrentFocus}/>}
            {currentAction === 'create' &&
                <div className='create-section-container'>
                    <CreateMethod userID={user ? user.id : ''} focus={currentFocus}/>
                    <div className='button-back-container'>
                        <CommandButton size={"large"} type={'black'} command={() => setCurrentAction('')}
                                       title={"Назад"}/>
                    </div>
                </div>
            }
            {
                currentAction === 'update' &&
                <div className='create-section-container'>
                    <UpdateMethod userID={user ? user.id : ''} focus={currentFocus}/>
                    <div className='button-back-container'>
                        <CommandButton size={"large"} type={'black'} command={() => setCurrentAction('')}
                                       title={"Назад"}/>
                    </div>
                </div>
            }
            {
                currentAction === 'remove' &&
                <div className='create-section-container'>
                    <RemoveMethod userID={user ? user.id : ''} focus={currentFocus}/>
                    <div className='button-back-container'>
                        <CommandButton size={"large"} type={'black'} command={() => setCurrentAction('')}
                                       title={"Назад"}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default CreateSection;