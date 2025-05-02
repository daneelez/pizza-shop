import './PizzaSection.css'
import PizzaCard from "../pizza_card/PizzaCard";
import CreateCard from "../create_card/CreateCard";

interface PizzaSectionProps {
    createCard?: boolean;
    onCreateCard?: () => void;
}

const PizzaSection: React.FC<PizzaSectionProps> = ({createCard, onCreateCard}) => {
    return (
        <section className="pizza-section">
            <ul className="pizza-list">
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
                <CreateCard type='pizza' onCreate={() => onCreateCard}/>
            </ul>
        </section>
    );
}

export default PizzaSection;