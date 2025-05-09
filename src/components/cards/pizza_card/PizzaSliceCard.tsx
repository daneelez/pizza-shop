import './PizzaCard.css'
import {PizzaSliceProps} from "../../../props/Pizza";

const PizzaSliceCard: React.FC<{ slice: PizzaSliceProps, index: number }> = ({slice, index}) => {
    return (
        <div className="slice-card-container">
            <p className="pizza-card-title">Кусок {index + 1}</p>
            <p>Основа: {slice.base.name}</p>
            {slice.side && <p>Бортик: {slice.side.name}</p>}
            <div>
                <p>Ингредиенты:</p>
                <ul className="slice-ingredients">
                    {(slice.ingredients.map((ing, i) => (
                        <li key={i}>{ing.name}</li>
                    )))}
                </ul>
            </div>
        </div>
    );
};

export default PizzaSliceCard;
