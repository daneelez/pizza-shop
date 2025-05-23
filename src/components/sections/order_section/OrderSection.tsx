import './OrderSection.css'
import {useEffect, useState} from "react";
import {PizzaSize} from "../../../props/PizzaSize";
import CommandButton from "../../command_button/CommandButton";
import {PizzaOrderProps, PizzaProps, PizzaSliceRequest} from "../../../props/Pizza";
import {usePizza} from "../../../contexts/PizzaContext";
import {useModalWindow} from "../../../hooks/useModalWindow";
import InputField from "../../input_field/InputField";
import ModalWindow from "../../modal_window/ModalWindow";
import {IngredientProps} from "../../../props/Ingredient";
import ModalInfo from "../../modal_window/ModalInfo";
import {PizzaBaseProps} from "../../../props/PizzaBase";
import {useUser} from "../../../contexts/UserContext";
import {UserProps} from "../../../props/User";
import {OrderProps, OrderRequest} from "../../../props/Order";
import {useCRUD} from "../../../hooks/useCRUD";
import OrderCard from "../../cards/order_card/OrderCard";
import {succesToaster} from "../../notify_toaster/NotifyToaster";

const OrderSection = () => {
    const [currentFocus, setCurrentFocus] = useState(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [selectedSlices, setSelectedSlices] = useState<number[]>([]);

    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString());

    const [currentPizzasInOrder, setCurrentPizzasInOrder] = useState<PizzaOrderProps[]>([]);

    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);
    const [selectedPizzas, setSelectedPizzas] = useState<PizzaProps[]>([]);
    const [selectedBases, setSelectedBases] = useState<PizzaBaseProps[]>([]);

    const [slices, setSlices] = useState<(PizzaSliceRequest | null)[]>([null]);

    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isPizzaModalOpen, setIsPizzaModalOpen] = useState(false);
    const [isSliceInfoModalOpen, setIsSliceInfoModalOpen] = useState(false);
    const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const [bases, setBases] = useState<PizzaBaseProps[]>([]);

    const {pizzas} = usePizza();

    const [curOrder, setCurOrder] = useState<OrderProps | null>(null);

    const {user, read: getAllUsers} = useUser();
    const [users, setUsers] = useState<UserProps[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserProps[]>(user ? [user] : []);

    const {createOne, removeOrder: remove} = useCRUD<OrderProps, OrderRequest>('/order')

    const {
        handleItemAdd: handleIngredientChange,
        isSelected: isIngredientSelected,
        getCount: getIngredients,
    } = useModalWindow<IngredientProps>({selectedItems: selectedIngredients, setSelectedItems: setSelectedIngredients});

    const {
        handleItemChange: handleUserChange,
        isSelected: isUserSelected,
    } = useModalWindow<UserProps>({selectedItems: selectedUsers, setSelectedItems: setSelectedUsers});

    const {
        handleItemReplace: handlePizzaChange,
        isSelectedOne: isPizzaSelected,
    } = useModalWindow<PizzaProps>({selectedItems: selectedPizzas, setSelectedItems: setSelectedPizzas});

    const {
        handleItemReplace: handlePizzaBaseChange,
        isSelectedOne: isPizzaBaseSelected,
    } = useModalWindow<PizzaBaseProps>({selectedItems: selectedBases, setSelectedItems: setSelectedBases});

    useEffect(() => {
        getAllUsers().then(res => {
            if (res) setUsers(res);
            else setUsers([]);

        });
    }, [currentFocus]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const localDate = new Date(e.target.value);
        setDate(localDate.toISOString());
    };

    const toggleSliceSelection = (index: number) => {
        setSelectedSlices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const selectAllSlices = () => {
        setSelectedSlices((prev) =>
            prev.length === selectedSize
                ? []
                : Array.from({length: selectedSize ? selectedSize : 0}, (_, i) => i)
        );
    };

    const updateSlices = () => {
        if (selectedPizzas.length === 0 || selectedSlices.length === 0) return;

        const pizzaSliceProps: PizzaSliceRequest = {
            name: selectedPizzas[0].name,
            base: selectedPizzas[0].base,
            side: selectedPizzas[0].side,
            ingredients: selectedPizzas[0].ingredients,
        }

        setBases(prev => {
            const exist = bases.find((base) => base.id === selectedPizzas[0].base.id)
            if (exist) return [...prev];
            return [...prev, selectedPizzas[0].base];
        })

        setSlices(prev => {
            const updated = [...prev];
            selectedSlices.forEach(index => {
                if (index >= 0 && index < updated.length) {
                    updated[index] = pizzaSliceProps;
                }
            });
            return updated;
        });
    };

    const updateIngredients = () => {
        if (selectedSlices.length !== 1) return;
        const index = selectedSlices[0];

        setSlices(prev => {
            const updated = [...prev];
            const original = updated[index];

            if (!original) return prev;

            updated[index] = {
                ...original,
                ingredients: [...selectedIngredients],
            };

            return updated;
        });
    };

    const returnInitState = () => {
        setSelectedSize(null);
        setSlices([null]);
        setSelectedBases([]);
        setSelectedPizzas([]);
        setSelectedIngredients([]);
        setDate(new Date().toISOString());
        setDescription('')
        setSelectedUsers([]);
    }

    const savePizzaToOrder = () => {
        if (!selectedSize) {
            returnInitState();
            return;
        }

        const validSlices = slices.filter((i): i is PizzaSliceRequest => i !== null);
        if (validSlices.length === 0) {
            returnInitState();
            return;
        }

        validSlices.forEach((slice) => slice.base = selectedBases[0])

        const size: PizzaSize =
            selectedSize === 2 ? PizzaSize.MIXED :
                selectedSize === 6 ? PizzaSize.SMALL :
                    selectedSize === 8 ? PizzaSize.MEDIUM :
                        PizzaSize.LARGE;

        const newPizzaInOrderProps: PizzaOrderProps = {
            slices: validSlices,
            size: size,
            owners: selectedUsers ? selectedUsers : user ? [user] : [],
        }

        if (currentPizzasInOrder.length === 0) {
            setCurrentPizzasInOrder([newPizzaInOrderProps]);
        } else {
            setCurrentPizzasInOrder([...currentPizzasInOrder, newPizzaInOrderProps]);
        }

        returnInitState();
    }

    const cancelOrder = async () => {
        if (!curOrder || !user) return;

        const deleteRequest = {
            owner: user,
            id: curOrder.id,
        }

        await remove(deleteRequest.owner, deleteRequest.id);
        setCurrentFocus(0);
        setCurOrder(null);
        returnInitState();
    }

    const prepareOrder = () => {
        if (!user) return;

        const orderOwners = Array.from(
            new Map(
                currentPizzasInOrder
                    .flatMap(pizza => pizza.owners)
                    .map(owner => [owner.id, owner])
            ).values()
        );

        const initOrderProps: OrderRequest = {
            owners: orderOwners,
            pizzas: currentPizzasInOrder,
            description: description,
            date: date,
        }

        createOne(user, initOrderProps).then((res) => {
            if (res.data) {
                const newOrder: OrderProps = {
                    ...res.data
                }

                setCurOrder(newOrder);
            }
        })
    }

    return (
        <div className="order-section-container">
            {currentFocus === 0 && (
                <>
                    <h3 className='create-section-title'>
                        Выберите размер
                    </h3>
                    <div className='create-focus-section'>
                        <CommandButton size={"large"} type={'black'} command={() => {
                            setSelectedSize(6);
                            setSlices(Array(6).fill(null));
                            setCurrentFocus(1);
                        }} title={"Маленький"}/>
                        <CommandButton size={"large"} type={'black'} command={() => {
                            setSelectedSize(8);
                            setSlices(Array(8).fill(null));
                            setCurrentFocus(1);
                        }}
                                       title={"Средний"}/>
                        <CommandButton size={"large"} type={'black'} command={() => {
                            setSelectedSize(12);
                            setSlices(Array(12).fill(null));
                            setCurrentFocus(1);
                        }}
                                       title={"Большой"}/>
                    </div>
                </>
            )}

            {currentFocus === 1 && (
                <>
                    <div className="create-focus-section">
                        <ul className={"create-slices-list"}>
                            {slices.map((slice, index) => (
                                <CommandButton key={index}
                                               title={`Кусок ${index + 1}`} size={"small"}
                                               type={selectedSlices.includes(index) ? 'white' : (slice ? 'orange' : 'black')}
                                               isActive={selectedSlices.includes(index)}
                                               command={() => toggleSliceSelection(index)}
                                />
                            ))}
                        </ul>
                        <div
                            className='create-method-container'
                        >
                            <div className='modal-container'>
                                <CommandButton
                                    size={"large"}
                                    type={'black'}
                                    title={"Выбрать все куски"}
                                    command={() => selectAllSlices()}
                                />
                            </div>
                            <div className='modal-container'>
                                <CommandButton
                                    size={"large"}
                                    type={'black'}
                                    title={"Выбрать пиццу"}
                                    command={() => setIsPizzaModalOpen(true)}
                                />
                            </div>
                            {selectedSlices.length === 1 && slices[selectedSlices[0]] && (
                                <>
                                    <div className='modal-container'>
                                        <CommandButton
                                            size={"large"}
                                            type={'black'}
                                            title={"Удвоить ингредиенты"}
                                            command={() => {
                                                setIsIngredientModalOpen(true);
                                                setSelectedIngredients(slices[selectedSlices[0]]?.ingredients ?? []);
                                            }}
                                        />
                                    </div>
                                    <div className='modal-container'>
                                        <CommandButton
                                            size={"large"}
                                            type={'black'}
                                            title={"Информация о куске"}
                                            command={() => {
                                                setSelectedIngredients(slices[selectedSlices[0]]?.ingredients ?? []);
                                                setIsSliceInfoModalOpen(true);
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                            {slices.filter((it) => it === null).length === 0 && (
                                <div className='modal-container'>
                                    <CommandButton
                                        size={"large"}
                                        type={'black'}
                                        title={"Дальше"}
                                        command={() => setCurrentFocus(2)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {isPizzaModalOpen && (
                        <ModalWindow title={'Выберите пиццу'} list={pizzas} onChange={handlePizzaChange}
                                     onChecked={isPizzaSelected} onToggle={() => {
                            updateSlices();
                            setIsPizzaModalOpen(!isPizzaModalOpen);
                            setSelectedSlices([]);
                        }} type="alone" onClose={setIsPizzaModalOpen}/>)}

                    {isIngredientModalOpen && (
                        <ModalWindow title={'Выберите ингредиенты'} list={selectedPizzas[0].ingredients}
                                     onChange={handleIngredientChange}
                                     onChecked={isIngredientSelected} onToggle={() => {
                            updateIngredients();
                            setIsIngredientModalOpen(!isIngredientModalOpen);
                            setSelectedSlices([]);
                        }} onClose={setIsIngredientModalOpen}
                                     type={'many'} getCount={getIngredients}
                        />)}

                    {isSliceInfoModalOpen && (
                        <ModalInfo title={`Информация о куске ${selectedSlices[0] + 1}`}
                                   onClose={setIsSliceInfoModalOpen} getCount={getIngredients}
                                   item={slices[selectedSlices[0]]}
                        />)}
                </>
            )}

            {currentFocus === 2 && (
                <div className='create-focus-section'>
                    <CommandButton
                        size={"large"}
                        type={'black'}
                        title={"Выбрать основу"}
                        command={() => setIsBaseModalOpen(true)}
                    />
                    {selectedBases.length === 1 && (
                        <div className='modal-container'>
                            <CommandButton
                                size={"large"}
                                type={'black'}
                                title={"Дальше"}
                                command={() => setCurrentFocus(3)}
                            />
                        </div>
                    )}
                    {isBaseModalOpen && (
                        <ModalWindow title={'Выберите основу'} list={bases} onChange={handlePizzaBaseChange}
                                     onChecked={isPizzaBaseSelected} onToggle={setIsBaseModalOpen} type={'alone'}/>)}
                </div>
            )}

            {currentFocus === 3 && (
                <div className='create-focus-section'>
                    <CommandButton
                        size={"large"}
                        type={'black'}
                        title={"Еще пицца"}
                        command={() => {
                            savePizzaToOrder();
                            setCurrentFocus(0);
                        }}
                    />
                    <CommandButton
                        size={"large"}
                        type={'black'}
                        title={"Разделить пиццу"}
                        command={() => setIsUserModalOpen(true)}
                    />
                    <CommandButton
                        size={"large"}
                        type={'black'}
                        title={"Дальше"}
                        command={() => {
                            savePizzaToOrder();
                            setCurrentFocus(4);
                        }}
                    />
                    {isUserModalOpen && (
                        <ModalWindow title={'Выберите пользователей'} list={users} onChange={handleUserChange}
                                     onChecked={isUserSelected} onToggle={setIsUserModalOpen} type={'users'}/>)}
                </div>
            )}

            {currentFocus === 4 && (
                <>
                    <div className='create-focus-section'>
                        {!curOrder ? (
                            <>
                                <CommandButton
                                    size={"large"}
                                    type={'black'}
                                    title={"Подготовить заказ"}
                                    command={() => {
                                        prepareOrder();
                                    }}
                                />
                                <InputField type={'text'}
                                            size={'large'}
                                            placeholder={'Комментарий...'}
                                            value={description}
                                            onChangeString={setDescription}
                                />
                                <input
                                    className={`input-field input-field-large`}
                                    type='datetime-local'
                                    placeholder={date.toString()}
                                    onChange={handleDateChange}
                                />
                            </>
                        ) : (
                            <>
                                <OrderCard order={curOrder}/>
                                <div className='bottom-button-section'>
                                    <CommandButton
                                        size={"large"}
                                        type={'black'}
                                        title={"Отменить заказ"}
                                        command={() => {
                                            cancelOrder();
                                        }}
                                    />
                                    <CommandButton
                                        size={"large"}
                                        type={'black'}
                                        title={"Заказать"}
                                        command={() => {
                                            succesToaster('Заказ успешно оформлен!');
                                            returnInitState();
                                            setCurOrder(null);
                                            setCurrentFocus(0);
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default OrderSection;