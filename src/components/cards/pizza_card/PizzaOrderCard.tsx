import {PizzaOrderProps} from "../../../props/Pizza";
import PizzaSliceCard from "./PizzaSliceCard";
import './PizzaCard.css'

const PizzaCard: React.FC<{ pizza: PizzaOrderProps, index: number }> = ({pizza, index}) => {
    return (
        <div className="pizza-order-card-container">
            <h3 className="pizza-card-title">Пицца №{index} {pizza.size}</h3>
            <div className="pizza-order-card-slice-container">
                {pizza.slices.map((slice, i) => (
                    <PizzaSliceCard key={i} slice={slice} index={i}/>
                ))}
            </div>
        </div>
    );
};

export default PizzaCard;
