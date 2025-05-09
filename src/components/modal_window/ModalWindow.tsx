import CommandButton from "../command_button/CommandButton";
import './ModalWindow.css'

interface ModalWindowProps {
    title: string;
    list: any[];
    onChecked: (item: any) => boolean;
    onChange: (item: any) => void;
    onToggle: (item: boolean) => void;
    type: 'alone' | 'many' | 'users';
    onClose?: (item: boolean) => void;
    getCount?: (item: any) => number;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
                                                     title,
                                                     list,
                                                     onChecked,
                                                     onToggle,
                                                     onChange,
                                                     type,
                                                     onClose,
                                                     getCount
                                                 }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className='modal-title'>{title}</h3>
                <ul className="modal-list">
                    {list.map((item) => {
                        const count = getCount ? getCount(item) : 1

                        return (
                            <li key={item.id}>
                                <label>
                                    {type === "many" || type === "users" ? (
                                        <input
                                            type="checkbox"
                                            checked={getCount ? count > 1 : onChecked(item)}
                                            onChange={() => onChange(item)}
                                        />
                                    ) : (
                                        <input
                                            type="radio"
                                            checked={onChecked(item)}
                                            onChange={() => onChange(item)}
                                        />)}
                                    {type === "users" ? (
                                        item.name
                                    ) : (
                                        <>
                                            {item.name} - {item.price * count}₽ {getCount && `(x${count})`}
                                        </>
                                    )}
                                </label>
                            </li>
                        )
                    })}
                </ul>
                <div className="modal-footer">
                    <CommandButton size={"large"} type={'black'} title="Применить"
                                   command={() => onToggle(false)}/>
                    <CommandButton size={"small"} type={'white'} title="Назад"
                                   command={onClose ? () => onClose(false) : () => onToggle(false)}/>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;