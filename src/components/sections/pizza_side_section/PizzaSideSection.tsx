import './PizzaSideSection.css'
import PizzaSideCard from "../../cards/pizza_side_card/PizzaSideCard";
import CreateCard from "../../create_card/CreateCard";
import {useEffect} from "react";
import {useCRUD} from "../../../hooks/useCRUD"
import {useUser} from "../../../contexts/UserContext";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {PizzaSideProps} from "../../../props/PizzaSide";
import FilterSection from "../../filters/FilterSection";
import {usePriceFilter} from "../../../hooks/usePriceFilter";
import {PriceData, PriceFilterData} from "../../../props/PriceData";
import {IngredientProps} from "../../../props/Ingredient";
import {PizzaProps} from "../../../props/Pizza";

interface PizzaSideSectionProps {
    onCreateCard?: () => void;
}

const PizzaSideSection: React.FC<PizzaSideSectionProps> = ({onCreateCard}) => {
    const {sides, setSides} = usePizzaSide();
    const {getAll} = useCRUD<PizzaSideProps, any>('/sides');
    const {user} = useUser();

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

    const filterData: PriceFilterData = {
        minPrice: minPrice,
        maxPrice: maxPrice,
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
    }, [user, minPrice, maxPrice]);

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
            <FilterSection priceData={priceData}/>
        </section>
    );
}

export default PizzaSideSection;