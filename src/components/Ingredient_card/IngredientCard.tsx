import './IngredientCard.css';

interface IngredientCardProps {
    name: string;
    price: number;
    onDouble?: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({name, price, onDouble}) => {
    return (
        <div className="ingredient-card-container">
            <h3 className='ingredient-card-title'>{name}</h3>
            <div className="ingredient-card-order-container">
                <button className="double-button" onClick={onDouble}></button>
                <span className='ingredient-card-price'>{price} ₽</span>
            </div>
        </div>
    );
}

export default IngredientCard;