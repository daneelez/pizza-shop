import {UserProps} from "../props/User";

export interface CRUDResponse<ResponseType> {
    data: ResponseType | null;
    error: string | null;
}

const API_URL = process.env.REACT_APP_API_URL;

export const useCRUD = <ResponseType, RequestType>(prefix: string) => {
    const baseURL = `${API_URL}${prefix}`;

    const headers = {
        'Content-Type': 'application/json',
    }

    const create = async (userID: string, data: RequestType): Promise<CRUDResponse<ResponseType[]>> => {
        try {
            const response = await fetch(`${baseURL}/create`, {
                method: 'POST',
                headers,
                body: JSON.stringify({id: userID, ...data}),
            });
            if (!response.ok) {
                const error = await response.text();
                return {data: null, error: error};
            }

            const responseData: ResponseType[] = await response.json();
            return {data: responseData, error: null}
        } catch (error) {
            return {data: null, error: "Ошибка с сервером!"};
        }
    };

    const createOne = async (userID: UserProps, data: RequestType): Promise<CRUDResponse<ResponseType>> => {
        try {
            console.log(data);
            const response = await fetch(`${baseURL}/create`, {
                method: 'POST',
                headers,
                body: JSON.stringify({owner: userID, ...data}),
            });
            if (!response.ok) {
                const error = await response.text();
                return {data: null, error: error};
            }

            const responseData: ResponseType = await response.json();
            return {data: responseData, error: null}
        } catch (error) {
            return {data: null, error: "Ошибка с сервером!"};
        }
    };

    const update = async (userID: string, itemId: string, data: RequestType): Promise<CRUDResponse<ResponseType[]>> => {
        try {
            const res = await fetch(`${baseURL}/update`, {
                method: 'POST',
                headers,
                body: JSON.stringify({id: userID, itemId: itemId, ...data}),
            });

            if (!res.ok) {
                const error = await res.text();
                return {data: null, error};
            }

            const responseData: ResponseType[] = await res.json();
            return {data: responseData, error: null};
        } catch (err) {
            return {data: null, error: "Ошибка с сервером!"};
        }
    };

    const remove = async (userID: string, itemId: string): Promise<CRUDResponse<ResponseType[]>> => {
        try {
            const res = await fetch(`${baseURL}/delete`, {
                method: 'POST',
                headers,
                body: JSON.stringify({id: userID, itemId: itemId}),
            });

            if (!res.ok) {
                const error = await res.text();
                return {data: null, error};
            }

            const responseData: ResponseType[] = await res.json();
            return {data: responseData, error: null};
        } catch (err) {
            return {data: null, error: "Ошибка с сервером!"};
        }
    };

    const removeOrder = async (user: UserProps, itemId: string): Promise<CRUDResponse<ResponseType[]>> => {
        try {
            const res = await fetch(`${baseURL}/delete`, {
                method: 'POST',
                headers,
                body: JSON.stringify({owner: user, id: itemId}),
            });

            if (!res.ok) {
                const error = await res.text();
                return {data: null, error};
            }

            const responseData: ResponseType[] = await res.json();
            return {data: responseData, error: null};
        } catch (err) {
            return {data: null, error: "Ошибка с сервером!"};
        }
    };

    const getAll = async (userID?: string | UserProps, filterData?: any | null): Promise<CRUDResponse<ResponseType[]>> => {
        try {
            const res = await fetch(`${baseURL}/read`, {
                method: 'POST',
                headers,
                body: JSON.stringify({id: userID, filterData: filterData}),
            });


            if (!res.ok) {
                const error = await res.text();
                return {data: null, error};
            }

            const responseData: ResponseType[] = await res.json();
            return {data: responseData, error: null};
        } catch (err) {
            return {data: null, error: "Ошибка с сервером!"};
        }
    };

    return {create, update, remove, getAll, createOne, removeOrder};
};