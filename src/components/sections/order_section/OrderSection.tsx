import './OrderSection.css'
import {PizzaBaseProps} from "../../../props/PizzaBase";
import {useState} from "react";

const OrderSection = () => {
    const [selectedBase, setSelectedBase] = useState<PizzaBaseProps | null>(null);

    return (
        <>
            {
                !selectedBase ? (
                        <>
                        </>
                    ) :
                    <>
                    </>
            }
        </>
    );
}

export default OrderSection;