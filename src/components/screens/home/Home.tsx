import './Home.css'
import PizzaSection from "../../sections/pizza_section/PizzaSection";
import IngredientsSection from "../../sections/ingredients_section/IngredientsSection";
import PizzaBaseSection from "../../sections/pizza_base_section/PizzaBaseSection";
import PizzaSideSection from "../../sections/pizza_side_section/PizzaSideSection";

const Home = () => {
    return (
        <div className="home-container">
            <section className="home-section-container">
                <p className='home-section-title'>Пицца</p>
                <PizzaSection/>
                <p className='home-section-title'>Основы</p>
                <PizzaBaseSection/>
                <p className='home-section-title'>Ингредиенты</p>
                <IngredientsSection/>
                <p className='home-section-title'>Бортики</p>
                <PizzaSideSection/>
            </section>
        </div>
    );
}

export default Home;