import './PizzaBaseSection.css'
import CreateCard from "../../create_card/CreateCard";
import {useEffect} from "react";
import {useCRUD} from "../../../hooks/useCRUD"
import {useUser} from "../../../contexts/UserContext";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";
import {PizzaBaseProps} from "../../../props/PizzaBase";
import FilterSection from "../../filters/FilterSection";
import {usePriceFilter} from "../../../hooks/usePriceFilter";
import {PriceData, PriceFilterData} from "../../../props/PriceData";
import PizzaBaseCard from "../../cards/pizza_base_card/PizzaBaseCard";

interface PizzaBaseSectionProps {
    onCreateCard?: () => void;
}

const PizzaBaseSection: React.FC<PizzaBaseSectionProps> = ({onCreateCard}) => {
    const {bases, setBases} = usePizzaBase();
    const {getAll} = useCRUD<PizzaBaseProps, any>('/bases');
    const {user} = useUser();

    const {
        minPrice, maxPrice,
        localMin, localMax,
        handleChangeMinPrice, handleChangeMaxPrice,
        handleChangeLocalMin, handleChangeLocalMax,
    } = usePriceFilter({data: bases, type: "bases"});

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
            setBases([]);
        } else {
            getAll(user.id, filterData).then(res => {
                if (res.data) {
                    setBases(res.data);
                } else {
                    setBases([]);
                }
            });
        }
    }, [user, minPrice, maxPrice]);

    return (
        <section className="ingredient-section">
            <ul className="ingredient-list">
                {bases.map((base: PizzaBaseProps) => (
                    <PizzaBaseCard
                        key={base.id}
                        name={base.name}
                        price={base.price}
                    />
                ))}
                <CreateCard type='base' onCreate={() => onCreateCard}/>
            </ul>
            <FilterSection priceData={priceData}/>
        </section>
    );
}

export default PizzaBaseSection;