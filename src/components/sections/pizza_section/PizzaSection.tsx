import './PizzaSection.css'
import PizzaCard from "../../cards/pizza_card/PizzaCard";
import CreateCard from "../../create_card/CreateCard";
import {IngredientFilterProps, IngredientProps} from "../../../props/Ingredient";
import {PizzaProps} from "../../../props/Pizza";
import {useCRUD} from "../../../hooks/useCRUD";
import {useUser} from "../../../contexts/UserContext";
import {usePizza} from "../../../contexts/PizzaContext";
import {useEffect, useState} from "react";
import {usePriceFilter} from "../../../hooks/usePriceFilter";
import {PriceData} from "../../../props/PriceData";
import {IngredientsFilterData} from "../../../props/FilterData";
import FilterSection from "../../filters/FilterSection";

interface PizzaSectionProps {
    createCard?: boolean;
    onCreateCard?: () => void;
}

const PizzaSection: React.FC<PizzaSectionProps> = ({createCard, onCreateCard}) => {
    const {pizzas, setPizzas} = usePizza();
    const {getAll} = useCRUD<PizzaProps, any>('/pizza');
    const {user} = useUser();

    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);

    const {
        minPrice, maxPrice,
        localMin, localMax,
        handleChangeMinPrice, handleChangeMaxPrice,
        handleChangeLocalMin, handleChangeLocalMax,
    } = usePriceFilter({data: pizzas, type: 'pizza'});

    const priceData: PriceData = {
        localMin: localMin,
        localMax: localMax,
        handleChangeLocalMin: handleChangeLocalMin,
        handleChangeLocalMax: handleChangeLocalMax,
        handleChangeMinPrice: handleChangeMinPrice,
        handleChangeMaxPrice: handleChangeMaxPrice,
    }

    const ingredientFilterProps: IngredientFilterProps = {
        selectedIngredients: selectedIngredients,
        setSelectedIngredients: setSelectedIngredients,
    }

    const filterData: IngredientsFilterData = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        ingredients: selectedIngredients,
    }

    useEffect(() => {
        if (!user) {
            setPizzas([]);
        } else {
            getAll(user.id, filterData).then(res => {
                if (res.data) {
                    setPizzas(res.data);
                } else {
                    setPizzas([]);
                }
            });
        }
    }, [user, minPrice, maxPrice, selectedIngredients]);

    return (
        <section className="ingredient-section">
            <ul className="ingredient-list">
                {pizzas.map((pizza: PizzaProps) => (
                    <PizzaCard
                        key={pizza.id}
                        name={pizza.name}
                        price={pizza.price}
                        ingredients={pizza.ingredients.map((item: IngredientProps) => item.name)}
                        base={pizza.base.name}
                        side={pizza.side.name}
                    />
                ))}
                <CreateCard type='pizza' onCreate={() => onCreateCard}/>
            </ul>
            <FilterSection priceData={priceData} ingredientsData={ingredientFilterProps}/>
        </section>
    );
}

export default PizzaSection;