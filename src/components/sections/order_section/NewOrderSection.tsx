import './OrderSection.css'
import {useEffect, useState} from "react";
import {PizzaSize} from "../../../props/PizzaSize";
import CommandButton from "../../command_button/CommandButton";
import {PizzaOrderProps, PizzaProps, PizzaSliceRequest, PizzaSliceRequestCustom} from "../../../props/Pizza";
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
import {PizzaSideProps} from "../../../props/PizzaSide";
import {useIngredients} from "../../../contexts/IngredientContext";
import {usePizzaSide} from "../../../contexts/PizzaSideContext";
import {usePizzaBase} from "../../../contexts/PizzaBaseContext";

const NewOrderSection = () => {
    const [currentFocus, setCurrentFocus] = useState(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [selectedSlices, setSelectedSlices] = useState<number[]>([]);

    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString());

    const [currentPizzasInOrder, setCurrentPizzasInOrder] = useState<PizzaOrderProps[]>([]);

    const [selectedIngredients, setSelectedIngredients] = useState<IngredientProps[]>([]);
    const [selectedBases, setSelectedBases] = useState<PizzaBaseProps[]>([]);
    const [selectedSides, setSelectedSides] = useState<PizzaSideProps[]>([]);

    const [slices, setSlices] = useState<(PizzaSliceRequestCustom | null)[]>([null]);

    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isSideModalOpen, setIsSideModalOpen] = useState(false);
    const [isSliceInfoModalOpen, setIsSliceInfoModalOpen] = useState(false);
    const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const {ingredients} = useIngredients();
    const {sides} = usePizzaSide();
    const {bases} = usePizzaBase();

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
        handleItemReplace: handlePizzaSideChange,
        isSelectedOne: isPizzaSideSelected,
    } = useModalWindow<PizzaSideProps>({selectedItems: selectedSides, setSelectedItems: setSelectedSides});

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

    const updateProps = (type: 'ingredients' | 'side') => {
        if (selectedSlices.length === 0) return;

        setSlices(prev => {
            const updated = [...prev];

            for (const index of selectedSlices) {
                const original = updated[index];

                updated[index] = {
                    ...original,
                    name: null,
                    ...(type === 'ingredients'
                        ? {ingredients: [...selectedIngredients]}
                        : {side: selectedSides[0]}),
                };
            }

            return updated;
        });
    };

    const returnInitState = () => {
        setSelectedSize(null);
        setSlices([null]);
        setSelectedBases([]);
        setSelectedSides([]);
        setSelectedIngredients([]);
        setDate(new Date().toISOString());
        setDescription('')
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

        const initOrderProps: OrderRequest = {
            owners: selectedUsers,
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
                                    title={"Выбрать бортик"}
                                    command={() => setIsSideModalOpen(true)}
                                />
                            </div>
                            <div className='modal-container'>
                                <CommandButton
                                    size={"large"}
                                    type={'black'}
                                    title={"Выбрать ингредиенты"}
                                    command={() => {
                                        setIsIngredientModalOpen(true);
                                    }}
                                />
                            </div>
                            {selectedSlices.length === 1 && slices[selectedSlices[0]] !== null && (
                                <>
                                    <div className='modal-container'>
                                        <CommandButton
                                            size={"large"}
                                            type={'black'}
                                            title={"Информация о куске"}
                                            command={() => {
                                                setSelectedIngredients(slices[selectedSlices[0]]!!.ingredients ?? []);
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
                    {isSideModalOpen && (
                        <ModalWindow title={'Выберите бортик'} list={sides} onChange={handlePizzaSideChange}
                                     onChecked={isPizzaSideSelected} onToggle={() => {
                            updateProps('side');
                            setIsSideModalOpen(!isSideModalOpen);
                            setSelectedSlices([]);
                        }} type="alone" onClose={setIsSideModalOpen}/>)}

                    {isIngredientModalOpen && (
                        <ModalWindow title={'Выберите ингредиенты'} list={ingredients}
                                     onChange={handleIngredientChange}
                                     onChecked={isIngredientSelected} onToggle={() => {
                            updateProps('ingredients');
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
                                     onChecked={isPizzaBaseSelected} onToggle={setIsBaseModalOpen}
                                     type={'alone'}/>)}
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
                        title={"Разделить заказ"}
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

export default NewOrderSection;