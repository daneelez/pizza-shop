import InputField from "../input_field/InputField";
import './Filters.css'
import {PriceData} from "../../props/PriceData";

interface PriceFilterProps {
    priceData: PriceData;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
                                                     priceData,
                                                 }) => {

    return (
        <div className={'price-filter-container'}>
            <h2 className={'filter-container-title'}>Цена, ₽</h2>
            <div className={'price-filter'}>
                <p className='price-filter-title'>От</p>
                <InputField type={'number'} placeholder={priceData.localMin.toString()} value={priceData.localMin}
                            onChangeString={priceData.handleChangeLocalMin}
                            onBlurNumber={priceData.handleChangeMinPrice} size={'small'}/>
            </div>
            <div className={'price-filter'}>
                <p className={'price-filter-title'}>До</p>
                <InputField type={'number'} placeholder={priceData.localMax.toString()} value={priceData.localMax}
                            onChangeString={priceData.handleChangeLocalMax}
                            onBlurNumber={priceData.handleChangeMaxPrice} size={'small'}/>
            </div>
        </div>
    );
}

export default PriceFilter;