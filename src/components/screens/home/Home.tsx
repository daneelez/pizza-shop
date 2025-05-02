import './Home.css'
import PizzaSection from "../../pizza_section/PizzaSection";
import IngredientsSection from "../../ingredients_section/IngredientsSection";

const Home = () => {
    return (
        <div className="home-container">
            <section className="home-section-container">
                <p className='home-section-title'>Пицца</p>
                <PizzaSection/>
                <p className='home-section-title'>Ингредиенты</p>
                <IngredientsSection/>
            </section>
        </div>
    );
}

export default Home;