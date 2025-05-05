import './PizzaSideSection.css'
import PizzaSideCard from "../../cards/pizza_side_card/PizzaSideCard";
import CreateCard from "../../create_card/CreateCard";
import {useEffect, useState} from "react";
import {useCRUD} from "../../../hooks/useCRUD"
import {useUser} from "../../../contexts/UserContext";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {PizzaSideProps} from "../../../props/PizzaSide";
import FilterSection from "../../filters/FilterSection";
import {usePriceFilter} from "../../../hooks/usePriceFilter";
import {PriceData} from "../../../props/PriceData";
import {IngredientFilterProps, IngredientProps} from "../../../props/Ingredient";
import {PizzaProps} from "../../../props/Pizza";
import {IngredientsFilterData} from "../../../props/FilterData";

interface PizzaSideSectionProps {
    onCreateCard?: () => void;
}

const PizzaSideSection: React.FC<PizzaSideSectionProps> = ({onCreateCard}) => {
    const {sides, setSides} = usePizzaSide();
    const {getAll} = useCRUD<PizzaSideProps, any>('/sides');
    const {user} = useUser();

    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);

    const {
        minPrice, maxPrice,
        localMin, localMax,
        handleChangeMinPrice, handleChangeMaxPrice,
        handleChangeLocalMin, handleChangeLocalMax,
    } = usePriceFilter({data: sides, type: 'sides'});

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
            setSides([]);
        } else {
            getAll(user.id, filterData).then(res => {
                if (res.data) {
                    setSides(res.data);
                } else {
                    setSides([]);
                }
            });
        }
    }, [user, minPrice, maxPrice, selectedIngredients]);

    return (
        <section className="ingredient-section">
            <ul className="ingredient-list">
                {sides.map((side: PizzaSideProps) => (
                    <PizzaSideCard
                        key={side.id}
                        name={side.name}
                        price={side.price}
                        ingredients={side.ingredients.map((item: IngredientProps) => item.name)}
                        notAllowedList={side.notAllowedList.map((item: PizzaProps) => item.name)}
                    />
                ))}
                <CreateCard type='side' onCreate={onCreateCard ? onCreateCard : () => 0}/>
            </ul>
            <FilterSection priceData={priceData} ingredientsData={ingredientFilterProps}/>
        </section>
    );
}

export default PizzaSideSection;