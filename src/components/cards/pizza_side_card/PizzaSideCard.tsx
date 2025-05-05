import './PizzaSideCard.css'

interface PizzaSideCardProps {
    name: string;
    ingredients: string[];
    notAllowedList: string[];
    price: number;
    onClick?: () => void;
    onToggle?: () => void;
}

const PizzaSideCard: React.FC<PizzaSideCardProps> = ({name, price, onClick, onToggle, ingredients, notAllowedList}) => {
    return (
        <div className="pizza-card-container"
             onClick={onClick}>
            <h3 className='pizza-card-title'>{name}</h3>
            <p className="pizza-card-ingredients">
                Состав: {ingredients.join(', ')}...
            </p>
            <div className="pizza-side-card-not-allowed-container">
                Запрещенные: {notAllowedList.join(', ')}...
            </div>
            <div className="pizza-card-order-container">
                <button className="toggle-button" onClick={onToggle}></button>
                <span className='pizza-card-price'>{price} ₽</span>
            </div>
        </div>
    );
}

export default PizzaSideCard;