import './OrderPage.css'
import CommandButton from "../../command_button/CommandButton";
import {useState} from "react";
import OrderSection from "../../sections/order_section/OrderSection";
import OrderList from "../../sections/order_section/OrderList";
import NewOrderSection from "../../sections/order_section/NewOrderSection";

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
            {currentFocus === 'order' && (
                <div className='control-content'>
                    <OrderSection/>
                </div>
            )}
            {currentFocus === 'orders' && (
                <div className='control-content'>
                    <OrderList/>
                </div>
            )}
            {currentFocus === 'new' && (
                <div className='control-content'>
                    <NewOrderSection/>
                </div>
            )}
        </div>
    );
}

export default OrderPage;