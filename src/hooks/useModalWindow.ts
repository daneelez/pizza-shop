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

    const isSelected = (item: T) => {
        return selectedItems.some(i => i.id === item.id);
    }

    return {
        selectedItems,
        handleItemChange,
        isSelected,
        setSelectedItems,
    }
}