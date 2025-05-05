export interface PriceData {
    localMin: number;
    localMax: number;
    handleChangeMinPrice: (value: number) => void;
    handleChangeMaxPrice: (value: number) => void;
    handleChangeLocalMin: (value: string) => void;
    handleChangeLocalMax: (value: string) => void;
}