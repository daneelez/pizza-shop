import './PizzaBaseCard.css'

interface PizzaBaseCardProps {
    name: string;
    price: number;
    onClick?: () => void;
    onToggle?: () => void;
}

const PizzaBaseCard: React.FC<PizzaBaseCardProps> = ({name, price, onClick, onToggle}) => {
    return (
        <div className="ingredient-card-container"
             onClick={onClick}>
            <h3 className='ingredient-card-title'>{name}</h3>
            <div className="ingredient-card-order-container">
                <button className="double-button" onClick={onToggle}></button>
                <span className='ingredient-card-price'>{price} ₽</span>
            </div>
        </div>
    );
}

export default PizzaBaseCard;