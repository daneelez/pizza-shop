import './CreateSection.css'
import {useUser} from '../../../contexts/UserContext'
import {useState} from "react";
import CommandButton from "../../command_button/CommandButton";
import ControlMenu from "../../control_menu/ControlMenu";
import CreateMethod from "../../api_methods/create/CreateMethod";
import UpdateMethod from "../../api_methods/update/UpdateMethod";
import RemoveMethod from "../../api_methods/remove/RemoveMethod";

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