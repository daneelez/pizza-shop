import {useEffect, useState} from "react";

interface usePriceFilterProps {
    data: any[];
    type: string;
}

export const usePriceFilter = ({data, type}: usePriceFilterProps) => {

    const curMin = Number(localStorage.getItem(`curMin-${type}`));
    const curMax = Number(localStorage.getItem(`curMax-${type}`));

    const [minPrice, setMinPrice] = useState(curMin);
    const [maxPrice, setMaxPrice] = useState(curMax);

    const [localMin, setLocalMin] = useState(curMin);
    const [localMax, setLocalMax] = useState(curMax);

    useEffect(() => {
        if (!data || data.length === 0) return;

        let min = data[0].price;
        let max = data[0].price;

        for (let item of data) {
            if (item.price < min) min = item.price;
            if (item.price > max) max = item.price;
        }

        localStorage.setItem(`curMin-${type}`, min);
        localStorage.setItem(`curMax-${type}`, max);
    }, [data, type]);

    const handleChangeLocalMin = (min: string) => {
        const minNum = Number(min);
        if (!isNaN(minNum)) setLocalMin(minNum);
    }

    const handleChangeLocalMax = (max: string) => {
        const maxNum = Number(max);
        if (!isNaN(maxNum)) setLocalMax(maxNum);
    }

    const handleChangeMinPrice = (value: number) => {
        setMinPrice(value);
        setLocalMin(value);
    }

    const handleChangeMaxPrice = (value: number) => {
        setMaxPrice(value);
        setLocalMax(value);
    }

    return {
        minPrice,
        maxPrice,
        localMin,
        localMax,
        handleChangeMinPrice,
        handleChangeMaxPrice,
        handleChangeLocalMax,
        handleChangeLocalMin,
    };
}