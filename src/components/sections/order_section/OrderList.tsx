import "./OrderSection.css"
import {useCRUD} from "../../../hooks/useCRUD";
import {useUser} from "../../../contexts/UserContext";
import {useEffect, useState} from "react";
import {usePriceFilter} from "../../../hooks/usePriceFilter";
import {PriceData} from "../../../props/PriceData";
import {OrderFilterData} from "../../../props/FilterData";
import FilterSection from "../../filters/FilterSection";
import {DateFilterData, OrderProps} from "../../../props/Order";
import OrderCard from "../../cards/order_card/OrderCard";


const OrderList = () => {
    const {getAll} = useCRUD<OrderProps, any>('/order');
    const {user} = useUser();
    const [orders, setOrders] = useState<OrderProps[]>([]);

    const [dateStart, setDateStart] = useState<string>(new Date().toISOString());
    const [dateEnd, setDateEnd] = useState<string>(new Date().toISOString());

    const {
        minPrice, maxPrice,
        localMin, localMax,
        handleChangeMinPrice, handleChangeMaxPrice,
        handleChangeLocalMin, handleChangeLocalMax,
    } = usePriceFilter({data: orders, type: 'order'});

    const priceData: PriceData = {
        localMin: localMin,
        localMax: localMax,
        handleChangeLocalMin: handleChangeLocalMin,
        handleChangeLocalMax: handleChangeLocalMax,
        handleChangeMinPrice: handleChangeMinPrice,
        handleChangeMaxPrice: handleChangeMaxPrice,
    }

    const dateData: DateFilterData = {
        dateStart: dateStart,
        dateEnd: dateEnd,
        setDateStart: setDateStart,
        setDateEnd: setDateEnd,
    }


    const filterData: OrderFilterData = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        dateStart: dateStart,
        dateEnd: dateEnd,
    }

    useEffect(() => {
        if (!user) {
            setOrders([]);
        } else {
            getAll(user, filterData).then(res => {
                if (res.data) {
                    setOrders(res.data);
                } else {
                    setOrders([]);
                }
            });
        }
    }, [user, minPrice, maxPrice, dateStart, dateEnd]);

    return (
        <section className="ingredient-section">
            <ul className="ingredient-list">
                {orders.map((order: OrderProps) => (
                    <div className={'create-focus-section'} key={order.id + 1}>
                        <OrderCard
                            key={order.id}
                            order={order}
                        />
                    </div>
                ))}
            </ul>
            <FilterSection priceData={priceData} dateData={dateData}/>
        </section>
    );
}

export default OrderList;