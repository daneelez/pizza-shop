import PriceFilter from "./PriceFilter";
import './Filters.css'
import {PriceData} from "../../props/PriceData";
import IngredientFilter from "./IngredientFilter";
import {IngredientFilterProps} from "../../props/Ingredient";

interface FilterSectionProps {
    priceData: PriceData;
    ingredientsData?: IngredientFilterProps;
}

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         priceData, ingredientsData,
                                                     }) => {
    return (
        <div className={'filter-section'}>
            <h2 className='filter-section-title'>Фильтры</h2>
            <PriceFilter priceData={priceData}/>
            {ingredientsData &&
                <IngredientFilter selectedIngredients={ingredientsData.selectedIngredients}
                                  setSelectedIngredients={ingredientsData.setSelectedIngredients}/>}
        </div>
    );
}

export default FilterSection;