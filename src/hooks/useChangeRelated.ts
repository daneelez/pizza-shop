import {CRUDResponse} from "./useCRUD";

interface UpdateRelatedProps {
    userID: string;
    items: any[];
    updatedEntry: any;
    type: string;
    filter: 'update' | 'delete';
    updateRemote: (userID: string, itemID: string, props: any) => Promise<CRUDResponse<any[]>>;
    getItemProps: (item: any) => any;
}

export const updateRelated = async (
    {
        userID,
        items,
        filter,
        updatedEntry,
        updateRemote,
        type,
        getItemProps,
    }: UpdateRelatedProps) => {
    return await Promise.all(items.map(async item => {
        const used = item[type]?.some((i: { id: string; }) => i.id === updatedEntry.id);

        if (!used) return item;

        const newItems = (filter === 'update') ? item[type].map((i: {
            id: any;
        }) => i.id === updatedEntry.id ? updatedEntry : i) : item[type].filter((i: {
            id: any;
        }) => i.id !== updatedEntry.id);

        const updatedItem = {...item, [type]: newItems};

        const updatedProps = getItemProps(updatedItem);

        await updateRemote(userID, item.id, updatedProps);

        return updatedItem;
    }))
}

export const updateRelatedOne = async (
    {
        userID,
        items,
        filter,
        updatedEntry,
        updateRemote,
        type,
        getItemProps,
    }: UpdateRelatedProps) => {
    return await Promise.all(items.map(async item => {
        const used = item[type]?.id === updatedEntry.id;

        if (!used) return item;

        const newItems = (filter === 'update') ? updatedEntry : null;

        const updatedItem = {...item, [type]: newItems};

        const updatedProps = getItemProps(updatedItem);

        console.log(item, updatedProps);

        await updateRemote(userID, item.id, updatedProps);

        return updatedItem;
    }))
}