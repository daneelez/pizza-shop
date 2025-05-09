import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {OrderProps} from "../props/Order";

interface OrderContextType {
    orders: OrderProps[];
    setOrders: Dispatch<SetStateAction<OrderProps[]>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [orders, setOrders] = useState<OrderProps[]>([]);

    return (
        <OrderContext.Provider value={{orders, setOrders}}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('OrderProvider не обнаружен');
    }
    return context;
}