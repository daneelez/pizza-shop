import PriceFilter from "./PriceFilter";
import './Filters.css'
import {PriceData} from "../../props/PriceData";
import IngredientFilter from "./IngredientFilter";
import {IngredientFilterProps} from "../../props/Ingredient";
import {DateFilterData} from "../../props/Order";
import DateFilter from "./DateFilter";

interface FilterSectionProps {
    priceData: PriceData;
    ingredientsData?: IngredientFilterProps;
    dateData?: DateFilterData,
}

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         priceData, ingredientsData, dateData
                                                     }) => {
    return (
        <div className={'filter-section'}>
            <h2 className='filter-section-title'>Фильтры</h2>
            <PriceFilter priceData={priceData}/>
            {ingredientsData &&
                <IngredientFilter selectedIngredients={ingredientsData.selectedIngredients}
                                  setSelectedIngredients={ingredientsData.setSelectedIngredients}/>}
            {dateData &&
                <DateFilter dateStart={dateData.dateStart} dateEnd={dateData.dateEnd}
                            setDateStart={dateData.setDateStart} setDateEnd={dateData.setDateEnd}/>}
        </div>
    );
}

export default FilterSection;