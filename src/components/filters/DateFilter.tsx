import './Filters.css'
import {DateFilterData} from "../../props/Order";

const DateFilter: React.FC<DateFilterData> = ({
                                                  dateStart,
                                                  dateEnd,
                                                  setDateStart,
                                                  setDateEnd
                                              }) => {

    return (
        <div className={'date-filter-container'}>
            <h2 className={'filter-container-title'}>Фильтр по дате</h2>
            <div className={'price-filter'}>
                <p className='price-filter-title'>С (начало)</p>
                <input
                    type="datetime-local"
                    className="input-field-large white-text"
                    onChange={(e) => setDateStart(new Date(e.target.value).toISOString())}
                />
            </div>
            <div className={'price-filter'}>
                <p className={'price-filter-title'}>По (конец)</p>
                <input
                    type="datetime-local"
                    className="input-field-large white-text"
                    onChange={(e) => setDateEnd(new Date(e.target.value).toISOString())}
                />
            </div>
        </div>
    );
}

export default DateFilter;