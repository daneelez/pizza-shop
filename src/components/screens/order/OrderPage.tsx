import './OrderPage.css'
import CommandButton from "../../command_button/CommandButton";
import {useState} from "react";

const OrderPage = () => {
    const [currentFocus, setCurrentFocus] = useState('');

    return (
        <div className="control-container">
            <div className="control-button-container">
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('order')}
                    title={"Заказать"}
                    isActive={currentFocus === 'order'}
                />
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('new')}
                    title={"Новая пицца"}
                    isActive={currentFocus === 'new'}
                />
                <CommandButton
                    size={"medium"}
                    type={'dark'}
                    command={() => setCurrentFocus('orders')}
                    title={"Список заказов"}
                    isActive={currentFocus === 'orders'}
                />
            </div>
            <div className='control-content'>
            </div>
            <div className='control-content'>
            </div>
            <div className='control-content'>
            </div>
            <div className='control-content'>
            </div>
        </div>
    );
}

export default OrderPage;