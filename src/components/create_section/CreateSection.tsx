import './CreateSection.css'
import {useUser} from '../../contexts/UserContext'
import {useState} from "react";
import CommandButton from "../command_button/CommandButton";
import InputField from "../input_field/InputField";
import ControlMenu from "../control_menu/ControlMenu";

const CreateSection = () => {
    const {user} = useUser();

    const [currentFocus, setCurrentFocus] = useState('');
    const [currentAction, setCurrentAction] = useState('');

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

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    return (
        <div className="create-section-container">
            <h3 className='user-form-title'>
                {user ? currentFocus === '' ? `Выберите компонент` : `${focusTitle}` : "Сначала нужно войти!"}
            </h3>
            {currentFocus === '' &&
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
            {currentFocus !== '' && <ControlMenu onClick={setCurrentAction} backState={setCurrentFocus}/>}

            {/*{currentFocus === 'ingredients' &&*/}
            {/*    <div*/}
            {/*        className='auth-container'*/}
            {/*        style={{display: user ? 'flex' : 'none'}}*/}
            {/*    >*/}
            {/*        <InputField type={'text'} placeholder={'Название'} value={name}*/}
            {/*                    onChange={setName}/>*/}
            {/*        <InputField type={'text'} placeholder={'Цена'} value={price}*/}
            {/*                    onChange={setPrice}/>*/}
            {/*        <CommandButton size={"large"} type={'white'} command={() => setPrice('1')} title={"Создать"}/>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
}

export default CreateSection;