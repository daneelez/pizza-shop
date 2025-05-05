import './IngredientsSection.css'
import IngredientCard from "../../cards/Ingredient_card/IngredientCard";
import CreateCard from "../../create_card/CreateCard";
import {useEffect} from "react";
import {useCRUD} from "../../../hooks/useCRUD"
import {useUser} from "../../../contexts/UserContext";
import {useIngredients} from "../../../contexts/IngredientContext";
import {IngredientProps} from "../../../props/Ingredient";
import FilterSection from "../../filters/FilterSection";
import {usePriceFilter} from "../../../hooks/usePriceFilter";
import {PriceData, PriceFilterData} from "../../../props/PriceData";

interface IngredientsSectionProps {
    onCreateCard?: () => void;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({onCreateCard}) => {
    const {ingredients, setIngredients} = useIngredients();
    const {getAll} = useCRUD<IngredientProps, any>('/ingredients');
    const {user} = useUser();

    const {
        minPrice, maxPrice,
        localMin, localMax,
        handleChangeMinPrice, handleChangeMaxPrice,
        handleChangeLocalMin, handleChangeLocalMax,
    } = usePriceFilter({data: ingredients, type: 'ingredients'});

    const priceData: PriceData = {
        localMin: localMin,
        localMax: localMax,
        handleChangeLocalMin: handleChangeLocalMin,
        handleChangeLocalMax: handleChangeLocalMax,
        handleChangeMinPrice: handleChangeMinPrice,
        handleChangeMaxPrice: handleChangeMaxPrice,
    }

    const filterData: PriceFilterData = {
        minPrice: minPrice,
        maxPrice: maxPrice,
    }

    useEffect(() => {
        if (!user) {
            setIngredients([]);
        } else {
            getAll(user.id, filterData).then(res => {
                if (res.data) {
                    setIngredients(res.data);
                } else {
                    setIngredients([]);
                }
            });
        }
    }, [user, minPrice, maxPrice]);

    return (
        <section className="ingredient-section">
            <ul className="ingredient-list">
                {ingredients.map((ingredient: IngredientProps) => (
                    <IngredientCard
                        key={ingredient.id}
                        name={ingredient.name}
                        price={ingredient.price}
                    />
                ))}
                <CreateCard type='ingredient' onCreate={onCreateCard ? onCreateCard : () => 0}/>
            </ul>
            <FilterSection priceData={priceData}/>
        </section>
    );
}

export default IngredientsSection;