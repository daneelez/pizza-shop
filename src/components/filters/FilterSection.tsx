import PriceFilter from "./PriceFilter";
import './Filters.css'
import {PriceData} from "../../props/PriceData";

interface FilterSectionProps {
    priceData: PriceData;
}

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         priceData,
                                                     }) => {
    return (
        <div className={'filter-section'}>
            <h2 className='filter-section-title'>Фильтры</h2>
            <PriceFilter priceData={priceData}/>
        </div>
    );
}

export default FilterSection;