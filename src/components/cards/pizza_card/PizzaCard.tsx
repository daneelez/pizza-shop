import './PizzaCard.css';

interface PizzaCardProps {
    name: string;
    ingredients: string[];
    price: number;
    onAddToCart: () => void;
}

const PizzaCard: React.FC<PizzaCardProps> = ({name, ingredients, price, onAddToCart}) => {
    return (
        <div className="pizza-card-container">
            <h3 className='pizza-card-title'>{name}</h3>
            <p className="pizza-card-ingredients">
                Состав: {ingredients.join(', ')}...
            </p>
            <div className="pizza-card-size-container">
                <button className='pizza-card-size'>Small</button>
                <button className='pizza-card-size'>Medium</button>
                <button className='pizza-card-size'>Large</button>
            </div>
            <div className="pizza-card-order-container">
                <button className="add-button" onClick={onAddToCart}>В корзину</button>
                <span className='pizza-card-price'>{price} ₽</span>
            </div>
        </div>
    );
};

export default PizzaCard;
