interface useModalWindowProps<T> {
    selectedItems: T[];
    setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
}

export const useModalWindow = <T extends { id: string }>({selectedItems, setSelectedItems}: useModalWindowProps<T>) => {

    const handleItemChange = (item: T) => {
        setSelectedItems(prev => {
            const exist = prev.find(i => i.id === item.id);
            if (exist) {
                return prev.filter(i => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        })
    }

    const handleItemReplace = (item: T) => {
        setSelectedItems([item])
    }

    const handleItemAdd = (item: T) => {
        setSelectedItems(prev => {
            const count = prev.filter(i => i.id === item.id).length;
            if (count < 2) {
                return [...prev, item];
            } else {
                return prev.filter(i => i.id !== item.id);
            }
        })
    }

    const isSelected = (item: T) => {
        return selectedItems.some(i => i.id === item.id);
    }

    const isSelectedOne = (item: T) => {
        return selectedItems.length === 1 && selectedItems[0].id === item.id;
    }

    const getCount = (item: T) => {
        return selectedItems.filter(i => i.id === item.id).length;
    };

    return {
        selectedItems,
        handleItemChange,
        handleItemReplace,
        isSelected,
        isSelectedOne,
        setSelectedItems,
        getCount,
        handleItemAdd,
    }
}