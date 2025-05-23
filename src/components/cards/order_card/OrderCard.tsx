import './OrderCard.css'
import {OrderProps} from "../../../props/Order";
import PizzaOrderCard from "../pizza_card/PizzaOrderCard";
import {useUser} from "../../../contexts/UserContext";

interface OrderCardProps {
    order: OrderProps;
}

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
    const {user} = useUser();

    return (
        <div className="order-card-container">
            <h3 className='order-card-title'>Заказ №({order.id})</h3>
            <p className="pizza-card-ingredients">
                Заказал: {order.owner.name}
            </p>
            <p className="pizza-card-ingredients">
                Покупатели: {order.owners.map(it => it.name).join(', ')}...
            </p>
            <div className="order-pizzas-section">
                {order.pizzas.map((pizza, index) => (
                    <PizzaOrderCard key={index} pizza={pizza} index={index + 1}/>
                ))}
            </div>
            <div className="order-description-container">
                <p className='pizza-card-ingredients'>
                    Описание: {order.description}...
                </p>
            </div>
            <div className="order-bottom-container">
                <span className='order-bottom-text'>
                    <p className='pizza-card-ingredients'>
                    Дата (UTC):
                </p>
                    <p className='pizza-card-ingredients'>
                    {order.date}
                </p>
                </span>
                <span className='order-bottom-text'>
                    <p className='pizza-card-ingredients'>
                    Цена:
                </p>
                    <p className='pizza-card-ingredients'>
                    {user && order.perUserPrice[user.id]}₽ ({order.price}₽)
                </p>
                </span>
            </div>
        </div>
    );
};

export default OrderCard;
