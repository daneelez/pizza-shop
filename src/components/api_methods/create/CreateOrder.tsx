import {PizzaSliceRequest} from "../../../props/Pizza";
import {Dispatch, SetStateAction} from "react";

interface CreateOrderProps {
    selectedSize: number;
    slices: (PizzaSliceRequest | null)[];
    setSlices: Dispatch<SetStateAction<(PizzaSliceRequest | null)[]>>;
}

const CreateOrder: React.FC<CreateOrderProps> = ({selectedSize, slices, setSlices}) => {


    return (
        <></>
    );
}

export default CreateOrder;