import CommandButton from "../../command_button/CommandButton";
import {useState} from "react";
import './Control.css'
import PizzaSection from "../../sections/pizza_section/PizzaSection";
import IngredientsSection from "../../sections/ingredients_section/IngredientsSection";
import CreateSection from "../../sections/create_section/CreateSection";
import PizzaBaseSection from "../../sections/pizza_base_section/PizzaBaseSection";
import PizzaSideSection from "../../sections/pizza_side_section/PizzaSideSection";

const Control = () => {
    const [currentFocus, setCurrentFocus] = useState('');

    return (
        <div className="control-container">
            <div className="control-button-container">
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('pizza')}
                    title={"Пицца"}
                    isActive={currentFocus === 'pizza'}
                />
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('ingredients')}
                    title={"Ингредиенты"}
                    isActive={currentFocus === 'ingredients'}
                />
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('bases')}
                    title={"Основы"}
                    isActive={currentFocus === 'bases'}
                />
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('sides')}
                    title={"Бортики"}
                    isActive={currentFocus === 'sides'}
                />
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('create')}
                    title={"Создать"}
                    isActive={currentFocus === 'create'}
                />
            </div>
            <div className='control-content'>
                {currentFocus === 'pizza' &&
                    <>
                        <PizzaSection/>
                    </>
                }
            </div>
            <div className='control-content'>
                {currentFocus === 'ingredients' &&
                    <>
                        <IngredientsSection/>
                    </>
                }
            </div>
            <div className='control-content'>
                {currentFocus === 'bases' &&
                    <>
                        <PizzaBaseSection/>
                    </>
                }
            </div>
            <div className='control-content'>
                {currentFocus === 'sides' &&
                    <>
                        <PizzaSideSection/>
                    </>
                }
            </div>
            <div className='control-content'>
                {currentFocus === 'create' &&
                    <>
                        <CreateSection/>
                    </>
                }
            </div>
        </div>
    );
}

export default Control;