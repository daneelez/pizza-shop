import './PizzaSection.css'
import PizzaCard from "../pizza_card/PizzaCard";

const PizzaSection = () => {
    return (
        <section className="pizza-section">
            <p className='pizza-section-title'>Пицца</p>
            <ul className="pizza-list">
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
                <PizzaCard name='Название' ingredients={["Сыр", "Бекон"]} price={650} onAddToCart={() => setInterval}/>
            </ul>
        </section>
    );
}

export default PizzaSection;